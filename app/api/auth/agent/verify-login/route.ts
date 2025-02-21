import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { signJWT } from "@/lib/token";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { otp, mobile_number } = body;

    // Find OTP
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

    // Find agent
    const agent = await db.user.findFirst({
      where: {
        phone_number: mobile_number,
        role: "AGENT",
        status: "ACTIVE",
      },
      include: {
        company: true,
      },
    });

    if (!agent) {
      return NextResponse.json({
        success: false,
        error: "Agent not found"
      }, { status: 404 });
    }

    // Delete used OTP
    await db.verificationToken.delete({
      where: {
        id: verificationToken.id,
      },
    });

    // Generate session token
    const token = await signJWT({
      id: agent.id,
      role: agent.role,
      company_id: agent.company_id,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: agent.id,
        email: agent.email,
        phone_number: agent.phone_number,
        first_name: agent.first_name,
        last_name: agent.last_name,
        role: agent.role,
        company: agent.company,
      },
    });

    // Set session cookie
    response.cookies.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("[VERIFY_LOGIN]", error);
    return NextResponse.json({ 
      success: false, 
      error: "Something went wrong" 
    }, { status: 500 });
  }
} 