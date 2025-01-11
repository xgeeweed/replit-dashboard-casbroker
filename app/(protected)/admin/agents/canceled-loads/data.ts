
export type CanceledLoad = {
  id: string;
  loadId: string;
  agentName: string;
  agentId: string;
  cancelDate: string;
  reason: string;
  status: "Pending" | "Approved" | "Denied";
  amount: number;
  pickupLocation: string;
  deliveryLocation: string;
};

export const canceledLoads: CanceledLoad[] = [
  {
    id: "CL001",
    loadId: "LD123",
    agentName: "John Smith",
    agentId: "AG001",
    cancelDate: "2024-02-15",
    reason: "Equipment unavailable",
    status: "Pending",
    amount: 2500,
    pickupLocation: "Tema Port",
    deliveryLocation: "Kumasi"
  },
  {
    id: "CL002",
    loadId: "LD456",
    agentName: "Sarah Johnson",
    agentId: "AG002",
    cancelDate: "2024-02-14",
    reason: "Route changed",
    status: "Pending",
    amount: 3000,
    pickupLocation: "Takoradi Port",
    deliveryLocation: "Accra"
  },
  {
    id: "CL003",
    loadId: "LD789",
    agentName: "Mike Brown",
    agentId: "AG003",
    cancelDate: "2024-02-13",
    reason: "Weather conditions",
    status: "Pending",
    amount: 1800,
    pickupLocation: "Accra",
    deliveryLocation: "Tamale"
  }
];
