export interface Location {
  id: string;
  name: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface RouteRate {
  fromLocationId: string;
  toLocationId: string;
  baseRate: number;
  distance: string;
  estimatedHours: number;
}

export const locations: Location[] = [
  {
    id: "ACC",
    name: "Accra",
    region: "Greater Accra",
    coordinates: { lat: 5.6037, lng: -0.1870 }
  },
  {
    id: "KUM",
    name: "Kumasi",
    region: "Ashanti",
    coordinates: { lat: 6.6885, lng: -1.6244 }
  },
  {
    id: "TAM",
    name: "Tamale",
    region: "Northern",
    coordinates: { lat: 9.4035, lng: -0.8393 }
  },
  {
    id: "TAK",
    name: "Takoradi",
    region: "Western",
    coordinates: { lat: 4.9016, lng: -1.7831 }
  },
  {
    id: "TEM",
    name: "Tema",
    region: "Greater Accra",
    coordinates: { lat: 5.6699, lng: -0.0167 }
  },
  {
    id: "CAP",
    name: "Cape Coast",
    region: "Central",
    coordinates: { lat: 5.1315, lng: -1.2795 }
  },
  {
    id: "HOH",
    name: "Ho",
    region: "Volta",
    coordinates: { lat: 6.6016, lng: 0.4719 }
  },
  {
    id: "BOL",
    name: "Bolgatanga",
    region: "Upper East",
    coordinates: { lat: 10.7856, lng: -0.8514 }
  },
  {
    id: "WA",
    name: "Wa",
    region: "Upper West",
    coordinates: { lat: 10.0601, lng: -2.5099 }
  },
  {
    id: "SUN",
    name: "Sunyani",
    region: "Bono",
    coordinates: { lat: 7.3349, lng: -2.3123 }
  }
];

// Helper function to calculate distance between two coordinates
function calculateDistance(from: Location, to: Location): number {
  const R = 6371; // Earth's radius in km
  const dLat = (to.coordinates.lat - from.coordinates.lat) * Math.PI / 180;
  const dLon = (to.coordinates.lng - from.coordinates.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(from.coordinates.lat * Math.PI / 180) * Math.cos(to.coordinates.lat * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Simulated rate calculation based on distance
export function calculateRouteRate(fromLocation: Location, toLocation: Location): RouteRate {
  const distance = calculateDistance(fromLocation, toLocation);
  const baseRate = Math.round(distance * 10); // GHS 10 per km
  const estimatedHours = distance / 50; // Assuming average speed of 50 km/h

  return {
    fromLocationId: fromLocation.id,
    toLocationId: toLocation.id,
    baseRate,
    distance: `${Math.round(distance)} km`,
    estimatedHours: Math.round(estimatedHours * 10) / 10
  };
}

// Simulated API function to get available locations
export async function getAvailableLocations(): Promise<Location[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return locations;
}

// Simulated API function to calculate route rate
export async function getRouteRate(fromLocationId: string, toLocationId: string): Promise<RouteRate> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const fromLocation = locations.find(loc => loc.id === fromLocationId);
  const toLocation = locations.find(loc => loc.id === toLocationId);
  
  if (!fromLocation || !toLocation) {
    throw new Error('Invalid location IDs');
  }
  
  return calculateRouteRate(fromLocation, toLocation);
} 