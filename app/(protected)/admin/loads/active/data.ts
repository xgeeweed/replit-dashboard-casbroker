interface Driver {
  id: string;
  name: string;
  image?: string;
  licenseNumber: string;
  phone: string;
  experience: number;
  status: "Active" | "Inactive";
}

interface Vehicle {
  id: string;
  registrationNumber: string;
  make: string;
  model: string;
  type: string;
  year: number;
  capacity: string;
  insuranceExpiry: string;
  status: "Active" | "Inactive";
}

interface Equipment {
  type: string;
  container_size: string;
  weight: string;
  commodity: string;
  load: "Full" | "Partial";
}

interface ShipmentDetails {
  pickUpDate: string;
  pickUpHours: string;
  dockHours: string;
  reference: string;
  comments: string;
}

interface RateDetails {
  total: number;
  trip: string;
  ratePerKm: number;
}

interface CompanyDetails {
  name: string;
  telephone: string;
  mcNumber: string;
  location: string;
  creditScore: number;
  daysToPay: string;
  reviews: {
    score: number;
    count: number;
  };
}

export const data = [
  {
    id: "LD001",
    blNumber: "BL2024001",
    pickupLocation: {
      name: "Tema Industrial Area",
      coordinates: { lat: 5.6741, lng: 0.0087 }
    },
    deliveryLocation: {
      name: "Ho Market",
      coordinates: { lat: 6.6037, lng: 0.4714 }
    },
    pickupDate: "2024-01-30",
    status: "In Progress",
    distance: "270 km",
    rate: 3500,
    marketRate: 3300,
    weight: "2,500 kg",
    container_size: "20 ft",
    age: "2 hours",
    equipmentType: "C: Container",
    equipment: {
      type: "Container",
      container_size: "20 ft",
      weight: "2,500 kg",
      commodity: "Import Goods",
      load: "Full"
    },
    postedTime: "2 hours ago",
    shipmentDetails: {
      pickUpDate: "03/15",
      pickUpHours: "8:00 AM - 4:00 PM",
      dockHours: "7:00 AM - 3:00 PM",
      reference: "BL123456",
      comments: "Container chassis required - Customs cleared"
    },
    rateDetails: {
      total: 3500,
      trip: "270 km",
      ratePerKm: 13.0
    },
    companyDetails: {
      name: "Global Imports GH",
      telephone: "0302-123-4567",
      mcNumber: "GHA789012",
      location: "Tema Port",
      creditScore: 95,
      daysToPay: "14 T/A",
      reviews: {
        score: 4.8,
        count: 56
      }
    },
    driver: {
      id: "DRV001",
      name: "Kwame Mensah",
      licenseNumber: "GHA-DL-2021-1234",
      phone: "+233 24 123 4567",
      experience: 5,
      status: "Active"
    },
    vehicle: {
      id: "VEH001",
      registrationNumber: "GR 1234-22",
      make: "Toyota",
      model: "Dyna",
      type: "Box Truck",
      year: 2020,
      capacity: "3.5 tons",
      insuranceExpiry: "2024-12-31",
      status: "Active"
    }
  },
  {
    id: "LD002",
    blNumber: "BL2024002",
    pickupLocation: {
      name: "Spintex Road, Accra",
      coordinates: { lat: 5.6268, lng: -0.1525 }
    },
    deliveryLocation: {
      name: "Sunyani Central",
      coordinates: { lat: 7.3349, lng: -2.3123 }
    },
    pickupDate: "2024-01-31",
    status: "In Progress",
    distance: "380 km",
    rate: 4200,
    marketRate: 4000,
    weight: "3,200 kg",
    age: "5 hours",
    equipmentType: "F: Flatbed",
    equipment: {
      type: "Flatbed",
      container_size: "40 ft",
      weight: "3,200 kg",
      commodity: "Construction Materials",
      load: "Full"
    },
    postedTime: "5 hours ago",
    shipmentDetails: {
      pickUpDate: "03/16",
      pickUpHours: "7:00 AM - 3:00 PM",
      dockHours: "6:00 AM - 2:00 PM",
      reference: "BL789012",
      comments: "Heavy machinery - Crane required for loading"
    },
    rateDetails: {
      total: 4200,
      trip: "380 km",
      ratePerKm: 11.05
    },
    companyDetails: {
      name: "Construction Plus GH",
      telephone: "0244-987-6543",
      mcNumber: "GHA456789",
      location: "Spintex Road",
      creditScore: 92,
      daysToPay: "30 T/A",
      reviews: {
        score: 4.6,
        count: 42
      }
    },
    driver: {
      id: "DRV002",
      name: "Yaw Owusu",
      licenseNumber: "GHA-DL-2020-5678",
      phone: "+233 20 987 6543",
      experience: 7,
      status: "Active"
    },
    vehicle: {
      id: "VEH002",
      registrationNumber: "GN 5678-21",
      make: "Isuzu",
      model: "NPR",
      type: "Flatbed",
      year: 2021,
      capacity: "5 tons",
      insuranceExpiry: "2024-10-15",
      status: "Active"
    }
  },
  {
    id: "LD003",
    blNumber: "BL2024003",
    pickupLocation: {
      name: "Kumasi Adum",
      coordinates: { lat: 6.6885, lng: -1.6244 }
    },
    deliveryLocation: {
      name: "Tamale Central",
      coordinates: { lat: 9.4038, lng: -0.8396 }
    },
    pickupDate: "2024-02-01",
    status: "In Progress",
    distance: "420 km",
    rate: 4800,
    marketRate: 4600,
    weight: "4,000 kg",
    age: "1 hour",
    equipmentType: "R: Refrigerated",
    equipment: {
      type: "Refrigerated",
      container_size: "20 ft",
      weight: "4,000 kg",
      commodity: "Perishable Goods",
      load: "Full"
    },
    postedTime: "1 hour ago",
    shipmentDetails: {
      pickUpDate: "03/17",
      pickUpHours: "6:00 AM - 2:00 PM",
      dockHours: "5:00 AM - 1:00 PM",
      reference: "BL345678",
      comments: "Temperature controlled - Maintain at 4°C"
    },
    rateDetails: {
      total: 4800,
      trip: "420 km",
      ratePerKm: 11.43
    },
    companyDetails: {
      name: "Fresh Foods GH",
      telephone: "0302-345-6789",
      mcNumber: "GHA234567",
      location: "Kumasi Adum",
      creditScore: 88,
      daysToPay: "7 T/A",
      reviews: {
        score: 4.4,
        count: 35
      }
    },
    driver: {
      id: "DRV003",
      name: "Kofi Addo",
      licenseNumber: "GHA-DL-2019-9012",
      phone: "+233 27 345 6789",
      experience: 3,
      status: "Active"
    },
    vehicle: {
      id: "VEH003",
      registrationNumber: "GW 9012-23",
      make: "Mitsubishi",
      model: "Canter",
      type: "Refrigerated",
      year: 2022,
      capacity: "4 tons",
      insuranceExpiry: "2024-08-20",
      status: "Active"
    }
  },
  {
    id: "LD004",
    blNumber: "BL2024004",
    pickupLocation: {
      name: "Takoradi Port",
      coordinates: { lat: 4.8966, lng: -1.7183 }
    },
    deliveryLocation: {
      name: "Wa Central",
      coordinates: { lat: 10.0601, lng: -2.5099 }
    },
    pickupDate: "2024-02-02",
    status: "In Progress",
    distance: "780 km",
    rate: 7200,
    marketRate: 7000,
    weight: "8,000 kg",
    container_size: "45 ft",
    age: "3 hours",
    equipmentType: "C: Container",
    equipment: {
      type: "Container",
      container_size: "40 ft",
      weight: "8,000 kg",
      commodity: "Industrial Equipment",
      load: "Full"
    },
    postedTime: "3 hours ago",
    shipmentDetails: {
      pickUpDate: "03/18",
      pickUpHours: "7:00 AM - 3:00 PM",
      dockHours: "6:00 AM - 2:00 PM",
      reference: "BL901234",
      comments: "Heavy equipment - Special permits obtained"
    },
    rateDetails: {
      total: 7200,
      trip: "780 km",
      ratePerKm: 9.23
    },
    companyDetails: {
      name: "Industrial Solutions GH",
      telephone: "0302-567-8901",
      mcNumber: "GHA345678",
      location: "Takoradi Port",
      creditScore: 96,
      daysToPay: "45 T/A",
      reviews: {
        score: 4.9,
        count: 78
      }
    },
    driver: {
      id: "DRV004",
      name: "Emmanuel Koffi",
      licenseNumber: "GHA-DL-2022-3456",
      phone: "+233 55 789 0123",
      experience: 4,
      status: "Active"
    },
    vehicle: {
      id: "VEH004",
      registrationNumber: "GT 3456-22",
      make: "Hino",
      model: "500",
      type: "Container",
      year: 2021,
      capacity: "10 tons",
      insuranceExpiry: "2024-11-30",
      status: "Active"
    }
  },
  {
    id: "LD005",
    blNumber: "BL2024005", 
    pickupLocation: {
      name: "Accra Mall",
      coordinates: { lat: 5.6037, lng: -0.1870 }
    },
    deliveryLocation: {
      name: "Bolgatanga Market", 
      coordinates: { lat: 10.7867, lng: -0.8486 }
    },
    pickupDate: "2024-02-03",
    status: "In Progress",
    distance: "820 km",
    rate: 6500,
    marketRate: 6300,
    weight: "2,800 kg",
    container_size: "16 ft",
    age: "4 hours",
    equipmentType: "V: Van",
    equipment: {
      type: "Van",
      container_size: "40 ft", 
      weight: "2,800 kg",
      commodity: "Retail Goods",
      load: "Full"
    },
    postedTime: "4 hours ago",
    shipmentDetails: {
      pickUpDate: "03/19",
      pickUpHours: "9:00 AM - 5:00 PM",
      dockHours: "8:00 AM - 4:00 PM", 
      reference: "BL567890",
      comments: "Retail delivery - Multiple drop points"
    },
    rateDetails: {
      total: 6500,
      trip: "820 km",
      ratePerKm: 7.93
    },
    companyDetails: {
      name: "Retail Express GH",
      telephone: "0302-789-0123",
      mcNumber: "GHA901234",
      location: "Accra Mall",
      creditScore: 90,
      daysToPay: "21 T/A",
      reviews: {
        score: 4.7,
        count: 63
      }
    },
    driver: {
      id: "DRV005",
      name: "Samuel Asare",
      licenseNumber: "GHA-DL-2020-7890",
      phone: "+233 54 234 5678",
      experience: 6,
      status: "Active"
    },
    vehicle: {
      id: "VEH005",
      registrationNumber: "GE 7890-21",
      make: "Mercedes-Benz",
      model: "Atego",
      type: "Van",
      year: 2020,
      capacity: "2.5 tons",
      insuranceExpiry: "2024-09-15",
      status: "Active"
    }
  }
];
