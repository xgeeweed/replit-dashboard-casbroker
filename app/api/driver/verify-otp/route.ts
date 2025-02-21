import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const requestSchema = z.object({
  phone_number: z.string(),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

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

    const { phone_number, otp } = result.data;
    const normalizedPhone = normalizePhoneNumber(phone_number);
    console.log('Verifying OTP for phone:', normalizedPhone);

    // Find the latest non-expired OTP for this phone number
    const validOTP = await prisma.oTP.findFirst({
      where: {
        phone_number: normalizedPhone,
        otp: otp,
        expires: {
          gt: new Date() // OTP hasn't expired
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (!validOTP) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired OTP' },
        { status: 400 }
      );
    }

    // Delete the used OTP
    await prisma.oTP.delete({
      where: {
        id: validOTP.id
      }
    });

    // Find the driver
    const driver = await prisma.driver.findFirst({
      where: {
        OR: [
          { phone_number: normalizedPhone },
          { phone_number: normalizedPhone.replace('+', '') },
          { phone_number: normalizedPhone.replace('+233', '0') }
        ]
      }
    });

    if (!driver) {
      return NextResponse.json(
        { success: false, message: 'Driver not found' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'OTP verified successfully'
    });

  } catch (error) {
    console.error('Error in verify-otp:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 