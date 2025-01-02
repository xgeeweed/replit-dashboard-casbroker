"use client";
import { Spinner } from "@/components/ui/spinner";
import { basicErrorToast } from "@/components/toast";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/datatable/data-table";
import { columns } from "../pending-agents/table/columns";
import pendingAgentsData from "../pending-agents/data";

export default function ApprovedAgents() {
  const [approvedData, setApprovedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter data to include only agents with status "Approved"
  useEffect(() => {
    const timer = setTimeout(() => {
      const filteredData = pendingAgentsData.filter(
        (agent) => agent.status.toLowerCase() === "approved"
      );
      setApprovedData(filteredData);
      setIsLoading(false);
    }, 700);

    // Cleanup timer when component is unmounted
    return () => clearTimeout(timer);
  }, []);

  const meta = {
    name: "agent",
    plural: "agents",
  };

  if (isLoading) return <Spinner />;
  if (approvedData.length === 0) return basicErrorToast();

  return (
    <div className="font-light h-full w-full flex justify-center items-center">
      <DataTable columns={columns} data={approvedData} meta={meta} />
    </div>
  );
}
