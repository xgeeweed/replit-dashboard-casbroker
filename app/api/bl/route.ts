import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { blNumber, bulkCargoWeight } = body;

    const bl = await prisma.billOfLading.create({
      data: {
        blNumber,
        bulkCargoWeight,
      },
    });

    return NextResponse.json(bl);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create BL" }, { status: 500 });
  }
}
