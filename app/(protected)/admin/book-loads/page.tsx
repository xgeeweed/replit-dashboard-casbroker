"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable } from "@/components/datatable/data-table";
import { Spinner } from "@/components/ui/spinner";
import { columns } from "./table/columns";
import { loadboardData, LoadboardEntry } from "./data";

export default function AdminBookLoads() {
  const [data, setData] = useState<LoadboardEntry[]>(loadboardData);

  const meta = {
    name: "Load",
    plural: "Loads",
  };

  const [filters, setFilters] = useState({
    origin: "",
    destination: "",
    weight: "",
    length: "",
    equipmentType: "",
    loadType: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div className="font-light h-full w-full flex flex-col p-4">
      <div className="mb-4 grid grid-cols-7 gap-4">
        <Input 
          placeholder="Origin"
          value={filters.origin}
          onChange={(e) => setFilters({...filters, origin: e.target.value})}
        />
        <Input 
          placeholder="Destination"
          value={filters.destination}
          onChange={(e) => setFilters({...filters, destination: e.target.value})}
        />
        <Input 
          placeholder="Weight"
          type="number"
          value={filters.weight}
          onChange={(e) => setFilters({...filters, weight: e.target.value})}
        />
        <Input 
          placeholder="Length"
          type="number"
          value={filters.length}
          onChange={(e) => setFilters({...filters, length: e.target.value})}
        />
        <Select 
          value={filters.equipmentType} 
          onValueChange={(value) => setFilters({...filters, equipmentType: value})}
        >
          <SelectTrigger>
            <SelectValue placeholder="Equipment Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="flatbed">Flatbed</SelectItem>
            <SelectItem value="box-truck">Box Truck</SelectItem>
            <SelectItem value="refrigerated">Refrigerated</SelectItem>
          </SelectContent>
        </Select>
        <Select 
          value={filters.loadType} 
          onValueChange={(value) => setFilters({...filters, loadType: value})}
        >
          <SelectTrigger>
            <SelectValue placeholder="Load Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="palletized">Palletized</SelectItem>
            <SelectItem value="bulk">Bulk</SelectItem>
            <SelectItem value="container">Container</SelectItem>
          </SelectContent>
        </Select>
        <Button>
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
      <DataTable columns={columns} data={data} meta={meta} />
    </div>
  );
} 