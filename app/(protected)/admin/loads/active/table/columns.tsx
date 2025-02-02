"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/datatable/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal, User, Truck } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Driver {
  id: string;
  name: string;
  image?: string;
  licenseNumber: string;
  phone: string;
  experience: number;
  status: "Active" | "Inactive";
}

interface Vehicle {
  id: string;
  registrationNumber: string;
  make: string;
  model: string;
  type: string;
  year: number;
  capacity: string;
  insuranceExpiry: string;
  status: "Active" | "Inactive";
}

interface Location {
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface Load {
  id: string;
  blNumber: string;
  pickupLocation: Location;
  deliveryLocation: Location;
  pickupDate: string;
  status: string;
  driver: Driver;
  vehicle: Vehicle;
}

export const columns: ColumnDef<Load>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Load ID" />,
  },
  {
    accessorKey: "blNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="BL Number" />,
  },
  {
    accessorKey: "pickupLocation",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Pickup" />,
    cell: ({ row }) => {
      const location = row.getValue("pickupLocation") as Location;
      return location.name;
    }
  },
  {
    accessorKey: "deliveryLocation",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Delivery" />,
    cell: ({ row }) => {
      const location = row.getValue("deliveryLocation") as Location;
      return location.name;
    }
  },
  {
    accessorKey: "pickupDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Pickup Date" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue("pickupDate"));
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    },
  },
  {
    id: "driver",
    accessorKey: "driver",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Driver" />,
    cell: ({ row }) => {
      const load = row.original;
      const driver = load.driver;
      if (!driver) return "Not Assigned";

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="link" className="p-0">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={driver.image} />
                    <AvatarFallback>
                      {driver.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{driver.name}</span>
                </div>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{driver.licenseNumber}</Badge>
                <Badge 
                  variant="default"
                  className={driver.status === "Active" ? "bg-green-500 hover:bg-green-600" : "bg-gray-500"}
                >
                  {driver.status}
                </Badge>
              </div>
              <div className="text-sm">
                <div>Phone: {driver.phone}</div>
                <div>Experience: {driver.experience} years</div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    id: "vehicle",
    accessorKey: "vehicle",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Vehicle" />,
    cell: ({ row }) => {
      const load = row.original;
      const vehicle = load.vehicle;
      if (!vehicle) return "Not Assigned";

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="link" className="p-0">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  <span>{vehicle.registrationNumber}</span>
                </div>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{vehicle.make} {vehicle.model}</span>
                <Badge 
                  variant="default"
                  className={vehicle.status === "Active" ? "bg-green-500 hover:bg-green-600" : "bg-gray-500"}
                >
                  {vehicle.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Type:</span>{" "}
                  {vehicle.type}
                </div>
                <div>
                  <span className="text-muted-foreground">Year:</span>{" "}
                  {vehicle.year}
                </div>
                <div>
                  <span className="text-muted-foreground">Capacity:</span>{" "}
                  {vehicle.capacity}
                </div>
                <div>
                  <span className="text-muted-foreground">Insurance:</span>{" "}
                  {vehicle.insuranceExpiry}
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge 
          variant="default"
          className={status === "In Progress" ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-500"}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const load = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/admin/loads/active/${load.id}`}>
              <DropdownMenuItem className="cursor-pointer">
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => {
                toast.info(`Cancelling load ${load.id}`);
              }}
            >
              Cancel Load
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                toast.info(`Changing route for load ${load.id}`);
              }}
            >
              Change Route
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                toast.info(`Updating transport for load ${load.id}`);
              }}
            >
              Update Transport
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
