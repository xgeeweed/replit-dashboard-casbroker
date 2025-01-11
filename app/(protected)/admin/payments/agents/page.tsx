
"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/datatable/data-table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { agentPayments } from "./data";
import { columns } from "./table/columns";
import { Spinner } from "@/components/ui/spinner";

export default function AgentPayments() {
  const [data, setData] = useState(agentPayments);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = agentPayments;

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
          <h1 className="text-2xl font-bold">Agent Payments</h1>
          <p className="text-muted-foreground">
            Total Completed Payments: GH₵ {totalAmount.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search payments..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Commission">Commission</SelectItem>
            <SelectItem value="Delivery">Delivery</SelectItem>
            <SelectItem value="Advance">Advance</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
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
