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

type PickupLocation = {
  id: string;
  name: string;
  region: string;
  address: string;
  status: "Active" | "Inactive" | "Temporary";
  contactPerson?: string;
  contactPhone?: string;
  operatingHours: string;
};

export default function PickupLocationsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<PickupLocation | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [contactSearch, setContactSearch] = useState("");
  const [locations, setLocations] = useState<PickupLocation[]>([
    {
      id: "1",
      name: "Accra Central Hub",
      region: "Greater Accra",
      address: "15 Independence Avenue, Accra",
      status: "Active",
      contactPerson: "Kwame Mensah",
      contactPhone: "+233 24 123 4567",
      operatingHours: "8:00 AM - 6:00 PM"
    },
    {
      id: "2",
      name: "Kumasi Distribution Center",
      region: "Ashanti",
      address: "Kejetia Market Road, Kumasi",
      status: "Active",
      operatingHours: "7:00 AM - 5:00 PM"
    },
  ]);

  const [newLocation, setNewLocation] = useState<Partial<PickupLocation>>({
    name: "",
    region: "",
    address: "",
    status: "Active",
    operatingHours: "8:00 AM - 6:00 PM"
  });

  const handleAddLocation = () => {
    setIsLoading(true);
    setTimeout(() => {
      const locationToAdd = {
        ...newLocation,
        id: (locations.length + 1).toString(),
      } as PickupLocation;
      
      setLocations([...locations, locationToAdd]);
      setShowAddModal(false);
      setNewLocation({
        name: "",
        region: "",
        address: "",
        status: "Active",
        operatingHours: "8:00 AM - 6:00 PM"
      });
      toast.success("Pickup location added successfully!");
      setIsLoading(false);
    }, 1000);
  };

  const handleAddContact = (locationId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setLocations(locations.map(location => {
        if (location.id === locationId) {
          return {
            ...location,
            contactPerson: contactSearch,
            contactPhone: "+233 24" + Math.floor(Math.random() * 9000000 + 1000000)
          };
        }
        return location;
      }));
      toast.success("Contact person added successfully!");
      setContactSearch("");
      setIsLoading(false);
    }, 1000);
  };

  const handleRemoveContact = (locationId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setLocations(locations.map(location => {
        if (location.id === locationId) {
          const { contactPerson, contactPhone, ...rest } = location;
          return rest;
        }
        return location;
      }));
      toast.success("Contact person removed successfully!");
      setIsLoading(false);
    }, 1000);
  };

  const handleRemoveLocation = (locationId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setLocations(locations.filter(location => location.id !== locationId));
      setShowDetailModal(false);
      setShowDeleteConfirm(false);
      toast.success("Pickup location removed successfully!");
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
        <h1 className="text-2xl font-bold">Pickup Locations</h1>
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Location
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Pickup Location</DialogTitle>
              <DialogDescription>
                Enter the details of the new pickup location below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Location Name</Label>
                <Input
                  id="name"
                  value={newLocation.name}
                  onChange={(e) => setNewLocation({...newLocation, name: e.target.value})}
                  placeholder="e.g. Accra Central Hub"
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
                    <SelectItem value="Eastern">Eastern</SelectItem>
                    <SelectItem value="Central">Central</SelectItem>
                    <SelectItem value="Northern">Northern</SelectItem>
                  </SelectContent>
                </Select>
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
                <Label htmlFor="operatingHours">Operating Hours</Label>
                <Input
                  id="operatingHours"
                  value={newLocation.operatingHours}
                  onChange={(e) => setNewLocation({...newLocation, operatingHours: e.target.value})}
                  placeholder="e.g. 8:00 AM - 6:00 PM"
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
              <div className={`mt-2 inline-block px-2 py-1 rounded-full text-sm
                ${location.status === 'Active' ? 'bg-green-100 text-green-800' :
                  location.status === 'Temporary' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'}`}>
                {location.status}
              </div>
              {location.contactPerson && (
                <p className="text-sm mt-2 text-gray-600">Contact: {location.contactPerson}</p>
              )}
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
                <p className="font-semibold">Address:</p>
                <p>{selectedLocation.address}</p>
                <p className="font-semibold">Status:</p>
                <p>{selectedLocation.status}</p>
                <p className="font-semibold">Operating Hours:</p>
                <p>{selectedLocation.operatingHours}</p>
                {selectedLocation.contactPerson && (
                  <>
                    <p className="font-semibold">Contact Person:</p>
                    <p>{selectedLocation.contactPerson}</p>
                    <p className="font-semibold">Contact Phone:</p>
                    <p>{selectedLocation.contactPhone}</p>
                  </>
                )}
              </div>
              
              <div className="mt-4 flex justify-between">
                <div className="flex-1 mr-2">
                  {!selectedLocation.contactPerson ? (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter contact name..."
                        value={contactSearch}
                        onChange={(e) => setContactSearch(e.target.value)}
                      />
                      <Button 
                        onClick={() => handleAddContact(selectedLocation.id)}
                        disabled={!contactSearch}
                      >
                        <Search className="h-4 w-4 mr-2" />
                        Add Contact
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="destructive"
                      onClick={() => handleRemoveContact(selectedLocation.id)}
                    >
                      Remove Contact
                    </Button>
                  )}
                </div>
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
              Are you sure you want to remove this pickup location? This action cannot be undone.
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
