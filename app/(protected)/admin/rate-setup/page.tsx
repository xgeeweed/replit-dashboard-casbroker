"use client";

import { Spinner } from "@/components/ui/spinner";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculateTotalRate } from "./utils";
import Script from "next/script";

declare global {
  interface Window {
    google: any;
    initAutocomplete: () => void;
  }
}

const PICKUP_LOCATIONS = [
  { value: "WTTMA1MPS3", label: "MPS TERMINAL 3", coordinates: { lat: 5.6265188, lng: 0.003165 } },
  { value: "WITMA1GFCL", label: "GOLDEN JUBILEE FCL", coordinates: { lat: 5.6265188, lng: 0.003165 } },
  { value: "WITMA1GVHE", label: "GOLDEN JUBILEE VEHICLE", coordinates: { lat: 5.6265188, lng: 0.003165 } },
  { value: "WITMA1TRST", label: "TRANSIT TERMINAL", coordinates: { lat: 5.6265188, lng: 0.003165 } }, 
  { value: "WITMA1TBTL", label: "TEMA BONDED TERMINAL", coordinates: { lat: 5.6265188, lng: 0.003165 } },
  { value: "WITMA1REET", label: "GREEFER TERMINAL", coordinates: { lat: 5.6265188, lng: 0.003165 } },
  { value: "WITMA1REEY", label: "REEFER TRANSIT", coordinates: { lat: 5.6265188, lng: 0.003165 } },
  { value: "WITMA1GCFS", label: "GOLDEN JUBILEE CFS", coordinates: { lat: 5.6265188, lng: 0.003165 } },
  { value: "WITMA1T228", label: "BEEDEG SHIPPING", coordinates: { lat: 5.6265188, lng: 0.003165 } },
  { value: "WITMA1SCTL", label: "SAFEBOND CAR TERMINAL LIMITED", coordinates: { lat: 5.6265188, lng: 0.003165 } },
  { value: "WTTMA1TPT1", label: "GPHA TERMINAL 1", coordinates: { lat: 5.6265188, lng: 0.003165 } },
  { value: "WTTMA1TPT2", label: "GPHA TERMINAL 2", coordinates: { lat: 5.6265188, lng: 0.003165 } }, 
  { value: "WTTOR9TPOT", label: "TOR", coordinates: { lat: 5.6265188, lng: 0.003165 } },
  { value: "WITMA1CSHA", label: "CONSHIP", coordinates: { lat: 5.6265188, lng: 0.003165 } },
  { value: "WTTMA1TMAF", label: "GHANA PORT AND HARBOURS AUTHORITY", coordinates: { lat: 5.6265188, lng: 0.003165 } },
  { value: "WITMA1GLCL", label: "GOLDEN JUBILEE LCL", coordinates: { lat: 5.6265188, lng: 0.003165 } },
  { value: "WITMA1TMAB", label: "DHL LOGISTICS", coordinates: { lat: 5.6265188, lng: 0.003165 } },
  { value: "WITMA1CSHA", label: "AMARIS TERMINAL", coordinates: { lat: 5.6265188, lng: 0.003165 } },
  { value: "WITMA1ATLS", label: "ATLAS", coordinates: { lat: 5.6265188, lng: 0.003165 } },
  { value: "WITMA1KPUT", label: "KPONE UNITY TERMINAL", coordinates: { lat: 5.6265188, lng: 0.003165 } },
  { value: "WTTKD9TKOT", label: "Takoradi", coordinates: { lat: 4.8956, lng: -1.7557 } },
];

interface Coordinates {
  lat: number;
  lng: number;
}

export default function RateSetupPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    containerSize: "",
    pickupLocation: "",
    deliveryLocation: "",
  });
  const [selectedCoordinates, setSelectedCoordinates] = useState<{
    pickup: Coordinates | null;
    delivery: Coordinates | null;
  }>({
    pickup: null,
    delivery: null,
  });
  const [rateDetails, setRateDetails] = useState<any>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  // Initialize autocomplete when script is loaded
  useEffect(() => {
    if (!scriptLoaded) return;

    window.initAutocomplete = () => {
      const input = document.getElementById('deliveryLocation') as HTMLInputElement;
      if (!input || !window.google) return;

      const autocomplete = new window.google.maps.places.Autocomplete(input, {
        componentRestrictions: { country: 'GH' },
        fields: ['address_components', 'geometry', 'formatted_address'],
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          const coordinates = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
          setSelectedCoordinates(prev => ({ ...prev, delivery: coordinates }));
          setFormData(prev => ({ ...prev, deliveryLocation: place.formatted_address }));
        }
      });
    };

    // Call initAutocomplete immediately if Google Maps is already loaded
    if (window.google) {
      window.initAutocomplete();
    }
  }, [scriptLoaded]);

  const handlePickupLocationChange = (value: string) => {
    const location = PICKUP_LOCATIONS.find(loc => loc.value === value);
    if (location) {
      setSelectedCoordinates(prev => ({ ...prev, pickup: location.coordinates }));
      setFormData(prev => ({ ...prev, pickupLocation: value }));
    }
  };

  const handleCalculate = async () => {
    if (!selectedCoordinates.pickup || !selectedCoordinates.delivery) {
      console.error("Missing coordinates");
      return;
    }

    try {
      setLoading(true);
      const result = await calculateTotalRate(
        formData.containerSize,
        selectedCoordinates.pickup,
        selectedCoordinates.delivery
      );
      setRateDetails(result);
    } catch (error) {
      console.error("Error calculating rate:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initAutocomplete`}
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Rate Setup</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Calculate Rate</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Container Size</label>
                <Select
                  value={formData.containerSize}
                  onValueChange={(value) => setFormData({ ...formData, containerSize: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select container size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20 ft">20 ft</SelectItem>
                    <SelectItem value="40 ft">40 ft</SelectItem>
                    <SelectItem value="2x20 ft">2x20 ft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Pickup Location</label>
                <Select
                  value={formData.pickupLocation}
                  onValueChange={handlePickupLocationChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select pickup location" />
                  </SelectTrigger>
                  <SelectContent>
                    {PICKUP_LOCATIONS.map((location) => (
                      <SelectItem key={location.value} value={location.value}>
                        {location.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Delivery Location</label>
                <Input
                  id="deliveryLocation"
                  placeholder="Start typing to search for a location..."
                  value={formData.deliveryLocation}
                  onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                  className="w-full"
                />
              </div>

              <Button
                onClick={handleCalculate}
                disabled={loading || !formData.containerSize || !selectedCoordinates.pickup || !selectedCoordinates.delivery}
                className="w-full"
              >
                {loading ? "Calculating..." : "Calculate Rate"}
              </Button>
            </div>
          </Card>

          {rateDetails && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Rate Details</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">One-way Distance:</span>
                  <span className="font-medium">{rateDetails.distanceKm.toFixed(2)} km</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Round Trip Distance:</span>
                  <span className="font-medium">{(rateDetails.distanceKm * 2).toFixed(2)} km</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Fuel Cost per km:</span>
                  <span className="font-medium">GHS {rateDetails.fuelCostPerKm.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Operational Cost per km:</span>
                  <span className="font-medium">GHS {rateDetails.operationalCostPerKm.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Total Cost per km:</span>
                  <span className="font-medium">GHS {rateDetails.totalCostPerKm.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Profit Margin:</span>
                  <span className="font-medium">{(rateDetails.profitMargin * 100).toFixed(0)}%</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Final Rate per km (incl. profit):</span>
                  <span className="font-medium">GHS {rateDetails.finalRatePerKm.toFixed(2)}</span>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Rate:</span>
                    <span className="text-xl font-bold text-primary">
                      GHS {rateDetails.totalRate.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    Total Rate = Final Rate per km × (Distance × 2)
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
} 