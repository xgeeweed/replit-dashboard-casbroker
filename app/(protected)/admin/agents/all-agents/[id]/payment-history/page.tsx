
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { agentPaymentHistory } from "./data";
import { Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

export default function AgentPaymentHistory({ params }: { params: { id: string } }) {
  const [payments] = useState(agentPaymentHistory);
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Payment History Report',
    removeAfterPrint: true,
    onAfterPrint: () => console.log('Printed successfully')
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 no-print">
        <h1 className="text-2xl font-bold">Payment History</h1>
        <Button onClick={handlePrint}>
          <Printer className="h-4 w-4 mr-2" />
          Print Report
        </Button>
      </div>

      <div ref={componentRef} className="print-content">
        <h1 className="text-2xl font-bold mb-6 print-show">Payment History Report</h1>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.transactionId}</TableCell>
                  <TableCell>GH₵ {payment.amount}</TableCell>
                  <TableCell>{payment.paymentMethod}</TableCell>
                  <TableCell>{payment.description}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      payment.status === "Completed" ? "bg-green-100 text-green-800" :
                      payment.status === "Failed" ? "bg-red-100 text-red-800" :
                      "bg-yellow-100 text-yellow-800"
                    }`}>
                      {payment.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
