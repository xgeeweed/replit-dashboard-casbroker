
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Truck, Search, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { driverData } from "../data";

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

export default function DriverTrucksPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [trucks, setTrucks] = useState<Truck[]>([]);

  useEffect(() => {
    // Simulate API call to fetch driver's trucks
    const timer = setTimeout(() => {
      const driverTrucks = [
        {
          id: "1",
          plateNumber: "GH-1234-20",
          type: "Box Truck",
          capacity: 2500,
          status: "In Transit",
          lastService: "2024-01-15",
          driverId: params.id,
          driverName: driverData.fullName,
          assignedLoad: {
            id: "L-789",
            destination: "Kumasi"
          }
        }
      ];
      setTrucks(driverTrucks);
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [params.id]);

  if (isLoading) return <Spinner />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Trucks</h1>
          <p className="text-muted-foreground">Driver: {driverData.fullName}</p>
        </div>
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
              {truck.assignedLoad && (
                <div className="mt-2 p-2 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-600">Load ID: {truck.assignedLoad.id}</p>
                  <p className="text-sm text-gray-600">Destination: {truck.assignedLoad.destination}</p>
                </div>
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
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
