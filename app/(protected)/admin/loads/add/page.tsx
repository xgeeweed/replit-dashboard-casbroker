
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, X } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type Container = {
  id: string;
  containerNumber: string;
  selected?: boolean;
};

type BLData = {
  blNumber: string;
  containers?: Container[];
  bulkCargoWeight?: number;
};

type EquipmentCount = {
  equipmentType: string;
  loadType: string;
  count: number;
};

type LoadDetails = {
  pickupLocation: string;
  deliveryLocation: string;
  pickupDate: string;
  equipmentCount?: EquipmentCount[];
  comments: string;
};

export default function AddLoad() {
  const [step, setStep] = useState(1);
  const [blData, setBlData] = useState<BLData>({ blNumber: "" });
  const [selectedContainers, setSelectedContainers] = useState<Container[]>([]);
  const [loadDetails, setLoadDetails] = useState<{ [key: string]: LoadDetails }>({});
  const [isBulkCargo, setIsBulkCargo] = useState(false);
  const [newEquipment, setNewEquipment] = useState<EquipmentCount>({ equipmentType: '', loadType: '', count: 0 });

  // Rest of the component implementation remains the same as post-load/page.tsx
  // ... (copying the same implementation)

  return (
    <div className="font-light h-full w-full p-4">
      <h1 className="text-2xl font-bold mb-6">Add a New Load</h1>
      <div className="max-w-2xl">
        {renderStep()}
      </div>
    </div>
  );
}
