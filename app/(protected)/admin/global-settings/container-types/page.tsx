"use client";
import { Spinner } from "@/components/ui/spinner";
import { basicErrorToast } from "@/components/toast";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Box, Trash2 } from "lucide-react";
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

type ContainerType = {
  id: string;
  name: string;
  maxWeight: number;
  dimensions: string;
  description: string;
};

export default function ContainerTypesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedContainer, setSelectedContainer] = useState<ContainerType | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [containerTypes, setContainerTypes] = useState<ContainerType[]>([
    {
      id: "1",
      name: "20ft Standard",
      maxWeight: 28000,
      dimensions: "20' x 8' x 8'6\"",
      description: "Standard 20ft shipping container"
    },
    {
      id: "2",
      name: "40ft High Cube",
      maxWeight: 32500,
      dimensions: "40' x 8' x 9'6\"",
      description: "High cube 40ft shipping container"
    },
  ]);

  const [newContainer, setNewContainer] = useState<Partial<ContainerType>>({
    name: "",
    maxWeight: 0,
    dimensions: "",
    description: ""
  });

  const handleAddContainer = () => {
    setIsLoading(true);
    setTimeout(() => {
      const containerToAdd = {
        ...newContainer,
        id: (containerTypes.length + 1).toString(),
      } as ContainerType;
      
      setContainerTypes([...containerTypes, containerToAdd]);
      setShowAddModal(false);
      setNewContainer({
        name: "",
        maxWeight: 0,
        dimensions: "",
        description: ""
      });
      toast.success("Container type added successfully!");
      setIsLoading(false);
    }, 1000);
  };

  const handleRemoveContainer = (containerId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setContainerTypes(containerTypes.filter(container => container.id !== containerId));
      setShowDetailModal(false);
      setShowDeleteConfirm(false);
      toast.success("Container type removed successfully!");
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
        <h1 className="text-2xl font-bold">Container Types</h1>
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Container Type
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Container Type</DialogTitle>
              <DialogDescription>
                Enter the details of the new container type below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newContainer.name}
                  onChange={(e) => setNewContainer({...newContainer, name: e.target.value})}
                  placeholder="e.g. 20ft Standard"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="maxWeight">Maximum Weight (kg)</Label>
                <Input
                  id="maxWeight"
                  type="number"
                  value={newContainer.maxWeight}
                  onChange={(e) => setNewContainer({...newContainer, maxWeight: parseInt(e.target.value)})}
                  placeholder="Enter maximum weight in kg"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dimensions">Dimensions</Label>
                <Input
                  id="dimensions"
                  value={newContainer.dimensions}
                  onChange={(e) => setNewContainer({...newContainer, dimensions: e.target.value})}
                  placeholder="e.g. 20' x 8' x 8'6"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newContainer.description}
                  onChange={(e) => setNewContainer({...newContainer, description: e.target.value})}
                  placeholder="Enter container description"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddContainer}>Add Container Type</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {containerTypes.map((container) => (
          <div
            key={container.id}
            onClick={() => {
              setSelectedContainer(container);
              setShowDetailModal(true);
            }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <Box className="h-8 w-8 text-gray-600" />
              <div>
                <h3 className="font-semibold">{container.name}</h3>
                <p className="text-sm text-gray-600">{container.dimensions}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm">Max Weight: {container.maxWeight} kg</p>
              <p className="text-sm mt-2 text-gray-600">{container.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Container Detail Modal */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Container Type Details</DialogTitle>
          </DialogHeader>
          {selectedContainer && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                <p className="font-semibold">Name:</p>
                <p>{selectedContainer.name}</p>
                <p className="font-semibold">Maximum Weight:</p>
                <p>{selectedContainer.maxWeight} kg</p>
                <p className="font-semibold">Dimensions:</p>
                <p>{selectedContainer.dimensions}</p>
                <p className="font-semibold">Description:</p>
                <p>{selectedContainer.description}</p>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button
                  variant="destructive"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove Container Type
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
              Are you sure you want to remove this container type? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => selectedContainer && handleRemoveContainer(selectedContainer.id)}>
              Remove Container Type
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
