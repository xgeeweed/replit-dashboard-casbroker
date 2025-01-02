
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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

type LoadDetails = {
  pickupLocation: string;
  deliveryLocation: string;
  pickupDate: string;
  equipmentType: string;
  loadType: string;
  comments: string;
};

export default function PostLoad() {
  const [step, setStep] = useState(1);
  const [blData, setBlData] = useState<BLData>({ blNumber: "" });
  const [selectedContainers, setSelectedContainers] = useState<Container[]>([]);
  const [loadDetails, setLoadDetails] = useState<{ [key: string]: LoadDetails }>({});
  
  const fetchBLData = async (blNumber: string) => {
    // TODO: Replace with actual API call
    const mockData = {
      blNumber,
      containers: [
        { id: "1", containerNumber: "CONT123" },
        { id: "2", containerNumber: "CONT456" }
      ]
    };
    setBlData(mockData);
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

  const handleContainerDetails = (containerId: string, details: LoadDetails) => {
    setLoadDetails(prev => ({
      ...prev,
      [containerId]: details
    }));
  };

  const handleSubmit = async () => {
    // TODO: Replace with actual API call
    toast.success("Load posted successfully! It is now under review.");
    setStep(1);
    setBlData({ blNumber: "" });
    setSelectedContainers([]);
    setLoadDetails({});
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
