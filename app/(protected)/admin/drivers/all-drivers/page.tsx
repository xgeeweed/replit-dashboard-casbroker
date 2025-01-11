"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/datatable/data-table";
import { columns } from "./table/columns";
import allDriversData from "./data";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export default function AllDrivers() {
  const [data, setData] = useState(allDriversData || []);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(driversData);
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  const updateStatus = (newStatus: string) => {
    setData((prev: any) =>
      prev.map((driver: any) =>
        driver.rowId === selectedDriverId
          ? { ...driver, status: newStatus }
          : driver
      )
    );
    setIsModalOpen(false);
  };

  const handleOpenModal = (driverId: string, currentStatus: string) => {
    setSelectedDriverId(driverId);
    setSelectedStatus(currentStatus);
    setIsModalOpen(true);
  };


  const meta = {
    name: "driver",
    plural: "drivers",
    actions: (driver: any) => (
      <Button onClick={() => handleOpenModal(driver.rowId, driver.status)}>
        Modify Status
      </Button>
    ),
  };

  if (isLoading) return <Spinner />;
  if (data.length === 0) return <p>No drivers found.</p>; // Replaced basicErrorToast for better UX

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Transport Owners/Drivers</h1>
      <DataTable columns={columns} data={data} meta={meta} />
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogHeader>
          <DialogTitle>Update Driver Status</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              {/* Add your status options here */}
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </DialogContent>
        <DialogFooter>
          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button onClick={() => updateStatus(selectedStatus)}>
            Update
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}