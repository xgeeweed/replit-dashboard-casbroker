
export type DriverCanceledLoad = {
  id: string;
  loadId: string;
  driverName: string;
  driverId: string;
  cancelDate: string;
  reason: string;
  status: "Pending" | "Approved" | "Denied";
  amount: number;
  pickupLocation: string;
  deliveryLocation: string;
};

export const driverCanceledLoads = [
  {
    id: "DCL001",
    loadId: "LD123",
    driverName: "Daniel Mensah",
    driverId: "DR001",
    cancelDate: "2024-02-15",
    reason: "Vehicle breakdown",
    status: "Pending",
    amount: 2500,
    pickupLocation: "Tema Port",
    deliveryLocation: "Kumasi"
  },
  {
    id: "DCL002",
    loadId: "LD456",
    driverName: "Kwame Owusu",
    driverId: "DR002",
    cancelDate: "2024-02-14",
    reason: "Emergency maintenance",
    status: "Pending",
    amount: 3000,
    pickupLocation: "Takoradi Port",
    deliveryLocation: "Accra"
  },
  {
    id: "DCL003",
    loadId: "LD789",
    driverName: "Samuel Addo",
    driverId: "DR003",
    cancelDate: "2024-02-13",
    reason: "Technical issues",
    status: "Pending",
    amount: 1800,
    pickupLocation: "Accra",
    deliveryLocation: "Tamale"
  }
];
