"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaymentWizard } from "./components/payment-wizard";
import { DataTable } from "./table/DataTable"; // <--- import our custom DataTable wrapper
import { columns } from "./table/columns";

interface Payment {
  id: string;
  referenceNumber: string;
  blNumber: string;
  amount: number;
  status: string;
  dueDate: string;
  createdAt: string;
  paymentMethod: string;
  description: string;
}

const mockPayments: Payment[] = [
  {
    id: "1",
    referenceNumber: "PAY-2024-001",
    blNumber: "BL1234",
    amount: 3200,
    status: "Pending",
    dueDate: "2024-02-15",
    createdAt: "2024-01-25",
    paymentMethod: "Bank Transfer",
    description: "Payment for bulk cargo transport",
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
    description: "Container transport payment",
  },
  {
    id: "3",
    referenceNumber: "PAY-2024-003",
    blNumber: "BL9012",
    amount: 4500,
    status: "Pending",
    dueDate: "2024-02-20",
    createdAt: "2024-01-28",
    paymentMethod: "Pending",
    description: "Container delivery payment",
  },
  {
    id: "4",
    referenceNumber: "PAY-2024-004",
    blNumber: "BL3456",
    amount: 1800,
    status: "Pending",
    dueDate: "2024-02-18",
    createdAt: "2024-01-26",
    paymentMethod: "Pending",
    description: "Bulk cargo handling",
  },
];

export default function PaymentHistory() {
  const [payments] = useState<Payment[]>(mockPayments);
  const [showPaymentWizard, setShowPaymentWizard] = useState(false);

  // Keep track of which payments (by ID) are selected
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);

  // Keep track of a reference for a single payment (if needed for PaymentWizard)
  const [selectedReference, setSelectedReference] = useState<string>("");

  // Filter pending vs. completed
  const pendingPayments = payments.filter((p) => p.status === "Pending");
  const completedPayments = payments.filter((p) => p.status === "Completed");

  // Calculate total selected amount whenever selectedPayments changes
  const totalSelectedAmount = payments
    .filter((p) => selectedPayments.includes(p.id))
    .reduce((sum, payment) => sum + payment.amount, 0);

  // Example: If you click a row’s “Pay” button, you might want to open the wizard
  const handlePayment = (paymentId: string) => {
    const payment = payments.find((p) => p.id === paymentId);
    if (payment) {
      setSelectedReference(payment.referenceNumber);
      setShowPaymentWizard(true);
    }
  };

  // Our custom callback for row selection
  const handleSelectionChange = (id: string) => {
    setSelectedPayments((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4 p-4">
      {/* Show “Selected Amount” & “Pay Selected” button only if we have pending payments */}
      {pendingPayments.length > 0 && (
        <div className="flex justify-between items-center bg-muted p-4 rounded-lg">
          <div>
            <p className="text-sm">Selected Amount</p>
            <p className="text-2xl font-bold">GHS {totalSelectedAmount}</p>
          </div>
          <Button
            onClick={() => setShowPaymentWizard(true)}
            disabled={selectedPayments.length === 0}
          >
            Pay Selected ({selectedPayments.length})
          </Button>
        </div>
      )}

      <PaymentWizard
        open={showPaymentWizard}
        onClose={() => setShowPaymentWizard(false)}
        totalAmount={totalSelectedAmount}
        referenceNumber={
          selectedPayments.length === 1
            ? payments.find(p => p.id === selectedPayments[0])?.referenceNumber || ""
            : selectedPayments.length > 1
              ? `BULK-${new Date().getTime()}`
              : ""
        }
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
            meta={{
              name: "Payment",
              plural: "Payments",
              handleSelectionChange: handleSelectionChange,
            }}
          />
        </TabsContent>
        <TabsContent value="completed">
          <DataTable
            columns={columns}
            data={completedPayments}
            meta={{
              name: "Payment",
              plural: "Payments",
              handleSelectionChange: handleSelectionChange,
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
