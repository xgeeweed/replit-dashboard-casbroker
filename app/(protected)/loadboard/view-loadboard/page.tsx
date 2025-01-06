"use client";
import { Spinner } from "@/components/ui/spinner";
import { basicErrorToast } from "@/components/toast";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/datatable/data-table";
import { columns } from "./table/columns";
import loadboardData from "./data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Loadboard() {
  // Use loadboard data directly without rate modification
  const data = loadboardData;

  const meta = {
    name: "Load",
    plural: "Loads"
  };

  const [filters, setFilters] = useState({
    origin: "",
    destination: "",
    weight: "",
    length: "",
    equipmentType: "",
    loadType: "",
  });

  // handle loading & error
  // if (isLoading) return <Spinner />;
  // if (error) return basicErrorToast();

  // Mimic a loading state with a 2-second delay
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    // Cleanup timer when component is unmounted
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div className="font-light h-full w-full p-4">
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
        <Select value={filters.equipmentType} onValueChange={(value) => setFilters({...filters, equipmentType: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Equipment Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="flatbed">Flatbed</SelectItem>
            <SelectItem value="box-truck">Box Truck</SelectItem>
            <SelectItem value="refrigerated">Refrigerated</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filters.loadType} onValueChange={(value) => setFilters({...filters, loadType: value})}>
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
