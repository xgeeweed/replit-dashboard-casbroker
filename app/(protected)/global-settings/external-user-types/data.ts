const externalUserTypesData = [
    {
        rowId: "1",
        name: "Freight Broker",
        description: "External brokers who connect shippers with carriers",
        accessLevel: "Advanced",
        status: "Active",
        permissions: ["view_loads", "create_loads", "manage_bookings"],
        contactPerson: "Kwame Owusu",
        phone: "0244123456"
    },
    {
        rowId: "2", 
        name: "Independent Driver",
        description: "Self-employed drivers who own their vehicles",
        accessLevel: "Basic",
        status: "Active",
        permissions: ["view_loads", "accept_loads"],
        contactPerson: "Yaw Mensah",
        phone: "0201234567"
    },
    {
        rowId: "3",
        name: "Fleet Owner",
        description: "Owners of multiple commercial vehicles",
        accessLevel: "Advanced",
        status: "Active", 
        permissions: ["view_loads", "manage_fleet", "accept_loads", "view_analytics"],
        contactPerson: "Abena Sarpong",
        phone: "0277891234"
    },
    {
        rowId: "4",
        name: "Shipping Company Agent",
        description: "Representatives from shipping companies",
        accessLevel: "Intermediate",
        status: "Active",
        permissions: ["view_loads", "create_loads", "view_analytics"],
        contactPerson: "Kofi Addo",
        phone: "0244567890"
    },
    {
        rowId: "5",
        name: "Warehouse Manager",
        description: "External warehouse facility managers",
        accessLevel: "Intermediate",
        status: "Active",
        permissions: ["view_inventory", "manage_warehouse", "view_loads"],
        contactPerson: "Ama Darko",
        phone: "0201987654"
    },
    {
        rowId: "6",
        name: "Customs Agent",
        description: "Licensed customs clearing agents",
        accessLevel: "Advanced",
        status: "Active",
        permissions: ["view_loads", "manage_customs", "view_documents"],
        contactPerson: "John Mensah",
        phone: "0277123456"
    },
    {
        rowId: "7",
        name: "Port Authority Agent",
        description: "Representatives from port authorities",
        accessLevel: "Intermediate",
        status: "Active",
        permissions: ["view_loads", "manage_port_operations"],
        contactPerson: "Grace Asare",
        phone: "0244789012"
    },
    {
        rowId: "8",
        name: "Insurance Provider",
        description: "Transportation insurance agents",
        accessLevel: "Basic",
        status: "Active",
        permissions: ["view_loads", "manage_insurance"],
        contactPerson: "Abdul Rahman",
        phone: "0201345678"
    }
];

export default externalUserTypesData;
