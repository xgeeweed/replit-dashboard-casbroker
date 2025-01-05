"use client";

import { Spinner } from "@/components/ui/spinner";
import { basicErrorToast } from "@/components/toast";
import { useEffect, useState } from "react";
import { CompleteDeliveryDialog } from "@/components/loadboard/complete-delivery-dialog";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import data from "../data";

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

const DetailRow = ({ icon: Icon, label, value, multiLine }: DetailRowProps) => (
  <div className={`py-2 ${multiLine ? "flex flex-col gap-2" : "flex justify-between items-center border-b border-gray-200"}`}>
    <div className="flex items-center gap-2">
      {Icon && <Icon size={16} className="text-blue-500" />}
      <span className={`text-gray-600 ${multiLine ? "underline" : ""}`}>{label}</span>
    </div>
    <span className={multiLine ? "text-gray-600 -mt-2" : "font-medium"}>{value}</span>
  </div>
);

const DetailCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="p-4 bg-white mt-2">
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <div className="space-y-3">{children}</div>
  </div>
);

export default function LoadDetails() {
  const { id } = useParams();
  const [load, setLoad] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCompleteDialog, setShowCompleteDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false); // Added state for cancel dialog

  const handleDeliveryCompleted = () => {
    setLoad(prev => ({...prev, status: "Completed"}));
    setShowCompleteDialog(false);
  };

  const handleLoadCancelled = () => {
    // Add your logic to handle load cancellation here.  This is a placeholder.
    console.log("Load cancelled!");
    setShowCancelDialog(false);
  };


  useEffect(() => {
    const findLoadById = () => {
      return data.find((load) => load.rowId === id);
    };

    const timer = setTimeout(() => {
      const loadData = findLoadById();
      setLoad(loadData);
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) return <Spinner />;
  if (!load) return basicErrorToast();

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 bg-white">
        <Link href="/loadboard/my-loadboard">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-medium">
          {load.pickupLocation} → {load.deliveryLocation}
        </h1>
      </div>

      {/* Load ID and Status */}
      <div className="p-4 bg-white mt-2">
        <h2 className="text-2xl font-bold">Load #{load.rowId}</h2>
        <p className="text-gray-500 text-sm mt-1">Status: {load.status}</p>
      </div>

      {/* Locations */}
      <div className="flex justify-between items-center p-4 bg-white mt-2">
        <div className="flex items-center gap-10">
          <div className="flex items-start mb-4">
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
          <p className="text-gray-500 text-sm">PICKUP DATE</p>
          <p className="text-sm mt-1">{load.pickupDate}</p>
        </div>
      </div>

      {/* Load Details */}
      <div className="grid grid-cols-3 p-4 bg-white mt-2 text-center">
        <DetailItem icon={Truck} label="Equipment" value={load.equipmentType} />
        <DetailItem icon={BadgeCent} label="Rate" value={`₵${load.rate.toLocaleString()}`} />
        <DetailItem icon={DollarSign} label="Weight" value={load.weight} />
      </div>

      {/* Equipment Details */}
      <DetailCard title="Equipment Details">
        <DetailRow label="Type" value={load.equipmentType} />
        <DetailRow label="Length" value={load.length} />
        <DetailRow label="Weight" value={load.weight} />
      </DetailCard>

      {/* Shipment Details */}
      <DetailCard title="Shipment Details">
        <DetailRow icon={Calendar} label="Pick Up Date" value={load.pickupDate} />
        <DetailRow icon={Clock} label="Status" value={load.status} />
      </DetailCard>

      {/* Action Buttons */}
      {load.status === "In Progress" && (
        <div className="mt-auto p-4 bg-white flex flex-col gap-2">
          <Button 
            className="w-full bg-black text-white py-3 rounded-md"
            onClick={() => setShowCompleteDialog(true)}
          >
            Complete Delivery
          </Button>
          <Button 
            variant="outline" 
            className="w-full py-3 rounded-md border-gray-200 text-red-600 hover:text-red-700"
            onClick={() => setShowCancelDialog(true)}
          >
            Cancel Load
          </Button>
          <CompleteDeliveryDialog
            isOpen={showCompleteDialog}
            onClose={() => setShowCompleteDialog(false)}
            onComplete={handleDeliveryCompleted}
            loadId={load.rowId}
          />
          <CancelLoadDialog
            isOpen={showCancelDialog}
            onClose={() => setShowCancelDialog(false)}
            onConfirm={handleLoadCancelled}
            loadId={load.rowId}
          />
        </div>
      )}
    </div>
  );
}