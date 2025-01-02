
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, X } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

type Container = {
  id: string;
  containerNumber: string;
  selected?: boolean;
};

type BLData = {
  blNumber: string;
  containers?: Container[];
  bulkCargoWeight?: number;
};

type EquipmentCount = {
  equipmentType: string;
  loadType: string;
  count: number;
};

type LoadDetails = {
  pickupLocation: string;
  deliveryLocation: string;
  pickupDate: string;
  equipmentCount?: EquipmentCount[];
  comments: string;
};

export default function PostLoad() {
  const [step, setStep] = useState(1);
  const [blData, setBlData] = useState<BLData>({ blNumber: "" });
  const [selectedContainers, setSelectedContainers] = useState<Container[]>([]);
  const [loadDetails, setLoadDetails] = useState<{ [key: string]: LoadDetails }>({});
  const [isBulkCargo, setIsBulkCargo] = useState(false);
  const [newEquipment, setNewEquipment] = useState<EquipmentCount>({ equipmentType: '', loadType: '', count: 0 });
  
  const fetchBLData = async (blNumber: string) => {
    // TODO: Replace with actual API call
    const mockData = {
      blNumber,
      bulkCargoWeight: 5000, // Example bulk cargo weight
      // containers: [
      //   { id: "1", containerNumber: "CONT123" },
      //   { id: "2", containerNumber: "CONT456" }
      // ]
    };
    setBlData(mockData);
    setIsBulkCargo(!!mockData.bulkCargoWeight);
  };

  const handleBLSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchBLData(blData.blNumber);
    setStep(2);
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
    setLoadDetails({ bulk: details });
  };

  const handleContainerDetails = (containerId: string, details: LoadDetails) => {
    setLoadDetails(prev => ({
      ...prev,
      [containerId]: details
    }));
  };

  const handleSubmit = async () => {
    toast.success("Load posted successfully! It is now under review.");
    setStep(1);
    setBlData({ blNumber: "" });
    setSelectedContainers([]);
    setLoadDetails({});
    setIsBulkCargo(false);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={handleBLSubmit} className="space-y-4">
            <div>
              <label className="text-sm">Bill of Lading Number</label>
              <Input
                value={blData.blNumber}
                onChange={(e) => setBlData({ blNumber: e.target.value })}
                placeholder="Enter BL number"
                required
              />
            </div>
            <Button type="submit">Next</Button>
          </form>
        );

      case 2:
        if (isBulkCargo) {
          return (
            <div className="space-y-4">
              <h2>Bulk Cargo Details</h2>
              <p>Weight: {blData.bulkCargoWeight} kg</p>
              <div className="space-x-2">
                <Button onClick={() => setStep(1)}>Back</Button>
                <Button onClick={() => setStep(3)}>Next</Button>
              </div>
            </div>
          );
        }
        return (
          <div className="space-y-4">
            <h2>Select Containers</h2>
            <div className="space-y-2">
              {blData.containers?.map(container => (
                <div key={container.id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedContainers.some(c => c.id === container.id)}
                    onCheckedChange={() => handleContainerSelection(container)}
                  />
                  <label>{container.containerNumber}</label>
                </div>
              ))}
            </div>
            <div className="space-x-2">
              <Button onClick={() => setStep(1)}>Back</Button>
              <Button onClick={() => setStep(3)} disabled={selectedContainers.length === 0}>
                Next
              </Button>
            </div>
          </div>
        );

      case 3:
        if (isBulkCargo) {
          return (
            <div className="space-y-6">
              <div className="border p-4 rounded-lg space-y-4">
                <h3>Bulk Cargo Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm">Pickup Location</label>
                    <Select
                      onValueChange={(value) => 
                        handleLoadDetails({
                          ...loadDetails.bulk,
                          pickupLocation: value
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select pickup location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="location1">Location 1</SelectItem>
                        <SelectItem value="location2">Location 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm">Delivery Location</label>
                    <Select
                      onValueChange={(value) =>
                        handleLoadDetails({
                          ...loadDetails.bulk,
                          deliveryLocation: value
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select delivery location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="location1">Location 1</SelectItem>
                        <SelectItem value="location2">Location 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="col-span-2">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm">Equipment Selection</label>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add Equipment
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Equipment</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label>Equipment Type</Label>
                              <Select onValueChange={(value) => {
                                setNewEquipment(prev => ({...prev, equipmentType: value}))
                              }}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select equipment type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="flatbed">Flatbed</SelectItem>
                                  <SelectItem value="tanker">Tanker</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label>Load Type</Label>
                              <Select onValueChange={(value) => {
                                setNewEquipment(prev => ({...prev, loadType: value}))
                              }}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select load type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="palletized">Palletized</SelectItem>
                                  <SelectItem value="bulk">Bulk</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label>Count</Label>
                              <Input 
                                type="number" 
                                min="1"
                                onChange={(e) => {
                                  setNewEquipment(prev => ({...prev, count: parseInt(e.target.value) || 0}))
                                }}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={() => {
                              if (newEquipment.equipmentType && newEquipment.loadType && newEquipment.count > 0) {
                                const currentEquipment = loadDetails.bulk?.equipmentCount || [];
                                handleLoadDetails({
                                  ...loadDetails.bulk,
                                  equipmentCount: [...currentEquipment, newEquipment]
                                });
                              }
                            }}>Add</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="space-y-2">
                      {loadDetails.bulk?.equipmentCount?.map((equip, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <div>
                            <p className="font-medium">{equip.equipmentType.charAt(0).toUpperCase() + equip.equipmentType.slice(1)}</p>
                            <p className="text-sm text-gray-500">{equip.loadType.charAt(0).toUpperCase() + equip.loadType.slice(1)}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm">Count: {equip.count}</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const newEquipment = loadDetails.bulk?.equipmentCount?.filter((_, i) => i !== index) || [];
                                handleLoadDetails({
                                  ...loadDetails.bulk,
                                  equipmentCount: newEquipment
                                });
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm">Pickup Date</label>
                    <Input
                      type="date"
                      onChange={(e) =>
                        handleLoadDetails({
                          ...loadDetails.bulk,
                          pickupDate: e.target.value
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm">Comments</label>
                    <Textarea
                      onChange={(e) =>
                        handleLoadDetails({
                          ...loadDetails.bulk,
                          comments: e.target.value
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="space-x-2">
                <Button onClick={() => setStep(2)}>Back</Button>
                <Button onClick={() => setStep(4)}>Review</Button>
              </div>
            </div>
          );
        }

        return (
          <div className="space-y-6">
            {selectedContainers.map(container => (
              <div key={container.id} className="border p-4 rounded-lg space-y-4">
                <h3>Container: {container.containerNumber}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm">Pickup Location</label>
                    <Select
                      onValueChange={(value) => 
                        handleContainerDetails(container.id, {
                          ...loadDetails[container.id],
                          pickupLocation: value
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select pickup location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="location1">Location 1</SelectItem>
                        <SelectItem value="location2">Location 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm">Delivery Location</label>
                    <Select
                      onValueChange={(value) =>
                        handleContainerDetails(container.id, {
                          ...loadDetails[container.id],
                          deliveryLocation: value
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select delivery location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="location1">Location 1</SelectItem>
                        <SelectItem value="location2">Location 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm">Pickup Date</label>
                    <Input
                      type="date"
                      onChange={(e) =>
                        handleContainerDetails(container.id, {
                          ...loadDetails[container.id],
                          pickupDate: e.target.value
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm">Comments</label>
                    <Textarea
                      onChange={(e) =>
                        handleContainerDetails(container.id, {
                          ...loadDetails[container.id],
                          comments: e.target.value
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="space-x-2">
              <Button onClick={() => setStep(2)}>Back</Button>
              <Button onClick={() => setStep(4)}>Review</Button>
            </div>
          </div>
        );

      case 4:
        if (isBulkCargo) {
          return (
            <div className="space-y-6">
              <h2>Review Bulk Cargo Load</h2>
              <div className="border p-4 rounded-lg">
                <h3>Bulk Cargo Weight: {blData.bulkCargoWeight} kg</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold">Pickup Location:</label>
                    <p>{loadDetails.bulk?.pickupLocation}</p>
                  </div>
                  <div>
                    <label className="font-bold">Delivery Location:</label>
                    <p>{loadDetails.bulk?.deliveryLocation}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="font-bold">Equipment Details:</label>
                    <div className="space-y-2 mt-2">
                      {loadDetails.bulk?.equipmentCount?.map((equip, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <div>
                            <p className="font-medium">{equip.equipmentType.charAt(0).toUpperCase() + equip.equipmentType.slice(1)}</p>
                            <p className="text-sm text-gray-500">{equip.loadType.charAt(0).toUpperCase() + equip.loadType.slice(1)}</p>
                          </div>
                          <p className="text-sm">Count: {equip.count}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="font-bold">Pickup Date:</label>
                    <p>{loadDetails.bulk?.pickupDate}</p>
                  </div>
                  <div>
                    <label className="font-bold">Comments:</label>
                    <p>{loadDetails.bulk?.comments}</p>
                  </div>
                </div>
              </div>
              <div className="space-x-2">
                <Button onClick={() => setStep(3)}>Back</Button>
                <Button onClick={handleSubmit}>Confirm</Button>
              </div>
            </div>
          );
        }

        return (
          <div className="space-y-6">
            <h2>Review Your Loads</h2>
            {selectedContainers.map(container => (
              <div key={container.id} className="border p-4 rounded-lg">
                <h3>Container: {container.containerNumber}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold">Pickup Location:</label>
                    <p>{loadDetails[container.id]?.pickupLocation}</p>
                  </div>
                  <div>
                    <label className="font-bold">Delivery Location:</label>
                    <p>{loadDetails[container.id]?.deliveryLocation}</p>
                  </div>
                  <div>
                    <label className="font-bold">Pickup Date:</label>
                    <p>{loadDetails[container.id]?.pickupDate}</p>
                  </div>
                  <div>
                    <label className="font-bold">Comments:</label>
                    <p>{loadDetails[container.id]?.comments}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="space-x-2">
              <Button onClick={() => setStep(3)}>Back</Button>
              <Button onClick={handleSubmit}>Confirm</Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="font-light h-full w-full p-4">
      <h1 className="text-2xl font-bold mb-6">Post a New Load</h1>
      <div className="max-w-2xl">
        {renderStep()}
      </div>
    </div>
  );
}
