import { NextResponse } from 'next/server';
import { UserRole } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const requestSchema = z.object({
  japtu_id: z.string(),
  phone_number: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters"),
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

    const { japtu_id, phone_number, password } = result.data;
    const normalizedPhone = normalizePhoneNumber(phone_number);
    console.log('Looking for driver with phone:', normalizedPhone);

    // Find the driver
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
        { success: false, message: 'Driver not found' },
        { status: 400 }
      );
    }

    console.log('Found driver:', {
      japtu_id: driver.japtu_id,
      email: driver.email,
      name: driver.full_name
    });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a default email if none exists
    const driverEmail = driver.email || `${driver.japtu_id.toLowerCase()}@driver.casbroker.com`;

    try {
      // Create or update the user account using Prisma's create/update
      const existingUser = await prisma.user.findUnique({
        where: {
          email: driverEmail
        }
      });

      let user;
      if (existingUser) {
        user = await prisma.user.update({
          where: {
            email: driverEmail
          },
          data: {
            name: driver.full_name || undefined,
            password: hashedPassword,
            role: UserRole.DRIVER
          }
        });
      } else {
        user = await prisma.user.create({
          data: {
            name: driver.full_name || undefined,
            email: driverEmail,
            password: hashedPassword,
            role: UserRole.DRIVER
          }
        });
      }

      console.log('Created/Updated user:', {
        id: user.id,
        email: user.email,
        role: user.role
      });

      // Update driver status
      await prisma.driver.update({
        where: {
          japtu_id: japtu_id
        },
        data: {
          status: "ACTIVE"
        }
      });

      return NextResponse.json({
        success: true,
        message: 'Signup completed successfully',
        redirectTo: '/dashboard/driver-dashboard'
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { success: false, message: 'Failed to create user account', details: dbError instanceof Error ? dbError.message : 'Unknown database error' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error in complete-signup:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 