"use client";

import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/datatable/data-table";
import { columns } from "./table/columns";
import { data as initialData } from "./data";

export default function ActiveLoads() {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Active Loads</h1>
        <p className="text-muted-foreground">
          Manage and monitor all currently active loads in the system
        </p>
      </div>
      <DataTable
        columns={columns}
        data={data}
        meta={{
          name: "Load",
          plural: "Loads",
        }}
      />
    </div>
  );
}
