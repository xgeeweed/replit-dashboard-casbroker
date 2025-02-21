"use client";

import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { data as loadsData } from "../data";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  MapPin, 
  Clock, 
  Truck, 
  User, 
  Phone, 
  FileText, 
  DollarSign, 
  Building, 
  Star,
  Package,
  Calendar,
  Info,
  ArrowRight,
  AlertCircle,
  ArrowRightCircle,
  CircleDot,
  Circle,
  Map,
  Plus
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CancelLoadDialog } from "@/components/loadboard/cancel-load-dialog";
import { ChangeRouteWizard } from "@/components/loadboard/change-route-wizard";
import { UpdateTransportWizard } from "@/components/loadboard/update-transport-wizard";
import { RateManagementDialog } from "@/components/loadboard/rate-management-dialog";

interface Coordinates {
  lat: number;
  lng: number;
}

interface DetailRowProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  className?: string;
  valueClassName?: string;
}

const DetailRow = ({ icon: Icon, label, value, className = "", valueClassName = "" }: DetailRowProps) => (
  <div className={`flex items-center gap-4 py-3 border-b border-border/50 group hover:bg-accent/50 rounded-lg px-2 transition-colors ${className}`}>
    <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
    <div className="flex-1">
      <p className="text-sm text-muted-foreground group-hover:text-primary/80">{label}</p>
      <p className={`font-medium ${valueClassName}`}>{value}</p>
    </div>
  </div>
);

const StatusBadge = ({ status, type = "load" }: { status: string, type?: "load" | "driver" | "vehicle" }) => {
  const getStatusColor = () => {
    if (type === "load") {
      return status === "In Progress" ? "bg-blue-500/20 text-blue-700" : "bg-gray-500/20 text-gray-700";
    }
    return status === "Active" ? "bg-green-500/20 text-green-700" : "bg-gray-500/20 text-gray-700";
  };

  return (
    <Badge variant="secondary" className={`${getStatusColor()} font-medium`}>
      {status}
    </Badge>
  );
};

interface RateHistory {
  type: "rate" | "charge" | "penalty";
  amount: number;
  timestamp: string;
  comment?: string;
  reason?: string;
}

interface Load {
  id: string;
  blNumber: string;
  pickupLocation: {
    name: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  deliveryLocation: {
    name: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  pickupDate: string;
  status: string;
  distance: string;
  rate: number;
  marketRate: number;
  weight: string;
  age: string;
  equipmentType: string;
  equipment: {
    type: string;
    container_size: string;
    weight: string;
    commodity: string;
    load: string;
  };
  postedTime: string;
  shipmentDetails: {
    pickUpDate: string;
    pickUpHours: string;
    dockHours: string;
    reference: string;
    comments: string;
  };
  rateDetails: {
    total: number;
    trip: string;
    ratePerKm: number;
  };
  companyDetails: {
    name: string;
    telephone: string;
    mcNumber: string;
    location: string;
    creditScore: number;
    daysToPay: string;
    reviews: {
      score: number;
      count: number;
    };
  };
  driver: {
    id: string;
    name: string;
    image?: string;
    status: string;
    licenseNumber: string;
    phone: string;
    experience: number;
  };
  vehicle: {
    registrationNumber: string;
    make: string;
    model: string;
    type: string;
    year: number;
    capacity: string;
    insuranceExpiry: string;
    status: string;
  };
  rateHistory?: RateHistory[];
}

interface RateUpdate {
  type: "rate" | "charge" | "penalty";
  amount: number;
  reason?: string;
  comment?: string;
  notifyDriver?: boolean;
  notifyAgent?: boolean;
}

export default function LoadDetails() {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [load, setLoad] = useState<Load | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showRouteWizard, setShowRouteWizard] = useState(false);
  const [showUpdateTransportWizard, setShowUpdateTransportWizard] = useState(false);
  const [showRateDialog, setShowRateDialog] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundLoad = loadsData.find((l) => l.id === id);
      if (foundLoad) {
        // Convert string locations to location objects to match Load type
        const loadWithLocationObjects = {
          ...foundLoad,
          pickupLocation: typeof foundLoad.pickupLocation === 'string' 
            ? { name: foundLoad.pickupLocation, coordinates: { lat: 0, lng: 0 } }
            : foundLoad.pickupLocation,
          deliveryLocation: typeof foundLoad.deliveryLocation === 'string'
            ? { name: foundLoad.deliveryLocation, coordinates: { lat: 0, lng: 0 } }
            : foundLoad.deliveryLocation
        };
        setLoad(loadWithLocationObjects);
      } else {
        toast.error("Load not found");
        router.push("/admin/loads/active");
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id, router]);

  const handleViewRoute = () => {
    if (!load) return;
    // Create Google Maps URL with directions
    const origin = encodeURIComponent(load.pickupLocation.name);
    const destination = encodeURIComponent(load.deliveryLocation.name);
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
    window.open(mapsUrl, '_blank');
  };

  const handleLoadCancelled = () => {
    setLoad((prev: Load | null) => prev ? {...prev, status: "Cancelled"} : null);
    setShowCancelDialog(false);
    toast.success("Load cancelled successfully");
    router.push("/admin/loads/active");
  };

  const handleRouteChange = (data: {
    destination: string;
    rate: number;
    distanceKm: number;
    coordinates: Coordinates;
  }) => {
    setLoad((prev) => prev ? {
      ...prev,
      deliveryLocation: {
        name: data.destination,
        coordinates: data.coordinates
      },
      rate: data.rate,
      distance: `${data.distanceKm.toFixed(2)} km`,
    } : null);
    setShowRouteWizard(false);
    toast.success("Route updated successfully");
  };

  const handleUpdateTransport = (driverId: string, agreedRate: number) => {
    setLoad((prev: Load | null): Load | null => {
      if (!prev) return null;
      
      return {
        ...prev,
        rate: agreedRate,
        driver: {
          id: driverId,
          name: "Kwame Mensah",
          image: "/avatars/driver1.jpg",
          status: "Active",
          licenseNumber: "GH-DL-2345",
          phone: "+233 54 123 4567",
          experience: 5
        },
        vehicle: {
          registrationNumber: "GR 2345-22",
          make: "Toyota",
          model: "Dyna",
          type: "Box Truck",
          year: 2020,
          capacity: "5 tons",
          insuranceExpiry: "2024-12-31",
          status: "Active"
        }
      } as Load;
    });

    toast.success("Transport updated successfully");
  };

  const handleRateUpdate = (update: RateUpdate) => {
    setLoad((prev: Load | null) => {
      if (!prev) return null;

      let message = "";
      let newRate = prev.rate;

      switch (update.type) {
        case "rate":
          newRate = update.amount;
          message = "Rate updated successfully";
          break;
        case "charge":
          newRate = prev.rate + update.amount;
          message = `Additional charge of GHS ${update.amount} added`;
          break;
        case "penalty":
          newRate = prev.rate - update.amount;
          message = `Penalty of GHS ${update.amount} applied: ${update.reason}`;
          break;
      }

      toast.success(message);
      return {
        ...prev,
        rate: newRate,
        rateHistory: [
          ...(prev.rateHistory || []),
          {
            type: update.type,
            amount: update.amount,
            timestamp: new Date().toISOString(),
            comment: update.comment,
            reason: update.reason
          } as RateHistory
        ]
      };
    });
  };

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner className="h-8 w-8" />
    </div>
  );
  if (!load) return null;

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/admin/loads/active")}
            className="hover:bg-accent"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">Load Details</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>ID: {load.id}</span>
              <ArrowRight className="h-4 w-4" />
              <span>{load.blNumber}</span>
            </div>
          </div>
        </div>
        <StatusBadge status={load.status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Basic Load Information */}
        <Card className="lg:col-span-2 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Load Information
            </CardTitle>
            <CardDescription>Basic details about the load</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Route Information */}
            <div className="bg-gradient-to-b from-accent/30 to-accent/10 rounded-xl p-6">
              <div className="flex flex-col space-y-6">
                {/* View Route Button */}
                <Button
                  variant="outline"
                  className="w-full bg-background/80 hover:bg-background flex items-center gap-2 h-12"
                  onClick={handleViewRoute}
                >
                  <Map className="h-5 w-5" />
                  <span>View Route on Map</span>
                </Button>

                {/* Pickup Location */}
                <div className="flex items-center gap-4 bg-background/80 p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
                    <CircleDot className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-muted-foreground">Pickup Location</p>
                    <p className="text-lg font-semibold text-green-600 truncate">{load.pickupLocation.name}</p>
                  </div>
                </div>
                
                {/* Route Line and Distance */}
                <div className="relative flex justify-center">
                  <div className="absolute left-[2.35rem] top-[-24px] bottom-[-24px] w-[2px]" style={{ background: 'linear-gradient(to bottom, #22c55e, #ef4444)' }}></div>
                  <div className="z-10 bg-white px-4 py-2 rounded-full shadow-sm border border-border/50">
                    <div className="flex items-center gap-2">
                      <ArrowRightCircle className="h-5 w-5 text-blue-500 rotate-90" />
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">Total Distance</p>
                        <p className="text-sm font-semibold text-blue-600">{load.distance}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Delivery Location */}
                <div className="flex items-center gap-4 bg-background/80 p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100">
                    <Circle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-muted-foreground">Delivery Location</p>
                    <p className="text-lg font-semibold text-red-600 truncate">{load.deliveryLocation.name}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Load Details */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="col-span-2 bg-accent/30 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">Equipment Type</p>
                    <p className="text-lg font-semibold text-primary">{load.equipmentType}</p>
                  </div>
                </div>
              </div>
              <DetailRow 
                icon={Package} 
                label="Weight" 
                value={load.weight}
                valueClassName="text-blue-600"
              />
              <DetailRow 
                icon={Package} 
                label="Container Size" 
                value={load.equipment.container_size}
                valueClassName="text-blue-600"
              />
              <DetailRow 
                icon={Clock} 
                label="Age" 
                value={load.age}
              />
              <DetailRow 
                icon={Clock} 
                label="Posted" 
                value={load.postedTime}
              />
            </div>
          </CardContent>
        </Card>

        {/* Rate Information */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Rate Details
            </CardTitle>
            <CardDescription>Financial information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <DetailRow 
                  icon={DollarSign} 
                  label="Rate" 
                  value={`GHS ${load.rate.toLocaleString()}`}
                  valueClassName="text-lg text-green-600 font-semibold"
                  className="flex-1 border-none"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowRateDialog(true)}
                  className="ml-4"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Manage Rate
                </Button>
              </div>

              <DetailRow 
                icon={DollarSign} 
                label="Market Rate" 
                value={`GHS ${load.marketRate.toLocaleString()}`}
                valueClassName="text-gray-600"
              />
              <DetailRow 
                icon={DollarSign} 
                label="Rate per KM" 
                value={`GHS ${load.rateDetails.ratePerKm.toFixed(2)}`}
              />
              <DetailRow 
                icon={MapPin} 
                label="Trip Distance" 
                value={load.rateDetails.trip} 
              />

              {load.rateHistory && load.rateHistory.length > 0 && (
                <div className="mt-6 pt-6 border-t">
                  <h4 className="text-sm font-medium mb-4">Rate History</h4>
                  <div className="space-y-3">
                    {load.rateHistory.map((history: RateHistory, index: number) => (
                      <div key={index} className="flex items-start gap-3 text-sm">
                        <Badge 
                          variant="secondary" 
                          className={
                            history.type === "penalty" 
                              ? "bg-red-500/20 text-red-700" 
                              : history.type === "charge"
                              ? "bg-blue-500/20 text-blue-700"
                              : "bg-green-500/20 text-green-700"
                          }
                        >
                          {history.type === "penalty" ? "-" : "+"}
                          GHS {history.amount}
                        </Badge>
                        <div className="flex-1">
                          <p className="font-medium">
                            {history.reason || (history.type === "rate" ? "Rate Update" : "Additional Charge")}
                          </p>
                          {history.comment && (
                            <p className="text-muted-foreground mt-1">{history.comment}</p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(history.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Equipment Details */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Equipment Details
            </CardTitle>
            <CardDescription>Equipment specifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <DetailRow icon={Truck} label="Type" value={load.equipment.type} />
            <DetailRow icon={Package} label="Container Size" value={load.equipment.container_size} />
            <DetailRow icon={Package} label="Weight" value={load.equipment.weight} />
            <DetailRow icon={Package} label="Commodity" value={load.equipment.commodity} />
            <DetailRow icon={Package} label="Load Type" value={load.equipment.load} />
          </CardContent>
        </Card>

        {/* Shipment Details */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Shipment Details
            </CardTitle>
            <CardDescription>Timing and scheduling</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <DetailRow icon={Calendar} label="Pickup Date" value={load.shipmentDetails.pickUpDate} />
            <DetailRow icon={Clock} label="Pickup Hours" value={load.shipmentDetails.pickUpHours} />
            <DetailRow icon={Clock} label="Dock Hours" value={load.shipmentDetails.dockHours} />
            <DetailRow icon={FileText} label="Reference" value={load.shipmentDetails.reference} />
            <div className="mt-4 p-3 bg-accent/50 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Special Instructions</p>
                  <p className="text-sm text-muted-foreground">{load.shipmentDetails.comments}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Details */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Company Details
            </CardTitle>
            <CardDescription>Business information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <DetailRow icon={Building} label="Company" value={load.companyDetails.name} />
              <DetailRow icon={Phone} label="Telephone" value={load.companyDetails.telephone} />
              <DetailRow icon={FileText} label="MC Number" value={load.companyDetails.mcNumber} />
              <DetailRow icon={MapPin} label="Location" value={load.companyDetails.location} />
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <span className="font-medium text-lg">{load.companyDetails.reviews.score}/5</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {load.companyDetails.reviews.count} reviews
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-2.5 w-2.5 rounded-full ${load.companyDetails.creditScore >= 90 ? 'bg-green-500' : load.companyDetails.creditScore >= 80 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                    <span className="font-medium">Credit Score: {load.companyDetails.creditScore}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{load.companyDetails.daysToPay}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Driver Information */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Driver Information
            </CardTitle>
            <CardDescription>Driver details and status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-16 w-16 border-2 border-border">
                <AvatarImage src={load.driver.image} />
                <AvatarFallback className="text-lg">{load.driver.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-lg">{load.driver.name}</p>
                <StatusBadge status={load.driver.status} type="driver" />
              </div>
            </div>
            <div className="space-y-4">
              <DetailRow icon={FileText} label="License Number" value={load.driver.licenseNumber} />
              <DetailRow icon={Phone} label="Phone" value={load.driver.phone} />
              <DetailRow 
                icon={Clock} 
                label="Experience" 
                value={`${load.driver.experience} years`}
                valueClassName={load.driver.experience >= 5 ? "text-green-600" : ""}
              />
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Information */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Vehicle Information
            </CardTitle>
            <CardDescription>Vehicle details and status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <DetailRow icon={Truck} label="Registration" value={load.vehicle.registrationNumber} />
              <DetailRow icon={Truck} label="Make & Model" value={`${load.vehicle.make} ${load.vehicle.model}`} />
              <DetailRow icon={Truck} label="Type" value={load.vehicle.type} />
              <DetailRow icon={Calendar} label="Year" value={load.vehicle.year} />
              <DetailRow icon={Package} label="Capacity" value={load.vehicle.capacity} />
              
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between">
                <DetailRow 
                  icon={Calendar} 
                  label="Insurance Expiry" 
                  value={load.vehicle.insuranceExpiry}
                  className="border-none"
                />
                <StatusBadge status={load.vehicle.status} type="vehicle" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">Actions</CardTitle>
          <CardDescription>Manage load operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="flex-1 h-12"
              onClick={() => setShowRouteWizard(true)}
            >
              <MapPin className="h-5 w-5 mr-2" />
              Change Route
            </Button>
            <Button 
              className="flex-1 h-12"
              onClick={() => setShowUpdateTransportWizard(true)}
            >
              <Truck className="h-5 w-5 mr-2" />
              Update Transport
            </Button>
            <Button 
              variant="destructive"
              className="flex-1 h-12"
              onClick={() => setShowCancelDialog(true)}
            >
              <AlertCircle className="h-5 w-5 mr-2" />
              Cancel Load
            </Button>
          </div>
        </CardContent>
      </Card>

      <CancelLoadDialog
        isOpen={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        onConfirm={handleLoadCancelled}
        loadRate={load?.rate || 0}
        isAdmin={true}
      />

      {load && (
        <>
          <ChangeRouteWizard
            isOpen={showRouteWizard}
            onClose={() => setShowRouteWizard(false)}
            onConfirm={handleRouteChange}
            currentDestination={load.deliveryLocation.name}
            currentCoordinates={load.deliveryLocation.coordinates}
            containerSize={load.equipment.container_size}
          />
          <UpdateTransportWizard
            isOpen={showUpdateTransportWizard}
            onClose={() => setShowUpdateTransportWizard(false)}
            onConfirm={handleUpdateTransport}
            loadId={load.id}
            currentRate={load.rate}
          />
        </>
      )}

      {load && (
        <RateManagementDialog
          isOpen={showRateDialog}
          onClose={() => setShowRateDialog(false)}
          onConfirm={handleRateUpdate}
          currentRate={load.rate}
          loadId={load.id}
        />
      )}
    </div>
  );
} 