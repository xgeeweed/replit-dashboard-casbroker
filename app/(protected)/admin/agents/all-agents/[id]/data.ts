
interface Transaction {
  id: string;
  loadId: string;
  pickupLocation: string;
  deliveryLocation: string;
  date: string;
  amount: number;
  status: "Completed" | "Pending" | "In Progress";
  driver?: {
    name: string;
    contact: string;
  };
  truck?: {
    number: string;
    type: string;
  };
}

export const agentTransactions: Transaction[] = [
  {
    id: "T001",
    loadId: "L123",
    pickupLocation: "Tema Port",
    deliveryLocation: "Kumasi Central",
    date: "2024-02-15",
    amount: 3500,
    status: "Completed",
    driver: {
      name: "James Koffi",
      contact: "+233 24 555 7890"
    },
    truck: {
      number: "GT 5678-22",
      type: "Flatbed"
    }
  },
  {
    id: "T002",
    loadId: "L124",
    pickupLocation: "Accra Mall",
    deliveryLocation: "Tamale Market",
    date: "2024-02-18",
    amount: 4200,
    status: "In Progress",
    driver: {
      name: "Kwame Mensah",
      contact: "+233 20 123 4567"
    },
    truck: {
      number: "GT 1234-23",
      type: "Box Truck"
    }
  },
  {
    id: "T003",
    loadId: "L125",
    pickupLocation: "Takoradi Port",
    deliveryLocation: "Ho Central",
    date: "2024-02-20",
    amount: 2800,
    status: "Pending",
    driver: {
      name: "Samuel Owusu",
      contact: "+233 27 890 1234"
    },
    truck: {
      number: "GT 9012-21",
      type: "Container"
    }
  }
];
