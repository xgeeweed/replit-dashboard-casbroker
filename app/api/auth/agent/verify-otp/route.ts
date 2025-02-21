import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { otp, mobile_number } = body;

    // Find OTP in database
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        identifier: mobile_number,
        token: otp,
        expires: {
          gt: new Date(),
        },
      },
    });

    if (!verificationToken) {
      return NextResponse.json({
        success: false,
        error: "Invalid or expired OTP"
      }, { status: 400 });
    }

    // Get registration data
    const tempRegistration = await db.tempAgentRegistration.findFirst({
      where: {
        phone_number: mobile_number,
        expires: {
          gt: new Date(),
        },
      },
    });

    if (!tempRegistration) {
      return NextResponse.json({
        success: false,
        error: "Registration data not found or expired"
      }, { status: 400 });
    }

    // Delete used OTP
    await db.verificationToken.delete({
      where: {
        id: verificationToken.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[AGENT_OTP_VERIFY]", error);
    return NextResponse.json({ 
      success: false, 
      error: "Something went wrong" 
    }, { status: 500 });
  }
} 