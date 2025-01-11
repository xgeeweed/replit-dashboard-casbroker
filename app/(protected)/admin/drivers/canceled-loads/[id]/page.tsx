
"use client";

import { Spinner } from "@/components/ui/spinner";
import { basicErrorToast } from "@/components/toast";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  ChevronLeft,
  MapPin,
  BadgeCent,
  Calendar,
  FileText,
  XCircle,
  CheckCircle,
  CornerUpRight,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { driverCanceledLoads } from "../data";
import { DetailRow } from "@/components/ui/detail-row";

interface DetailItemProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
}

const DetailItem = ({ icon: Icon, label, value }: DetailItemProps) => (
  <div className="flex flex-col items-center justify-center">
    <Icon className="w-5 h-5 text-gray-500 mb-1" />
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-semibold">{value}</p>
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

export default function CanceledLoadDetails() {
  const { id } = useParams();
  const [load, setLoad] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const findLoadById = (loadId: string) => {
    return driverCanceledLoads.find((load) => load.id === loadId);
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
        <Link href="/admin/drivers/canceled-loads">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-medium">
          {load.pickupLocation} → {load.deliveryLocation}
        </h1>
      </div>

      <div className="p-4 bg-white mt-2">
        <h2 className="text-2xl font-bold">Load #{load.loadId}</h2>
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
      </div>

      <div className="grid grid-cols-1 p-4 bg-white mt-2 text-center">
        <DetailItem 
          icon={BadgeCent} 
          label="Load Amount" 
          value={`₵${load.amount.toLocaleString()}`} 
        />
      </div>

      <DetailCard title="Cancellation Details">
        <DetailRow
          icon={Calendar}
          label="Cancel Date"
          value={load.cancelDate}
        />
        <DetailRow
          label="Reason"
          value={load.reason}
          multiLine
        />
        <DetailRow
          icon={FileText}
          label="Driver"
          value={load.driverName}
        />
        <DetailRow
          icon={FileText}
          label="Driver ID"
          value={load.driverId}
        />
      </DetailCard>

      <div className="mt-auto p-4 bg-white flex flex-col gap-2">
        <Button
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md"
          onClick={() => {
            toast.success(`Approved cancellation for load ${load.loadId}`);
            setLoad(prev => ({...prev, status: "Approved"}));
          }}
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          Approve Cancellation
        </Button>
        <Button
          variant="outline"
          className="w-full py-3 rounded-md border-gray-200 text-red-600 hover:text-red-700"
          onClick={() => {
            toast.error(`Denied cancellation for load ${load.loadId}`);
            setLoad(prev => ({...prev, status: "Denied"}));
          }}
        >
          <XCircle className="mr-2 h-4 w-4" />
          Deny Cancellation
        </Button>
        <Button
          variant="outline"
          className="w-full py-3 rounded-md border-gray-200"
          onClick={() => {
            toast.info(`Re-routing load ${load.loadId}`);
          }}
        >
          <CornerUpRight className="mr-2 h-4 w-4" />
          Re-route Load
        </Button>
      </div>
    </div>
  );
}
