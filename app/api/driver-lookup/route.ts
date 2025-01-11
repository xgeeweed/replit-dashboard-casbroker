
import { NextResponse } from "next/server";

const mockDriverData = [
  {
    licenseId: "GHA-DL-123456",
    phone: "+233 24 555 1234",
    fullName: "James Anderson",
    dateOfBirth: "1990-08-15",
    nationality: "Ghanaian",
    gpsAddress: "123 Ring Road, Accra",
    vehicleType: "Box Truck",
    vehiclePlate: "GT 1234-22",
    experience: "5 years",
  },
  {
    licenseId: "GHA-DL-789012",
    phone: "+233 20 123 4567",
    fullName: "Kwame Mensah",
    dateOfBirth: "1985-05-22",
    nationality: "Ghanaian",
    gpsAddress: "456 Tema Port Area",
    vehicleType: "Container Truck",
    vehiclePlate: "GT 5678-23",
    experience: "8 years",
  }
];

export async function POST(req: Request) {
  const { searchType, searchValue } = await req.json();
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const driver = mockDriverData.find(driver => 
    searchType === 'phone' ? driver.phone === searchValue : driver.licenseId === searchValue
  );

  if (!driver) {
    return NextResponse.json(
      { error: "Driver not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(driver);
}
import { NextResponse } from "next/server";
import { mockDriverData } from "./data";

export async function POST(req: Request) {
  try {
    const { searchType, searchValue } = await req.json();
    
    const driver = mockDriverData.find(driver => {
      if (searchType === "phone") {
        return driver.contact.replace(/\s/g, "") === searchValue.replace(/\s/g, "");
      } else {
        return driver.licenseNumber === searchValue;
      }
    });

    if (!driver) {
      return new NextResponse("Driver not found", { status: 404 });
    }

    return NextResponse.json(driver);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
