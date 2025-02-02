export interface FuelConsumption {
  containerType: string;
  litersPerHundredKm: number;
  kmPerLiter: number;
}

export interface CostComponent {
  name: string;
  costPerKm: number;
}

export const FUEL_CONSUMPTION: FuelConsumption[] = [
  {
    containerType: "1x40",
    litersPerHundredKm: 40, // 40 litres per 100km
    kmPerLiter: 2.5, // 2.5km per liter
  },
  {
    containerType: "2x20",
    litersPerHundredKm: 50, // 50 litres per 100km
    kmPerLiter: 2.0, // 2km per liter
  },
  {
    containerType: "1x20",
    litersPerHundredKm: 30, // 30 litres per 100km
    kmPerLiter: 3.3, // 3.3km per liter
  },
];

export const FUEL_PRICE = 15.60; // GHS per liter - configurable

export const OPERATIONAL_COSTS: CostComponent[] = [
  {
    name: "Maintenance and Repairs",
    costPerKm: 3.50,
  },
  {
    name: "Tire",
    costPerKm: 1.50,
  },
  {
    name: "Driver Salary",
    costPerKm: 1.00,
  },
  {
    name: "Toll & Miscellaneous",
    costPerKm: 1.00,
  },
  {
    name: "Depreciation & Insurance",
    costPerKm: 1.50,
  },
];

export const PROFIT_MARGINS = {
  SHORT_DISTANCE: 0.20, // 20% for distances <= 150km
  LONG_DISTANCE: 0.30, // 30% for distances > 150km
  DISTANCE_THRESHOLD: 150, // km
}; 