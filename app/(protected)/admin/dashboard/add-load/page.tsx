
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

export default function AddLoad() {
  const [step, setStep] = useState(1);
  const [loadDetails, setLoadDetails] = useState({
    pickupLocation: "",
    deliveryLocation: "",
    pickupDate: "",
    weight: "",
    equipmentType: "",
    loadType: "",
    comments: ""
  });

  const handleSubmit = async () => {
    if (!loadDetails.pickupLocation || !loadDetails.deliveryLocation || !loadDetails.pickupDate) {
      toast.error("Please fill in all mandatory fields");
      return;
    }
    
    toast.success("Load added successfully!");
    setStep(1);
    setLoadDetails({
      pickupLocation: "",
      deliveryLocation: "",
      pickupDate: "",
      weight: "",
      equipmentType: "",
      loadType: "",
      comments: ""
    });
  };

  return (
    <div className="font-light h-full w-full p-4">
      <h1 className="text-2xl font-bold mb-6">Add New Load</h1>
      <div className="max-w-2xl space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Pickup Location</label>
            <Select
              onValueChange={(value) => 
                setLoadDetails({...loadDetails, pickupLocation: value})
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select pickup location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="location1">Location 1</SelectItem>
                <SelectItem value="location2">Location 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm">Delivery Location</label>
            <Select
              onValueChange={(value) =>
                setLoadDetails({...loadDetails, deliveryLocation: value})
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select delivery location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="location1">Location 1</SelectItem>
                <SelectItem value="location2">Location 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm">Pickup Date</label>
            <Input
              type="date"
              onChange={(e) =>
                setLoadDetails({...loadDetails, pickupDate: e.target.value})
              }
              required
            />
          </div>

          <div>
            <label className="text-sm">Weight (kg)</label>
            <Input
              type="number"
              onChange={(e) =>
                setLoadDetails({...loadDetails, weight: e.target.value})
              }
            />
          </div>

          <div>
            <label className="text-sm">Equipment Type</label>
            <Select
              onValueChange={(value) =>
                setLoadDetails({...loadDetails, equipmentType: value})
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select equipment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flatbed">Flatbed</SelectItem>
                <SelectItem value="tanker">Tanker</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm">Load Type</label>
            <Select
              onValueChange={(value) =>
                setLoadDetails({...loadDetails, loadType: value})
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select load type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="palletized">Palletized</SelectItem>
                <SelectItem value="bulk">Bulk</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2">
            <label className="text-sm">Comments</label>
            <Textarea
              onChange={(e) =>
                setLoadDetails({...loadDetails, comments: e.target.value})
              }
            />
          </div>
        </div>
        
        <div className="space-x-2">
          <Button onClick={handleSubmit}>Add Load</Button>
        </div>
      </div>
    </div>
  );
}
