
interface DriverPayment {
  id: string;
  driverId: string;
  driverName: string;
  amount: number;
  status: "Completed" | "Pending" | "Failed";
  date: string;
  loadId: string;
  route: string;
  paymentMethod: string;
  category: "Delivery" | "Bonus" | "Advance" | "Other";
}

export const driverPayments: DriverPayment[] = [
  {
    id: "PMT001",
    driverId: "DRV001",
    driverName: "James Anderson",
    amount: 2500,
    status: "Completed",
    date: "2024-02-01",
    loadId: "LD001",
    route: "Tema Port → Kumasi",
    paymentMethod: "Bank Transfer",
    category: "Delivery"
  },
  {
    id: "PMT002",
    driverId: "DRV002",
    driverName: "Kwame Mensah",
    amount: 3000,
    status: "Pending",
    date: "2024-02-02",
    loadId: "LD002",
    route: "Takoradi Port → Accra",
    paymentMethod: "Mobile Money",
    category: "Delivery"
  },
  {
    id: "PMT003",
    driverId: "DRV001",
    driverName: "James Anderson",
    amount: 500,
    status: "Completed",
    date: "2024-02-03",
    loadId: "LD003",
    route: "Accra → Tamale",
    paymentMethod: "Cash",
    category: "Bonus"
  }
];
