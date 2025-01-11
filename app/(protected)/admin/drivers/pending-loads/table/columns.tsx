
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/datatable/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal, CheckCircle, XCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { DriverPendingLoad } from "../data";
import Link from "next/link";

export const columns: ColumnDef<DriverPendingLoad>[] = [
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
    accessorKey: "requestedBy",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Requested By" />,
  },
  {
    accessorKey: "weight",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Weight" />,
  },
  {
    accessorKey: "equipment",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Equipment" />,
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
            <Link href={`/admin/drivers/pending-loads/${load.id}`}>
              <DropdownMenuItem className="cursor-pointer">
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => {
                toast.success(`Approved load ${load.id}`);
              }}
              className="text-green-600"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                toast.error(`Denied load ${load.id}`);
              }}
              className="text-red-600"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Deny
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
