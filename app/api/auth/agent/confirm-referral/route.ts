import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendSMS } from "@/lib/sms";
import { sendEmail } from "@/lib/email";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, action } = body;

    // Find referral request
    const referralRequest = await db.agentReferralRequest.findUnique({
      where: {
        token,
        status: "PENDING",
        expires: {
          gt: new Date(),
        },
      },
      include: {
        referral_contact: true,
      },
    });

    if (!referralRequest) {
      return NextResponse.json({
        success: false,
        error: "Invalid or expired referral request"
      }, { status: 400 });
    }

    if (action === "APPROVE") {
      // Generate temporary password
      const tempPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await hash(tempPassword, 12);

      // Create user account
      const user = await db.user.create({
        data: {
          email: referralRequest.agent_data.email,
          phone_number: referralRequest.agent_data.mobile_number,
          first_name: referralRequest.agent_data.first_name,
          last_name: referralRequest.agent_data.last_name,
          password: hashedPassword,
          role: "AGENT",
          status: "ACTIVE",
          company_id: referralRequest.referral_contact.company_id,
        },
      });

      // Send credentials to agent
      await sendEmail({
        to: user.email,
        subject: "Agent Registration Approved",
        html: `
          <h2>Your Agent Registration is Approved!</h2>
          <p>Hello ${user.first_name},</p>
          <p>Your registration as an agent has been approved.</p>
          <p>You can now log in using your mobile number: ${user.phone_number}</p>
          <p>A one-time password will be sent to your mobile number when you attempt to log in.</p>
          <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/auth/login">Click here to login</a></p>
        `,
      });

      await sendSMS(
        user.phone_number,
        `Your agent registration has been approved! You can now log in using your mobile number. Visit ${process.env.NEXT_PUBLIC_APP_URL}/auth/login`
      );

      // Update referral request status
      await db.agentReferralRequest.update({
        where: { id: referralRequest.id },
        data: { status: "APPROVED" },
      });
    } else {
      // Update referral request status
      await db.agentReferralRequest.update({
        where: { id: referralRequest.id },
        data: { status: "DECLINED" },
      });

      // Notify agent of rejection
      await sendEmail({
        to: referralRequest.agent_data.email,
        subject: "Agent Registration Declined",
        html: `
          <h2>Agent Registration Status</h2>
          <p>Hello ${referralRequest.agent_data.first_name},</p>
          <p>Unfortunately, your registration as an agent has been declined.</p>
          <p>Please contact support or your company representative for more information.</p>
        `,
      });

      await sendSMS(
        referralRequest.agent_data.mobile_number,
        "Your agent registration request has been declined. Please contact support or your company representative for more information."
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[CONFIRM_REFERRAL]", error);
    return NextResponse.json({ 
      success: false, 
      error: "Something went wrong" 
    }, { status: 500 });
  }
} 