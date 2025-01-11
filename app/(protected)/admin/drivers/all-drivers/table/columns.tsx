
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/datatable/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Eye, MessageCircle, MoreHorizontal, RefreshCw, Truck } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "fullName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Full Name" />,
  },
  {
    accessorKey: "contact",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Contact" />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: "vehicleType",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Vehicle Type" />,
  },
  {
    accessorKey: "vehiclePlate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Vehicle Plate" />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
  },
  {
    accessorKey: "rating",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Rating" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const driver = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/admin/drivers/all-drivers/${driver.rowId}`}>
              <DropdownMenuItem className="cursor-pointer">
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => {
                toast.info(`Sending message to ${driver.fullName}`);
              }}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Send Message
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                toast.info(`Viewing vehicles for ${driver.fullName}`);
              }}
            >
              <Truck className="mr-2 h-4 w-4" />
              View Vehicles
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                const updateStatus = row.table?.options?.meta?.updateStatus;
                if (typeof updateStatus === "function") {
                  updateStatus(driver.rowId);
                }
              }}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Change Status
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                toast.info(`Removing ${driver.fullName}`);
              }}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
