
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { basicErrorToast } from "@/components/toast";
import { DataTable } from "@/components/datatable/data-table";
import { columns } from "./table/columns";
import pendingDriversData from "./data";

export default function PendingDrivers() {
  const [nonApprovedData, setNonApprovedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const filteredData = pendingDriversData.filter(
        (driver) => driver.status.toLowerCase() !== "approved"
      );
      setNonApprovedData(filteredData);
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  const meta = {
    name: "driver",
    plural: "drivers",
  };

  if (isLoading) return <Spinner />;
  if (nonApprovedData.length === 0) return basicErrorToast();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Pending Transport Owners</h1>
        <Link href="/admin/drivers/pending-drivers/add">
          <Button>Add New Transport Owner</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={nonApprovedData} meta={meta} />
    </div>
  );
}
