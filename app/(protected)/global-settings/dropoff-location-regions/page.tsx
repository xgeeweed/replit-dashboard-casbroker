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

type Region = {
  id: string;
  name: string;
  capital: string;
  districts: string[];
  mainCities: string[];
  status: "Active" | "Inactive";
};

export default function DropoffLocationRegionsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [regions, setRegions] = useState<Region[]>([
    {
      id: "1",
      name: "Greater Accra",
      capital: "Accra",
      districts: ["Accra Metropolitan", "Tema Metropolitan", "Ga East", "Ga West"],
      mainCities: ["Accra", "Tema", "Madina", "Teshie"],
      status: "Active"
    },
    {
      id: "2",
      name: "Ashanti",
      capital: "Kumasi",
      districts: ["Kumasi Metropolitan", "Oforikrom", "Asokwa", "Ejisu"],
      mainCities: ["Kumasi", "Obuasi", "Ejisu", "Konongo"],
      status: "Active"
    },
  ]);

  const [newRegion, setNewRegion] = useState<Partial<Region>>({
    name: "",
    capital: "",
    districts: [],
    mainCities: [],
    status: "Active"
  });

  const handleAddRegion = () => {
    setIsLoading(true);
    setTimeout(() => {
      const regionToAdd = {
        ...newRegion,
        id: (regions.length + 1).toString(),
      } as Region;
      
      setRegions([...regions, regionToAdd]);
      setShowAddModal(false);
      setNewRegion({
        name: "",
        capital: "",
        districts: [],
        mainCities: [],
        status: "Active"
      });
      toast.success("Region added successfully!");
      setIsLoading(false);
    }, 1000);
  };

  const handleRemoveRegion = (regionId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setRegions(regions.filter(region => region.id !== regionId));
      setShowDetailModal(false);
      setShowDeleteConfirm(false);
      toast.success("Region removed successfully!");
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
        <h1 className="text-2xl font-bold">Dropoff Location Regions</h1>
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Region
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Region</DialogTitle>
              <DialogDescription>
                Enter the details of the new region below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Region Name</Label>
                <Input
                  id="name"
                  value={newRegion.name}
                  onChange={(e) => setNewRegion({...newRegion, name: e.target.value})}
                  placeholder="e.g. Greater Accra"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="capital">Regional Capital</Label>
                <Input
                  id="capital"
                  value={newRegion.capital}
                  onChange={(e) => setNewRegion({...newRegion, capital: e.target.value})}
                  placeholder="e.g. Accra"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="districts">Key Districts (comma separated)</Label>
                <Input
                  id="districts"
                  value={newRegion.districts?.join(", ")}
                  onChange={(e) => setNewRegion({...newRegion, districts: e.target.value.split(",")})}
                  placeholder="e.g. Accra Metropolitan, Tema Metropolitan"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mainCities">Main Cities (comma separated)</Label>
                <Input
                  id="mainCities"
                  value={newRegion.mainCities?.join(", ")}
                  onChange={(e) => setNewRegion({...newRegion, mainCities: e.target.value.split(",")})}
                  placeholder="e.g. Accra, Tema, Madina"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddRegion}>Add Region</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {regions.map((region) => (
          <div
            key={region.id}
            onClick={() => {
              setSelectedRegion(region);
              setShowDetailModal(true);
            }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <MapPin className="h-8 w-8 text-gray-600" />
              <div>
                <h3 className="font-semibold">{region.name}</h3>
                <p className="text-sm text-gray-600">Capital: {region.capital}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm">Districts: {region.districts.length}</p>
              <p className="text-sm">Main Cities: {region.mainCities.length}</p>
              <div className={`mt-2 inline-block px-2 py-1 rounded-full text-sm
                ${region.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {region.status}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Region Detail Modal */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Region Details</DialogTitle>
          </DialogHeader>
          {selectedRegion && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                <p className="font-semibold">Name:</p>
                <p>{selectedRegion.name}</p>
                <p className="font-semibold">Capital:</p>
                <p>{selectedRegion.capital}</p>
                <p className="font-semibold">Districts:</p>
                <p>{selectedRegion.districts.join(", ")}</p>
                <p className="font-semibold">Main Cities:</p>
                <p>{selectedRegion.mainCities.join(", ")}</p>
                <p className="font-semibold">Status:</p>
                <p>{selectedRegion.status}</p>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button
                  variant="destructive"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove Region
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
              Are you sure you want to remove this region? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => selectedRegion && handleRemoveRegion(selectedRegion.id)}>
              Remove Region
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
