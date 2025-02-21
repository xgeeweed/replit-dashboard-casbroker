"use server";

import * as z from "zod";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { signIn } from "@/app/auth/auth";
import { PhoneLoginSchema } from "@/app/auth/schemas";
import { db } from "@/app/auth/lib/db";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

// Function to normalize phone number
function normalizePhoneNumber(phone: string): string {
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = cleaned.substring(1);
  }
  if (cleaned.startsWith('233')) {
    cleaned = cleaned.substring(3);
  }
  return `+233${cleaned}`;
}

// Function to generate OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const login = async (
  values: z.infer<typeof PhoneLoginSchema>,
  callbackUrl?: string | null
) => {
  try {
    const validatedFields = PhoneLoginSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { phone_number, password, otp } = validatedFields.data;
    const normalizedPhone = normalizePhoneNumber(phone_number);

    // First, find the driver with the phone number
    const driver = await db.driver.findFirst({
      where: {
        OR: [
          { phone_number: normalizedPhone },
          { phone_number: normalizedPhone.replace('+', '') },
          { phone_number: normalizedPhone.replace('+233', '0') }
        ]
      }
    });

    if (!driver) {
      return { error: "Invalid phone number!" };
    }

    // Find the associated user account
    const user = await db.user.findFirst({
      where: {
        email: driver.email || `${driver.japtu_id.toLowerCase()}@driver.casbroker.com`
      }
    });

    if (!user || !user.password) {
      return { error: "Account not found!" };
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return { error: "Invalid credentials!" };
    }

    // If OTP is provided, verify it
    if (otp) {
      console.log("Verifying OTP:", {
        phone: normalizedPhone,
        otpLength: otp.length
      });

      const validOTP = await db.oTP.findFirst({
        where: {
          phone_number: normalizedPhone,
          otp: otp,
          expires: {
            gt: new Date()
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      if (!validOTP) {
        console.error("Invalid or expired OTP for:", normalizedPhone);
        return { error: "Invalid or expired OTP!" };
      }

      // Delete the used OTP
      await db.oTP.delete({
        where: {
          id: validOTP.id
        }
      });

      try {
        // Determine redirect URL based on user role
        const redirectUrl = callbackUrl || (user.role === "DRIVER" ? "/dashboard/driver-dashboard" : DEFAULT_LOGIN_REDIRECT);

        // Attempt to sign in with verified credentials
        const signInResult = await signIn("credentials", {
          phone_number: phone_number,
          password: password,
          redirect: false,
        });

        if (!signInResult || signInResult.error) {
          console.error("Sign in failed:", signInResult?.error);
          return { error: "Authentication failed!" };
        }

        return {
          success: "Logged in successfully!",
          redirectTo: redirectUrl
        };
      } catch (error) {
        console.error("Sign in error:", error);
        if (error instanceof AuthError) {
          switch (error.type) {
            case "AccessDenied":
              return { error: "Access denied. Please try again." };
            default:
              return { error: "Authentication failed!" };
          }
        }
        return { error: "Something went wrong!" };
      }
    }

    // Generate and store new OTP
    const newOTP = generateOTP();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10); // OTP expires in 10 minutes

    await db.oTP.create({
      data: {
        phone_number: normalizedPhone,
        otp: newOTP,
        expires: expiresAt,
      }
    });

    // TODO: Send OTP via SMS (implement your SMS service here)
    console.log('Generated OTP:', newOTP); // For testing purposes

    return { requireOTP: true };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Something went wrong!" };
  }
};
