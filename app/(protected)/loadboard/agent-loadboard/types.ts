export type Location = {
  name: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
};

export type LoadData = {
  id: string;
  rowId: string;
  pickupLocation: Location;
  deliveryLocation: Location;
  pickupDate: string;
  distance: string;
  confirmedRate: number;
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
  postedTime?: string;
}; 