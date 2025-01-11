
"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/datatable/data-table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { driverPayments } from "./data";
import { columns } from "./table/columns";
import { Spinner } from "@/components/ui/spinner";

export default function DriverPayments() {
  const [data, setData] = useState(driverPayments);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = driverPayments;

    if (searchTerm) {
      filtered = filtered.filter(payment => 
        Object.values(payment).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(payment => payment.category === categoryFilter);
    }

    setData(filtered);
  }, [searchTerm, categoryFilter]);

  const totalAmount = data
    .filter(payment => payment.status === "Completed")
    .reduce((sum, payment) => sum + payment.amount, 0);

  if (isLoading) return <Spinner />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Driver Payments</h1>
          <p className="text-muted-foreground">
            Total Completed Payments: GH₵ {totalAmount.toLocaleString()}
          </p>
        </div>
      </div>

      

      <DataTable 
        columns={columns} 
        data={data}
        meta={{
          name: "Payment",
          plural: "Payments"
        }}
      />
    </div>
  );
}
