
"use client";

import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { agentTransactions } from "./data";
import allAgentsData from "../data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DetailRow } from "@/components/ui/detail-row";
import { Spinner } from "@/components/ui/spinner";
import { basicErrorToast } from "@/components/toast";
import { useState, useEffect } from "react";

export default function AgentView() {
  const { id } = useParams();
  const [agent, setAgent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredTransactions, setFilteredTransactions] = useState(agentTransactions);

  useEffect(() => {
    const timer = setTimeout(() => {
      const agentData = allAgentsData.find((agent) => agent.rowId === id);
      setAgent(agentData);
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [id]);

  const filterTransactions = (status: string) => {
    return agentTransactions.filter(transaction => transaction.status === status);
  };

  if (isLoading) return <Spinner />;
  if (!agent) return basicErrorToast();

  return (
    <div className="p-6">
      <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details">Agent Details</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex justify-center mb-6">
              <img
                src={agent.agentPicture}
                alt={`${agent.fullName}'s picture`}
                className="w-32 h-32 rounded-full border border-gray-300"
              />
            </div>

            <div className="grid gap-6">
              <div>
                <h3 className="text-xl font-bold mb-4">Basic Information</h3>
                <DetailRow label="Full Name" value={agent.fullName} />
                <DetailRow label="Email" value={agent.email} />
                <DetailRow label="Contact" value={agent.contact} />
                <DetailRow label="Status" value={agent.status} />
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Personal Information</h3>
                <DetailRow label="Date of Birth" value={agent.dateOfBirth} />
                <DetailRow label="Town of Birth" value={agent.townOfBirth} />
                <DetailRow label="Hometown" value={agent.hometown} />
                <DetailRow label="Nationality" value={agent.nationality} />
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Guarantor Information</h3>
                <DetailRow label="Guarantor 1" value={agent.guarantor1FullName} />
                <DetailRow label="Contact" value={agent.guarantor1Contact} />
                <DetailRow label="Ghana Card" value={agent.guarantor1GhanaCard} />
                <DetailRow label="Guarantor 2" value={agent.guarantor2FullName} />
                <DetailRow label="Contact" value={agent.guarantor2Contact} />
                <DetailRow label="Ghana Card" value={agent.guarantor2GhanaCard} />
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Additional Information</h3>
                <DetailRow label="GPS Address" value={agent.gpsAddress} />
                <DetailRow label="Affiliate Association" value={agent.affiliateAssoc} />
                <DetailRow label="Japtu ID Card" value={agent.japtuIdCardNumber} />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="transactions">
          <div className="flex items-center py-4 gap-2">
            <Select onValueChange={(value) => {
              const filtered = value === "all" 
                ? agentTransactions 
                : filterTransactions(value);
              setFilteredTransactions(filtered);
            }}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>GH₵ {transaction.amount}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          transaction.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : transaction.status === "failed"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
