"use client";
import { Spinner } from "@/components/ui/spinner";
import { basicErrorToast } from "@/components/toast";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Users, Search, Trash2 } from "lucide-react";
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

type ExternalUserType = {
  id: string;
  name: string;
  description: string;
  accessLevel: "Basic" | "Intermediate" | "Advanced";
  status: "Active" | "Inactive";
  permissions: string[];
};

export default function ExternalUserTypesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<ExternalUserType | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userTypes, setUserTypes] = useState<ExternalUserType[]>([
    {
      id: "1",
      name: "Freight Broker",
      description: "External brokers who connect shippers with carriers",
      accessLevel: "Advanced",
      status: "Active",
      permissions: ["view_loads", "create_loads", "manage_bookings"]
    },
    {
      id: "2",
      name: "Independent Driver",
      description: "Self-employed drivers who own their vehicles",
      accessLevel: "Basic",
      status: "Active", 
      permissions: ["view_loads", "accept_loads"]
    },
  ]);

  const [newType, setNewType] = useState<Partial<ExternalUserType>>({
    name: "",
    description: "",
    accessLevel: "Basic",
    status: "Active",
    permissions: []
  });

  const handleAddType = () => {
    setIsLoading(true);
    setTimeout(() => {
      const typeToAdd = {
        ...newType,
        id: (userTypes.length + 1).toString(),
        permissions: ["view_loads"] // Default permission
      } as ExternalUserType;
      
      setUserTypes([...userTypes, typeToAdd]);
      setShowAddModal(false);
      setNewType({
        name: "",
        description: "",
        accessLevel: "Basic",
        status: "Active",
        permissions: []
      });
      toast.success("User type added successfully!");
      setIsLoading(false);
    }, 1000);
  };

  const handleRemoveType = (typeId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setUserTypes(userTypes.filter(type => type.id !== typeId));
      setShowDetailModal(false);
      setShowDeleteConfirm(false);
      toast.success("User type removed successfully!");
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
        <h1 className="text-2xl font-bold">External User Types</h1>
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add User Type
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User Type</DialogTitle>
              <DialogDescription>
                Enter the details of the new external user type.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newType.name}
                  onChange={(e) => setNewType({...newType, name: e.target.value})}
                  placeholder="e.g. Freight Broker"
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
                <Label htmlFor="accessLevel">Access Level</Label>
                <Select 
                  value={newType.accessLevel} 
                  onValueChange={(value: "Basic" | "Intermediate" | "Advanced") => setNewType({...newType, accessLevel: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select access level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddType}>Add User Type</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => {
              setSelectedType(type);
              setShowDetailModal(true);
            }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <Users className="h-8 w-8 text-gray-600" />
              <div>
                <h3 className="font-semibold">{type.name}</h3>
                <p className="text-sm text-gray-600">{type.accessLevel} Access</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm">{type.description}</p>
              <div className={`mt-2 inline-block px-2 py-1 rounded-full text-sm
                ${type.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {type.status}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* User Type Detail Modal */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Type Details</DialogTitle>
          </DialogHeader>
          {selectedType && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                <p className="font-semibold">Name:</p>
                <p>{selectedType.name}</p>
                <p className="font-semibold">Description:</p>
                <p>{selectedType.description}</p>
                <p className="font-semibold">Access Level:</p>
                <p>{selectedType.accessLevel}</p>
                <p className="font-semibold">Status:</p>
                <p>{selectedType.status}</p>
                <p className="font-semibold">Permissions:</p>
                <div>
                  {selectedType.permissions.map((perm, index) => (
                    <span key={index} className="inline-block bg-gray-100 rounded px-2 py-1 text-sm mr-2 mb-2">
                      {perm}
                    </span>
                  ))}
                </div>
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
              Are you sure you want to remove this user type? This action cannot be undone.
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
