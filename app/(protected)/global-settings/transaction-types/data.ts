const transactionTypesData = [
    {
        id: "1",
        name: "Standard Delivery",
        description: "Regular ground shipping within Ghana",
        basePrice: 50,
        pricePerKg: 2.5,
        status: "Active",
        maxWeight: 1000,
        estimatedDuration: "2-3 days"
    },
    {
        id: "2", 
        name: "Express Delivery",
        description: "Same-day delivery for urgent packages",
        basePrice: 100,
        pricePerKg: 5.0,
        status: "Active",
        maxWeight: 500,
        estimatedDuration: "Same day"
    },
    {
        id: "3",
        name: "Heavy Cargo",
        description: "For industrial and commercial shipments",
        basePrice: 200,
        pricePerKg: 3.0,
        status: "Active", 
        maxWeight: 5000,
        estimatedDuration: "3-5 days"
    },
    {
        id: "4",
        name: "Cold Chain",
        description: "Temperature-controlled delivery for perishables",
        basePrice: 150,
        pricePerKg: 4.0,
        status: "Active",
        maxWeight: 800,
        estimatedDuration: "1-2 days"
    },
    {
        id: "5",
        name: "Seasonal Farm Produce",
        description: "Special handling for agricultural products",
        basePrice: 80,
        pricePerKg: 2.0,
        status: "Seasonal",
        maxWeight: 2000,
        estimatedDuration: "2-3 days"
    },
    {
        id: "6",
        name: "Bulk Transport",
        description: "Large volume shipments at discounted rates",
        basePrice: 300,
        pricePerKg: 1.5,
        status: "Active",
        maxWeight: 10000,
        estimatedDuration: "4-6 days"
    },
    {
        id: "7",
        name: "Cross-Border Express",
        description: "International shipping to neighboring countries",
        basePrice: 500,
        pricePerKg: 8.0,
        status: "Active",
        maxWeight: 1500,
        estimatedDuration: "5-7 days"
    },
    {
        id: "8",
        name: "City Rush",
        description: "Ultra-fast intra-city delivery",
        basePrice: 75,
        pricePerKg: 6.0,
        status: "Active",
        maxWeight: 300,
        estimatedDuration: "2-4 hours"
    },
    {
        id: "9",
        name: "Fragile Items",
        description: "Special handling for delicate packages",
        basePrice: 120,
        pricePerKg: 4.5,
        status: "Active",
        maxWeight: 400,
        estimatedDuration: "2-3 days"
    },
    {
        id: "10",
        name: "Festival Special",
        description: "Holiday season delivery service",
        basePrice: 90,
        pricePerKg: 3.5,
        status: "Seasonal",
        maxWeight: 600,
        estimatedDuration: "1-3 days"
    }
];

export default transactionTypesData;
