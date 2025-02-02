export interface LoadboardEntry {
  id: string;
  rowId: string;
  pickupLocation: {
    name: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  deliveryLocation: {
    name: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  pickupDate: string;
  distance: string;
  rate: number;
  marketRate: number;
  weight: string;
  container_size: string;
  age: string;
  equipmentType: string;
  status: string;
  equipment: {
    type: string;
    container_size: string;
    weight: string;
    commodity: string;
    load: string;
  };
  postedTime: string;
  shipmentDetails: {
    pickUpDate: string;
    pickUpHours: string;
    dockHours: string;
    reference: string;
    comments: string;
  };
  rateDetails: {
    total: number;
    trip: string;
    ratePerKm: number;
  };
  companyDetails: {
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
  };
  truck?: {
    plateNumber: string;
    type: string;
    driverName: string;
  };
}

export const loadboardData: LoadboardEntry[] = [
  {
    id: "669875",
    rowId: "669875",
    pickupLocation: {
      name: "Airport City, Accra",
      coordinates: { lat: 5.559526, lng: -0.166314 }
    },
    deliveryLocation: {
      name: "Adum, Kumasi",
      coordinates: { lat: 6.687340, lng: -1.622925 }
    },
    pickupDate: "July 27, 2024",
    distance: "252 km",
    rate: 3200,
    marketRate: 3000,
    weight: "1,800 kg",
    container_size: "20 ft",
    age: "15 minutes",
    equipmentType: "V: Van",
    status: "Active",
    equipment: {
      type: "Flatbed",
      container_size: "20 ft",
      weight: "1,800 kg",
      commodity: "Laptops & Electronics",
      load: "Full",
    },
    postedTime: "15 minutes ago",
    shipmentDetails: {
      pickUpDate: "07/28",
      pickUpHours: "9:00 AM - 4:00 PM",
      dockHours: "8:00 AM - 3:00 PM",
      reference: "GH8842235",
      comments: "Insurance included - Air-conditioned van required - No stacking",
    },
    rateDetails: {
      total: 3200,
      trip: "252 km",
      ratePerKm: 12.7,
    },
    companyDetails: {
      name: "CompuGhana Distribution",
      telephone: "0544-567-8901",
      mcNumber: "GHA1567443",
      location: "Airport City, Accra",
      creditScore: 95,
      daysToPay: "14 T/A",
      reviews: {
        score: 4.5,
        count: 43,
      },
    }
  },
  {
    id: "669876",
    rowId: "669876",
    pickupLocation: {
      name: "Tema Port",
      coordinates: { lat: 5.6265188, lng: 0.003165 }
    },
    deliveryLocation: {
      name: "Tamale Central",
      coordinates: { lat: 9.403770, lng: -0.839687 }
    },
    pickupDate: "July 28, 2024",
    distance: "618 km",
    rate: 5800,
    marketRate: 5500,
    weight: "2,500 kg",
    container_size: "40 ft",
    age: "1 hour",
    equipmentType: "R: Refrigerated",
    status: "Completed",
    equipment: {
      type: "Refrigerated",
      container_size: "40 ft",
      weight: "2,500 kg",
      commodity: "Fresh Produce",
      load: "Full",
    },
    postedTime: "1 hour ago",
    shipmentDetails: {
      pickUpDate: "07/28",
      pickUpHours: "6:00 AM - 2:00 PM",
      dockHours: "5:00 AM - 1:00 PM",
      reference: "GH8842236",
      comments: "Temperature controlled - Fragile cargo",
    },
    rateDetails: {
      total: 5800,
      trip: "618 km",
      ratePerKm: 9.4,
    },
    companyDetails: {
      name: "Fresh Foods GH",
      telephone: "0244-567-8902",
      mcNumber: "GHA1567444",
      location: "Tema",
      creditScore: 92,
      daysToPay: "7 T/A",
      reviews: {
        score: 4.2,
        count: 38,
      },
    }
  },
  {
    id: "669877",
    rowId: "669877",
    pickupLocation: {
      name: "Takoradi Port",
      coordinates: { lat: 4.8956, lng: -1.7557 }
    },
    deliveryLocation: {
      name: "Sunyani Central",
      coordinates: { lat: 7.336213, lng: -2.328724 }
    },
    pickupDate: "July 29, 2024",
    distance: "432 km",
    rate: 4200,
    marketRate: 4000,
    weight: "3,200 kg",
    container_size: "40 ft",
    age: "2 hours",
    equipmentType: "F: Flatbed",
    status: "Cancelled",
    equipment: {
      type: "Flatbed",
      container_size: "40 ft",
      weight: "3,200 kg",
      commodity: "Construction Materials",
      load: "Full",
    },
    postedTime: "2 hours ago",
    shipmentDetails: {
      pickUpDate: "07/29",
      pickUpHours: "7:00 AM - 3:00 PM",
      dockHours: "6:00 AM - 2:00 PM",
      reference: "GH8842237",
      comments: "Heavy machinery - Crane required for loading/unloading",
    },
    rateDetails: {
      total: 4200,
      trip: "432 km",
      ratePerKm: 9.7,
    },
    companyDetails: {
      name: "BuildGhana Ltd",
      telephone: "0204-567-8903",
      mcNumber: "GHA1567445",
      location: "Takoradi",
      creditScore: 88,
      daysToPay: "30 T/A",
      reviews: {
        score: 4.0,
        count: 25,
      },
    }
  }
]; 