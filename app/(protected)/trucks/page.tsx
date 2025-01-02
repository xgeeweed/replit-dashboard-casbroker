"use client";
import { Spinner } from "@/components/ui/spinner";
import { basicErrorToast } from "@/components/toast";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Truck, Search, Trash2 } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
};

export default function TrucksPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [driverSearch, setDriverSearch] = useState("");
  const [trucks, setTrucks] = useState<Truck[]>([
    {
      id: "1",
      plateNumber: "GH-1234-20",
      type: "Box Truck",
      capacity: 2500,
      status: "Available",
      lastService: "2024-01-15",
      driverId: "D-123",
      driverName: "Kwame Mensah"
    },
    {
      id: "2", 
      plateNumber: "GH-5678-20",
      type: "Flatbed",
      capacity: 3500,
      status: "In Transit",
      lastService: "2024-01-10"
    },
  ]);

  const [newTruck, setNewTruck] = useState<Partial<Truck>>({
    plateNumber: "",
    type: "",
    capacity: 0,
    status: "Available",
    lastService: new Date().toISOString().split('T')[0]
  });

  const handleAddTruck = () => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      const truckToAdd = {
        ...newTruck,
        id: (trucks.length + 1).toString(),
      } as Truck;
      
      setTrucks([...trucks, truckToAdd]);
      setShowAddModal(false);
      setNewTruck({
        plateNumber: "",
        type: "",
        capacity: 0,
        status: "Available",
        lastService: new Date().toISOString().split('T')[0]
      });
      toast.success("Truck added successfully!");
      setIsLoading(false);
    }, 1000);
  };

  const handleAttachDriver = (truckId: string) => {
    setIsLoading(true);
    // Simulate API call to attach driver
    setTimeout(() => {
      setTrucks(trucks.map(truck => {
        if (truck.id === truckId) {
          return {
            ...truck,
            driverId: "D-" + Math.random().toString(36).substr(2, 9),
            driverName: "Kwame Mensah" // Simulated driver name
          };
        }
        return truck;
      }));
      toast.success("Driver Kwame Mensah attached successfully!");
      setDriverSearch("");
      setIsLoading(false);
    }, 1000);
  };

  const handleRemoveDriver = (truckId: string) => {
    setIsLoading(true);
    // Simulate API call to remove driver
    setTimeout(() => {
      setTrucks(trucks.map(truck => {
        if (truck.id === truckId) {
          const { driverId, driverName, ...rest } = truck;
          return rest;
        }
        return truck;
      }));
      toast.success("Driver removed successfully!");
      setIsLoading(false);
    }, 1000);
  };

  const handleRemoveTruck = (truckId: string) => {
    setIsLoading(true);
    // Simulate API call to remove truck
    setTimeout(() => {
      setTrucks(trucks.filter(truck => truck.id !== truckId));
      setShowDetailModal(false);
      setShowDeleteConfirm(false);
      toast.success("Truck removed successfully!");
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Trucks</h1>
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Truck
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Truck</DialogTitle>
              <DialogDescription>
                Enter the details of your new truck below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="plateNumber">Plate Number</Label>
                <Input
                  id="plateNumber"
                  value={newTruck.plateNumber}
                  onChange={(e) => setNewTruck({...newTruck, plateNumber: e.target.value})}
                  placeholder="e.g. GH-1234-20"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Select 
                  value={newTruck.type} 
                  onValueChange={(value) => setNewTruck({...newTruck, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select truck type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Box Truck">Box Truck</SelectItem>
                    <SelectItem value="Flatbed">Flatbed</SelectItem>
                    <SelectItem value="Refrigerated">Refrigerated</SelectItem>
                    <SelectItem value="Tanker">Tanker</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="capacity">Capacity (kg)</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={newTruck.capacity}
                  onChange={(e) => setNewTruck({...newTruck, capacity: parseInt(e.target.value)})}
                  placeholder="Enter capacity in kg"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastService">Last Service Date</Label>
                <Input
                  id="lastService"
                  type="date"
                  value={newTruck.lastService}
                  onChange={(e) => setNewTruck({...newTruck, lastService: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddTruck}>Add Truck</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trucks.map((truck) => (
          <div
            key={truck.id}
            onClick={() => {
              setSelectedTruck(truck);
              setShowDetailModal(true);
            }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <Truck className="h-8 w-8 text-gray-600" />
              <div>
                <h3 className="font-semibold">{truck.plateNumber}</h3>
                <p className="text-sm text-gray-600">{truck.type}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm">Capacity: {truck.capacity} kg</p>
              <div className={`mt-2 inline-block px-2 py-1 rounded-full text-sm
                ${truck.status === 'Available' ? 'bg-green-100 text-green-800' :
                  truck.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'}`}>
                {truck.status}
              </div>
              {truck.driverName && (
                <p className="text-sm mt-2 text-gray-600">Driver: {truck.driverName}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Truck Detail Modal */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Truck Details</DialogTitle>
          </DialogHeader>
          {selectedTruck && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                <p className="font-semibold">Plate Number:</p>
                <p>{selectedTruck.plateNumber}</p>
                <p className="font-semibold">Type:</p>
                <p>{selectedTruck.type}</p>
                <p className="font-semibold">Capacity:</p>
                <p>{selectedTruck.capacity} kg</p>
                <p className="font-semibold">Status:</p>
                <p>{selectedTruck.status}</p>
                <p className="font-semibold">Last Service:</p>
                <p>{selectedTruck.lastService}</p>
                {selectedTruck.driverName && (
                  <>
                    <p className="font-semibold">Assigned Driver:</p>
                    <p>{selectedTruck.driverName}</p>
                  </>
                )}
              </div>
              
              <div className="mt-4 flex justify-between">
                <div className="flex-1 mr-2">
                  {!selectedTruck.driverId ? (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Search driver..."
                        value={driverSearch}
                        onChange={(e) => setDriverSearch(e.target.value)}
                      />
                      <Button 
                        onClick={() => handleAttachDriver(selectedTruck.id)}
                        disabled={!driverSearch}
                      >
                        <Search className="h-4 w-4 mr-2" />
                        Attach Driver
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="destructive"
                      onClick={() => handleRemoveDriver(selectedTruck.id)}
                    >
                      Remove Driver
                    </Button>
                  )}
                </div>
                {/* add delete button */}
                <Button
                  variant="destructive"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove Truck
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this truck? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => selectedTruck && handleRemoveTruck(selectedTruck.id)}>
              Remove Truck
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
