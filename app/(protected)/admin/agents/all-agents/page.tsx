"use client";
import { Spinner } from "@/components/ui/spinner";
import { basicErrorToast } from "@/components/toast";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/datatable/data-table";
import { columns } from "./table/columns";
import allAgentsData from "./data";

export default function AllAgents() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(allAgentsData);
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  const meta = {
    name: "agent",
    plural: "agents",
  };

  if (isLoading) return <Spinner />;
  if (data.length === 0) return basicErrorToast();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Agents</h1>
      <DataTable columns={columns} data={data} meta={meta} />
    </div>
  );
}