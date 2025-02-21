import { UserRole } from "@prisma/client";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const LoginOTPSchema = z.object({
  phoneNumber: z.string().min(1, {
    message: "Mobile number is required",
  }),
  code: z.string().min(1, {
    message: "Code is required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  userType: z.enum(["user", "driver", "agent"], {
    required_error: "Account type is required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum(["ADMIN", "USER"]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );

export const PhoneLoginSchema = z.object({
  phone_number: z.string().min(1, {
    message: "Phone number is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  otp: z.optional(z.string()),
});

// Agent Signup Schemas
export const AgentRegistrationSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  mobile_number: z.string().min(1, "Mobile number is required"),
  email: z.string().email("Invalid email address"),
});

export const AgentCompanyVerificationSchema = z.object({
  tax_id: z.string().min(1, "Tax ID is required"),
});

export const AgentReferralSchema = z.object({
  referral_id: z.string().min(1, "Please select a referral contact"),
});

export const AgentOTPSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});
