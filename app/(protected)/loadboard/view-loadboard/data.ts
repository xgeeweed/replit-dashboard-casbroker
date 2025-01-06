const loadboardData = [
    {
        id: "669875",
        rowId: "669875",
        pickupLocation: "Airport City, Accra",
        deliveryLocation: "Adum, Kumasi", 
        pickupDate: "July 27, 2024",
        distance: "252 km",
        confirmedRate: 3200,
        marketRate: 3000,
        weight: "1,800 kg",
        length: "11.5 ft",
        age: "15 minutes",
        equipmentType: "V: Van",
        equipment: {
            type: "V: Van",
            length: "11.5 ft",
            weight: "1,800 kg",
            commodity: "Laptops & Electronics",
            load: "Full"
        },
        postedTime: "15 minutes ago",
        shipmentDetails: {
            pickUpDate: "07/28",
            pickUpHours: "9:00 AM - 4:00 PM",
            dockHours: "8:00 AM - 3:00 PM",
            reference: "GH8842235",
            comments: "Insurance included - Air-conditioned van required - No stacking"
        },
        rateDetails: {
            total: 3200,
            trip: "252 km",
            ratePerKm: 12.7
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
                count: 43
            }
        }
    },
    {
        id: "669876",
        rowId: "669876",
        pickupLocation: "Tema Industrial Area",
        deliveryLocation: "Takoradi Harbor",
        pickupDate: "July 28, 2024",
        distance: "218 km",
        rate: 2800,
        marketRate: 2600,
        weight: "2,200 kg",
        length: "13.8 ft",
        age: "45 minutes",
        equipmentType: "R: Refrigerated",
        equipment: {
            type: "R: Refrigerated",
            length: "13.8 ft",
            weight: "2,200 kg", 
            commodity: "Fresh Produce",
            load: "Full"
        },
        postedTime: "45 minutes ago",
        shipmentDetails: {
            pickUpDate: "07/28",
            pickUpHours: "6:00 AM - 12:00 PM",
            dockHours: "5:00 AM - 11:00 AM",
            reference: "GH8842236",
            comments: "Temperature controlled vehicle required - Perishable goods"
        },
        rateDetails: {
            total: 2800,
            trip: "218 km",
            ratePerKm: 12.8
        },
        companyDetails: {
            name: "Fresh Foods GH",
            telephone: "0244-123-4567",
            mcNumber: "GHA1567444",
            location: "Tema Industrial Area",
            creditScore: 92,
            daysToPay: "7 T/A",
            reviews: {
                score: 4.2,
                count: 38
            }
        }
    },
    {
        id: "669877",
        rowId: "669877",
        pickupLocation: "Spintex Road, Accra",
        deliveryLocation: "Cape Coast",
        pickupDate: "July 29, 2024",
        distance: "144 km",
        rate: 1800,
        marketRate: 1700,
        weight: "3,500 kg",
        length: "19.7 ft",
        age: "1 hour",
        equipmentType: "F: Flatbed",
        equipment: {
            type: "F: Flatbed",
            length: "19.7 ft",
            weight: "3,500 kg",
            commodity: "Construction Materials",
            load: "Full"
        },
        postedTime: "1 hour ago",
        shipmentDetails: {
            pickUpDate: "07/29",
            pickUpHours: "7:00 AM - 2:00 PM",
            dockHours: "6:00 AM - 1:00 PM",
            reference: "GH8842237",
            comments: "Heavy machinery - Crane required for loading/unloading"
        },
        rateDetails: {
            total: 1800,
            trip: "144 km",
            ratePerKm: 12.5
        },
        companyDetails: {
            name: "BuildGhana Ltd",
            telephone: "0302-789-0123",
            mcNumber: "GHA1567445",
            location: "Spintex Road, Accra",
            creditScore: 88,
            daysToPay: "30 T/A",
            reviews: {
                score: 4.0,
                count: 25
            }
        }
    },
    {
        id: "669878",
        rowId: "669878",
        pickupLocation: "Tamale Central",
        deliveryLocation: "Bolgatanga",
        pickupDate: "July 30, 2024",
        distance: "164 km",
        rate: 2100,
        marketRate: 2000,
        weight: "2,000 kg",
        length: "13.1 ft",
        age: "2 hours",
        equipmentType: "V: Van",
        equipment: {
            type: "V: Van",
            length: "13.1 ft",
            weight: "2,000 kg",
            commodity: "Textiles",
            load: "Partial"
        },
        postedTime: "2 hours ago",
        shipmentDetails: {
            pickUpDate: "07/30",
            pickUpHours: "8:00 AM - 3:00 PM",
            dockHours: "7:00 AM - 2:00 PM",
            reference: "GH8842238",
            comments: "Dry van required - Multiple pickup points"
        },
        rateDetails: {
            total: 2100,
            trip: "164 km",
            ratePerKm: 12.8
        },
        companyDetails: {
            name: "Northern Textiles",
            telephone: "0377-456-7890",
            mcNumber: "GHA1567446",
            location: "Tamale Central",
            creditScore: 90,
            daysToPay: "21 T/A",
            reviews: {
                score: 4.3,
                count: 31
            }
        }
    },
    {
        id: "669879",
        rowId: "669879",
        pickupLocation: "Tema Port",
        deliveryLocation: "Ho",
        pickupDate: "July 31, 2024",
        distance: "166 km",
        rate: 2300,
        marketRate: 2200,
        weight: "4,000 kg",
        length: "20 ft",
        age: "3 hours",
        equipmentType: "C: Container",
        equipment: {
            type: "C: Container",
            length: "20 ft",
            weight: "4,000 kg",
            commodity: "Import Goods",
            load: "Full"
        },
        postedTime: "3 hours ago",
        shipmentDetails: {
            pickUpDate: "07/31",
            pickUpHours: "10:00 AM - 5:00 PM",
            dockHours: "9:00 AM - 4:00 PM",
            reference: "GH8842239",
            comments: "Container chassis required - Customs cleared"
        },
        rateDetails: {
            total: 2300,
            trip: "166 km",
            ratePerKm: 13.9
        },
        companyDetails: {
            name: "Volta Imports",
            telephone: "0362-234-5678",
            mcNumber: "GHA1567447",
            location: "Tema Port",
            creditScore: 94,
            daysToPay: "14 T/A",
            reviews: {
                score: 4.6,
                count: 52
            }
        }
    },
    {
        id: "669880",
        rowId: "669880",
        pickupLocation: "Suame Magazine, Kumasi",
        deliveryLocation: "Techiman",
        pickupDate: "August 1, 2024",
        distance: "126 km",
        rate: 1600,
        marketRate: 1500,
        weight: "2,800 kg",
        length: "16.4 ft",
        age: "4 hours",
        equipmentType: "F: Flatbed",
        equipment: {
            type: "F: Flatbed",
            length: "16.4 ft",
            weight: "2,800 kg",
            commodity: "Auto Parts",
            load: "Full"
        },
        postedTime: "4 hours ago",
        shipmentDetails: {
            pickUpDate: "08/01",
            pickUpHours: "8:30 AM - 3:30 PM",
            dockHours: "7:30 AM - 2:30 PM",
            reference: "GH8842240",
            comments: "Secured strapping required - Multiple items"
        },
        rateDetails: {
            total: 1600,
            trip: "126 km",
            ratePerKm: 12.7
        },
        companyDetails: {
            name: "Suame Parts Ltd",
            telephone: "0322-345-6789",
            mcNumber: "GHA1567448",
            location: "Suame Magazine, Kumasi",
            creditScore: 87,
            daysToPay: "21 T/A",
            reviews: {
                score: 4.1,
                count: 29
            }
        }
    },
    {
        id: "669881",
        rowId: "669881",
        pickupLocation: "Obuasi",
        deliveryLocation: "Tarkwa",
        pickupDate: "August 2, 2024",
        distance: "183 km",
        rate: 2500,
        marketRate: 2400,
        weight: "5,000 kg",
        length: "23 ft",
        age: "5 hours",
        equipmentType: "T: Tanker",
        equipment: {
            type: "T: Tanker",
            length: "23 ft",
            weight: "5,000 kg",
            commodity: "Industrial Chemicals",
            load: "Full"
        },
        postedTime: "5 hours ago",
        shipmentDetails: {
            pickUpDate: "08/02",
            pickUpHours: "7:00 AM - 2:00 PM",
            dockHours: "6:00 AM - 1:00 PM",
            reference: "GH8842241",
            comments: "Hazmat certification required - Sealed tanker"
        },
        rateDetails: {
            total: 2500,
            trip: "183 km",
            ratePerKm: 13.7
        },
        companyDetails: {
            name: "Mining Solutions GH",
            telephone: "0322-678-9012",
            mcNumber: "GHA1567449",
            location: "Obuasi",
            creditScore: 96,
            daysToPay: "14 T/A",
            reviews: {
                score: 4.7,
                count: 45
            }
        }
    },
    {
        id: "669882",
        rowId: "669882",
        pickupLocation: "Koforidua",
        deliveryLocation: "Nkawkaw",
        pickupDate: "August 3, 2024",
        distance: "85 km",
        rate: 1200,
        marketRate: 1100,
        weight: "1,500 kg",
        length: "12.5 ft",
        age: "6 hours",
        equipmentType: "V: Van",
        equipment: {
            type: "V: Van",
            length: "12.5 ft",
            weight: "1,500 kg",
            commodity: "Retail Goods",
            load: "Partial"
        },
        postedTime: "6 hours ago",
        shipmentDetails: {
            pickUpDate: "08/03",
            pickUpHours: "9:00 AM - 4:00 PM",
            dockHours: "8:00 AM - 3:00 PM",
            reference: "GH8842242",
            comments: "Multiple drop points - Hand unloading required"
        },
        rateDetails: {
            total: 1200,
            trip: "85 km",
            ratePerKm: 14.1
        },
        companyDetails: {
            name: "Eastern Distributors",
            telephone: "0342-123-4567",
            mcNumber: "GHA1567450",
            location: "Koforidua",
            creditScore: 89,
            daysToPay: "21 T/A",
            reviews: {
                score: 4.2,
                count: 33
            }
        }
    },
    {
        id: "669883",
        rowId: "669883",
        pickupLocation: "Sekondi",
        deliveryLocation: "Axim",
        pickupDate: "August 4, 2024",
        distance: "76 km",
        rate: 1100,
        marketRate: 1000,
        weight: "2,400 kg",
        length: "14.8 ft",
        age: "7 hours",
        equipmentType: "R: Refrigerated",
        equipment: {
            type: "R: Refrigerated",
            length: "14.8 ft",
            weight: "2,400 kg",
            commodity: "Seafood",
            load: "Full"
        },
        postedTime: "7 hours ago",
        shipmentDetails: {
            pickUpDate: "08/04",
            pickUpHours: "5:00 AM - 12:00 PM",
            dockHours: "4:00 AM - 11:00 AM",
            reference: "GH8842243",
            comments: "Temperature monitoring required - Fresh seafood transport"
        },
        rateDetails: {
            total: 1100,
            trip: "76 km",
            ratePerKm: 14.5
        },
        companyDetails: {
            name: "Coastal Seafoods",
            telephone: "0312-345-6789",
            mcNumber: "GHA1567451",
            location: "Sekondi",
            creditScore: 91,
            daysToPay: "7 T/A",
            reviews: {
                score: 4.4,
                count: 37
            }
        }
    }
];

export default loadboardData;
