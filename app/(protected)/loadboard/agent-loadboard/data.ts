const agentLoadboardData = [
    {
        id: "669880",
        rowId: "669880",
        pickupLocation: {
            name: "Tema Industrial Area",
            coordinates: { lat: 5.6265188, lng: 0.003165 }
        },
        deliveryLocation: {
            name: "Ho Market",
            coordinates: { lat: 6.6037, lng: 0.4723 }
        },
        pickupDate: "July 30, 2024",
        distance: "165 km",
        confirmedRate: 2200,
        marketRate: 2000,
        weight: "2,100 kg",
        container_size: "20 ft",
        age: "5 minutes",
        equipmentType: "B: Box Truck",
        equipment: {
            type: "B: Box Truck",
            container_size: "20 ft",
            weight: "2,100 kg",
            commodity: "General Merchandise",
            load: "Full"
        },
        shipmentDetails: {
            pickUpDate: "07/30",
            pickUpHours: "8:00 AM - 5:00 PM",
            dockHours: "7:00 AM - 4:00 PM",
            reference: "GH8842240",
            comments: "Handle with care - Temperature controlled"
        },
        companyDetails: {
            name: "Tema Logistics Ltd",
            telephone: "0302-234-5678",
            mcNumber: "GHA1567890",
            location: "Tema Industrial Area",
            creditScore: 88,
            daysToPay: "30 T/A",
            reviews: {
                score: 4.2,
                count: 28
            }
        },
        status: "Pending Review"
    },
    {
        id: "669881",
        rowId: "669881",
        pickupLocation: {
            name: "Spintex Road, Accra",
            coordinates: { lat: 5.6268, lng: -0.1525 }
        },
        deliveryLocation: {
            name: "Sunyani Central",
            coordinates: { lat: 7.336213, lng: -2.328724 }
        },
        pickupDate: "July 31, 2024",
        distance: "385 km",
        confirmedRate: 4100,
        marketRate: 3900,
        weight: "2,800 kg",
        container_size: "40 ft",
        age: "10 minutes",
        equipmentType: "F: Flatbed",
        equipment: {
            type: "F: Flatbed",
            container_size: "40 ft",
            weight: "2,800 kg",
            commodity: "Construction Materials",
            load: "Full"
        },
        shipmentDetails: {
            pickUpDate: "07/31",
            pickUpHours: "8:00 AM - 5:00 PM",
            dockHours: "7:00 AM - 4:00 PM",
            reference: "GH8842241",
            comments: "Handle with care"
        },
        companyDetails: {
            name: "Accra Construction Co.",
            telephone: "0302-234-5679",
            mcNumber: "GHA1567891",
            location: "Spintex Road, Accra",
            creditScore: 92,
            daysToPay: "14 T/A",
            reviews: {
                score: 4.5,
                count: 35
            }
        },
        status: "Pending Review"
    },
    {
        id: "669882",
        rowId: "669882",
        pickupLocation: {
            name: "Kumasi Adum",
            coordinates: { lat: 6.687340, lng: -1.622925 }
        },
        deliveryLocation: {
            name: "Tamale Central",
            coordinates: { lat: 9.403770, lng: -0.839687 }
        },
        pickupDate: "August 1, 2024",
        distance: "420 km",
        confirmedRate: 4500,
        marketRate: 4300,
        weight: "3,200 kg",
        container_size: "40 ft",
        age: "15 minutes",
        equipmentType: "R: Refrigerated",
        equipment: {
            type: "R: Refrigerated",
            container_size: "40 ft",
            weight: "3,200 kg",
            commodity: "Perishable Goods",
            load: "Full"
        },
        shipmentDetails: {
            pickUpDate: "08/01",
            pickUpHours: "8:00 AM - 5:00 PM",
            dockHours: "7:00 AM - 4:00 PM",
            reference: "GH8842242",
            comments: "Temperature sensitive goods"
        },
        companyDetails: {
            name: "Kumasi Cold Storage",
            telephone: "0302-234-5680",
            mcNumber: "GHA1567892",
            location: "Kumasi Adum",
            creditScore: 85,
            daysToPay: "7 T/A",
            reviews: {
                score: 4.0,
                count: 22
            }
        },
        status: "Pending Review"
    },
    {
        id: "669883",
        rowId: "669883",
        pickupLocation: {
            name: "Takoradi Port",
            coordinates: { lat: 4.8956, lng: -1.7557 }
        },
        deliveryLocation: {
            name: "Wa Central",
            coordinates: { lat: 10.0601, lng: -2.5099 }
        },
        pickupDate: "August 2, 2024",
        distance: "780 km",
        confirmedRate: 7800,
        marketRate: 7500,
        weight: "4,000 kg",
        container_size: "40 ft",
        age: "20 minutes",
        equipmentType: "C: Container",
        equipment: {
            type: "C: Container",
            container_size: "40 ft",
            weight: "4,000 kg",
            commodity: "Industrial Equipment",
            load: "Full"
        },
        shipmentDetails: {
            pickUpDate: "08/02",
            pickUpHours: "8:00 AM - 5:00 PM",
            dockHours: "7:00 AM - 4:00 PM",
            reference: "GH8842243",
            comments: "Heavy equipment - Special handling"
        },
        companyDetails: {
            name: "Takoradi Port Services",
            telephone: "0302-234-5681",
            mcNumber: "GHA1567893",
            location: "Takoradi Port",
            creditScore: 95,
            daysToPay: "30 T/A",
            reviews: {
                score: 4.8,
                count: 48
            }
        },
        status: "Pending Review"
    },
    {
        id: "669884",
        rowId: "669884",
        pickupLocation: {
            name: "Accra Mall",
            coordinates: { lat: 5.6314, lng: -0.1735 }
        },
        deliveryLocation: {
            name: "Bolgatanga Market",
            coordinates: { lat: 10.7867, lng: -0.8486 }
        },
        pickupDate: "August 3, 2024",
        distance: "820 km",
        confirmedRate: 8500,
        marketRate: 8200,
        weight: "2,500 kg",
        container_size: "20 ft",
        age: "25 minutes",
        equipmentType: "V: Van",
        equipment: {
            type: "V: Van",
            container_size: "20 ft",
            weight: "2,500 kg",
            commodity: "Retail Goods",
            load: "Full"
        },
        shipmentDetails: {
            pickUpDate: "08/03",
            pickUpHours: "8:00 AM - 5:00 PM",
            dockHours: "7:00 AM - 4:00 PM",
            reference: "GH8842244",
            comments: "Fragile goods - careful handling"
        },
        companyDetails: {
            name: "Accra Retail Group",
            telephone: "0302-234-5682",
            mcNumber: "GHA1567894",
            location: "Accra Mall",
            creditScore: 90,
            daysToPay: "14 T/A",
            reviews: {
                score: 4.3,
                count: 32
            }
        },
        status: "Pending Review"
    },
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
        confirmedRate: 3200,
        marketRate: 3000,
        weight: "1,800 kg",
        container_size: "20 ft",
        age: "15 minutes",
        equipmentType: "V: Van",
        equipment: {
            type: "V: Van",
            container_size: "20 ft",
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
        pickupLocation: {
            name: "Tema Port",
            coordinates: { lat: 5.6265188, lng: 0.003165 }
        },
        deliveryLocation: {
            name: "Takoradi Harbor",
            coordinates: { lat: 4.8956, lng: -1.7557 }
        },
        pickupDate: "July 28, 2024",
        distance: "218 km",
        confirmedRate: 2800,
        marketRate: 2600,
        weight: "2,500 kg",
        container_size: "20 ft",
        age: "30 minutes",
        equipmentType: "C: Container",
        equipment: {
            type: "C: Container",
            container_size: "20 ft",
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
        pickupLocation: {
            name: "Achimota Mall, Accra",
            coordinates: { lat: 5.6131, lng: -0.2435 }
        },
        deliveryLocation: {
            name: "Cape Coast",
            coordinates: { lat: 5.1315, lng: -1.2795 }
        },
        pickupDate: "July 29, 2024",
        distance: "144 km",
        confirmedRate: 1900,
        marketRate: 1800,
        weight: "1,200 kg",
        container_size: "20 ft",
        age: "1 hour",
        equipmentType: "R: Refrigerated",
        equipment: {
            type: "R: Refrigerated",
            container_size: "20 ft",
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