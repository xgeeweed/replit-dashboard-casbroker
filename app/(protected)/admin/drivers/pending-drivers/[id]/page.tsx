
"use client";

import { useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { basicErrorToast } from "@/components/toast";
import { useParams } from "next/navigation";
import {
  ChevronLeft,
  MapPin,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import pendingDriversData from "../data";

interface DetailRowProps {
  icon?: LucideIcon;
  label: string;
  value: string | number;
  multiLine?: boolean;
}

const DetailRow = ({ icon: Icon, label, value, multiLine }: DetailRowProps) => (
  <div
    className={`py-2 ${
      multiLine
        ? "flex flex-col gap-2"
        : "flex justify-between items-center border-b border-gray-200"
    }`}
  >
    <div className="flex items-center gap-2">
      {Icon && <Icon size={16} className="text-blue-500" />}
      <span className={`text-gray-600 ${multiLine ? "underline" : ""}`}>
        {label}
      </span>
    </div>
    <span className={multiLine ? "text-gray-600 -mt-2" : "font-medium"}>
      {value}
    </span>
  </div>
);

export default function DriverDetails() {
  const { id } = useParams();
  const [driver, setDriver] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const driverData = pendingDriversData.find((driver) => driver.rowId === id);
      setDriver(driverData);
      setSelectedStatus(driverData?.status || "");
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [id]);

  const updateStatus = (newStatus: string) => {
    setDriver((prev: any) => ({ ...prev, status: newStatus }));
    setIsModalOpen(false);
  };

  if (isLoading) return <Spinner />;
  if (!driver) return basicErrorToast();

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 bg-white">
        <Link href="/admin/drivers/pending-drivers">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-medium">{driver.fullName}</h1>
      </div>

      {/* Driver Picture */}
      <div className="p-4 bg-white mt-2 flex justify-center">
        <img
          src="https://www.seekpng.com/png/detail/110-1100707_silhouette-person-png.png"
          alt={`${driver.fullName}'s picture`}
          className="w-32 h-32 rounded-full border border-gray-300"
        />
      </div>

      {/* Basic Info */}
      <div className="p-4 bg-white mt-2">
        <h2 className="text-2xl font-bold">Driver #{driver.rowId}</h2>
        <p className="text-gray-500 text-sm mt-1">Status: {driver.status}</p>
      </div>

      {/* Contact Details */}
      <div className="p-4 bg-white mt-2">
        <DetailRow label="Email" value={driver.email} />
        <DetailRow label="Contact" value={driver.contact} />
        <DetailRow label="GPS Address" value={driver.gpsAddress} multiLine />
      </div>

      {/* License Details */}
      <div className="p-4 bg-white mt-2">
        <h3 className="text-xl font-bold mb-4">License Information</h3>
        <DetailRow label="License Number" value={driver.licenseNumber} />
        <DetailRow label="Experience" value={driver.experience} />
      </div>

      {/* Vehicle Details */}
      <div className="p-4 bg-white mt-2">
        <h3 className="text-xl font-bold mb-4">Vehicle Information</h3>
        <DetailRow label="Vehicle Type" value={driver.vehicleType} />
        <DetailRow label="Vehicle Plate" value={driver.vehiclePlate} />
      </div>

      {/* Guarantor */}
      <div className="p-4 bg-white mt-2">
        <h3 className="text-xl font-bold mb-4">Guarantor</h3>
        <DetailRow label="Full Name" value={driver.guarantor1FullName} />
        <DetailRow label="Contact" value={driver.guarantor1Contact} />
        <DetailRow label="Ghana Card" value={driver.guarantor1GhanaCard} />
      </div>

      {/* Personal Info */}
      <div className="p-4 bg-white mt-2">
        <h3 className="text-xl font-bold mb-4">Personal Information</h3>
        <DetailRow label="Date of Birth" value={driver.dateOfBirth} />
        <DetailRow label="Nationality" value={driver.nationality} />
      </div>

      {/* Action Buttons */}
      <div className="mt-auto p-4 bg-white flex flex-col gap-2">
        <Button className="w-full bg-black text-white py-3 rounded-md">
          Contact Driver
        </Button>
        <Button
          variant="outline"
          className="w-full py-3 rounded-md border-gray-200"
          onClick={() => setIsModalOpen(true)}
        >
          Modify Status
        </Button>
      </div>

      {/* Modal for Status Update */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-xl font-bold mb-4">Update Status</h3>
            <div className="space-y-2">
              {["In Progress", "Denied", "Suspended", "Approved", "Rejected"].map(
                (status) => (
                  <div
                    key={status}
                    className={`p-2 cursor-pointer rounded-md border ${
                      selectedStatus === status
                        ? "bg-blue-100 border-blue-500"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelectedStatus(status)}
                  >
                    {status}
                  </div>
                )
              )}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="py-2 px-4 rounded-md"
              >
                Cancel
              </Button>
              <Button
                onClick={() => updateStatus(selectedStatus)}
                className="py-2 px-4 bg-blue-500 text-white rounded-md"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
