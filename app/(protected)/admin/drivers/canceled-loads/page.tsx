
"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/datatable/data-table";
import { columns } from "./table/columns";
import { driverCanceledLoads } from "./data";
import { Spinner } from "@/components/ui/spinner";

export default function DriverCanceledLoads() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(driverCanceledLoads);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Canceled Loads</h1>
      <DataTable 
        columns={columns} 
        data={data}
        meta={{
          name: "Canceled Load",
          plural: "Canceled Loads"
        }}
      />
    </div>
  );
}
