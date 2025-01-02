"use client";
import { Spinner } from "@/components/ui/spinner";
import { basicErrorToast } from "@/components/toast";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, DollarSign, Search, Trash2 } from "lucide-react";
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

type Rate = {
  id: string;
  name: string;
  type: "Standard" | "Express" | "Economy";
  basePrice: number;
  pricePerKm: number;
  region: string;
  status: "Active" | "Inactive";
  minDistance: number;
  maxDistance: number;
};

export default function RatesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRate, setSelectedRate] = useState<Rate | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [rates, setRates] = useState<Rate[]>([
    {
      id: "1",
      name: "Greater Accra Standard",
      type: "Standard",
      basePrice: 50,
      pricePerKm: 2.5,
      region: "Greater Accra",
      status: "Active",
      minDistance: 0,
      maxDistance: 50
    },
    {
      id: "2",
      name: "Ashanti Express",
      type: "Express",
      basePrice: 75,
      pricePerKm: 3.5,
      region: "Ashanti",
      status: "Active",
      minDistance: 0,
      maxDistance: 100
    },
  ]);

  const [newRate, setNewRate] = useState<Partial<Rate>>({
    name: "",
    type: "Standard",
    basePrice: 0,
    pricePerKm: 0,
    region: "",
    status: "Active",
    minDistance: 0,
    maxDistance: 0
  });

  const handleAddRate = () => {
    setIsLoading(true);
    setTimeout(() => {
      const rateToAdd = {
        ...newRate,
        id: (rates.length + 1).toString(),
      } as Rate;
      
      setRates([...rates, rateToAdd]);
      setShowAddModal(false);
      setNewRate({
        name: "",
        type: "Standard",
        basePrice: 0,
        pricePerKm: 0,
        region: "",
        status: "Active",
        minDistance: 0,
        maxDistance: 0
      });
      toast.success("Rate added successfully!");
      setIsLoading(false);
    }, 1000);
  };

  const handleRemoveRate = (rateId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setRates(rates.filter(rate => rate.id !== rateId));
      setShowDetailModal(false);
      setShowDeleteConfirm(false);
      toast.success("Rate removed successfully!");
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
        <h1 className="text-2xl font-bold">Delivery Rates</h1>
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Rate
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Rate</DialogTitle>
              <DialogDescription>
                Enter the details of the new delivery rate.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Rate Name</Label>
                <Input
                  id="name"
                  value={newRate.name}
                  onChange={(e) => setNewRate({...newRate, name: e.target.value})}
                  placeholder="e.g. Greater Accra Standard"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Select 
                  value={newRate.type} 
                  onValueChange={(value: "Standard" | "Express" | "Economy") => setNewRate({...newRate, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select rate type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Express">Express</SelectItem>
                    <SelectItem value="Economy">Economy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="basePrice">Base Price (GHS)</Label>
                <Input
                  id="basePrice"
                  type="number"
                  value={newRate.basePrice}
                  onChange={(e) => setNewRate({...newRate, basePrice: parseFloat(e.target.value)})}
                  placeholder="Enter base price"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pricePerKm">Price per KM (GHS)</Label>
                <Input
                  id="pricePerKm"
                  type="number"
                  value={newRate.pricePerKm}
                  onChange={(e) => setNewRate({...newRate, pricePerKm: parseFloat(e.target.value)})}
                  placeholder="Enter price per kilometer"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="region">Region</Label>
                <Select 
                  value={newRate.region} 
                  onValueChange={(value) => setNewRate({...newRate, region: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Greater Accra">Greater Accra</SelectItem>
                    <SelectItem value="Ashanti">Ashanti</SelectItem>
                    <SelectItem value="Western">Western</SelectItem>
                    <SelectItem value="Central">Central</SelectItem>
                    <SelectItem value="Northern">Northern</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddRate}>Add Rate</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rates.map((rate) => (
          <div
            key={rate.id}
            onClick={() => {
              setSelectedRate(rate);
              setShowDetailModal(true);
            }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <DollarSign className="h-8 w-8 text-gray-600" />
              <div>
                <h3 className="font-semibold">{rate.name}</h3>
                <p className="text-sm text-gray-600">{rate.type}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm">Base Price: GHS {rate.basePrice}</p>
              <p className="text-sm">Per KM: GHS {rate.pricePerKm}</p>
              <div className={`mt-2 inline-block px-2 py-1 rounded-full text-sm
                ${rate.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {rate.status}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Rate Detail Modal */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rate Details</DialogTitle>
          </DialogHeader>
          {selectedRate && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                <p className="font-semibold">Name:</p>
                <p>{selectedRate.name}</p>
                <p className="font-semibold">Type:</p>
                <p>{selectedRate.type}</p>
                <p className="font-semibold">Base Price:</p>
                <p>GHS {selectedRate.basePrice}</p>
                <p className="font-semibold">Price per KM:</p>
                <p>GHS {selectedRate.pricePerKm}</p>
                <p className="font-semibold">Region:</p>
                <p>{selectedRate.region}</p>
                <p className="font-semibold">Status:</p>
                <p>{selectedRate.status}</p>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button
                  variant="destructive"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove Rate
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
              Are you sure you want to remove this rate? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => selectedRate && handleRemoveRate(selectedRate.id)}>
              Remove Rate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
