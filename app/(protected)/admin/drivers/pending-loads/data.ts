
export type DriverPendingLoad = {
  id: string;
  blNumber: string;
  pickupLocation: string;
  deliveryLocation: string;
  pickupDate: string;
  requestedBy: string;
  weight: string;
  equipment: string;
  status: "Pending" | "Approved" | "Denied";
};

export const driverPendingLoads = [
  {
    id: "DPL001",
    blNumber: "BL123456",
    pickupLocation: "Tema Port",
    deliveryLocation: "Kumasi",
    pickupDate: "2024-02-20",
    requestedBy: "John Smith",
    weight: "2500 kg",
    equipment: "Box Truck",
    status: "Pending"
  },
  {
    id: "DPL002",
    blNumber: "BL789012",
    pickupLocation: "Takoradi Port",
    deliveryLocation: "Accra",
    pickupDate: "2024-02-21",
    requestedBy: "Sarah Johnson",
    weight: "3000 kg",
    equipment: "Flatbed",
    status: "Pending"
  },
  {
    id: "DPL003",
    blNumber: "BL345678",
    pickupLocation: "Accra",
    deliveryLocation: "Tamale",
    pickupDate: "2024-02-22",
    requestedBy: "Mike Brown",
    weight: "1800 kg",
    equipment: "Box Truck",
    status: "Pending"
  }
];
