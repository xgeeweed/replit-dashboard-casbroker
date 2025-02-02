"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, CheckCircle, XCircle, CornerUpRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { toast } from "sonner";
import { LoadboardEntry } from "../data";
import { DataTableColumnHeader } from "@/components/datatable/data-table-column-header";

export const columns: ColumnDef<LoadboardEntry>[] = [
  {
    accessorKey: "age",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Time Posted" />,
  },
  {
    accessorKey: "pickupLocation",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Pickup Location" />,
    cell: ({ row }) => {
      const location = row.getValue("pickupLocation") as { name: string; coordinates?: { lat: number; lng: number } };
      return location.name;
    },
  },
  {
    accessorKey: "deliveryLocation",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Delivery Location" />,
    cell: ({ row }) => {
      const location = row.getValue("deliveryLocation") as { name: string; coordinates?: { lat: number; lng: number } };
      return location.name;
    },
  },
  {
    accessorKey: "pickupDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Pickup Date" />,
  },
  {
    accessorKey: "weight",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Weight" />,
  },
  {
    accessorKey: "rate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Rate (GHS)" />,
    cell: ({ row }) => {
      const rate = parseFloat(row.getValue("rate"));
      const formatted = new Intl.NumberFormat("en-GH", {
        style: "currency",
        currency: "GHS",
      }).format(rate);
      return formatted;
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
          className={
            status === "Active" ? "bg-green-500 hover:bg-green-600" :
            status === "Completed" ? "bg-blue-500 hover:bg-blue-600" :
            "bg-red-500 hover:bg-red-600"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "container_size",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Container Size" />,
  },
  {
    accessorKey: "equipmentType",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Equipment Type" />,
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
            <Link href={`/admin/loadboard/${load.id}`}>
              <DropdownMenuItem className="cursor-pointer">
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => {
                toast.success(`Completed load ${load.id}`);
              }}
              className="text-green-600"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark as Completed
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                toast.error(`Cancelled load ${load.id}`);
              }}
              className="text-red-600"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Cancel Load
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                toast.info(`Re-routing load ${load.id}`);
              }}
            >
              <CornerUpRight className="mr-2 h-4 w-4" />
              Change Route
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]; 