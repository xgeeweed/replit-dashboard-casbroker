import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendSMS } from "@/lib/sms";
import { sendEmail } from "@/lib/email";
import { generateToken } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { referral_id, registration_data } = body;

    // Get referral contact details
    const referralContact = await db.companyContact.findUnique({
      where: {
        id: referral_id,
        is_referral_contact: true,
      },
      include: {
        company: true,
      },
    });

    if (!referralContact) {
      return NextResponse.json({
        success: false,
        error: "Referral contact not found"
      }, { status: 404 });
    }

    // Generate confirmation token
    const token = generateToken();

    // Store referral request
    await db.agentReferralRequest.create({
      data: {
        token,
        status: "PENDING",
        referral_contact_id: referral_id,
        agent_data: registration_data,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    const confirmationLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/confirm-referral/${token}`;

    // Send email to referral contact
    await sendEmail({
      to: referralContact.email,
      subject: "Agent Registration Referral Request",
      html: `
        <h2>Agent Registration Referral Request</h2>
        <p>Hello ${referralContact.full_name},</p>
        <p>An agent has requested your approval for registration with ${referralContact.company.name}.</p>
        <p><strong>Agent Details:</strong></p>
        <ul>
          <li>Name: ${registration_data.first_name} ${registration_data.last_name}</li>
          <li>Email: ${registration_data.email}</li>
          <li>Phone: ${registration_data.mobile_number}</li>
        </ul>
        <p>Please click the link below to approve or decline this request:</p>
        <p><a href="${confirmationLink}">Review Registration Request</a></p>
        <p>This link will expire in 7 days.</p>
      `,
    });

    // Send SMS notification
    await sendSMS(
      referralContact.phone_number,
      `You have a new agent registration referral request from ${registration_data.first_name} ${registration_data.last_name}. Please check your email to approve or decline.`
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[SEND_REFERRAL]", error);
    return NextResponse.json({ 
      success: false, 
      error: "Something went wrong" 
    }, { status: 500 });
  }
} 