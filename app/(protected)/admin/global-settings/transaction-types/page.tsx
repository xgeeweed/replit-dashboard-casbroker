"use client";
import { Spinner } from "@/components/ui/spinner";
import { basicErrorToast } from "@/components/toast";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Package, Search, Trash2 } from "lucide-react";
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

type TransactionType = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  pricePerKg: number;
  status: "Active" | "Inactive" | "Seasonal";
  maxWeight: number;
  estimatedDuration: string;
};

export default function TransactionTypesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<TransactionType | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [transactionTypes, setTransactionTypes] = useState<TransactionType[]>([
    {
      id: "1",
      name: "Standard Delivery",
      description: "Regular ground shipping within Ghana",
      basePrice: 50,
      pricePerKg: 2.5,
      status: "Active",
      maxWeight: 1000,
      estimatedDuration: "2-3 days"
    },
    {
      id: "2",
      name: "Express Delivery",
      description: "Same-day delivery for urgent packages",
      basePrice: 100,
      pricePerKg: 5.0,
      status: "Active",
      maxWeight: 500,
      estimatedDuration: "Same day"
    },
  ]);

  const [newType, setNewType] = useState<Partial<TransactionType>>({
    name: "",
    description: "",
    basePrice: 0,
    pricePerKg: 0,
    status: "Active",
    maxWeight: 0,
    estimatedDuration: ""
  });

  const handleAddType = () => {
    setIsLoading(true);
    setTimeout(() => {
      const typeToAdd = {
        ...newType,
        id: (transactionTypes.length + 1).toString(),
      } as TransactionType;
      
      setTransactionTypes([...transactionTypes, typeToAdd]);
      setShowAddModal(false);
      setNewType({
        name: "",
        description: "",
        basePrice: 0,
        pricePerKg: 0,
        status: "Active",
        maxWeight: 0,
        estimatedDuration: ""
      });
      toast.success("Transaction type added successfully!");
      setIsLoading(false);
    }, 1000);
  };

  const handleRemoveType = (typeId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setTransactionTypes(transactionTypes.filter(type => type.id !== typeId));
      setShowDetailModal(false);
      setShowDeleteConfirm(false);
      toast.success("Transaction type removed successfully!");
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
        <h1 className="text-2xl font-bold">Transaction Types</h1>
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Type
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Transaction Type</DialogTitle>
              <DialogDescription>
                Enter the details of the new transaction type below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newType.name}
                  onChange={(e) => setNewType({...newType, name: e.target.value})}
                  placeholder="e.g. Standard Delivery"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newType.description}
                  onChange={(e) => setNewType({...newType, description: e.target.value})}
                  placeholder="Enter description"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="basePrice">Base Price (GHS)</Label>
                <Input
                  id="basePrice"
                  type="number"
                  value={newType.basePrice}
                  onChange={(e) => setNewType({...newType, basePrice: parseFloat(e.target.value)})}
                  placeholder="Enter base price"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pricePerKg">Price per KG (GHS)</Label>
                <Input
                  id="pricePerKg"
                  type="number"
                  value={newType.pricePerKg}
                  onChange={(e) => setNewType({...newType, pricePerKg: parseFloat(e.target.value)})}
                  placeholder="Enter price per kg"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="maxWeight">Maximum Weight (KG)</Label>
                <Input
                  id="maxWeight"
                  type="number"
                  value={newType.maxWeight}
                  onChange={(e) => setNewType({...newType, maxWeight: parseInt(e.target.value)})}
                  placeholder="Enter maximum weight"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="estimatedDuration">Estimated Duration</Label>
                <Input
                  id="estimatedDuration"
                  value={newType.estimatedDuration}
                  onChange={(e) => setNewType({...newType, estimatedDuration: e.target.value})}
                  placeholder="e.g. 2-3 days"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={newType.status} 
                  onValueChange={(value: "Active" | "Inactive" | "Seasonal") => setNewType({...newType, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Seasonal">Seasonal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddType}>Add Type</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {transactionTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => {
              setSelectedType(type);
              setShowDetailModal(true);
            }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <Package className="h-8 w-8 text-gray-600" />
              <div>
                <h3 className="font-semibold">{type.name}</h3>
                <p className="text-sm text-gray-600">{type.description}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm">Base Price: GHS {type.basePrice}</p>
              <p className="text-sm">Per KG: GHS {type.pricePerKg}</p>
              <div className={`mt-2 inline-block px-2 py-1 rounded-full text-sm
                ${type.status === 'Active' ? 'bg-green-100 text-green-800' :
                  type.status === 'Inactive' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'}`}>
                {type.status}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Transaction Type Detail Modal */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transaction Type Details</DialogTitle>
          </DialogHeader>
          {selectedType && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                <p className="font-semibold">Name:</p>
                <p>{selectedType.name}</p>
                <p className="font-semibold">Description:</p>
                <p>{selectedType.description}</p>
                <p className="font-semibold">Base Price:</p>
                <p>GHS {selectedType.basePrice}</p>
                <p className="font-semibold">Price per KG:</p>
                <p>GHS {selectedType.pricePerKg}</p>
                <p className="font-semibold">Maximum Weight:</p>
                <p>{selectedType.maxWeight} KG</p>
                <p className="font-semibold">Estimated Duration:</p>
                <p>{selectedType.estimatedDuration}</p>
                <p className="font-semibold">Status:</p>
                <p>{selectedType.status}</p>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button
                  variant="destructive"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove Type
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
              Are you sure you want to remove this transaction type? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => selectedType && handleRemoveType(selectedType.id)}>
              Remove Type
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
