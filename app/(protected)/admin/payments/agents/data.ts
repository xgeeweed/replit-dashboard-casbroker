
interface AgentPayment {
  id: string;
  agentId: string;
  agentName: string;
  amount: number;
  status: "Completed" | "Pending" | "Failed";
  date: string;
  loadId: string;
  route: string;
  paymentMethod: string;
  category: "Delivery" | "Commission" | "Advance" | "Other";
}

export const agentPayments: AgentPayment[] = [
  {
    id: "APM001",
    agentId: "AGT001",
    agentName: "John Smith",
    amount: 5000,
    status: "Completed",
    date: "2024-02-01",
    loadId: "LD001",
    route: "Tema Port → Kumasi",
    paymentMethod: "Bank Transfer",
    category: "Commission"
  },
  {
    id: "APM002",
    agentId: "AGT002",
    agentName: "Kwame Nkrumah",
    amount: 3500,
    status: "Pending",
    date: "2024-02-02",
    loadId: "LD002",
    route: "Takoradi Port → Accra",
    paymentMethod: "Mobile Money",
    category: "Delivery"
  },
  {
    id: "APM003",
    agentId: "AGT001",
    agentName: "John Smith",
    amount: 1000,
    status: "Completed",
    date: "2024-02-03",
    loadId: "LD003",
    route: "Accra → Tamale",
    paymentMethod: "Cash",
    category: "Advance"
  }
];
