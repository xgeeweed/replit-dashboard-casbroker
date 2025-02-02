"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Truck, User, Star, DollarSign, Clock, Phone, FileText, Loader2, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Driver {
  id: string;
  name: string;
  image: string;
  experience: number;
  rating: number;
  phone: string;
  licenseNumber: string;
  completedLoads: number;
  vehicle: {
    id: string;
    type: string;
    registrationNumber: string;
    make: string;
    model: string;
    year: number;
  };
  bidAmount?: number;
}

interface UpdateTransportWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (driverId: string, rate: number) => void;
  loadId: string;
  currentRate: number;
}

// Simulated API function to fetch interested drivers
const getInterestedDrivers = async (loadId: string): Promise<Driver[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock data
  return [
    {
      id: "D1",
      name: "Kwame Mensah",
      image: "/avatars/driver1.jpg",
      experience: 5,
      rating: 4.8,
      phone: "+233 54 123 4567",
      licenseNumber: "GH-DL-2345",
      completedLoads: 156,
      vehicle: {
        id: "V1",
        type: "Box Truck",
        registrationNumber: "GR 2345-22",
        make: "Toyota",
        model: "Dyna",
        year: 2020
      },
      bidAmount: 3200
    },
    {
      id: "D2",
      name: "Kofi Owusu",
      image: "/avatars/driver2.jpg",
      experience: 3,
      rating: 4.5,
      phone: "+233 55 987 6543",
      licenseNumber: "GH-DL-7890",
      completedLoads: 89,
      vehicle: {
        id: "V2",
        type: "Flatbed",
        registrationNumber: "GW 7890-21",
        make: "Isuzu",
        model: "FTR",
        year: 2021
      },
      bidAmount: 3400
    },
    {
      id: "D3",
      name: "Yaw Asante",
      image: "/avatars/driver3.jpg",
      experience: 7,
      rating: 4.9,
      phone: "+233 24 456 7890",
      licenseNumber: "GH-DL-4567",
      completedLoads: 234,
      vehicle: {
        id: "V3",
        type: "Box Truck",
        registrationNumber: "GE 4567-20",
        make: "Mitsubishi",
        model: "Fuso",
        year: 2019
      },
      bidAmount: 3100
    }
  ];
};

// Simulated API function to fetch all available drivers
const getAllDrivers = async (searchQuery: string): Promise<Driver[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock data - extended list
  const allDrivers = [
    {
      id: "D4",
      name: "Emmanuel Addo",
      image: "/avatars/driver4.jpg",
      experience: 8,
      rating: 4.7,
      phone: "+233 24 789 0123",
      licenseNumber: "GH-DL-8901",
      completedLoads: 278,
      vehicle: {
        id: "V4",
        type: "Flatbed",
        registrationNumber: "GS 8901-19",
        make: "Scania",
        model: "P410",
        year: 2021
      }
    },
    {
      id: "D5",
      name: "Samuel Koffi",
      image: "/avatars/driver5.jpg",
      experience: 4,
      rating: 4.6,
      phone: "+233 55 234 5678",
      licenseNumber: "GH-DL-5678",
      completedLoads: 112,
      vehicle: {
        id: "V5",
        type: "Box Truck",
        registrationNumber: "GT 5678-20",
        make: "Hino",
        model: "500",
        year: 2020
      }
    },
    {
      id: "D6",
      name: "Daniel Mensah",
      image: "/avatars/driver6.jpg",
      experience: 6,
      rating: 4.8,
      phone: "+233 24 345 6789",
      licenseNumber: "GH-DL-3456",
      completedLoads: 198,
      vehicle: {
        id: "V6",
        type: "Container Truck",
        registrationNumber: "GE 3456-21",
        make: "Mercedes-Benz",
        model: "Actros",
        year: 2021
      }
    }
  ];

  // Filter based on search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    return allDrivers.filter(driver => 
      driver.name.toLowerCase().includes(query) ||
      driver.vehicle.type.toLowerCase().includes(query) ||
      driver.vehicle.registrationNumber.toLowerCase().includes(query)
    );
  }

  return allDrivers;
};

export function UpdateTransportWizard({
  isOpen,
  onClose,
  onConfirm,
  loadId,
  currentRate
}: UpdateTransportWizardProps) {
  const [step, setStep] = useState(1);
  const [activeTab, setActiveTab] = useState("interested");
  const [searchQuery, setSearchQuery] = useState("");
  const [interestedDrivers, setInterestedDrivers] = useState<Driver[]>([]);
  const [allDrivers, setAllDrivers] = useState<Driver[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [agreedRate, setAgreedRate] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadDrivers();
    }
  }, [isOpen, loadId]);

  useEffect(() => {
    if (activeTab === "all") {
      searchDrivers(searchQuery);
    }
  }, [searchQuery, activeTab]);

  const loadDrivers = async () => {
    setIsLoading(true);
    try {
      const interested = await getInterestedDrivers(loadId);
      setInterestedDrivers(interested);
    } catch (error) {
      console.error("Failed to load drivers:", error);
    }
    setIsLoading(false);
  };

  const searchDrivers = async (query: string) => {
    setIsLoading(true);
    try {
      const drivers = await getAllDrivers(query);
      setAllDrivers(drivers);
    } catch (error) {
      console.error("Failed to search drivers:", error);
    }
    setIsLoading(false);
  };

  const handleClose = () => {
    setStep(1);
    setActiveTab("interested");
    setSearchQuery("");
    setSelectedDriver(null);
    setAgreedRate(0);
    onClose();
  };

  const handleDriverSelect = (driver: Driver) => {
    setSelectedDriver(driver);
    setAgreedRate(driver.bidAmount || currentRate);
    setStep(2);
  };

  const handleConfirm = () => {
    if (selectedDriver && agreedRate) {
      onConfirm(selectedDriver.id, agreedRate);
      handleClose();
    }
  };

  const renderDriverCard = (driver: Driver) => (
    <Card
      key={driver.id}
      className={`cursor-pointer hover:shadow-md transition-shadow ${
        selectedDriver?.id === driver.id ? 'ring-2 ring-primary' : ''
      }`}
      onClick={() => handleDriverSelect(driver)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 border-2 border-border">
            <AvatarImage src={driver.image} />
            <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">{driver.name}</h3>
              {driver.bidAmount && (
                <Badge variant="secondary" className="bg-green-500/20 text-green-700">
                  GHS {driver.bidAmount.toLocaleString()}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="font-medium">{driver.rating}</span>
              <span className="text-muted-foreground">({driver.completedLoads} loads)</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{driver.vehicle.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{driver.experience} years exp.</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Update Transport</DialogTitle>
          <DialogDescription>
            {step === 1
              ? "Select a driver for this load."
              : "Set the agreed rate and confirm the assignment."}
          </DialogDescription>
        </DialogHeader>

        {step === 1 ? (
          <Tabs defaultValue="interested" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="interested">Interested Drivers</TabsTrigger>
              <TabsTrigger value="all">All Drivers</TabsTrigger>
            </TabsList>

            {activeTab === "all" && (
              <div className="relative mt-4">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search drivers by name, vehicle type, or registration"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            )}

            <TabsContent value="interested" className="mt-4">
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : interestedDrivers.length > 0 ? (
                    interestedDrivers.map(driver => renderDriverCard(driver))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No interested drivers found
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="all" className="mt-4">
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : allDrivers.length > 0 ? (
                    allDrivers.map(driver => renderDriverCard(driver))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No drivers found matching your search
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="grid gap-6 py-4">
            {selectedDriver && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Driver Details</Label>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedDriver.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>License: {selectedDriver.licenseNumber}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label>Vehicle Details</Label>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedDriver.vehicle.registrationNumber}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {selectedDriver.vehicle.make} {selectedDriver.vehicle.model} ({selectedDriver.vehicle.year})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Agreed Rate (GHS)</Label>
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <DollarSign className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                      <Input
                        type="number"
                        value={agreedRate}
                        onChange={(e) => setAgreedRate(Number(e.target.value))}
                        className="pl-10"
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Original Rate: GHS {currentRate.toLocaleString()}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          {step === 2 && (
            <Button onClick={handleConfirm}>
              Confirm Assignment
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 