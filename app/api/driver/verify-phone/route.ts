import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const requestSchema = z.object({
  phone_number: z.string(),
});

// Function to normalize phone number for Twilio
function normalizePhoneNumber(phone: string): string {
  try {
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
  } catch (error) {
    console.error('Error normalizing phone number:', error);
    throw new Error('Invalid phone number format');
  }
}

export async function POST(request: Request) {
  try {
    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      console.error('Error parsing request body:', error);
      return NextResponse.json(
        { success: false, message: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Validate request schema
    const result = requestSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid request body',
          errors: result.error.errors 
        },
        { status: 400 }
      );
    }

    const { phone_number } = result.data;
    
    // Normalize phone number
    let normalizedPhone;
    try {
      normalizedPhone = normalizePhoneNumber(phone_number);
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Invalid phone number format' },
        { status: 400 }
      );
    }
    
    console.log('Searching for phone:', normalizedPhone);

    try {
      // Get total count of drivers
      const totalDrivers = await prisma.driver.count();
      console.log('Total drivers in database:', totalDrivers);

      // Get all drivers to debug phone number matching
      const allDrivers = await prisma.driver.findMany({
        select: {
          japtu_id: true,
          full_name: true,
          phone_number: true,
        },
        where: {
          phone_number: {
            not: null
          }
        }
      });
      console.log('All drivers with phone numbers:', allDrivers);

      const driver = await prisma.driver.findFirst({
        where: {
          OR: [
            { phone_number: normalizedPhone },
            { phone_number: normalizedPhone.replace('+', '') },
            { phone_number: normalizedPhone.replace('+233', '0') }
          ]
        },
        select: {
          japtu_id: true,
          full_name: true,
          dob: true,
          status: true,
          drivers_license_number: true,
          national_id: true,
        }
      });

      console.log('Found driver:', driver);

      return NextResponse.json({
        success: true,
        exists: !!driver,
        driver: driver ? {
          japtu_id: driver.japtu_id,
          full_name: driver.full_name || '',
          dob: driver.dob?.toISOString() || null,
          status: driver.status || null,
          drivers_license_last4: driver.drivers_license_number?.slice(-4) || null,
          national_id_last6: driver.national_id?.slice(-6) || null,
        } : undefined
      });

    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { success: false, message: 'Database error occurred' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Phone verification error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    try {
      await prisma.$disconnect();
    } catch (error) {
      console.error('Error disconnecting from database:', error);
    }
  }
} 