
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/datatable/data-table-column-header";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export const columns: ColumnDef<any>[] = [
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
  },
  {
    accessorKey: "deliveryLocation",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Delivery" />,
  },
  {
    accessorKey: "pickupDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Pickup Date" />,
  },
  {
    accessorKey: "driver",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Driver" />,
  },
  {
    accessorKey: "vehicle",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Vehicle" />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
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
