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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import loadboardData from "../data";

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
  <div className="p-4 bg-white mt-2">
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <div className="space-y-3">{children}</div>
  </div>
);

export default function LoadDetails() {
  const { id } = useParams();

  // Sample data lookup based on id
  const findLoadById = (loadId: string) => {
    const loads = loadboardData;
    return loads.find((load) => load.id === loadId);
  };

  const [load, setLoad] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      {/* Header */}
      <div className="flex items-center gap-4 p-4 bg-white">
        <Link href="/loadboard/view-loadboard">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-medium">
          {load.pickupLocation} → {load.deliveryLocation}
        </h1>
      </div>

      {/* Load ID and Time */}
      <div className="p-4 bg-white mt-2">
        <h2 className="text-2xl font-bold">Load #{load.id}</h2>
        <p className="text-gray-500 text-sm mt-1">Posted {load.postedTime}</p>
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

      {/* Action Buttons */}
      <div className="mt-auto p-4 bg-white flex flex-col gap-2">
        <Button className="w-full bg-black text-white py-3 rounded-md">
          Book Now ₵{load.rate.toLocaleString()}
        </Button>
        <Button
          variant="outline"
          className="w-full py-3 rounded-md border-gray-200"
        >
          Call
        </Button>
      </div>

      {/* Equipment Details */}
      <DetailCard title="Equipment Details">
        {Object.entries(load.equipment).map(([key, value]) => (
          <DetailRow key={key} label={key} value={value as string} />
        ))}
      </DetailCard>

      {/* Shipment Details */}
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
        <DetailRow label="Reference #" value={load.shipmentDetails.reference} />
        <DetailRow
          label="Comments"
          value={load.shipmentDetails.comments}
          multiLine
        />
      </DetailCard>

      {/* Rate Details */}
      <DetailCard title="Rate Details">
        <DetailRow
          label="Total"
          value={`₵${load.rateDetails.total.toLocaleString()}`}
        />
        <DetailRow label="Trip" value={load.rateDetails.trip} />
        <DetailRow
          label="Rate / mile (est)"
          value={`₵${load.rateDetails.ratePerKm}/km`}
        />
      </DetailCard>

      {/* Company Details */}
      <DetailCard title="Company Details">
        <DetailRow label="MC Number" value={load.companyDetails.mcNumber} />
        <DetailRow label="Location" value={load.companyDetails.location} />
        <DetailRow
          label="Credit Score"
          value={load.companyDetails.creditScore}
        />
        <DetailRow label="Days To Pay" value={load.companyDetails.daysToPay} />
        <DetailRow
          label="Reviews"
          value={`${load.companyDetails.reviews.score}/5 (${load.companyDetails.reviews.count} reviews)`}
        />
      </DetailCard>

      {/* Final Action Button */}
      <div className="mt-auto p-4 bg-white flex flex-col gap-2">
        <Button className="w-full bg-black text-white py-3 rounded-md">
          Inquire About This Load
        </Button>
      </div>
    </div>
  );
}
