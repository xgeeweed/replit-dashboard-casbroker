
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  // Simulated delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Dummy data
  const vehicle = {
    type: "Box Truck",
    plateNumber: "GH-2345-22",
    driverContact: "+233 54 123 4567",
    driverName: "Kwame Mensah"
  };

  return NextResponse.json(vehicle);
}
