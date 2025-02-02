import { useState, useEffect } from "react";
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
import { Location, RouteRate, getAvailableLocations, getRouteRate } from "../data/locations";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChangeRouteWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newDestination: string, newRate: number) => void;
  currentDestination: string;
  distance: string;
  currentRate: number;
}

export function ChangeRouteWizard({
  isOpen,
  onClose,
  onConfirm,
  currentDestination,
  distance,
  currentRate,
}: ChangeRouteWizardProps) {
  const [step, setStep] = useState(1);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<string>("");
  const [routeRate, setRouteRate] = useState<RouteRate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadLocations();
    }
  }, [isOpen]);

  const loadLocations = async () => {
    setIsLoadingLocations(true);
    try {
      const availableLocations = await getAvailableLocations();
      setLocations(availableLocations);
    } catch (error) {
      console.error("Failed to load locations:", error);
    }
    setIsLoadingLocations(false);
  };

  const handleClose = () => {
    setStep(1);
    setSelectedLocationId("");
    setRouteRate(null);
    onClose();
  };

  const handleLocationSelect = async (locationId: string) => {
    setSelectedLocationId(locationId);
    setIsLoading(true);
    
    try {
      // For demo purposes, we'll use "ACC" (Accra) as the from location
      const rate = await getRouteRate("ACC", locationId);
      setRouteRate(rate);
      setStep(2);
    } catch (error) {
      console.error("Failed to calculate rate:", error);
    }
    
    setIsLoading(false);
  };

  const handleConfirm = () => {
    if (selectedLocationId && routeRate) {
      const selectedLocation = locations.find(loc => loc.id === selectedLocationId);
      if (selectedLocation) {
        onConfirm(selectedLocation.name, routeRate.baseRate);
      }
      handleClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
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
              <Select
                value={selectedLocationId}
                onValueChange={handleLocationSelect}
                disabled={isLoadingLocations || isLoading}
              >
                <SelectTrigger>
                  {isLoadingLocations ? (
                    <div className="flex items-center">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Loading locations...
                    </div>
                  ) : (
                    <SelectValue placeholder="Select destination" />
                  )}
                </SelectTrigger>
                <SelectContent>
                  <ScrollArea className="h-[200px]">
                    {locations.map((location) => (
                      <SelectItem
                        key={location.id}
                        value={location.id}
                      >
                        <div className="flex flex-col">
                          <span>{location.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {location.region}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </ScrollArea>
                </SelectContent>
              </Select>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Original Rate</Label>
                <div className="mt-1 font-medium">
                  ₵{currentRate.toLocaleString()}
                </div>
              </div>
              <div>
                <Label>New Rate</Label>
                <div className="mt-1 font-medium text-blue-600">
                  ₵{routeRate?.baseRate.toLocaleString()}
                </div>
              </div>
            </div>
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
                    To: {locations.find(loc => loc.id === selectedLocationId)?.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2 pt-2 border-t">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-muted-foreground">
                    Estimated Time: {routeRate?.estimatedHours} hours
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <span className="text-muted-foreground">
                    Distance: {routeRate?.distance}
                  </span>
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
            <Button onClick={handleConfirm}>
              Confirm Change
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 