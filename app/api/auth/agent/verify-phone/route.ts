import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendSMS } from "@/lib/sms";
import { generateOTP } from "@/lib/utils";
import { UserRole } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { mobile_number, email, first_name, last_name } = body;

    // Check if agent already exists
    const existingAgent = await db.user.findFirst({
      where: {
        OR: [
          { phone_number: mobile_number },
          { email: email }
        ],
        role: UserRole.AGENT
      }
    });

    if (existingAgent) {
      return NextResponse.json({
        success: false,
        error: "An agent with this phone number or email already exists"
      }, { status: 400 });
    }

    // Generate OTP
    const otp = generateOTP();

    // Store OTP in database with expiry
    await db.OTP.create({
      data: {
        phone_number: mobile_number,
        otp: otp,
        expires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      }
    });

    // Send OTP via SMS
    await sendSMS(
      mobile_number,
      `Your verification code is: ${otp}. Valid for 10 minutes.`
    );

    // Store registration data in temporary table
    await db.tempAgentRegistration.create({
      data: {
        phone_number: mobile_number,
        email,
        first_name,
        last_name,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[AGENT_PHONE_VERIFY]", error);
    return NextResponse.json({ 
      success: false, 
      error: "Something went wrong" 
    }, { status: 500 });
  }
} 