export interface LoadboardEntry {
  id: string;
  rowId: string;
  pickupLocation: string;
  deliveryLocation: string;
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
}

export const loadboardData: LoadboardEntry[] = [
  {
    id: "669875",
    rowId: "669875",
    pickupLocation: "Airport City, Accra",
    deliveryLocation: "Adum, Kumasi",
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
    pickupLocation: "Tema Port",
    deliveryLocation: "Tamale Central",
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
    pickupLocation: "Takoradi Port",
    deliveryLocation: "Sunyani Central",
    pickupDate: "July 29, 2024",
    distance: "432 km",
    rate: 4200,
    marketRate: 4000,
    weight: "3,200 kg",
    container_size: "40 ft",
    age: "2 hours",
    equipmentType: "F: Flatbed",
    status: "Active",
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
  },
  {
    id: "669878",
    rowId: "669878",
    pickupLocation: "Spintex Road, Accra",
    deliveryLocation: "Ho Central",
    pickupDate: "July 30, 2024",
    distance: "165 km",
    rate: 2800,
    marketRate: 2600,
    weight: "1,200 kg",
    container_size: "20 ft",
    age: "3 hours",
    equipmentType: "V: Van",
    status: "Active",
    equipment: {
      type: "Van",
      container_size: "20 ft",
      weight: "1,200 kg",
      commodity: "Retail Goods",
      load: "Full",
    },
    postedTime: "3 hours ago",
    shipmentDetails: {
      pickUpDate: "07/30",
      pickUpHours: "8:00 AM - 5:00 PM",
      dockHours: "7:00 AM - 4:00 PM",
      reference: "GH8842238",
      comments: "Retail merchandise - Handle with care",
    },
    rateDetails: {
      total: 2800,
      trip: "165 km",
      ratePerKm: 17.0,
    },
    companyDetails: {
      name: "RetailPlus Ghana",
      telephone: "0244-567-8904",
      mcNumber: "GHA1567446",
      location: "Spintex Road",
      creditScore: 90,
      daysToPay: "14 T/A",
      reviews: {
        score: 4.3,
        count: 31,
      },
    }
  },
  {
    id: "669879",
    rowId: "669879",
    pickupLocation: "Tema Industrial Area",
    deliveryLocation: "Cape Coast",
    pickupDate: "July 31, 2024",
    distance: "145 km",
    rate: 2500,
    marketRate: 2300,
    weight: "2,800 kg",
    container_size: "40 ft",
    age: "4 hours",
    equipmentType: "F: Flatbed",
    status: "Active",
    equipment: {
      type: "Flatbed",
      container_size: "40 ft",
      weight: "2,800 kg",
      commodity: "Steel Products",
      load: "Full",
    },
    postedTime: "4 hours ago",
    shipmentDetails: {
      pickUpDate: "07/31",
      pickUpHours: "7:00 AM - 3:00 PM",
      dockHours: "6:00 AM - 2:00 PM",
      reference: "GH8842239",
      comments: "Steel coils - Special handling required",
    },
    rateDetails: {
      total: 2500,
      trip: "145 km",
      ratePerKm: 17.2,
    },
    companyDetails: {
      name: "Steel Masters GH",
      telephone: "0244-567-8905",
      mcNumber: "GHA1567447",
      location: "Tema Industrial",
      creditScore: 94,
      daysToPay: "30 T/A",
      reviews: {
        score: 4.6,
        count: 52,
      },
    }
  },
  {
    id: "669880",
    rowId: "669880",
    pickupLocation: "Achimota, Accra",
    deliveryLocation: "Koforidua",
    pickupDate: "August 1, 2024",
    distance: "85 km",
    rate: 1800,
    marketRate: 1600,
    weight: "900 kg",
    container_size: "20 ft",
    age: "5 hours",
    equipmentType: "V: Van",
    status: "Active",
    equipment: {
      type: "Van",
      container_size: "20 ft",
      weight: "900 kg",
      commodity: "Textiles",
      load: "Partial",
    },
    postedTime: "5 hours ago",
    shipmentDetails: {
      pickUpDate: "08/01",
      pickUpHours: "9:00 AM - 6:00 PM",
      dockHours: "8:00 AM - 5:00 PM",
      reference: "GH8842240",
      comments: "Textile materials - Keep dry",
    },
    rateDetails: {
      total: 1800,
      trip: "85 km",
      ratePerKm: 21.2,
    },
    companyDetails: {
      name: "Textile Hub GH",
      telephone: "0244-567-8906",
      mcNumber: "GHA1567448",
      location: "Achimota",
      creditScore: 87,
      daysToPay: "14 T/A",
      reviews: {
        score: 4.1,
        count: 28,
      },
    }
  },
  {
    id: "669881",
    rowId: "669881",
    pickupLocation: "Kasoa",
    deliveryLocation: "Winneba",
    pickupDate: "August 2, 2024",
    distance: "45 km",
    rate: 1200,
    marketRate: 1000,
    weight: "1,500 kg",
    container_size: "40 ft",
    age: "6 hours",
    equipmentType: "R: Refrigerated",
    status: "Active",
    equipment: {
      type: "Refrigerated",
      container_size: "40 ft",
      weight: "1,500 kg",
      commodity: "Frozen Foods",
      load: "Full",
    },
    postedTime: "6 hours ago",
    shipmentDetails: {
      pickUpDate: "08/02",
      pickUpHours: "6:00 AM - 2:00 PM",
      dockHours: "5:00 AM - 1:00 PM",
      reference: "GH8842241",
      comments: "Frozen products - Maintain temperature at -18°C",
    },
    rateDetails: {
      total: 1200,
      trip: "45 km",
      ratePerKm: 26.7,
    },
    companyDetails: {
      name: "ColdChain GH",
      telephone: "0244-567-8907",
      mcNumber: "GHA1567449",
      location: "Kasoa",
      creditScore: 91,
      daysToPay: "7 T/A",
      reviews: {
        score: 4.4,
        count: 35,
      },
    }
  },
  {
    id: "669882",
    rowId: "669882",
    pickupLocation: "Ashaiman",
    deliveryLocation: "Akosombo",
    pickupDate: "August 3, 2024",
    distance: "95 km",
    rate: 2000,
    marketRate: 1800,
    weight: "2,200 kg",
    container_size: "40 ft",
    age: "7 hours",
    equipmentType: "F: Flatbed",
    status: "Active",
    equipment: {
      type: "Flatbed",
      container_size: "40 ft",
      weight: "2,200 kg",
      commodity: "Building Materials",
      load: "Full",
    },
    postedTime: "7 hours ago",
    shipmentDetails: {
      pickUpDate: "08/03",
      pickUpHours: "7:00 AM - 4:00 PM",
      dockHours: "6:00 AM - 3:00 PM",
      reference: "GH8842242",
      comments: "Construction materials - Forklift required",
    },
    rateDetails: {
      total: 2000,
      trip: "95 km",
      ratePerKm: 21.1,
    },
    companyDetails: {
      name: "BuildRight GH",
      telephone: "0244-567-8908",
      mcNumber: "GHA1567450",
      location: "Ashaiman",
      creditScore: 89,
      daysToPay: "30 T/A",
      reviews: {
        score: 4.2,
        count: 33,
      },
    }
  },
  {
    id: "669883",
    rowId: "669883",
    pickupLocation: "Madina, Accra",
    deliveryLocation: "Nsawam",
    pickupDate: "August 4, 2024",
    distance: "35 km",
    rate: 1000,
    marketRate: 900,
    weight: "1,100 kg",
    container_size: "20 ft",
    age: "8 hours",
    equipmentType: "V: Van",
    status: "Active",
    equipment: {
      type: "Van",
      container_size: "20 ft",
      weight: "1,100 kg",
      commodity: "Household Goods",
      load: "Full",
    },
    postedTime: "8 hours ago",
    shipmentDetails: {
      pickUpDate: "08/04",
      pickUpHours: "8:00 AM - 5:00 PM",
      dockHours: "7:00 AM - 4:00 PM",
      reference: "GH8842243",
      comments: "Household items - Handle with care",
    },
    rateDetails: {
      total: 1000,
      trip: "35 km",
      ratePerKm: 28.6,
    },
    companyDetails: {
      name: "HomeMove GH",
      telephone: "0244-567-8909",
      mcNumber: "GHA1567451",
      location: "Madina",
      creditScore: 86,
      daysToPay: "14 T/A",
      reviews: {
        score: 4.0,
        count: 22,
      },
    }
  },
  {
    id: "669884",
    rowId: "669884",
    pickupLocation: "Teshie, Accra",
    deliveryLocation: "Ada",
    pickupDate: "August 5, 2024",
    distance: "100 km",
    rate: 2200,
    marketRate: 2000,
    weight: "2,000 kg",
    container_size: "40 ft",
    age: "9 hours",
    equipmentType: "R: Refrigerated",
    status: "Active",
    equipment: {
      type: "Refrigerated",
      container_size: "40 ft",
      weight: "2,000 kg",
      commodity: "Dairy Products",
      load: "Full",
    },
    postedTime: "9 hours ago",
    shipmentDetails: {
      pickUpDate: "08/05",
      pickUpHours: "5:00 AM - 1:00 PM",
      dockHours: "4:00 AM - 12:00 PM",
      reference: "GH8842244",
      comments: "Dairy products - Temperature sensitive",
    },
    rateDetails: {
      total: 2200,
      trip: "100 km",
      ratePerKm: 22.0,
    },
    companyDetails: {
      name: "DairyFresh GH",
      telephone: "0244-567-8910",
      mcNumber: "GHA1567452",
      location: "Teshie",
      creditScore: 93,
      daysToPay: "7 T/A",
      reviews: {
        score: 4.5,
        count: 40,
      },
    }
  },
  {
    id: "669885",
    rowId: "669885",
    pickupLocation: "Nungua, Accra",
    deliveryLocation: "Prampram",
    pickupDate: "August 6, 2024",
    distance: "25 km",
    rate: 800,
    marketRate: 700,
    weight: "800 kg",
    container_size: "20 ft",
    age: "10 hours",
    equipmentType: "V: Van",
    status: "Active",
    equipment: {
      type: "Van",
      container_size: "20 ft",
      weight: "800 kg",
      commodity: "Office Supplies",
      load: "Partial",
    },
    postedTime: "10 hours ago",
    shipmentDetails: {
      pickUpDate: "08/06",
      pickUpHours: "9:00 AM - 5:00 PM",
      dockHours: "8:00 AM - 4:00 PM",
      reference: "GH8842245",
      comments: "Office materials - Standard handling",
    },
    rateDetails: {
      total: 800,
      trip: "25 km",
      ratePerKm: 32.0,
    },
    companyDetails: {
      name: "OfficeHub GH",
      telephone: "0244-567-8911",
      mcNumber: "GHA1567453",
      location: "Nungua",
      creditScore: 85,
      daysToPay: "14 T/A",
      reviews: {
        score: 3.9,
        count: 18,
      },
    }
  },
  {
    id: "669886",
    rowId: "669886",
    pickupLocation: "Dansoman, Accra",
    deliveryLocation: "Tema New Town",
    pickupDate: "August 7, 2024",
    distance: "28 km",
    rate: 900,
    marketRate: 800,
    weight: "1,300 kg",
    container_size: "40 ft",
    age: "11 hours",
    equipmentType: "V: Van",
    status: "Active",
    equipment: {
      type: "Van",
      container_size: "40 ft",
      weight: "1,300 kg",
      commodity: "Furniture",
      load: "Full",
    },
    postedTime: "11 hours ago",
    shipmentDetails: {
      pickUpDate: "08/07",
      pickUpHours: "8:00 AM - 4:00 PM",
      dockHours: "7:00 AM - 3:00 PM",
      reference: "GH8842246",
      comments: "Furniture items - Fragile handling required",
    },
    rateDetails: {
      total: 900,
      trip: "28 km",
      ratePerKm: 32.1,
    },
    companyDetails: {
      name: "FurniMove GH",
      telephone: "0244-567-8912",
      mcNumber: "GHA1567454",
      location: "Dansoman",
      creditScore: 88,
      daysToPay: "14 T/A",
      reviews: {
        score: 4.3,
        count: 29,
      },
    }
  },
  {
    id: "669887",
    rowId: "669887",
    pickupLocation: "Osu, Accra",
    deliveryLocation: "Labadi",
    pickupDate: "August 8, 2024",
    distance: "5 km",
    rate: 500,
    marketRate: 400,
    weight: "500 kg",
    container_size: "20 ft",
    age: "12 hours",
    equipmentType: "V: Van",
    status: "Active",
    equipment: {
      type: "Van",
      container_size: "20 ft",
      weight: "500 kg",
      commodity: "Restaurant Supplies",
      load: "Partial",
    },
    postedTime: "12 hours ago",
    shipmentDetails: {
      pickUpDate: "08/08",
      pickUpHours: "10:00 AM - 6:00 PM",
      dockHours: "9:00 AM - 5:00 PM",
      reference: "GH8842247",
      comments: "Restaurant equipment - Careful handling needed",
    },
    rateDetails: {
      total: 500,
      trip: "5 km",
      ratePerKm: 100.0,
    },
    companyDetails: {
      name: "RestaurantSupply GH",
      telephone: "0244-567-8913",
      mcNumber: "GHA1567455",
      location: "Osu",
      creditScore: 90,
      daysToPay: "7 T/A",
      reviews: {
        score: 4.4,
        count: 32,
      },
    }
  }
]; 