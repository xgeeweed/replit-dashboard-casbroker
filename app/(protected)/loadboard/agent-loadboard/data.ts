
const agentLoadboardData = [
    {
        id: "669880",
        rowId: "669880",
        pickupLocation: "Tema Industrial Area",
        deliveryLocation: "Ho Market",
        pickupDate: "July 30, 2024",
        distance: "165 km",
        confirmedRate: 2200,
        marketRate: 2000,
        weight: "2,100 kg",
        length: "13 ft",
        age: "5 minutes",
        equipmentType: "B: Box Truck",
        equipment: {
            type: "B: Box Truck",
            length: "13 ft",
            weight: "2,100 kg",
            commodity: "General Merchandise",
            load: "Full"
        },
        status: "Pending Review"
    },
    {
        id: "669881",
        rowId: "669881",
        pickupLocation: "Spintex Road, Accra",
        deliveryLocation: "Sunyani Central",
        pickupDate: "July 31, 2024",
        distance: "385 km",
        confirmedRate: 4100,
        marketRate: 3900,
        weight: "2,800 kg",
        length: "16 ft",
        age: "10 minutes",
        equipmentType: "F: Flatbed",
        equipment: {
            type: "F: Flatbed",
            length: "16 ft",
            weight: "2,800 kg",
            commodity: "Construction Materials",
            load: "Full"
        },
        status: "Pending Review"
    },
    {
        id: "669882",
        rowId: "669882",
        pickupLocation: "Kumasi Adum",
        deliveryLocation: "Tamale Central",
        pickupDate: "August 1, 2024",
        distance: "420 km",
        confirmedRate: 4500,
        marketRate: 4300,
        weight: "3,200 kg",
        length: "18 ft",
        age: "15 minutes",
        equipmentType: "R: Refrigerated",
        equipment: {
            type: "R: Refrigerated",
            length: "18 ft",
            weight: "3,200 kg",
            commodity: "Perishable Goods",
            load: "Full"
        },
        status: "Pending Review"
    },
    {
        id: "669883",
        rowId: "669883",
        pickupLocation: "Takoradi Port",
        deliveryLocation: "Wa Central",
        pickupDate: "August 2, 2024",
        distance: "780 km",
        confirmedRate: 7800,
        marketRate: 7500,
        weight: "4,000 kg",
        length: "20 ft",
        age: "20 minutes",
        equipmentType: "C: Container",
        equipment: {
            type: "C: Container",
            length: "20 ft",
            weight: "4,000 kg",
            commodity: "Industrial Equipment",
            load: "Full"
        },
        status: "Pending Review"
    },
    {
        id: "669884",
        rowId: "669884",
        pickupLocation: "Accra Mall",
        deliveryLocation: "Bolgatanga Market",
        pickupDate: "August 3, 2024",
        distance: "820 km",
        confirmedRate: 8500,
        marketRate: 8200,
        weight: "2,500 kg",
        length: "14 ft",
        age: "25 minutes",
        equipmentType: "V: Van",
        equipment: {
            type: "V: Van",
            length: "14 ft",
            weight: "2,500 kg",
            commodity: "Retail Goods",
            load: "Full"
        },
        status: "Pending Review"
    },
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
        },
        status: "In Progress"
    },
    {
        id: "669876",
        rowId: "669876",
        pickupLocation: "Tema Port",
        deliveryLocation: "Takoradi Harbor",
        pickupDate: "July 28, 2024",
        distance: "218 km",
        confirmedRate: 2800,
        marketRate: 2600,
        weight: "2,500 kg",
        length: "20 ft",
        age: "30 minutes",
        equipmentType: "C: Container",
        equipment: {
            type: "C: Container",
            length: "20 ft",
            weight: "2,500 kg",
            commodity: "Industrial Equipment",
            load: "Full"
        },
        postedTime: "30 minutes ago",
        shipmentDetails: {
            pickUpDate: "07/28",
            pickUpHours: "7:00 AM - 2:00 PM",
            dockHours: "6:00 AM - 1:00 PM",
            reference: "GH8842236",
            comments: "Heavy machinery - Special handling required"
        },
        rateDetails: {
            total: 2800,
            trip: "218 km",
            ratePerKm: 12.8
        },
        companyDetails: {
            name: "Tema Industrial Solutions",
            telephone: "0244-123-4567",
            mcNumber: "GHA1567444",
            location: "Tema Port",
            creditScore: 92,
            daysToPay: "30 T/A",
            reviews: {
                score: 4.2,
                count: 38
            }
        },
        status: "In Progress"
    },
    {
        id: "669877",
        rowId: "669877",
        pickupLocation: "Achimota Mall, Accra",
        deliveryLocation: "Cape Coast",
        pickupDate: "July 29, 2024",
        distance: "144 km",
        confirmedRate: 1900,
        marketRate: 1800,
        weight: "1,200 kg",
        length: "15 ft",
        equipmentType: "R: Refrigerated",
        age: "1 hour",
        equipment: {
            type: "R: Refrigerated",
            length: "15 ft",
            weight: "1,200 kg",
            commodity: "Fresh Produce",
            load: "Full"
        },
        postedTime: "1 hour ago",
        shipmentDetails: {
            pickUpDate: "07/29",
            pickUpHours: "6:00 AM - 12:00 PM",
            dockHours: "5:00 AM - 11:00 AM",
            reference: "GH8842237",
            comments: "Temperature-controlled transport required - Perishable goods"
        },
        rateDetails: {
            total: 1900,
            trip: "144 km",
            ratePerKm: 13.2
        },
        companyDetails: {
            name: "Fresh Foods GH",
            telephone: "0302-789-0123",
            mcNumber: "GHA1567445",
            location: "Achimota Mall, Accra",
            creditScore: 88,
            daysToPay: "7 T/A",
            reviews: {
                score: 4.0,
                count: 25
            }
        },
        status: "Completed"
    }
];

export default agentLoadboardData;
