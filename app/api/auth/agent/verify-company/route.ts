import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tax_id } = body;

    // Find company by tax ID
    const company = await db.company.findUnique({
      where: {
        tax_id: tax_id,
      },
      select: {
        id: true,
        name: true,
        contacts: {
          select: {
            id: true,
            full_name: true,
            email: true,
            phone_number: true,
          },
          where: {
            is_referral_contact: true,
          },
        },
      },
    });

    if (!company) {
      return NextResponse.json({
        success: false,
        error: "Company not found"
      }, { status: 404 });
    }

    if (company.contacts.length === 0) {
      return NextResponse.json({
        success: false,
        error: "No referral contacts found for this company"
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      company: {
        name: company.name,
        contacts: company.contacts,
      },
    });
  } catch (error) {
    console.error("[COMPANY_VERIFY]", error);
    return NextResponse.json({ 
      success: false, 
      error: "Something went wrong" 
    }, { status: 500 });
  }
} 