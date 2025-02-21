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
import { Input } from "@/components/ui/input";
import { MapPin, Loader2, Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { calculateTotalRate } from "@/app/(protected)/admin/rate-setup/utils";

// Proper Google Maps types
declare global {
  interface Window {
    google: {
      maps: {
        places: {
          Autocomplete: new (
            inputField: HTMLInputElement,
            opts?: {
              componentRestrictions?: { country: string };
              fields?: string[];
              types?: string[];
            }
          ) => {
            addListener: (event: string, handler: () => void) => void;
            getPlace: () => any;
          };
          AutocompleteService: new () => {
            getPlacePredictions: (
              request: {
                input: string;
                componentRestrictions?: { country: string };
                types?: string[];
              },
              callback: (
                predictions: Array<{ description: string; place_id: string }> | null,
                status: string
              ) => void
            ) => void;
          };
          PlacesService: new (attrContainer: HTMLElement) => {
            getDetails: (
              request: { placeId: string },
              callback: (result: any, status: string) => void
            ) => void;
          };
          PlacesServiceStatus: {
            OK: string;
            ZERO_RESULTS: string;
            OVER_QUERY_LIMIT: string;
            REQUEST_DENIED: string;
            INVALID_REQUEST: string;
          };
        };
        event: {
          clearInstanceListeners: (instance: any) => void;
          addListener: (
            instance: any,
            event: string,
            handler: () => void
          ) => void;
        };
      };
    };
  }
}

interface GooglePlace {
  geometry: {
    location: {
      lat(): number;
      lng(): number;
    };
  };
  formatted_address: string;
  name: string;
  place_id: string;
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
  onConfirm: (data: {
    destination: string;
    rate: number;
    distanceKm: number;
    coordinates: Coordinates;
  }) => void;
  currentDestination: string;
  currentCoordinates?: Coordinates;
  containerSize: string;
  originCoordinates?: Coordinates;
}

// Utility function to load Google Maps script
const loadGoogleMapsScript = (apiKey: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.google?.maps?.places) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => resolve();
    script.onerror = (error) => reject(error);

    document.head.appendChild(script);
  });
};

export function ChangeRouteWizard({
  isOpen,
  onClose,
  onConfirm,
  currentDestination,
  currentCoordinates,
  containerSize,
  originCoordinates = { lat: 5.6265188, lng: 0.003165 }, // Default to Tema port
}: ChangeRouteWizardProps) {
  const [step, setStep] = useState(1);
  const [selectedPlace, setSelectedPlace] = useState<string>("");
  const [routeRate, setRouteRate] = useState<DetailedRouteRate | null>(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState<Coordinates | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // Refs with proper types
  const autocompleteRef = useRef<{
    addListener: (event: string, handler: () => void) => void;
    getPlace: () => any;
  } | null>(null);
  const placesServiceRef = useRef<{
    getDetails: (
      request: { placeId: string },
      callback: (result: any, status: string) => void
    ) => void;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Initialize Google Maps script
  useEffect(() => {
    if (!isOpen || isScriptLoaded) return;

    const initializeGoogleMaps = async () => {
      try {
        await loadGoogleMapsScript(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '');
        setIsScriptLoaded(true);
      } catch (error) {
        console.error('Failed to load Google Maps script:', error);
      }
    };

    initializeGoogleMaps();
  }, [isOpen, isScriptLoaded]);

  // Initialize Places Service and Autocomplete
  useEffect(() => {
    if (!isScriptLoaded || !inputRef.current || !mapRef.current) return;

    // Initialize Places Service
    placesServiceRef.current = new window.google.maps.places.PlacesService(mapRef.current);

    // Initialize Autocomplete
    if (autocompleteRef.current) {
      window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
    }

    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: 'GH' },
      fields: ['geometry', 'formatted_address', 'name', 'place_id'],
      types: ['geocode', 'establishment']
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      handlePlaceSelect(place as GooglePlace);
    });

    autocompleteRef.current = autocomplete;

    return () => {
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [isScriptLoaded]);

  // Handle place selection
  const handlePlaceSelect = async (place: GooglePlace) => {
    if (!place.geometry) {
      console.error("No geometry found for place");
      return;
    }

    setIsLoading(true);
    try {
      const coordinates = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      // Validate coordinates
      if (
        !coordinates.lat ||
        !coordinates.lng ||
        isNaN(coordinates.lat) ||
        isNaN(coordinates.lng)
      ) {
        throw new Error("Invalid coordinates received from Google Maps");
      }

      // Format container size to match expected format
      let formattedSize: string;
      if (containerSize.toLowerCase().includes('40')) {
        formattedSize = '1x40';
      } else if (containerSize.toLowerCase().includes('2x20')) {
        formattedSize = '2x20';
      } else {
        formattedSize = '1x20';
      }

      const rate = await calculateTotalRate(
        formattedSize,
        originCoordinates,
        coordinates
      );

      // Round all rate values to 2 decimal places
      const roundedRate = {
        ...rate,
        distanceKm: Math.round(rate.distanceKm * 100) / 100,
        fuelCostPerKm: Math.round(rate.fuelCostPerKm * 100) / 100,
        operationalCostPerKm: Math.round(rate.operationalCostPerKm * 100) / 100,
        totalCostPerKm: Math.round(rate.totalCostPerKm * 100) / 100,
        finalRatePerKm: Math.round(rate.finalRatePerKm * 100) / 100,
        totalRate: Math.round(rate.totalRate)  // Round to nearest whole number
      };

      console.log('Rate calculation details:', {
        containerSize: formattedSize,
        distance: roundedRate.distanceKm,
        fuelCost: roundedRate.fuelCostPerKm,
        operationalCost: roundedRate.operationalCostPerKm,
        totalCost: roundedRate.totalCostPerKm,
        profitMargin: roundedRate.profitMargin,
        finalRate: roundedRate.finalRatePerKm,
        totalRate: roundedRate.totalRate
      });

      setSelectedCoordinates(coordinates);
      setSelectedPlace(place.formatted_address);
      setInputValue(place.formatted_address);
      setRouteRate(roundedRate);
      setStep(2);
    } catch (error) {
      console.error("Failed to calculate rate:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClose = () => {
    if (autocompleteRef.current) {
      window.google?.maps?.event.clearInstanceListeners(autocompleteRef.current);
      autocompleteRef.current = null;
    }
    setInputValue("");
    setSelectedPlace("");
    setSelectedCoordinates(null);
    setRouteRate(null);
    setStep(1);
    setIsScriptLoaded(false); // Reset script loaded state to reinitialize autocomplete
    onClose();
  };

  const handleConfirm = () => {
    if (selectedPlace && selectedCoordinates && routeRate) {
      onConfirm({
        destination: selectedPlace,
        rate: routeRate.totalRate,
        distanceKm: routeRate.distanceKm,
        coordinates: selectedCoordinates,
      });
      handleClose();
    }
  };

  return (
    <>
      {/* Hidden div for Places Service */}
      <div ref={mapRef} style={{ display: 'none' }} />
      
      <Dialog 
        open={isOpen} 
        onOpenChange={(open) => {
          if (!open) handleClose();
        }}
      >
        <DialogContent 
          className="sm:max-w-[425px] overflow-visible"
          onPointerDownOutside={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest('.pac-container')) {
              e.preventDefault();
            }
          }}
        >
          <DialogHeader>
            <DialogTitle>Change Route</DialogTitle>
            <DialogDescription>
              {step === 1
                ? "Select the new destination for this load."
                : "Review and confirm the route change."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {step === 1 ? (
              <>
                <div className="space-y-2">
                  <Label>Current Destination</Label>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{currentDestination}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination-input">New Destination</Label>
                  <div className="relative">
                    <Input
                      ref={inputRef}
                      id="destination-input"
                      placeholder="Search for a location in Ghana..."
                      value={inputValue}
                      onChange={handleInputChange}
                      disabled={isLoading || !isScriptLoaded}
                      className="w-full"
                      autoComplete="off"
                    />
                    {isLoading && (
                      <div className="absolute right-3 top-3">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label>Route Details</Label>
                  <div className="rounded-lg border p-3 text-sm space-y-3">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-red-500" />
                      <span className="text-muted-foreground">From: {currentDestination}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-green-500" />
                      <span className="text-muted-foreground">To: {selectedPlace}</span>
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
                      <span>{Math.round((routeRate?.profitMargin ?? 0) * 100)}%</span>
                    </div>
                    <div className="flex justify-between font-medium pt-2 border-t">
                      <span>Final Rate per km:</span>
                      <span>GHS {routeRate?.finalRatePerKm.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-medium pt-2 border-t">
                      <span>Total Rate (Round Trip):</span>
                      <span className="text-lg font-bold">
                        GHS {routeRate?.totalRate.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

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

          <style jsx global>{`
            /* Google Places Autocomplete styles */
            .pac-container {
              margin-top: 8px !important;
              border-radius: 8px !important;
              border: 1px solid #e2e8f0 !important;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
              font-family: inherit !important;
              z-index: 99999999 !important;
            }

            .pac-item {
              padding: 8px 12px !important;
              cursor: pointer !important;
              font-family: inherit !important;
            }

            .pac-item:hover {
              background-color: #f8fafc !important;
            }

            .pac-item-query {
              font-size: 14px !important;
              color: #1e293b !important;
            }

            .pac-matched {
              font-weight: 600 !important;
            }

            .pac-icon {
              margin-top: 3px !important;
              margin-right: 8px !important;
            }

            /* Remove the Google Powered logo */
            .pac-container:after {
              display: none !important;
            }

            /* Fix pointer events */
            .pac-container {
              pointer-events: auto !important;
            }

            /* Ensure dialog doesn't block suggestions */
            [role="dialog"] {
              pointer-events: none !important;
            }

            [role="dialog"] > * {
              pointer-events: auto !important;
            }

            .fixed.inset-0 {
              pointer-events: auto !important;
            }
          `}</style>
        </DialogContent>
      </Dialog>
    </>
  );
} 