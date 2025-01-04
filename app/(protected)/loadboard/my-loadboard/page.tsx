
"use client";
import { Spinner } from "@/components/ui/spinner";
import { basicErrorToast } from "@/components/toast";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/datatable/data-table";
import { columns } from "./table/columns";
import initialData from "./data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Loadboard() {
  const [loadboardData, setLoadboardData] = useState(initialData);

  const updateLoadStatus = (loadId: string, newStatus: string) => {
    setLoadboardData(prev => 
      prev.map(load => 
        load.rowId === loadId ? { ...load, status: newStatus } : load
      )
    );
  };

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
      <Tabs defaultValue="in-progress" className="w-full">
        <TabsList>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>

        <div className="my-4 grid grid-cols-7 gap-4">
          <Input
            placeholder="Origin"
            value={filters.origin}
            onChange={(e) => setFilters({ ...filters, origin: e.target.value })}
          />
          <Input
            placeholder="Destination"
            value={filters.destination}
            onChange={(e) =>
              setFilters({ ...filters, destination: e.target.value })
            }
          />
          <Input
            placeholder="Weight"
            type="number"
            value={filters.weight}
            onChange={(e) => setFilters({ ...filters, weight: e.target.value })}
          />
          <Input
            placeholder="Length"
            type="number"
            value={filters.length}
            onChange={(e) => setFilters({ ...filters, length: e.target.value })}
          />
          <Select
            value={filters.equipmentType}
            onValueChange={(value) =>
              setFilters({ ...filters, equipmentType: value })
            }
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
            onValueChange={(value) =>
              setFilters({ ...filters, loadType: value })
            }
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

        <TabsContent value="in-progress">
          <DataTable 
            columns={columns} 
            data={loadboardData.filter(item => item.status === "In Progress")} 
            meta={meta}
            updateLoadStatus={updateLoadStatus} 
          />
        </TabsContent>
        <TabsContent value="completed">
          <DataTable 
            columns={columns} 
            data={loadboardData.filter(item => item.status === "Completed")} 
            meta={meta}
            updateLoadStatus={updateLoadStatus}
          />
        </TabsContent>
        <TabsContent value="saved">
          <DataTable 
            columns={columns} 
            data={loadboardData.filter(item => item.status === "Saved")} 
            meta={meta}
            updateLoadStatus={updateLoadStatus}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
