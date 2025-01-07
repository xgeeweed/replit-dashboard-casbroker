"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

type Truck = {
  id: string;
  plateNumber: string;
  type: string;
  driverId?: string;
};

export function BookLoadDialog({ 
  open,
  onClose,
  requiredEquipment,
  onComplete,
}: { 
  open: boolean;
  onClose: () => void;
  requiredEquipment: string;
  onComplete?: () => void;
}) {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [selectedTruck, setSelectedTruck] = useState<string>("");
  const [showReviewMessage, setShowReviewMessage] = useState(false);

  // Fetch trucks with drivers
  useEffect(() => {
    const fetchTrucks = async () => {
      // Mock data - replace with actual API call
      const availableTrucks = [
        { id: "1", plateNumber: "GH-1234-20", type: "Box Truck", driverId: "D-123" },
        { id: "2", plateNumber: "GH-5678-20", type: "Flatbed", driverId: "D-124" },
      ];
      setTrucks(availableTrucks.filter(t => t.driverId));
    };
    fetchTrucks();
  }, []);

  const handleBookLoad = () => {
    const truck = trucks.find(t => t.id === selectedTruck);
    if (!truck) {
      toast.error("Please select a truck");
      return;
    }

    if (!isEquipmentCompatible(truck.type, requiredEquipment)) {
      toast.error(`This load requires ${requiredEquipment} type equipment`);
      return;
    }

    // Handle booking - Show review message instead of direct success
    setShowReviewMessage(true);
    //toast.success("Load booked successfully");
    //onClose();
  };

  const isEquipmentCompatible = (truckType: string, requiredType: string) => {
    return truckType.toLowerCase().includes(requiredType.toLowerCase());
  };

  return (
    <>
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Load</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Select value={selectedTruck} onValueChange={setSelectedTruck}>
            <SelectTrigger>
              <SelectValue placeholder="Select a truck" />
            </SelectTrigger>
            <SelectContent>
              {trucks.map((truck) => (
                <SelectItem key={truck.id} value={truck.id}>
                  {truck.plateNumber} - {truck.type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleBookLoad}>Book Load</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <Dialog open={showReviewMessage} onOpenChange={() => {
      setShowReviewMessage(false);
      onClose();
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Booking Under Review</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="mb-2">Your booking request is under review. You will be notified once it is confirmed.</p>
          <p className="text-sm text-gray-500">Note: Rates shown may change due to certain conditions.</p>
        </div>
        <DialogFooter>
          <Button onClick={() => {
            setShowReviewMessage(false);
            if (onComplete) onComplete();
            onClose();
          }}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
}