
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { DataTable } from "@/components/datatable/data-table";
import { columns } from "./table/columns";
import { Spinner } from "@/components/ui/spinner";

interface Payment {
  id: string;
  loadId: string;
  amount: number;
  status: string;
  completedDate: string;
  route: string;
}

const mockPayments: Payment[] = [
  {
    id: "1",
    loadId: "ML001",
    amount: 2800,
    status: "Paid",
    completedDate: "2024-02-01",
    route: "Tema Port → Kumasi Central"
  },
  {
    id: "2", 
    loadId: "ML003",
    amount: 2200,
    status: "Pending",
    completedDate: "2024-02-05",
    route: "Spintex Road → Cape Coast"
  }
];

export default function DriverPayments() {
  const [payments] = useState<Payment[]>(mockPayments);
  const [isLoading, setIsLoading] = useState(true);

  useState(() => {
    setTimeout(() => setIsLoading(false), 700);
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary mr-4">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Payment History</h1>
        <p className="text-gray-600">View all your completed delivery payments</p>
      </div>
      
      <DataTable 
        columns={columns} 
        data={payments}
        meta={{
          name: "Payment",
          plural: "Payments"
        }}
      />
    </div>
  );
}
