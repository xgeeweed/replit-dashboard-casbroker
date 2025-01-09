
"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Truck = {
  id: string;
  plateNumber: string;
  type: string;
  capacity: number;
  status: "Available" | "In Transit" | "Maintenance";
  lastService: string;
  driverId?: string;
  driverName?: string;
  assignedLoad?: {
    id: string;
    destination: string;
  };
};

export default function AddTruck() {
  const [isLoading, setIsLoading] = useState(false);
  const [newTruck, setNewTruck] = useState<Partial<Truck>>({
    plateNumber: "",
    type: "",
    capacity: 0,
    status: "Available",
    lastService: new Date().toISOString().split('T')[0]
  });

  const handleAddTruck = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Truck added successfully!");
      setNewTruck({
        plateNumber: "",
        type: "",
        capacity: 0,
        status: "Available",
        lastService: new Date().toISOString().split('T')[0]
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Truck</h1>
      <div className="max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="plateNumber">Plate Number</Label>
            <div className="flex gap-2">
              <Input
                id="plateNumber"
                value={newTruck.plateNumber}
                onChange={(e) => setNewTruck({...newTruck, plateNumber: e.target.value})}
                placeholder="e.g. GH-1234-20"
              />
              <Button 
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    setNewTruck({
                      ...newTruck,
                      type: "Box Truck",
                      capacity: 2500,
                      lastService: new Date().toISOString().split('T')[0]
                    });
                    setIsLoading(false);
                  }, 1000);
                }}
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>

          {newTruck.type && (
            <>
              <div>
                <Label>Type</Label>
                <p className="text-sm text-gray-600 mt-1">{newTruck.type}</p>
              </div>
              <div>
                <Label>Capacity</Label>
                <p className="text-sm text-gray-600 mt-1">{newTruck.capacity} kg</p>
              </div>
              <div>
                <Label>Last Service Date</Label>
                <p className="text-sm text-gray-600 mt-1">{newTruck.lastService}</p>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" onClick={() => setNewTruck({ 
                  plateNumber: "", 
                  type: "", 
                  capacity: 0, 
                  lastService: new Date().toISOString().split('T')[0] 
                })}>
                  Reset
                </Button>
                <Button onClick={handleAddTruck} disabled={isLoading}>
                  {isLoading ? "Adding..." : "Add Truck"}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
