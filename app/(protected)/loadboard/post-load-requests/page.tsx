
"use client";

import { useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { DataTable } from "@/components/datatable/data-table";
import { columns } from "./table/columns";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function PostLoadRequests() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchRequests = () => {
      const mockRequests = [
        {
          id: "1",
          blNumber: "BL1234",
          submittedBy: "John Doe",
          submittedDate: "2024-01-20",
          type: "Bulk Cargo",
          status: "Pending Approval",
          pickupLocation: "Tema Port",
          deliveryLocation: "Kumasi",
          weight: "5000 kg",
          equipmentDetails: "Flatbed x2"
        },
        {
          id: "2",
          blNumber: "BL5678",
          submittedBy: "Jane Smith",
          submittedDate: "2024-01-21",
          type: "Container",
          status: "Pending Approval",
          pickupLocation: "Accra",
          deliveryLocation: "Takoradi",
          containerNumbers: "CONT123, CONT456"
        }
      ];
      setRequests(mockRequests);
      setIsLoading(false);
    };

    setTimeout(fetchRequests, 700);
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div className="font-light h-full w-full p-4">
      <h1 className="text-2xl font-bold mb-6">Post Load Requests</h1>
      <DataTable 
        columns={columns} 
        data={requests} 
        meta={{ name: "Load Request", plural: "Load Requests" }} 
      />
    </div>
  );
}
