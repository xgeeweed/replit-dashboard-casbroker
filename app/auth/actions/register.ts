"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/app/auth/schemas";
import { db } from "@/app/auth/lib/db";
import { getUserByEmail } from "@/app/auth/data/user";
import { generateVerificationToken } from "@/app/auth/lib/tokens";
import { sendVerificationEmail } from "@/app/auth/lib/mail";
import { v4 as uuidv4 } from 'uuid';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name, userType, phoneNumber, driversLicense, nationalId } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  try {
    if (userType === "driver") {
      // Create driver record
      const japtuId = `DRIVER${uuidv4().slice(0, 8).toUpperCase()}`;
      
      await db.driver.create({
        data: {
          japtu_id: japtuId,
          full_name: name,
          email,
          phone_number: phoneNumber,
          drivers_license_number: driversLicense,
          national_id: nationalId,
          status: "pending",
        },
      });
    }

    // Create user record
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: userType === "driver" ? "DRIVER" : "USER",
      },
    });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: "Confirmation email sent!" };
  } catch (error) {
    console.error("Error in register:", error);
    return { error: "Something went wrong!" };
  }
};
