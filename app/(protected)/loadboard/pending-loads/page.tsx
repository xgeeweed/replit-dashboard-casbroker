
"use client";

import { useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { DataTable } from "@/components/datatable/data-table";
import { columns } from "./table/columns";
import { toast } from "sonner";

export default function PendingLoads() {
  const [pendingLoads, setPendingLoads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchPendingLoads = () => {
      const mockPendingLoads = [
        {
          id: "1",
          blNumber: "BL1234",
          submittedBy: "John Doe",
          submittedDate: "2024-01-20",
          type: "Bulk Cargo",
          status: "Pending",
          pickupLocation: "Tema Port",
          deliveryLocation: "Kumasi",
          weight: "5000 kg"
        },
        {
          id: "2",
          blNumber: "BL5678",
          submittedBy: "Jane Smith",
          submittedDate: "2024-01-21",
          type: "Container",
          status: "Pending",
          pickupLocation: "Accra",
          deliveryLocation: "Takoradi",
          weight: "2000 kg"
        }
      ];
      setPendingLoads(mockPendingLoads);
      setIsLoading(false);
    };

    setTimeout(fetchPendingLoads, 700);
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div className="font-light h-full w-full p-4">
      <h1 className="text-2xl font-bold mb-6">Pending Load Requests</h1>
      <DataTable 
        columns={columns} 
        data={pendingLoads} 
        meta={{ name: "Load Request", plural: "Load Requests" }} 
      />
    </div>
  );
}
