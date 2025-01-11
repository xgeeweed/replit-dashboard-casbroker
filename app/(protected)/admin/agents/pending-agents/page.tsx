
"use client";
import { useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { basicErrorToast } from "@/components/toast";
import { DataTable } from "@/components/datatable/data-table";
import { columns } from "./table/columns";
import pendingAgentsData from "./data";

export default function PendingAgents() {
  const [nonApprovedData, setNonApprovedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const filteredData = pendingAgentsData.filter(
        (agent) => agent.status.toLowerCase() !== "approved"
      );
      setNonApprovedData(filteredData);
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  const meta = {
    name: "agent",
    plural: "agents",
  };

  if (isLoading) return <Spinner />;
  if (nonApprovedData.length === 0) return basicErrorToast();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Pending Agents</h1>
      <DataTable columns={columns} data={nonApprovedData} meta={meta} />
    </div>
  );
}
