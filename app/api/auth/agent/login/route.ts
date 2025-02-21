import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendSMS } from "@/lib/sms";
import { generateOTP } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { mobile_number } = body;

    // Find agent
    const agent = await db.user.findFirst({
      where: {
        phone_number: mobile_number,
        role: "AGENT",
        status: "ACTIVE",
      },
    });

    if (!agent) {
      return NextResponse.json({
        success: false,
        error: "No active agent account found with this mobile number"
      }, { status: 404 });
    }

    // Generate OTP
    const otp = generateOTP();

    // Store OTP
    await db.verificationToken.create({
      data: {
        identifier: mobile_number,
        token: otp,
        expires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      },
    });

    // Send OTP via SMS
    await sendSMS(
      mobile_number,
      `Your login verification code is: ${otp}. Valid for 10 minutes.`
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[AGENT_LOGIN]", error);
    return NextResponse.json({ 
      success: false, 
      error: "Something went wrong" 
    }, { status: 500 });
  }
} 