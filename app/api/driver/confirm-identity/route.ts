import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const requestSchema = z.object({
  japtu_id: z.string(),
  phone_number: z.string(),
});

// Function to generate a 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Function to normalize phone number for Twilio
function normalizePhoneNumber(phone: string): string {
  // Remove all non-digit characters
  let cleaned = phone.replace(/\D/g, '');
  
  // If number starts with 0, remove it
  if (cleaned.startsWith('0')) {
    cleaned = cleaned.substring(1);
  }
  
  // If number starts with 233, remove it
  if (cleaned.startsWith('233')) {
    cleaned = cleaned.substring(3);
  }
  
  // Ensure the number has 9 digits (Ghana numbers)
  if (cleaned.length !== 9) {
    console.warn('Invalid phone number length:', cleaned.length);
  }
  
  // Add +233 prefix
  return `+233${cleaned}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = requestSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid request body', errors: result.error.errors },
        { status: 400 }
      );
    }

    const { japtu_id, phone_number } = result.data;
    const normalizedPhone = normalizePhoneNumber(phone_number);

    // Verify driver exists with matching japtu_id and phone_number
    const driver = await prisma.driver.findFirst({
      where: {
        japtu_id: japtu_id,
        OR: [
          { phone_number: normalizedPhone },
          { phone_number: normalizedPhone.replace('+', '') },
          { phone_number: normalizedPhone.replace('+233', '0') }
        ]
      }
    });

    if (!driver) {
      return NextResponse.json(
        { success: false, message: 'Invalid driver information' },
        { status: 400 }
      );
    }

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10); // OTP expires in 10 minutes

    // Store OTP in database
    await prisma.oTP.create({
      data: {
        phone_number: normalizedPhone,
        otp: otp,
        expires: expiresAt,
      }
    });

    // TODO: Send OTP via SMS (implement your SMS service here)
    console.log('Generated OTP:', otp); // For testing purposes

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully'
    });

  } catch (error) {
    console.error('Error in confirm-identity:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 