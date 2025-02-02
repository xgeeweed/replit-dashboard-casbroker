import { FUEL_CONSUMPTION, FUEL_PRICE, OPERATIONAL_COSTS, PROFIT_MARGINS } from "./config";

interface Coordinates {
  lat: number;
  lng: number;
}

interface ContainerConfig {
  size: "20 ft" | "40 ft";
  quantity: number;
}

export function parseContainerConfig(containerSize: string): ContainerConfig {
  const size = containerSize.includes("40") ? "40 ft" : "20 ft";
  const quantity = containerSize.includes("2x") ? 2 : 1;
  return { size, quantity };
}

export function getFuelConsumptionType(containerConfig: ContainerConfig): string {
  if (containerConfig.size === "40 ft") return "1x40";
  return containerConfig.quantity === 2 ? "2x20" : "1x20";
}

export function calculateFuelCostPerKm(containerSize: string): number {
  const containerConfig = parseContainerConfig(containerSize);
  const consumptionType = getFuelConsumptionType(containerConfig);
  
  const consumption = FUEL_CONSUMPTION.find(c => c.containerType === consumptionType);
  if (!consumption) throw new Error(`Invalid container configuration: ${containerSize}`);

  return FUEL_PRICE / consumption.kmPerLiter;
}

export function calculateOperationalCostPerKm(): number {
  return OPERATIONAL_COSTS.reduce((total, cost) => total + cost.costPerKm, 0);
}

export function calculateTotalCostPerKm(containerSize: string): number {
  const fuelCost = calculateFuelCostPerKm(containerSize);
  const operationalCost = calculateOperationalCostPerKm();
  return fuelCost + operationalCost;
}

export function calculateProfitMargin(distanceKm: number): number {
  return distanceKm <= PROFIT_MARGINS.DISTANCE_THRESHOLD 
    ? PROFIT_MARGINS.SHORT_DISTANCE 
    : PROFIT_MARGINS.LONG_DISTANCE;
}

function calculateHaversineDistance(pickup: Coordinates, delivery: Coordinates): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (delivery.lat - pickup.lat) * Math.PI / 180;
  const dLon = (delivery.lng - pickup.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(pickup.lat * Math.PI / 180) * Math.cos(delivery.lat * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  // Add 20% to account for road routes being longer than straight-line distance
  return distance * 1.2;
}

export async function calculateTotalRate(
  containerSize: string,
  pickup: Coordinates,
  delivery: Coordinates
): Promise<{
  distanceKm: number;
  fuelCostPerKm: number;
  operationalCostPerKm: number;
  totalCostPerKm: number;
  profitMargin: number;
  finalRatePerKm: number;
  totalRate: number;
}> {
  const distanceKm = calculateHaversineDistance(pickup, delivery);
  const fuelCostPerKm = calculateFuelCostPerKm(containerSize);
  const operationalCostPerKm = calculateOperationalCostPerKm();
  const totalCostPerKm = fuelCostPerKm + operationalCostPerKm;
  const profitMargin = calculateProfitMargin(distanceKm);
  
  // Calculate final rate per km using the formula: Final Cost Per km x (1 + profit margin)
  const finalRatePerKm = totalCostPerKm * (1 + profitMargin);
  
  // Calculate total rate by multiplying final rate per km with round trip distance (× 2)
  const totalRate = finalRatePerKm * (distanceKm * 2);

  return {
    distanceKm,
    fuelCostPerKm,
    operationalCostPerKm,
    totalCostPerKm,
    profitMargin,
    finalRatePerKm,
    totalRate,
  };
} 