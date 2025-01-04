
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/datatable/data-table";
import { columns } from "./table/columns";

const mockPayments = [
  {
    id: "1",
    referenceNumber: "PAY-2024-001",
    blNumber: "BL1234",
    amount: 3200,
    status: "Pending",
    dueDate: "2024-02-15",
    createdAt: "2024-01-25",
    paymentMethod: "Bank Transfer",
    description: "Payment for bulk cargo transport"
  },
  {
    id: "2",
    referenceNumber: "PAY-2024-002", 
    blNumber: "BL5678",
    amount: 2500,
    status: "Completed",
    dueDate: "2024-02-01",
    createdAt: "2024-01-20",
    paymentMethod: "Mobile Money",
    description: "Container transport payment"
  }
];

export default function PaymentHistory() {
  const [payments] = useState(mockPayments);
  const [showPaymentWizard, setShowPaymentWizard] = useState(false);
  
  const pendingPayments = payments.filter(p => p.status === "Pending");
  const completedPayments = payments.filter(p => p.status === "Completed");

  const totalPendingAmount = pendingPayments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="space-y-4 p-4">
      {pendingPayments.length > 0 && (
        <div className="flex justify-between items-center bg-muted p-4 rounded-lg">
          <div>
            <p className="text-sm">Total Pending Amount</p>
            <p className="text-2xl font-bold">GHS {totalPendingAmount}</p>
          </div>
          <Button onClick={() => setShowPaymentWizard(true)}>
            Make Payment
          </Button>
        </div>
      )}

      <PaymentWizard
        open={showPaymentWizard}
        onClose={() => setShowPaymentWizard(false)}
        totalAmount={totalPendingAmount}
        referenceNumber={pendingPayments[0]?.referenceNumber}
      />
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending Payments</TabsTrigger>
          <TabsTrigger value="completed">Completed Payments</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <DataTable 
            columns={columns} 
            data={pendingPayments} 
            meta={{ name: "Payment", plural: "Payments" }} 
          />
        </TabsContent>
        <TabsContent value="completed">
          <DataTable 
            columns={columns} 
            data={completedPayments} 
            meta={{ name: "Payment", plural: "Payments" }} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
