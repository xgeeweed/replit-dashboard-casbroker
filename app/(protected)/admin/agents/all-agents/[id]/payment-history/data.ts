
interface AgentPayment {
  id: string;
  date: string;
  amount: number;
  status: "Completed" | "Pending" | "Failed";
  transactionId: string;
  paymentMethod: string;
  description: string;
}

export const agentPaymentHistory: AgentPayment[] = [
  {
    id: "1",
    date: "2024-02-15",
    amount: 3500,
    status: "Completed",
    transactionId: "TXN-001",
    paymentMethod: "Bank Transfer",
    description: "Load delivery payment"
  },
  {
    id: "2",
    date: "2024-02-10",
    amount: 2800,
    status: "Completed",
    transactionId: "TXN-002",
    paymentMethod: "Mobile Money",
    description: "Container transport"
  },
  {
    id: "3",
    date: "2024-02-05",
    amount: 4200,
    status: "Failed",
    transactionId: "TXN-003",
    paymentMethod: "Bank Transfer",
    description: "Bulk cargo delivery"
  }
];
