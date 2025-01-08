"use client";
import { Spinner } from "@/components/ui/spinner";
import { basicErrorToast } from "@/components/toast";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Building2, Search, Trash2 } from "lucide-react";
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

type Terminal = {
  id: string;
  name: string;
  region: string;
  address: string;
  status: "Active" | "Inactive" | "Temporary";
  contactPerson: string;
  contactPhone: string;
  operatingHours: string;
};

export default function TerminalLocationsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTerminal, setSelectedTerminal] = useState<Terminal | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [terminals, setTerminals] = useState<Terminal[]>([
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
      contactPerson: "Abena Osei",
      contactPhone: "+233 27 456 7890",
      operatingHours: "7:00 AM - 5:00 PM"
    },
  ]);

  const [newTerminal, setNewTerminal] = useState<Partial<Terminal>>({
    name: "",
    region: "",
    address: "",
    status: "Active",
    contactPerson: "",
    contactPhone: "",
    operatingHours: ""
  });

  const handleAddTerminal = () => {
    setIsLoading(true);
    setTimeout(() => {
      const terminalToAdd = {
        ...newTerminal,
        id: (terminals.length + 1).toString(),
      } as Terminal;
      
      setTerminals([...terminals, terminalToAdd]);
      setShowAddModal(false);
      setNewTerminal({
        name: "",
        region: "",
        address: "",
        status: "Active",
        contactPerson: "",
        contactPhone: "",
        operatingHours: ""
      });
      toast.success("Terminal location added successfully!");
      setIsLoading(false);
    }, 1000);
  };

  const handleRemoveTerminal = (terminalId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setTerminals(terminals.filter(terminal => terminal.id !== terminalId));
      setShowDetailModal(false);
      setShowDeleteConfirm(false);
      toast.success("Terminal location removed successfully!");
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
        <h1 className="text-2xl font-bold">Terminal Locations</h1>
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Terminal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Terminal Location</DialogTitle>
              <DialogDescription>
                Enter the details of the new terminal location below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Terminal Name</Label>
                <Input
                  id="name"
                  value={newTerminal.name}
                  onChange={(e) => setNewTerminal({...newTerminal, name: e.target.value})}
                  placeholder="e.g. Accra Central Hub"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="region">Region</Label>
                <Select 
                  value={newTerminal.region} 
                  onValueChange={(value) => setNewTerminal({...newTerminal, region: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Greater Accra">Greater Accra</SelectItem>
                    <SelectItem value="Ashanti">Ashanti</SelectItem>
                    <SelectItem value="Northern">Northern</SelectItem>
                    <SelectItem value="Western">Western</SelectItem>
                    <SelectItem value="Central">Central</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={newTerminal.address}
                  onChange={(e) => setNewTerminal({...newTerminal, address: e.target.value})}
                  placeholder="Enter full address"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input
                  id="contactPerson"
                  value={newTerminal.contactPerson}
                  onChange={(e) => setNewTerminal({...newTerminal, contactPerson: e.target.value})}
                  placeholder="Enter contact person name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  value={newTerminal.contactPhone}
                  onChange={(e) => setNewTerminal({...newTerminal, contactPhone: e.target.value})}
                  placeholder="e.g. +233 XX XXX XXXX"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="operatingHours">Operating Hours</Label>
                <Input
                  id="operatingHours"
                  value={newTerminal.operatingHours}
                  onChange={(e) => setNewTerminal({...newTerminal, operatingHours: e.target.value})}
                  placeholder="e.g. 8:00 AM - 6:00 PM"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddTerminal}>Add Terminal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {terminals.map((terminal) => (
          <div
            key={terminal.id}
            onClick={() => {
              setSelectedTerminal(terminal);
              setShowDetailModal(true);
            }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <Building2 className="h-8 w-8 text-gray-600" />
              <div>
                <h3 className="font-semibold">{terminal.name}</h3>
                <p className="text-sm text-gray-600">{terminal.region}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm">{terminal.address}</p>
              <div className={`mt-2 inline-block px-2 py-1 rounded-full text-sm
                ${terminal.status === 'Active' ? 'bg-green-100 text-green-800' :
                  terminal.status === 'Temporary' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'}`}>
                {terminal.status}
              </div>
              <p className="text-sm mt-2 text-gray-600">Hours: {terminal.operatingHours}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Terminal Detail Modal */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Terminal Details</DialogTitle>
          </DialogHeader>
          {selectedTerminal && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                <p className="font-semibold">Name:</p>
                <p>{selectedTerminal.name}</p>
                <p className="font-semibold">Region:</p>
                <p>{selectedTerminal.region}</p>
                <p className="font-semibold">Address:</p>
                <p>{selectedTerminal.address}</p>
                <p className="font-semibold">Status:</p>
                <p>{selectedTerminal.status}</p>
                <p className="font-semibold">Contact Person:</p>
                <p>{selectedTerminal.contactPerson}</p>
                <p className="font-semibold">Contact Phone:</p>
                <p>{selectedTerminal.contactPhone}</p>
                <p className="font-semibold">Operating Hours:</p>
                <p>{selectedTerminal.operatingHours}</p>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button
                  variant="destructive"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove Terminal
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
              Are you sure you want to remove this terminal location? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => selectedTerminal && handleRemoveTerminal(selectedTerminal.id)}>
              Remove Terminal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
