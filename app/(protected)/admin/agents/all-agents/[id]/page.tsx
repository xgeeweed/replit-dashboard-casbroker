
"use client";

import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { agentTransactions } from "./data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AgentTransactionsView() {
  const { id } = useParams();

  const filterTransactions = (status: string) => {
    return agentTransactions.filter(transaction => transaction.status === status);
  };

  const TransactionTable = ({ transactions }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Load ID</TableHead>
          <TableHead>Pickup</TableHead>
          <TableHead>Delivery</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Driver</TableHead>
          <TableHead>Driver Contact</TableHead>
          <TableHead>Truck Number</TableHead>
          <TableHead>Truck Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.loadId}</TableCell>
            <TableCell>{transaction.pickupLocation}</TableCell>
            <TableCell>{transaction.deliveryLocation}</TableCell>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>GH₵ {transaction.amount}</TableCell>
            <TableCell>{transaction.driver?.name}</TableCell>
            <TableCell>{transaction.driver?.contact}</TableCell>
            <TableCell>{transaction.truck?.number}</TableCell>
            <TableCell>{transaction.truck?.type}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Agent Transactions</h1>
      <Tabs defaultValue="completed" className="w-full">
        <TabsList>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
        <TabsContent value="completed">
          <TransactionTable transactions={filterTransactions("Completed")} />
        </TabsContent>
        <TabsContent value="in-progress">
          <TransactionTable transactions={filterTransactions("In Progress")} />
        </TabsContent>
        <TabsContent value="pending">
          <TransactionTable transactions={filterTransactions("Pending")} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { basicErrorToast } from "@/components/toast";
import { useParams } from "next/navigation";
import { ChevronLeft, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import allAgentsData from "../data";

interface DetailRowProps {
  icon?: LucideIcon;
  label: string;
  value: string | number;
  multiLine?: boolean;
}

const DetailRow = ({ icon: Icon, label, value, multiLine }: DetailRowProps) => (
  <div
    className={`py-2 ${
      multiLine
        ? "flex flex-col gap-2"
        : "flex justify-between items-center border-b border-gray-200"
    }`}
  >
    <div className="flex items-center gap-2">
      {Icon && <Icon size={16} className="text-blue-500" />}
      <span className={`text-gray-600 ${multiLine ? "underline" : ""}`}>
        {label}
      </span>
    </div>
    <span className={multiLine ? "text-gray-600 -mt-2" : "font-medium"}>
      {value}
    </span>
  </div>
);

export default function AgentDetails() {
  const { id } = useParams();
  const [agent, setAgent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const agentData = allAgentsData.find((agent) => agent.rowId === id);
      setAgent(agentData);
      setSelectedStatus(agentData?.status || "");
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [id]);

  const updateStatus = (newStatus: string) => {
    setAgent((prev: any) => ({ ...prev, status: newStatus }));
    setIsModalOpen(false);
  };

  if (isLoading) return <Spinner />;
  if (!agent) return basicErrorToast();

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex items-center gap-4 p-4 bg-white">
        <Link href="/admin/agents/all-agents">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-medium">{agent.fullName}</h1>
      </div>

      <div className="p-4 bg-white mt-2 flex justify-center">
        <img
          src={agent.agentPicture}
          alt={`${agent.fullName}'s picture`}
          className="w-32 h-32 rounded-full border border-gray-300"
        />
      </div>

      <div className="p-4 bg-white mt-2">
        <h2 className="text-2xl font-bold">Agent #{agent.rowId}</h2>
        <p className="text-gray-500 text-sm mt-1">Status: {agent.status}</p>
      </div>

      <div className="p-4 bg-white mt-2">
        <DetailRow label="Email" value={agent.email} />
        <DetailRow label="Contact" value={agent.contact} />
        <DetailRow label="GPS Address" value={agent.gpsAddress} multiLine />
      </div>

      <div className="p-4 bg-white mt-2">
        <h3 className="text-xl font-bold mb-4">Guarantors</h3>
        <DetailRow label="Guarantor 1" value={agent.guarantor1FullName} />
        <DetailRow label="Contact" value={agent.guarantor1Contact} />
        <DetailRow label="Ghana Card" value={agent.guarantor1GhanaCard} />
        <DetailRow label="Guarantor 2" value={agent.guarantor2FullName} />
        <DetailRow label="Contact" value={agent.guarantor2Contact} />
        <DetailRow label="Ghana Card" value={agent.guarantor2GhanaCard} />
      </div>

      <div className="p-4 bg-white mt-2">
        <h3 className="text-xl font-bold mb-4">Affiliate Information</h3>
        <DetailRow label="Affiliate" value={agent.affiliateAssoc} />
        <DetailRow label="Japtu ID Card" value={agent.japtuIdCardNumber} />
      </div>

      <div className="p-4 bg-white mt-2">
        <h3 className="text-xl font-bold mb-4">Personal Information</h3>
        <DetailRow label="Date of Birth" value={agent.dateOfBirth} />
        <DetailRow label="Town of Birth" value={agent.townOfBirth} />
        <DetailRow label="Hometown" value={agent.hometown} />
        <DetailRow label="Nationality" value={agent.nationality} />
      </div>

      <div className="mt-auto p-4 bg-white flex flex-col gap-2">
        <Button
          variant="outline"
          className="w-full py-3 rounded-md border-gray-200"
          onClick={() => setIsModalOpen(true)}
        >
          Modify Status
        </Button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-xl font-bold mb-4">Update Status</h3>
            <div className="space-y-2">
              {["Active", "Suspended", "Inactive"].map((status) => (
                <div
                  key={status}
                  className={`p-2 cursor-pointer rounded-md border ${
                    selectedStatus === status
                      ? "bg-blue-100 border-blue-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedStatus(status)}
                >
                  {status}
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="py-2 px-4 rounded-md"
              >
                Cancel
              </Button>
              <Button
                onClick={() => updateStatus(selectedStatus)}
                className="py-2 px-4 bg-blue-500 text-white rounded-md"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
