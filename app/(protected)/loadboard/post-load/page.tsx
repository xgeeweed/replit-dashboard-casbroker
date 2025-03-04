"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, X } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { calculateTotalRate } from "@/app/(protected)/admin/rate-setup/utils";
import Script from "next/script";
import { z } from "zod";

type Container = {
  id: string;
  containerNumber: string;
  size: "20 ft" | "40 ft" | "2x20 ft";
  selected?: boolean;
};

type BLData = {
  blNumber: string;
  containers?: Container[];
  bulkCargoWeight?: number;
  companyName?: string;
  cargoDescription?: string;
};

type EquipmentCount = {
  equipmentType: string;
  loadType: string;
  count: number;
};

type Coordinates = {
  lat: number;
  lng: number;
};

type LoadDetails = {
  pickupLocation: string;
  deliveryLocation: string;
  pickupDate: string;
  equipmentCount?: EquipmentCount[];
  comments: string;
  rateDetails?: {
    distanceKm: number;
    fuelCostPerKm: number;
    operationalCostPerKm: number;
    totalCostPerKm: number;
    profitMargin: number;
    finalRatePerKm: number;
    totalRate: number;
  };
  coordinates?: {
    pickup: Coordinates | null;
    delivery: Coordinates | null;
  };
};

// Add these CSS classes at the top of the component
const stepHeaderClass = "text-2xl font-semibold text-gray-900 mb-6";
const sectionClass = "bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-4";
const labelClass = "text-sm font-medium text-gray-700";
const valueClass = "text-base text-gray-900";
const gridClass = "grid grid-cols-1 md:grid-cols-2 gap-6";
const buttonClass = "min-w-[100px]";

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

declare global {
  interface Window {
    google: any;
    initAutocomplete: () => void;
  }
}

// Add validation schemas
const blNumberSchema = z.string()
  .min(6, "BL number must be at least 6 characters")
  .max(20, "BL number is too long")
  .refine((val) => val === "BL1234" || val === "BL5678", "Invalid BL number. Please enter a valid BL number");

const loadDetailsSchema = z.object({
  pickupLocation: z.string().min(1, "Pickup location is required"),
  deliveryLocation: z.string().min(1, "Delivery location is required"),
  pickupDate: z.string().min(1, "Pickup date is required").refine((date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }, "Pickup date must be today or in the future"),
  comments: z.string().optional(),
});

export default function PostLoad() {
  const [step, setStep] = useState(1);
  const [blData, setBlData] = useState<BLData>({ blNumber: "" });
  const [selectedContainers, setSelectedContainers] = useState<Container[]>([]);
  const [loadDetails, setLoadDetails] = useState<{ [key: string]: LoadDetails }>({});
  const [isBulkCargo, setIsBulkCargo] = useState(false);
  const [newEquipment, setNewEquipment] = useState<EquipmentCount>({ equipmentType: '', loadType: '', count: 0 });
  const [selectedCoordinates, setSelectedCoordinates] = useState<{
    pickup: Coordinates | null;
    delivery: Coordinates | null;
  }>({
    pickup: null,
    delivery: null,
  });
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const fetchBLData = async (blNumber: string) => {
    try {
      // TODO: Replace with actual API call
      if (blNumber !== "BL1234" && blNumber !== "BL5678") {
        throw new Error("BL number not found");
      }

      const mockData: BLData = {
        blNumber,
        containers: blNumber === "BL5678" ? [
          { id: "1", containerNumber: "CONT123", size: "20 ft" as const },
          { id: "2", containerNumber: "CONT456", size: "40 ft" as const },
          { id: "3", containerNumber: "CONT789", size: "20 ft" as const }
        ] : undefined,
        bulkCargoWeight: blNumber === "BL1234" ? 5000 : undefined,
        companyName: blNumber === "BL1234" ? "Global Shipping Co. Ltd." : undefined,
        cargoDescription: blNumber === "BL1234" ? "Industrial machinery parts - Steel components and assemblies" : undefined
      };
      setBlData(mockData);
      setIsBulkCargo(!!mockData.bulkCargoWeight);
      setErrors(prev => ({ ...prev, blNumber: [] }));
      return true;
    } catch (error) {
      setErrors(prev => ({ 
        ...prev, 
        blNumber: ["BL number not found in the system. Please check and try again."] 
      }));
      toast.error("BL number not found");
      return false;
    }
  };

  const validateBLNumber = (blNumber: string) => {
    try {
      blNumberSchema.parse(blNumber);
      setErrors(prev => ({ ...prev, blNumber: [] }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, blNumber: error.errors.map(e => e.message) }));
      }
      return false;
    }
  };

  const handleBLSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateBLNumber(blData.blNumber)) {
      return;
    }
    const success = await fetchBLData(blData.blNumber);
    if (success) {
      setStep(2);
    }
  };

  const handleContainerSelection = (container: Container) => {
    const isSelected = selectedContainers.find(c => c.id === container.id);
    if (isSelected) {
      setSelectedContainers(prev => prev.filter(c => c.id !== container.id));
    } else {
      setSelectedContainers(prev => [...prev, container]);
    }
  };

  const handleLoadDetails = (details: LoadDetails) => {
    if (validateLoadDetails(details)) {
      setLoadDetails(prev => ({
        ...prev,
        bulk: {
          ...details,
          rateDetails: details.rateDetails || prev.bulk?.rateDetails
        }
      }));
    }
  };

  const handleContainerDetails = (containerId: string, details: LoadDetails) => {
    if (validateLoadDetails(details, containerId)) {
      setLoadDetails(prev => ({
        ...prev,
        [containerId]: details
      }));
    }
  };

  const handleSubmit = async () => {
    setShowDisclaimer(false);
    toast.success("Load posted successfully! It is now under review.");
    setStep(1);
    setBlData({ blNumber: "" });
    setSelectedContainers([]);
    setLoadDetails({});
    setIsBulkCargo(false);
  };

  // Initialize autocomplete when script is loaded
  useEffect(() => {
    if (!scriptLoaded || !window.google) return;

    // Handle bulk cargo delivery location
    if (isBulkCargo) {
      const bulkDeliveryInput = document.getElementById('deliveryLocation') as HTMLInputElement;
      if (bulkDeliveryInput && !bulkDeliveryInput.dataset.autocomplete) {  // Only initialize once
        const autocomplete = new window.google.maps.places.Autocomplete(bulkDeliveryInput, {
          componentRestrictions: { country: 'GH' },
          fields: ['address_components', 'geometry', 'formatted_address'],
        });

        autocomplete.addListener('place_changed', async () => {
          const place = autocomplete.getPlace();
          if (place.geometry) {
            const coordinates = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            };
            
            const currentDetails = loadDetails.bulk || {
              pickupLocation: '',
              deliveryLocation: '',
              pickupDate: '',
              comments: '',
              coordinates: {
                pickup: null,
                delivery: null
              }
            };

            if (currentDetails.coordinates?.pickup) {
              try {
                const result = await calculateTotalRate(
                  "40 ft",
                  currentDetails.coordinates.pickup,
                  coordinates
                );
                
                setLoadDetails(prev => ({
                  ...prev,
                  bulk: {
                    ...currentDetails,
                    deliveryLocation: place.formatted_address,
                    rateDetails: result,
                    coordinates: {
                      pickup: currentDetails.coordinates?.pickup || null,
                      delivery: coordinates
                    }
                  }
                }));
              } catch (error) {
                console.error("Error calculating rate:", error);
                toast.error("Failed to calculate rate");
              }
            } else {
              setLoadDetails(prev => ({
                ...prev,
                bulk: {
                  ...currentDetails,
                  deliveryLocation: place.formatted_address,
                  coordinates: {
                    pickup: currentDetails.coordinates?.pickup || null,
                    delivery: coordinates
                  }
                }
              }));
            }
          }
        });

        bulkDeliveryInput.dataset.autocomplete = 'initialized';
      }
    }
  }, [scriptLoaded, isBulkCargo, loadDetails]);

  const handlePickupLocationChange = async (value: string) => {
    const location = PICKUP_LOCATIONS.find(loc => loc.value === value);
    if (location) {
      setSelectedCoordinates(prev => ({ ...prev, pickup: location.coordinates }));
      
      const currentDetails = loadDetails.bulk || {
        pickupLocation: '',
        deliveryLocation: '',
        pickupDate: '',
        comments: '',
        coordinates: {
          pickup: null,
          delivery: null
        }
      };

      if (currentDetails.coordinates?.delivery) {
        try {
          const result = await calculateTotalRate(
            "40 ft",
            location.coordinates,
            currentDetails.coordinates.delivery
          );
          
          const updatedDetails: LoadDetails = {
            ...currentDetails,
            pickupLocation: value,
            rateDetails: result,
            coordinates: {
              pickup: location.coordinates,
              delivery: currentDetails.coordinates.delivery
            }
          };

          setLoadDetails(prev => ({
            ...prev,
            bulk: updatedDetails
          }));
        } catch (error) {
          console.error("Error calculating rate:", error);
          toast.error("Failed to calculate rate");
        }
      } else {
        const updatedDetails: LoadDetails = {
          ...currentDetails,
          pickupLocation: value,
          coordinates: {
            pickup: location.coordinates,
            delivery: null
          }
        };

        setLoadDetails(prev => ({
          ...prev,
          bulk: updatedDetails
        }));
      }
    }
  };

  // Update the container pickup location change handler
  const handleContainerPickupLocationChange = async (containerId: string, value: string) => {
    const location = PICKUP_LOCATIONS.find(loc => loc.value === value);
    if (location) {
      const currentDetails = loadDetails[containerId] || {
        pickupLocation: '',
        deliveryLocation: '',
        pickupDate: '',
        comments: '',
        coordinates: {
          pickup: null,
          delivery: null
        }
      };

      const currentCoordinates = currentDetails.coordinates || {
        pickup: null,
        delivery: null
      };

      if (currentCoordinates.delivery) {
        try {
          // Get the container size from the selected container
          const containerData = selectedContainers.find(c => c.id === containerId);
          const containerSize = containerData?.size || "20 ft";

          const result = await calculateTotalRate(
            containerSize,
            location.coordinates,
            currentCoordinates.delivery
          );
          
          setLoadDetails(prev => ({
            ...prev,
            [containerId]: {
              ...currentDetails,
              pickupLocation: value,
              rateDetails: result,
              coordinates: {
                pickup: location.coordinates,
                delivery: currentCoordinates.delivery
              }
            }
          }));

          console.log('Rate calculated:', result); // Add logging
        } catch (error) {
          console.error("Error calculating rate:", error);
          toast.error("Failed to calculate rate");
        }
      } else {
        setLoadDetails(prev => ({
          ...prev,
          [containerId]: {
            ...currentDetails,
            pickupLocation: value,
            coordinates: {
              pickup: location.coordinates,
              delivery: null
            }
          }
        }));
      }
    }
  };

  const validateLoadDetails = (details: LoadDetails, containerId?: string) => {
    try {
      loadDetailsSchema.parse(details);
      setErrors(prev => ({ ...prev, [containerId || 'bulk']: [] }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ 
          ...prev, 
          [containerId || 'bulk']: error.errors.map(e => e.message) 
        }));
      }
      return false;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className={sectionClass}>
            <h2 className={stepHeaderClass}>Enter Bill of Lading Details</h2>
            <form onSubmit={handleBLSubmit} className="space-y-6">
              <div>
                <label className={labelClass}>Bill of Lading Number</label>
                <Input
                  value={blData.blNumber}
                  onChange={(e) => {
                    setBlData({ blNumber: e.target.value });
                    validateBLNumber(e.target.value);
                  }}
                  placeholder="Enter BL number"
                  className={`mt-1 ${errors.blNumber?.length ? 'border-red-500' : ''}`}
                  required
                />
                {errors.blNumber?.map((error, index) => (
                  <p key={index} className="text-sm text-red-500 mt-1">{error}</p>
                ))}
              </div>
              <div className="flex justify-end">
                <Button type="submit" className={buttonClass}>Next</Button>
              </div>
            </form>
          </div>
        );

      case 2:
        if (isBulkCargo) {
          return (
            <div className={sectionClass}>
              <h2 className={stepHeaderClass}>Bulk Cargo Details</h2>
              <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r-md">
                <div className="space-y-3">
                  <div>
                    <span className={labelClass}>Company</span>
                    <p className={valueClass}>{blData.companyName}</p>
                  </div>
                  <div>
                    <span className={labelClass}>Weight</span>
                    <p className={valueClass}>{blData.bulkCargoWeight} kg</p>
                  </div>
                  <div>
                    <span className={labelClass}>Cargo Description</span>
                    <p className={valueClass}>{blData.cargoDescription}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <Button variant="outline" onClick={() => setStep(1)} className={buttonClass}>Back</Button>
                <Button onClick={() => setStep(3)} className={buttonClass}>Next</Button>
              </div>
            </div>
          );
        }
        return (
          <div className={sectionClass}>
            <h2 className={stepHeaderClass}>Select Containers</h2>
            <div className="space-y-3">
              {blData.containers?.map(container => (
                <div key={container.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                  <Checkbox
                    checked={selectedContainers.some(c => c.id === container.id)}
                    onCheckedChange={() => handleContainerSelection(container)}
                  />
                  <label className="font-medium">{container.containerNumber}</label>
                </div>
              ))}
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setStep(1)} className={buttonClass}>Back</Button>
              <Button onClick={() => setStep(3)} disabled={selectedContainers.length === 0} className={buttonClass}>
                Next
              </Button>
            </div>
          </div>
        );

      case 3:
        if (isBulkCargo) {
          return (
            <div className="space-y-6">
              <div className={sectionClass}>
                <h2 className={stepHeaderClass}>Bulk Cargo Load Details</h2>
                <div className={gridClass}>
                  <div>
                    <label className={labelClass}>Pickup Location</label>
                    <Select
                      onValueChange={handlePickupLocationChange}
                      required
                    >
                      <SelectTrigger className="mt-1">
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
                    <label className={labelClass}>Delivery Location</label>
                    <Input
                      id="deliveryLocation"
                      placeholder="Start typing to search for a location..."
                      className="mt-1"
                      required
                    />
                  </div>

                  {loadDetails.bulk?.rateDetails && (
                    <div className="col-span-full bg-gray-50 p-4 rounded-lg space-y-3">
                      <h3 className="font-medium text-lg">Rate Details</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-gray-600">One-way Distance:</span>
                          <p className="font-medium">
                            {loadDetails.bulk.rateDetails.distanceKm?.toFixed(2) || 0} km
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Round Trip Distance:</span>
                          <p className="font-medium">
                            {((loadDetails.bulk.rateDetails.distanceKm || 0) * 2).toFixed(2)} km
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Rate per km:</span>
                          <p className="font-medium">
                            GHS {loadDetails.bulk.rateDetails.finalRatePerKm?.toFixed(2) || 0}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Total Rate:</span>
                          <p className="font-medium text-primary">
                            GHS {loadDetails.bulk.rateDetails.totalRate?.toFixed(2) || 0}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className={labelClass}>Pickup Date</label>
                    <Input
                      type="date"
                      className="mt-1"
                      required
                      onChange={(e) =>
                        handleLoadDetails({
                          ...loadDetails.bulk,
                          pickupDate: e.target.value
                        })
                      }
                    />
                  </div>

                  <div className="col-span-full">
                    <label className={labelClass}>Comments</label>
                    <Textarea
                      className="mt-1"
                      placeholder="Add any additional notes or requirements"
                      onChange={(e) =>
                        handleLoadDetails({
                          ...loadDetails.bulk,
                          comments: e.target.value
                        })
                      }
                    />
                  </div>
                </div>
                {errors.bulk?.map((error, index) => (
                  <p key={index} className="text-sm text-red-500 mt-1">{error}</p>
                ))}
              </div>
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setStep(2)} className={buttonClass}>Back</Button>
                <Button 
                  onClick={() => {
                    if (validateLoadDetails(loadDetails.bulk || { 
                      pickupLocation: '', 
                      deliveryLocation: '', 
                      pickupDate: '',
                      comments: '' 
                    })) {
                      setStep(4);
                    }
                  }} 
                  className={buttonClass}
                >
                  Review
                </Button>
              </div>
            </div>
          );
        }
        return (
          <div className="space-y-6">
            {selectedContainers.map(container => (
              <div key={container.id} className={sectionClass}>
                <h3 className="text-xl font-semibold mb-4">Container: {container.containerNumber}</h3>
                <div className={gridClass}>
                  <div>
                    <label className={labelClass}>Pickup Location</label>
                    <Select
                      onValueChange={(value) => handleContainerPickupLocationChange(container.id, value)}
                      required
                    >
                      <SelectTrigger className="mt-1">
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
                    <label className={labelClass}>Delivery Location</label>
                    <Input
                      id={`deliveryLocation-${container.id}`}
                      placeholder="Start typing to search for a location..."
                      className="mt-1"
                      required
                      autoComplete="off"
                      value={loadDetails[container.id]?.deliveryLocation || ''}
                      onChange={(e) => {
                        const currentDetails = loadDetails[container.id] || {
                          pickupLocation: '',
                          deliveryLocation: '',
                          pickupDate: '',
                          comments: '',
                          coordinates: {
                            pickup: null,
                            delivery: null
                          }
                        };
                        setLoadDetails(prev => ({
                          ...prev,
                          [container.id]: {
                            ...currentDetails,
                            deliveryLocation: e.target.value
                          }
                        }));
                      }}
                      onFocus={() => {
                        if (!window.google) return;
                        
                        const input = document.getElementById(`deliveryLocation-${container.id}`) as HTMLInputElement;
                        if (!input.dataset.autocomplete) {
                          const autocomplete = new window.google.maps.places.Autocomplete(input, {
                            componentRestrictions: { country: 'GH' },
                            fields: ['address_components', 'geometry', 'formatted_address'],
                          });

                          autocomplete.addListener('place_changed', async () => {
                            const place = autocomplete.getPlace();
                            if (place.geometry) {
                              const coordinates = {
                                lat: place.geometry.location.lat(),
                                lng: place.geometry.location.lng(),
                              };
                              
                              const currentDetails = loadDetails[container.id] || {
                                pickupLocation: '',
                                deliveryLocation: '',
                                pickupDate: '',
                                comments: '',
                                coordinates: {
                                  pickup: null,
                                  delivery: null
                                }
                              };

                              const currentCoordinates = currentDetails.coordinates || {
                                pickup: null,
                                delivery: null
                              };

                              if (currentCoordinates.pickup) {
                                try {
                                  // Get the container size from the selected container
                                  const containerData = selectedContainers.find(c => c.id === container.id);
                                  const containerSize = containerData?.size || "20 ft";

                                  const result = await calculateTotalRate(
                                    containerSize,
                                    currentCoordinates.pickup,
                                    coordinates
                                  );
                                  
                                  setLoadDetails(prev => ({
                                    ...prev,
                                    [container.id]: {
                                      ...currentDetails,
                                      deliveryLocation: place.formatted_address,
                                      rateDetails: result,
                                      coordinates: {
                                        pickup: currentCoordinates.pickup,
                                        delivery: coordinates
                                      }
                                    }
                                  }));
                                } catch (error) {
                                  console.error("Error calculating rate:", error);
                                  toast.error("Failed to calculate rate");
                                }
                              } else {
                                setLoadDetails(prev => ({
                                  ...prev,
                                  [container.id]: {
                                    ...currentDetails,
                                    deliveryLocation: place.formatted_address,
                                    coordinates: {
                                      pickup: currentCoordinates.pickup,
                                      delivery: coordinates
                                    }
                                  }
                                }));
                              }
                            }
                          });

                          input.dataset.autocomplete = 'initialized';
                        }
                      }}
                    />
                  </div>

                  {loadDetails[container.id]?.rateDetails && (
                    <div className="col-span-full bg-gray-50 p-4 rounded-lg space-y-3">
                      <h3 className="font-medium text-lg">Rate Details</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-gray-600">One-way Distance:</span>
                          <p className="font-medium">
                            {loadDetails[container.id]?.rateDetails?.distanceKm?.toFixed(2) || '0'} km
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Round Trip Distance:</span>
                          <p className="font-medium">
                            {((loadDetails[container.id]?.rateDetails?.distanceKm || 0) * 2).toFixed(2)} km
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Rate per km:</span>
                          <p className="font-medium">
                            GHS {loadDetails[container.id]?.rateDetails?.finalRatePerKm?.toFixed(2) || '0'}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Total Rate:</span>
                          <p className="font-medium text-primary">
                            GHS {loadDetails[container.id]?.rateDetails?.totalRate?.toFixed(2) || '0'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className={labelClass}>Pickup Date</label>
                    <Input
                      type="date"
                      className="mt-1"
                      required
                      value={loadDetails[container.id]?.pickupDate || ''}
                      onChange={(e) =>
                        handleContainerDetails(container.id, {
                          ...loadDetails[container.id],
                          pickupDate: e.target.value
                        })
                      }
                    />
                  </div>

                  <div className="col-span-full">
                    <label className={labelClass}>Comments</label>
                    <Textarea
                      className="mt-1"
                      placeholder="Add any additional notes or requirements"
                      value={loadDetails[container.id]?.comments || ''}
                      onChange={(e) =>
                        handleContainerDetails(container.id, {
                          ...loadDetails[container.id],
                          comments: e.target.value
                        })
                      }
                    />
                  </div>
                </div>
                {errors[container.id]?.map((error, index) => (
                  <p key={index} className="text-sm text-red-500 mt-1">{error}</p>
                ))}
              </div>
            ))}
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setStep(2)} className={buttonClass}>Back</Button>
              <Button
                onClick={() => {
                  const allValid = selectedContainers.every(container => {
                    const details = loadDetails[container.id] || { 
                      pickupLocation: '', 
                      deliveryLocation: '', 
                      pickupDate: '',
                      comments: '' 
                    };
                    return validateLoadDetails(details, container.id);
                  });

                  if (allValid) {
                    setStep(4);
                  }
                }}
                className={buttonClass}
              >
                Review
              </Button>
            </div>
          </div>
        );

      case 4:
        if (isBulkCargo) {
          return (
            <div className="space-y-6">
              <div className={sectionClass}>
                <h2 className={stepHeaderClass}>Review Bulk Cargo Load</h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r-md">
                    <div className="space-y-3">
                      <div>
                        <span className={labelClass}>BL Number</span>
                        <p className={valueClass}>{blData.blNumber}</p>
                      </div>
                      <div>
                        <span className={labelClass}>Company</span>
                        <p className={valueClass}>{blData.companyName}</p>
                      </div>
                      <div>
                        <span className={labelClass}>Bulk Cargo Weight</span>
                        <p className={valueClass}>{blData.bulkCargoWeight} kg</p>
                      </div>
                      <div>
                        <span className={labelClass}>Cargo Description</span>
                        <p className={valueClass}>{blData.cargoDescription}</p>
                      </div>
                    </div>
                  </div>

                  <div className={gridClass}>
                    <div>
                      <span className={labelClass}>Pickup Location</span>
                      <p className={valueClass}>{loadDetails.bulk?.pickupLocation}</p>
                    </div>
                    <div>
                      <span className={labelClass}>Delivery Location</span>
                      <p className={valueClass}>{loadDetails.bulk?.deliveryLocation}</p>
                    </div>
                    <div>
                      <span className={labelClass}>Pickup Date</span>
                      <p className={valueClass}>{loadDetails.bulk?.pickupDate}</p>
                    </div>
                    <div>
                      <span className={labelClass}>Comments</span>
                      <p className={valueClass}>{loadDetails.bulk?.comments || 'No comments'}</p>
                    </div>
                  </div>

                  {loadDetails.bulk?.equipmentCount && loadDetails.bulk.equipmentCount.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium mb-3">Equipment Details</h3>
                      <div className="space-y-2">
                        {loadDetails.bulk.equipmentCount.map((equip, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                            <div>
                              <p className="font-medium">{equip.equipmentType.charAt(0).toUpperCase() + equip.equipmentType.slice(1)}</p>
                              <p className="text-sm text-gray-500">{equip.loadType.charAt(0).toUpperCase() + equip.loadType.slice(1)}</p>
                            </div>
                            <p className="text-sm font-medium">Count: {equip.count}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {loadDetails.bulk?.rateDetails && (
                    <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded-r-md">
                      <div className="space-y-3">
                        <div>
                          <span className={labelClass}>Total Distance (Round Trip)</span>
                          <p className={valueClass}>{(loadDetails.bulk.rateDetails.distanceKm * 2).toFixed(2)} km</p>
                        </div>
                        <div>
                          <span className={labelClass}>Rate per km</span>
                          <p className={valueClass}>GHS {loadDetails.bulk.rateDetails.finalRatePerKm.toFixed(2)}</p>
                        </div>
                        <div>
                          <span className={labelClass}>Total Rate</span>
                          <p className={`${valueClass} text-lg text-primary font-bold`}>
                            GHS {loadDetails.bulk.rateDetails.totalRate.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setStep(3)} className={buttonClass}>Back</Button>
                <Button onClick={() => setShowDisclaimer(true)} className={buttonClass}>Confirm</Button>
              </div>
            </div>
          );
        }
        return (
          <div className="space-y-6">
            <div className={sectionClass}>
              <h2 className={stepHeaderClass}>Review Container Loads</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r-md">
                  <div className="space-y-3">
                    <div>
                      <span className={labelClass}>BL Number</span>
                      <p className={valueClass}>{blData.blNumber}</p>
                    </div>
                  </div>
                </div>

                {selectedContainers.map(container => (
                  <div key={container.id} className="border p-4 rounded-lg space-y-4">
                    <h3 className="text-lg font-medium">Container: {container.containerNumber}</h3>
                    <div className={gridClass}>
                      <div>
                        <span className={labelClass}>Pickup Location</span>
                        <p className={valueClass}>{loadDetails[container.id]?.pickupLocation}</p>
                      </div>
                      <div>
                        <span className={labelClass}>Delivery Location</span>
                        <p className={valueClass}>{loadDetails[container.id]?.deliveryLocation}</p>
                      </div>
                      <div>
                        <span className={labelClass}>Pickup Date</span>
                        <p className={valueClass}>{loadDetails[container.id]?.pickupDate}</p>
                      </div>
                      <div>
                        <span className={labelClass}>Comments</span>
                        <p className={valueClass}>{loadDetails[container.id]?.comments || 'No comments'}</p>
                      </div>
                    </div>

                    {loadDetails[container.id]?.rateDetails && (
                      <div className="col-span-full bg-gray-50 p-4 rounded-lg space-y-3">
                        <h3 className="font-medium text-lg">Rate Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-gray-600">One-way Distance:</span>
                            <p className="font-medium">
                              {loadDetails[container.id]?.rateDetails?.distanceKm?.toFixed(2) || '0'} km
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-600">Round Trip Distance:</span>
                            <p className="font-medium">
                              {((loadDetails[container.id]?.rateDetails?.distanceKm || 0) * 2).toFixed(2)} km
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-600">Rate per km:</span>
                            <p className="font-medium">
                              GHS {loadDetails[container.id]?.rateDetails?.finalRatePerKm?.toFixed(2) || '0'}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-600">Total Rate:</span>
                            <p className="font-medium text-primary">
                              GHS {loadDetails[container.id]?.rateDetails?.totalRate?.toFixed(2) || '0'}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {selectedContainers.length > 0 && (
                  <div className="border-t pt-4 mt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total Rate for All Containers:</span>
                      <span className="text-xl font-bold text-primary">
                        GHS {selectedContainers.reduce((total, container) => {
                          return total + (loadDetails[container.id]?.rateDetails?.totalRate || 0);
                        }, 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setStep(3)} className={buttonClass}>Back</Button>
              <Button onClick={() => setShowDisclaimer(true)} className={buttonClass}>Confirm</Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const DisclaimerDialog = () => (
    <Dialog open={showDisclaimer} onOpenChange={setShowDisclaimer}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 pb-4 border-b">
            Disclaimer
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">Pickup Scheduling</h3>
              <p className="text-gray-700 leading-relaxed">
                To avoid incurring any additional fees or charges, the designated pickup time must be scheduled at least 24 hours prior to the time of posting the load. Any pickup time scheduled within 24 hours of posting will incur a fee of 1%.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">Rates and Fuel Prices</h3>
              <p className="text-gray-700 leading-relaxed">
                All rates are subject to change based on fluctuations in fuel prices or other operational costs. It is your responsibility to review and confirm the most current rates before finalizing any arrangements.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">Policy Changes</h3>
              <p className="text-gray-700 leading-relaxed">
                This policy is subject to change without prior notice. Always verify the latest terms and conditions to ensure compliance.
              </p>
            </div>
          </div>
        </div>
        <DialogFooter className="border-t pt-4">
          <Button variant="outline" onClick={() => setShowDisclaimer(false)}>Cancel</Button>
          <Button onClick={handleSubmit} className="ml-2">
            I Understand & Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="font-light h-full w-full p-4">
      <h1 className="text-2xl font-bold mb-6">Post a New Load</h1>
      <div className="max-w-2xl">
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initAutocomplete`}
          strategy="afterInteractive"
          onLoad={() => setScriptLoaded(true)}
        />
        {renderStep()}
        <DisclaimerDialog />
      </div>
    </div>
  );
}