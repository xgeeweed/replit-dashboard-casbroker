"use client";
import { Spinner } from "@/components/ui/spinner";
import { basicErrorToast } from "@/components/toast";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, MapPin, Search, Trash2 } from "lucide-react";
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

type DropoffLocation = {
  id: string;
  name: string;
  region: string;
  district: string;
  address: string;
  contactPerson: string;
  phone: string;
  status: "Active" | "Inactive";
};

export default function DropoffLocationsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<DropoffLocation | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [locations, setLocations] = useState<DropoffLocation[]>([
    {
      id: "1",
      name: "Accra Central Depot",
      region: "Greater Accra",
      district: "Accra Metropolitan",
      address: "High Street, Near Rawlings Park",
      contactPerson: "Kofi Mensah",
      phone: "0244123456",
      status: "Active"
    },
    {
      id: "2",
      name: "Kumasi Main Hub",
      region: "Ashanti",
      district: "Kumasi Metropolitan", 
      address: "Adum Market Area",
      contactPerson: "Yaa Asantewaa",
      phone: "0201234567",
      status: "Active"
    },
  ]);

  const [newLocation, setNewLocation] = useState<Partial<DropoffLocation>>({
    name: "",
    region: "",
    district: "",
    address: "",
    contactPerson: "",
    phone: "",
    status: "Active"
  });

  const handleAddLocation = () => {
    setIsLoading(true);
    setTimeout(() => {
      const locationToAdd = {
        ...newLocation,
        id: (locations.length + 1).toString(),
      } as DropoffLocation;
      
      setLocations([...locations, locationToAdd]);
      setShowAddModal(false);
      setNewLocation({
        name: "",
        region: "",
        district: "",
        address: "",
        contactPerson: "",
        phone: "",
        status: "Active"
      });
      toast.success("Dropoff location added successfully!");
      setIsLoading(false);
    }, 1000);
  };

  const handleRemoveLocation = (locationId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setLocations(locations.filter(location => location.id !== locationId));
      setShowDetailModal(false);
      setShowDeleteConfirm(false);
      toast.success("Dropoff location removed successfully!");
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
        <h1 className="text-2xl font-bold">Dropoff Locations</h1>
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Location
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Dropoff Location</DialogTitle>
              <DialogDescription>
                Enter the details of the new dropoff location below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Location Name</Label>
                <Input
                  id="name"
                  value={newLocation.name}
                  onChange={(e) => setNewLocation({...newLocation, name: e.target.value})}
                  placeholder="e.g. Accra Central Depot"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="region">Region</Label>
                <Select 
                  value={newLocation.region} 
                  onValueChange={(value) => setNewLocation({...newLocation, region: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Greater Accra">Greater Accra</SelectItem>
                    <SelectItem value="Ashanti">Ashanti</SelectItem>
                    <SelectItem value="Western">Western</SelectItem>
                    <SelectItem value="Central">Central</SelectItem>
                    <SelectItem value="Eastern">Eastern</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="district">District</Label>
                <Input
                  id="district"
                  value={newLocation.district}
                  onChange={(e) => setNewLocation({...newLocation, district: e.target.value})}
                  placeholder="Enter district"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={newLocation.address}
                  onChange={(e) => setNewLocation({...newLocation, address: e.target.value})}
                  placeholder="Enter full address"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input
                  id="contactPerson"
                  value={newLocation.contactPerson}
                  onChange={(e) => setNewLocation({...newLocation, contactPerson: e.target.value})}
                  placeholder="Enter contact person name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={newLocation.phone}
                  onChange={(e) => setNewLocation({...newLocation, phone: e.target.value})}
                  placeholder="Enter phone number"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddLocation}>Add Location</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {locations.map((location) => (
          <div
            key={location.id}
            onClick={() => {
              setSelectedLocation(location);
              setShowDetailModal(true);
            }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <MapPin className="h-8 w-8 text-gray-600" />
              <div>
                <h3 className="font-semibold">{location.name}</h3>
                <p className="text-sm text-gray-600">{location.region}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm">{location.address}</p>
              <p className="text-sm mt-2">Contact: {location.contactPerson}</p>
              <div className={`mt-2 inline-block px-2 py-1 rounded-full text-sm
                ${location.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {location.status}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Location Detail Modal */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Location Details</DialogTitle>
          </DialogHeader>
          {selectedLocation && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                <p className="font-semibold">Name:</p>
                <p>{selectedLocation.name}</p>
                <p className="font-semibold">Region:</p>
                <p>{selectedLocation.region}</p>
                <p className="font-semibold">District:</p>
                <p>{selectedLocation.district}</p>
                <p className="font-semibold">Address:</p>
                <p>{selectedLocation.address}</p>
                <p className="font-semibold">Contact Person:</p>
                <p>{selectedLocation.contactPerson}</p>
                <p className="font-semibold">Phone:</p>
                <p>{selectedLocation.phone}</p>
                <p className="font-semibold">Status:</p>
                <p>{selectedLocation.status}</p>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button
                  variant="destructive"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove Location
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
              Are you sure you want to remove this dropoff location? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => selectedLocation && handleRemoveLocation(selectedLocation.id)}>
              Remove Location
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
