
export const driverTransactions = [
  {
    id: "DT001",
    date: "2024-02-01",
    loadId: "LD001",
    pickupLocation: "Tema Port",
    deliveryLocation: "Kumasi",
    amount: 2500,
    status: "Completed",
    truck: { number: "GT 5678-22" },
    agent: { name: "John Smith" }
  },
  {
    id: "DT002",
    date: "2024-02-02",
    loadId: "LD002",
    pickupLocation: "Takoradi Port",
    deliveryLocation: "Accra",
    amount: 3000,
    status: "In Progress",
    truck: { number: "GT 1234-23" },
    agent: { name: "Sarah Johnson" }
  },
  {
    id: "DT003",
    date: "2024-02-03",
    loadId: "LD003",
    pickupLocation: "Accra",
    deliveryLocation: "Tamale",
    amount: 1800,
    status: "Pending",
    truck: { number: "GT 9012-21" },
    agent: { name: "Mike Brown" }
  }
];
export const driverData = {
  fullName: "Daniel Mensah",
  dateOfBirth: "1988-05-15",
  nationality: "Ghanaian",
  contact: "+233 24 555 7890",
  email: "daniel.m@example.com",
  gpsAddress: "123 Spintex Road, Accra",
  licenseNumber: "GHA-DL-123456",
  vehicleType: "Box Truck",
  vehiclePlate: "GT 5678-22",
  experience: "5 years",
  status: "Active",
  rating: 4.8
};
