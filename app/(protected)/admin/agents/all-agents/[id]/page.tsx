
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
