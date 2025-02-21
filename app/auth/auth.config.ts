import type { NextAuthConfig } from "next-auth";
import type { UserRole } from "@prisma/client";
import type { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PhoneLoginSchema } from "@/app/auth/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/app/auth/lib/db";

interface ExtendedUser extends User {
  role?: UserRole;
  isTwoFactorEnabled?: boolean;
}

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

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          if (!credentials?.phone_number || !credentials?.password) {
            console.error("Missing credentials:", {
              hasPhoneNumber: !!credentials?.phone_number,
              hasPassword: !!credentials?.password
            });
            return null;
          }

          console.log("Starting authorization with credentials:", {
            phone_number: credentials.phone_number,
            hasPassword: !!credentials.password
          });

          const validatedFields = PhoneLoginSchema.safeParse({
            phone_number: credentials.phone_number,
            password: credentials.password
          });

          if (!validatedFields.success) {
            console.error("Validation failed:", validatedFields.error);
            return null;
          }

          const { phone_number, password } = validatedFields.data;
          const normalizedPhone = normalizePhoneNumber(phone_number);
          console.log("Normalized phone number:", normalizedPhone);

          // First find the driver
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
            console.error("Driver not found for phone:", normalizedPhone);
            return null;
          }

          console.log("Found driver:", {
            japtu_id: driver.japtu_id,
            phone: driver.phone_number
          });

          // Find the associated user account
          const user = await db.user.findFirst({
            where: {
              email: driver.email || `${driver.japtu_id.toLowerCase()}@driver.casbroker.com`
            }
          });

          if (!user || !user.password) {
            console.error("User account not found for driver:", driver.japtu_id);
            return null;
          }

          console.log("Found user account:", {
            id: user.id,
            email: user.email,
            role: user.role
          });

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            console.error("Password mismatch for user:", user.email);
            return null;
          }

          // Return the user object with verified status
          return {
            id: user.id,
            name: user.name || "",
            email: user.email || "",
            role: user.role,
            isTwoFactorEnabled: user.isTwoFactorEnabled,
            emailVerified: user.emailVerified || new Date(), // Ensure email is considered verified
          } as ExtendedUser;

        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if ((user as ExtendedUser)?.role) {
        token.role = (user as ExtendedUser).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.role) {
        session.user.role = token.role as UserRole;
      }
      return session;
    }
  }
} satisfies NextAuthConfig;
