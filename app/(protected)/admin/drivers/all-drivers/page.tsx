
"use client";
import { Spinner } from "@/components/ui/spinner";
import { basicErrorToast } from "@/components/toast";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/datatable/data-table";
import { columns } from "./table/columns";
import allDriversData from "./data";

export default function AllDrivers() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(allDriversData);
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  const meta = {
    name: "driver",
    plural: "drivers",
  };

  if (isLoading) return <Spinner />;
  if (data.length === 0) return basicErrorToast();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Transport Owners/Drivers</h1>
      <DataTable columns={columns} data={data} meta={meta} />
    </div>
  );
}
