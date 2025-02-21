"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  MapPin,
  DollarSign,
  Truck,
  BadgeCent,
  Calendar,
  Clock,
  ArrowRight,
  LucideIcon,
  Building2,
  Phone,
  FileText,
  Star,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { basicErrorToast } from "@/components/toast";
import { loadboardData, LoadboardEntry } from "../data";
import { CancelLoadDialog } from "@/components/loadboard/cancel-load-dialog";
import { ChangeRouteWizard } from "@/components/loadboard/change-route-wizard";
import { UpdateTransportWizard } from "@/components/loadboard/update-transport-wizard";
import { RateManagementDialog } from "@/components/loadboard/rate-management-dialog";

interface DetailItemProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
}

interface DetailRowProps {
  icon?: LucideIcon;
  label: string;
  value: string | number;
  multiLine?: boolean;
}

interface TruckUpdate {
  plateNumber: string;
  type: string;
  driverName: string;
}

interface RateUpdate {
  type: "rate" | "charge" | "penalty";
  amount: number;
  reason?: string;
  comment?: string;
  notifyDriver?: boolean;
  notifyAgent?: boolean;
}

const DetailItem = ({ icon: Icon, label, value }: DetailItemProps) => (
  <div className="flex flex-col items-center justify-center">
    <Icon className="w-5 h-5 text-gray-500 mb-1" />
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

const DetailRow = ({ icon: Icon, label, value, multiLine }: DetailRowProps) => (
  <div
    className={`py-2 ${
      multiLine
        ? "flex flex-col gap-2"
        : "flex justify-between items-center border-b border-gray-200"
    }`}
  >
    <div className="flex items-center gap-2">
      {Icon && <Icon size={16} className="text-blue-500" />}
      <span className={`text-gray-600 ${multiLine ? "underline" : ""}`}>
        {label}
      </span>
    </div>
    <span className={multiLine ? "text-gray-600 -mt-2" : "font-medium"}>
      {value}
    </span>
  </div>
);

const DetailCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Card className="mt-2 hover:shadow-md transition-shadow">
    <CardHeader>
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

export default function LoadDetails() {
  const { id } = useParams();
  const [load, setLoad] = useState<LoadboardEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showRouteWizard, setShowRouteWizard] = useState(false);
  const [showUpdateTransportWizard, setShowUpdateTransportWizard] = useState(false);
  const [showRateDialog, setShowRateDialog] = useState(false);

  useEffect(() => {
    const findLoadById = () => {
      return loadboardData.find((load) => load.id === id);
    };

    const timer = setTimeout(() => {
      const loadData = findLoadById();
      setLoad(loadData || null);
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [id]);

  const handleLoadCancelled = () => {
    setLoad((prev) => prev ? { ...prev, status: "Cancelled" } : null);
    setShowCancelDialog(false);
  };

  const handleRouteChange = (data: {
    destination: string;
    rate: number;
    distanceKm: number;
    coordinates: { lat: number; lng: number };
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
  };

  const handleUpdateTransport = (driverId: string, rate: number) => {
    // In a real app, we would fetch the driver details from the API
    const mockTruck = {
      plateNumber: "GH-XXXX-" + Math.floor(Math.random() * 100),
      type: "Box Truck",
      driverName: "Driver " + driverId
    };
    
    setLoad((prev) => prev ? {
      ...prev,
      truck: mockTruck,
      rate: rate
    } : null);
    setShowUpdateTransportWizard(false);
  };

  const handleRateUpdate = (updates: RateUpdate) => {
    setLoad((prev) => prev ? {
      ...prev,
      rate: updates.amount,
    } : null);
    setShowRateDialog(false);
  };

  if (isLoading) return <Spinner />;
  if (!load) return basicErrorToast();

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 bg-white">
        <Link href="/admin/loadboard">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-medium">
          {load.pickupLocation.name} → {load.deliveryLocation.name}
        </h1>
      </div>

      {/* Load ID and Status */}
      <div className="p-4 bg-white mt-2">
        <h2 className="text-2xl font-bold">Load #{load.id}</h2>
        <p className="text-gray-500 text-sm mt-1">Status: {load.status}</p>
      </div>

      {/* Locations */}
      <div className="flex justify-between items-center p-4 bg-white mt-2">
        <div className="flex items-center gap-10">
          <div className="flex items-start mb-4">
            <MapPin className="w-3 h-3 text-red-400 mt-1" strokeWidth={3} />
            <div>
              <p className="text-gray-500 text-sm">PICK UP</p>
              <p className="font-medium">{load.pickupLocation.name}</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="h-[2px] w-16 bg-gray-300"></div>
            <ArrowRight className="w-4 h-4 text-gray-400 mx-2" />
            <div className="h-[2px] w-16 bg-gray-300"></div>
          </div>

          <div className="flex items-start">
            <MapPin className="w-3 h-3 text-green-400 mt-1" strokeWidth={3} />
            <div>
              <p className="text-gray-500 text-sm">DROP OFF</p>
              <p className="font-medium">{load.deliveryLocation.name}</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-gray-500 text-sm">PICKUP DATE</p>
          <p className="text-sm mt-1">{load.pickupDate}</p>
        </div>
      </div>

      {/* Trip Details */}
      <div className="grid grid-cols-3 p-4 bg-white mt-2 text-center">
        <DetailItem icon={Truck} label="Trip" value={load.distance} />
        <DetailItem
          icon={BadgeCent}
          label="Rate"
          value={`₵${load.rate.toLocaleString()}`}
        />
        <DetailItem
          icon={DollarSign}
          label="Market"
          value={`₵${load.marketRate.toLocaleString()}`}
        />
      </div>

      {/* Actions */}
      <Card className="hover:shadow-md transition-shadow mt-2">
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
              className="flex-1 h-12"
              onClick={() => setShowRateDialog(true)}
            >
              <BadgeCent className="h-5 w-5 mr-2" />
              Update Rate
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

      {/* Equipment Details */}
      <DetailCard title="Equipment Details">
        <div className="space-y-2">
          <DetailRow label="Type" value={load.equipment.type} />
          <DetailRow label="Container Size" value={load.equipment.container_size} />
          <DetailRow label="Weight" value={load.equipment.weight} />
          <DetailRow label="Commodity" value={load.equipment.commodity} />
          <DetailRow label="Load Type" value={load.equipment.load} />
        </div>
      </DetailCard>

      {/* Shipment Details */}
      <DetailCard title="Shipment Details">
        <div className="space-y-2">
          <DetailRow icon={Calendar} label="Pickup Date" value={load.shipmentDetails.pickUpDate} />
          <DetailRow icon={Clock} label="Pickup Hours" value={load.shipmentDetails.pickUpHours} />
          <DetailRow icon={Clock} label="Dock Hours" value={load.shipmentDetails.dockHours} />
          <DetailRow icon={FileText} label="Reference" value={load.shipmentDetails.reference} />
          <DetailRow icon={AlertCircle} label="Comments" value={load.shipmentDetails.comments} multiLine />
        </div>
      </DetailCard>

      {/* Company Details */}
      <DetailCard title="Company Details">
        <div className="space-y-2">
          <DetailRow icon={Building2} label="Company" value={load.companyDetails.name} />
          <DetailRow icon={Phone} label="Phone" value={load.companyDetails.telephone} />
          <DetailRow icon={FileText} label="MC Number" value={load.companyDetails.mcNumber} />
          <DetailRow icon={MapPin} label="Location" value={load.companyDetails.location} />
          <DetailRow icon={Star} label="Credit Score" value={load.companyDetails.creditScore} />
          <DetailRow icon={Clock} label="Days to Pay" value={load.companyDetails.daysToPay} />
          <DetailRow 
            icon={Star} 
            label="Reviews" 
            value={`${load.companyDetails.reviews.score}/5 (${load.companyDetails.reviews.count} reviews)`} 
          />
        </div>
      </DetailCard>

      {/* Dialogs */}
      <CancelLoadDialog
        isOpen={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        onConfirm={handleLoadCancelled}
        loadRate={load.rate}
      />

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
        currentRate={load.rate}
        loadId={load.id}
      />

      <RateManagementDialog
        isOpen={showRateDialog}
        onClose={() => setShowRateDialog(false)}
        onConfirm={handleRateUpdate}
        currentRate={load.rate}
        loadId={load.id}
      />
    </div>
  );
} 