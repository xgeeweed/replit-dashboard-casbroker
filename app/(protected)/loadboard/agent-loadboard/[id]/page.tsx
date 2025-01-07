"use client";

import { Spinner } from "@/components/ui/spinner";
import { basicErrorToast } from "@/components/toast";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  ChevronLeft,
  MapPin,
  DollarSign,
  Truck,
  BadgeCent,
  Calendar,
  Clock,
  LucideIcon,
  ArrowRight,
  Building2,
  Phone,
  Star,
  FileText,
  Package,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CancelLoadDialog } from "@/components/loadboard/cancel-load-dialog";
import agentLoadboardData from "../data";
import { AssignedVehicleDetails } from "../components/assigned-vehicle-details";

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

const DetailItem = ({ icon: Icon, label, value }: DetailItemProps) => (
  <div className="flex flex-col items-center justify-center">
    <Icon className="w-5 h-5 text-gray-500 mb-1" />
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

export const DetailRow = ({ icon: Icon, label, value, multiLine }: DetailRowProps) => (
  <div
    className={`py-2 ${multiLine ? "flex flex-col gap-2" : "flex justify-between items-center border-b border-gray-200"}`}
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
  <div className="p-4 bg-white mt-2">
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <div className="space-y-3">{children}</div>
  </div>
);

export default function LoadDetails() {
  const { id } = useParams();
  const [load, setLoad] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const findLoadById = (loadId: string) => {
    return agentLoadboardData.find((load) => load.rowId === loadId);
  };

  const handleLoadCancelled = () => {
    setLoad((prev) => ({ ...prev, status: "Cancelled" }));
    setShowCancelDialog(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const loadData = findLoadById(id as string);
      setLoad(loadData);
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) return <Spinner />;
  if (!load) return basicErrorToast();

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex items-center gap-4 p-4 bg-white">
        <Link href="/loadboard/agent-loadboard">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-medium">
          {load.pickupLocation} → {load.deliveryLocation}
        </h1>
      </div>

      <div className="p-4 bg-white mt-2">
        <h2 className="text-2xl font-bold">Load #{load.rowId}</h2>
        <p className="text-gray-500 text-sm mt-1">Status: {load.status}</p>
      </div>

      <div className="flex justify-between items-center p-4 bg-white mt-2">
        <div className="flex items-center gap-10">
          <div className="flex items-start">
            <MapPin className="w-3 h-3 text-red-400 mt-1" strokeWidth={3} />
            <div>
              <p className="text-gray-500 text-sm">PICK UP</p>
              <p className="font-medium">{load.pickupLocation}</p>
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
              <p className="font-medium">{load.deliveryLocation}</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-gray-500 text-sm">DISTANCE</p>
          <p className="text-sm mt-1">{load.distance}</p>
        </div>
      </div>

      <div className="grid grid-cols-4 p-4 bg-white mt-2 text-center">
        <DetailItem icon={Package} label="Weight" value={load.weight} />
        <DetailItem icon={Truck} label="Length" value={load.length} />
        <DetailItem
          icon={BadgeCent}
          label="Confirmed Rate"
          value={`₵${load.confirmedRate.toLocaleString()}`}
        />
        <DetailItem
          icon={BadgeCent}
          label="Added Charges"
          value={`₵${load.marketRate.toLocaleString()}`}
        />
      </div>

      <DetailCard title="Equipment Details">
        <DetailRow label="Type" value={load.equipment.type} />
        <DetailRow label="Length" value={load.equipment.length} />
        <DetailRow label="Weight" value={load.equipment.weight} />
        <DetailRow label="Commodity" value={load.equipment.commodity} />
        <DetailRow label="Load Type" value={load.equipment.load} />
      </DetailCard>

      <DetailCard title="Shipment Details">
        <DetailRow
          icon={Calendar}
          label="Pick Up Date"
          value={load.shipmentDetails.pickUpDate}
        />
        <DetailRow
          icon={Clock}
          label="Pick Up Hours"
          value={load.shipmentDetails.pickUpHours}
        />
        <DetailRow
          icon={Clock}
          label="Dock Hours"
          value={load.shipmentDetails.dockHours}
        />
        <DetailRow
          icon={FileText}
          label="Reference"
          value={load.shipmentDetails.reference}
        />
        <DetailRow
          label="Comments"
          value={load.shipmentDetails.comments}
          multiLine
        />
      </DetailCard>

      {/* Assigned Vehicle Details */}
      <DetailCard title="Assigned Vehicle">
        <AssignedVehicleDetails id={id} />
      </DetailCard>

      <DetailCard title="Company Details">
        <DetailRow
          icon={Building2}
          label="Company"
          value={load.companyDetails.name}
        />
        <DetailRow
          icon={Phone}
          label="Telephone"
          value={load.companyDetails.telephone}
        />
        <DetailRow
          icon={FileText}
          label="MC Number"
          value={load.companyDetails.mcNumber}
        />
        <DetailRow
          icon={MapPin}
          label="Location"
          value={load.companyDetails.location}
        />
        <DetailRow
          icon={Star}
          label="Credit Score"
          value={`${load.companyDetails.creditScore}/100`}
        />
        <DetailRow
          label="Payment Terms"
          value={load.companyDetails.daysToPay}
        />
        <DetailRow
          label="Reviews"
          value={`${load.companyDetails.reviews.score}/5 (${load.companyDetails.reviews.count} reviews)`}
        />
      </DetailCard>

      {load.status === "In Progress" && (
        <div className="mt-auto p-4 bg-white flex flex-col gap-2">
          <Button
            variant="outline"
            className="w-full py-3 rounded-md border-gray-200 text-red-600 hover:text-red-700"
            onClick={() => setShowCancelDialog(true)}
          >
            Cancel Load
          </Button>
        </div>
      )}

      <CancelLoadDialog
        isOpen={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        onConfirm={handleLoadCancelled}
        loadRate={load.confirmedRate}
      />
    </div>
  );
}
