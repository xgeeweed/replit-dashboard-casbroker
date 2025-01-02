
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function PostLoad() {
  const [loadData, setLoadData] = useState({
    pickupLocation: "",
    deliveryLocation: "",
    pickupDate: "",
    weight: "",
    length: "",
    equipmentType: "",
    loadType: "",
    rate: "",
    comments: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to save load
    console.log("Load data:", loadData);
  };

  return (
    <div className="font-light h-full w-full p-4">
      <h1 className="text-2xl font-bold mb-6">Post a New Load</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm">Pickup Location</label>
            <Input
              value={loadData.pickupLocation}
              onChange={(e) => setLoadData({...loadData, pickupLocation: e.target.value})}
              placeholder="Enter pickup location"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm">Delivery Location</label>
            <Input
              value={loadData.deliveryLocation}
              onChange={(e) => setLoadData({...loadData, deliveryLocation: e.target.value})}
              placeholder="Enter delivery location"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm">Pickup Date</label>
            <Input
              type="date"
              value={loadData.pickupDate}
              onChange={(e) => setLoadData({...loadData, pickupDate: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm">Rate (GH₵)</label>
            <Input
              type="number"
              value={loadData.rate}
              onChange={(e) => setLoadData({...loadData, rate: e.target.value})}
              placeholder="Enter rate"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm">Weight (kg)</label>
            <Input
              type="number"
              value={loadData.weight}
              onChange={(e) => setLoadData({...loadData, weight: e.target.value})}
              placeholder="Enter weight"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm">Length (ft)</label>
            <Input
              type="number"
              value={loadData.length}
              onChange={(e) => setLoadData({...loadData, length: e.target.value})}
              placeholder="Enter length"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm">Equipment Type</label>
            <Select
              value={loadData.equipmentType}
              onValueChange={(value) => setLoadData({...loadData, equipmentType: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select equipment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flatbed">Flatbed</SelectItem>
                <SelectItem value="box-truck">Box Truck</SelectItem>
                <SelectItem value="refrigerated">Refrigerated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm">Load Type</label>
            <Select
              value={loadData.loadType}
              onValueChange={(value) => setLoadData({...loadData, loadType: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select load type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="palletized">Palletized</SelectItem>
                <SelectItem value="bulk">Bulk</SelectItem>
                <SelectItem value="container">Container</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm">Additional Comments</label>
          <Textarea
            value={loadData.comments}
            onChange={(e) => setLoadData({...loadData, comments: e.target.value})}
            placeholder="Enter any special requirements or notes"
            className="h-24"
          />
        </div>

        <Button type="submit" className="w-full">Post Load</Button>
      </form>
    </div>
  );
}
