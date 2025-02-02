/// <reference types="@types/google.maps" />
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MapPin, Loader2, Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { calculateTotalRate } from "@/app/(protected)/admin/rate-setup/utils";

declare global {
  interface Window {
    google: any;
    initAutocomplete: () => void;
  }
}

type GoogleMapsAutocomplete = google.maps.places.Autocomplete;

interface Location {
  id: string;
  name: string;
  region: string;
}

interface RouteRate {
  baseRate: number;
  estimatedHours: number;
  distance: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}

interface DetailedRouteRate {
  distanceKm: number;
  fuelCostPerKm: number;
  operationalCostPerKm: number;
  totalCostPerKm: number;
  profitMargin: number;
  finalRatePerKm: number;
  totalRate: number;
}

interface ChangeRouteWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newDestination: string, newRate: number, distanceKm: number) => void;
  currentDestination: string;
  distance: string;
  currentRate: number;
  containerSize: string;
}

// Simulated locations data
const locations: Location[] = [
  { id: "ACC", name: "Accra", region: "Greater Accra" },
  { id: "KSI", name: "Kumasi", region: "Ashanti" },
  { id: "TAK", name: "Takoradi", region: "Western" },
  { id: "TAM", name: "Tamale", region: "Northern" },
  { id: "TEM", name: "Tema", region: "Greater Accra" },
  { id: "NSM", name: "Nsawam", region: "Eastern" },
  { id: "WIN", name: "Winneba", region: "Central" },
  { id: "KFR", name: "Koforidua", region: "Eastern" },
  { id: "SYI", name: "Sunyani", region: "Bono" },
  { id: "HHO", name: "Ho", region: "Volta" },
];

// Simulated route rate calculation
const calculateRouteRate = (from: Location, to: Location): RouteRate => {
  // Simple distance calculation (just for demo)
  const baseRate = Math.floor(Math.random() * 2000) + 3000;
  const hours = Math.floor(Math.random() * 8) + 2;
  const distance = `${Math.floor(Math.random() * 400) + 100} km`;

  return {
    baseRate,
    estimatedHours: hours,
    distance,
  };
};

// Simulated API function to get available locations
const getAvailableLocations = async (): Promise<Location[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return locations;
};

// Simulated API function to calculate route rate
const getRouteRate = async (fromLocationId: string, toLocationId: string): Promise<RouteRate> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const fromLocation = locations.find(loc => loc.id === fromLocationId);
  const toLocation = locations.find(loc => loc.id === toLocationId);
  
  if (!fromLocation || !toLocation) {
    throw new Error('Invalid location IDs');
  }
  
  return calculateRouteRate(fromLocation, toLocation);
};

export function ChangeRouteWizard({
  isOpen,
  onClose,
  onConfirm,
  currentDestination,
  distance,
  currentRate,
  containerSize,
}: ChangeRouteWizardProps) {
  const [step, setStep] = useState(1);
  const [selectedLocationId, setSelectedLocationId] = useState<string>("");
  const [routeRate, setRouteRate] = useState<DetailedRouteRate | null>(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState<Coordinates | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const autocompleteRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const initializeAutocomplete = useCallback(() => {
    console.log('Initializing autocomplete...');
    if (!inputRef.current || !window.google?.maps?.places) {
      console.error('Missing input ref or Places API');
      return;
    }

    try {
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }

      console.log('Creating autocomplete instance...');
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: 'GH' },
        fields: ['address_components', 'geometry', 'formatted_address'],
        types: ['geocode', 'establishment']
      });

      console.log('Adding place_changed listener...');
      autocomplete.addListener('place_changed', async () => {
        try {
          const place = autocomplete.getPlace();
          console.log('Selected place:', place);

          if (!place.geometry?.location) {
            console.error('No geometry found for place');
            return;
          }

          const coordinates = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
          
          setSelectedCoordinates(coordinates);
          setSelectedLocationId(place.formatted_address || '');
          setInputValue(place.formatted_address || '');
          
          setIsLoading(true);
          
          try {
            const formattedSize = containerSize.toLowerCase().includes('40') ? '1x40' : 
                                containerSize.toLowerCase().includes('2x20') ? '2x20' : '1x20';
            
            const rate = await calculateTotalRate(
              formattedSize,
              { lat: 5.6265188, lng: 0.003165 },
              coordinates
            );
            setRouteRate(rate);
            setStep(2);
          } catch (error) {
            console.error("Failed to calculate rate:", error);
          } finally {
            setIsLoading(false);
          }
        } catch (error) {
          console.error('Error in place_changed handler:', error);
        }
      });

      autocompleteRef.current = autocomplete;
      console.log('Autocomplete initialized successfully');
    } catch (error) {
      console.error('Error initializing autocomplete:', error);
    }
  }, [containerSize]);

  // Add effect to update position
  useEffect(() => {
    if (!isOpen || !inputRef.current) return;

    const updatePosition = () => {
      const rect = inputRef.current?.getBoundingClientRect();
      if (rect) {
        document.documentElement.style.setProperty('--autocomplete-width', `${rect.width}px`);
        document.documentElement.style.setProperty('--autocomplete-left', `${rect.left}px`);
        document.documentElement.style.setProperty('--autocomplete-top', `${rect.bottom + 4}px`);
      }
    };

    // Initial position update
    updatePosition();

    // Update position on resize and scroll
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const loadGoogleMapsScript = () => {
      return new Promise<void>((resolve) => {
        // Remove any existing script and global objects
        const existingScript = document.getElementById('google-maps-script');
        if (existingScript) {
          existingScript.remove();
        }

        // Reset Google object
        // @ts-ignore
        window.google = undefined;

        // Define callback
        window.initAutocomplete = () => {
          console.log('Google Maps callback triggered');
          setTimeout(() => {
            if (window.google?.maps?.places) {
              console.log('Places API available');
              initializeAutocomplete();
            } else {
              console.error('Places API not available');
            }
          }, 100);
          resolve();
        };

        // Create and add the script
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initAutocomplete`;
        script.id = 'google-maps-script';
        script.async = true;
        script.defer = true;

        document.head.appendChild(script);
      });
    };

    loadGoogleMapsScript();

    return () => {
      if (autocompleteRef.current && window.google) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
      const scriptToRemove = document.getElementById('google-maps-script');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
      window.initAutocomplete = () => {};
      // @ts-ignore
      window.google = undefined;
    };
  }, [isOpen, initializeAutocomplete]);

  const handleClose = () => {
    if (autocompleteRef.current && window.google) {
      window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
    }
    setInputValue("");
    setSelectedLocationId("");
    setSelectedCoordinates(null);
    setRouteRate(null);
    setStep(1);
    onClose();
  };

  const handleConfirm = () => {
    if (selectedLocationId && routeRate) {
      onConfirm(
        selectedLocationId, 
        routeRate.totalRate,
        routeRate.distanceKm
      );
      handleClose();
    }
  };

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={handleClose}
    >
      <DialogContent 
        className={cn(
          "sm:max-w-[425px]",
          "before:bg-transparent",
          "after:bg-transparent",
          "overflow-visible"
        )}
      >
        <DialogHeader>
          <DialogTitle>Change Route</DialogTitle>
          <DialogDescription>
            {step === 1
              ? "Select the new destination for this load."
              : "Review and confirm the route change."}
          </DialogDescription>
        </DialogHeader>

        {step === 1 ? (
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Current Destination</Label>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{currentDestination}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>New Destination</Label>
              <div className="relative" style={{ zIndex: 100 }}>
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    id="newDestination"
                    name="newDestination"
                    placeholder="Start typing to search for a location..."
                    value={inputValue}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    autoComplete="off"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                      }
                    }}
                  />
                  {isLoading && (
                    <div className="absolute right-3 top-3">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                </div>
                <style jsx global>{`
                  .pac-container {
                    margin-top: 4px !important;
                    position: absolute !important;
                    z-index: 1000 !important;
                    border-radius: 6px !important;
                    border: 1px solid var(--border) !important;
                    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1) !important;
                    background-color: white !important;
                    font-family: inherit !important;
                    padding: 0 !important;
                    width: 100% !important;
                    left: 0 !important;
                    top: 100% !important;
                  }
                  .pac-container:empty {
                    display: none !important;
                  }
                  .pac-container:after {
                    display: none !important;
                  }
                  .pac-item {
                    padding: 8px 12px !important;
                    font-family: inherit !important;
                    font-size: 0.875rem !important;
                    cursor: pointer !important;
                  }
                  .pac-item:hover {
                    background-color: var(--accent) !important;
                  }
                  .pac-item-selected {
                    background-color: var(--accent) !important;
                  }
                  .pac-icon {
                    display: none !important;
                  }
                  .pac-item-query {
                    font-size: 0.875rem !important;
                    padding-right: 4px !important;
                  }
                  .pac-matched {
                    font-weight: 500 !important;
                  }
                  /* Force display */
                  .pac-container {
                    display: block !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                    transform: none !important;
                  }
                `}</style>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Route Details</Label>
              <div className="rounded-lg border p-3 text-sm space-y-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-red-500" />
                  <span className="text-muted-foreground">From: {currentDestination}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-green-500" />
                  <span className="text-muted-foreground">
                    To: {selectedLocationId}
                  </span>
                </div>
                <div className="flex items-center space-x-2 pt-2 border-t">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-muted-foreground">
                    Distance: {routeRate?.distanceKm.toFixed(2)} km
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Rate Breakdown</Label>
              <div className="rounded-lg border p-3 text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fuel Cost per km:</span>
                  <span>GHS {routeRate?.fuelCostPerKm.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Operational Cost per km:</span>
                  <span>GHS {routeRate?.operationalCostPerKm.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Cost per km:</span>
                  <span>GHS {routeRate?.totalCostPerKm.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Profit Margin:</span>
                  <span>{(routeRate?.profitMargin ?? 0) * 100}%</span>
                </div>
                <div className="flex justify-between font-medium pt-2 border-t">
                  <span>Final Rate per km:</span>
                  <span>GHS {routeRate?.finalRatePerKm.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          {step === 2 && (
            <Button onClick={handleConfirm} disabled={isLoading}>
              Confirm Changes
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 