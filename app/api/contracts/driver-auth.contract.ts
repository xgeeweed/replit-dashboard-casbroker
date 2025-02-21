import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

// Response types
const DriverVerificationResponse = z.object({
  exists: z.boolean(),
  driver: z.object({
    japtu_id: z.string(),
    full_name: z.string(),
    dob: z.string().nullable(),
    status: z.string().nullable(),
    drivers_license_last4: z.string().nullable(),
    national_id_last6: z.string().nullable(),
  }).optional(),
});

const OTPResponse = z.object({
  success: z.boolean(),
  message: z.string(),
});

const SignupResponse = z.object({
  success: z.boolean(),
  message: z.string(),
  token: z.string().optional(),
});

// Contract definition
export const driverAuthContract = c.router({
  verifyPhone: {
    method: 'POST',
    path: '/verify-phone',
    responses: {
      200: DriverVerificationResponse,
      400: z.object({ message: z.string() }),
    },
    body: z.object({
      phone_number: z.string(),
    }),
    summary: 'Verify if a driver exists by phone number',
  },

  confirmIdentity: {
    method: 'POST',
    path: '/confirm-identity',
    responses: {
      200: OTPResponse,
      400: z.object({ message: z.string() }),
    },
    body: z.object({
      japtu_id: z.string(),
      phone_number: z.string(),
    }),
    summary: 'Confirm driver identity and send OTP',
  },

  verifyOTP: {
    method: 'POST',
    path: '/verify-otp',
    responses: {
      200: SignupResponse,
      400: z.object({ message: z.string() }),
    },
    body: z.object({
      phone_number: z.string(),
      otp: z.string(),
    }),
    summary: 'Verify OTP and complete signup',
  },
}); 