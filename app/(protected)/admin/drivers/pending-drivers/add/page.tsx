
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { DetailRow } from "@/components/ui/detail-row";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function AddNewDriver() {
  const [searchType, setSearchType] = useState<"phone" | "license">("phone");
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [driverData, setDriverData] = useState<any>(null);

  const handleSearch = async () => {
    if (!searchValue) {
      toast.error("Please enter a search value");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/driver-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchType, searchValue }),
      });

      if (!response.ok) {
        throw new Error("Driver not found");
      }

      const data = await response.json();
      setDriverData(data);
      toast.success("Driver found!");
    } catch (error) {
      toast.error("No driver found with provided details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    toast.success("Driver application submitted successfully!");
    setDriverData(null);
    setSearchValue("");
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/drivers/pending-drivers">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold">Add New Transport Owner</h1>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="flex gap-4">
          <Select
            value={searchType}
            onValueChange={(value: "phone" | "license") => setSearchType(value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Search by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="phone">Phone Number</SelectItem>
              <SelectItem value="license">License ID</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex-1 flex gap-2">
            <Input
              placeholder={searchType === "phone" ? "Enter phone number" : "Enter license ID"}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? <Spinner className="mr-2" /> : "Search"}
            </Button>
          </div>
        </div>

        {driverData && (
          <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
            <div className="grid gap-4">
              <DetailRow label="Full Name" value={driverData.fullName} />
              <DetailRow label="Date of Birth" value={driverData.dateOfBirth} />
              <DetailRow label="Nationality" value={driverData.nationality} />
              <DetailRow label="GPS Address" value={driverData.gpsAddress} />
              <DetailRow label="Vehicle Type" value={driverData.vehicleType} />
              <DetailRow label="Vehicle Plate" value={driverData.vehiclePlate} />
              <DetailRow label="Experience" value={driverData.experience} />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setDriverData(null)}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                Submit Application
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
