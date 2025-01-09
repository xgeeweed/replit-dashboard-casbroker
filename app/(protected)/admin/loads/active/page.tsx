
"use client";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/datatable/data-table";
import { columns } from "./table/columns";
import { initialData } from "./data";

export default function ActiveLoads() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Active Loads</h1>
      <DataTable 
        columns={columns} 
        data={data} 
        meta={{
          name: "Active Load",
          plural: "Active Loads"
        }}
      />
    </div>
  );
}
