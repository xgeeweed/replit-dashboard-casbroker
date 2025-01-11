
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/datatable/data-table-column-header";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, CheckCircle, XCircle, Route } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { CanceledLoad } from "../data";

export const columns: ColumnDef<CanceledLoad>[] = [
  {
    accessorKey: "loadId",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Load ID" />,
  },
  {
    accessorKey: "agentName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Agent" />,
  },
  {
    accessorKey: "cancelDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Cancel Date" />,
  },
  {
    accessorKey: "reason",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Reason" />,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      return `GH₵ ${amount.toLocaleString()}`;
    },
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
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span className={`px-2 py-1 rounded-full text-sm ${
          status === "Approved" ? "bg-green-100 text-green-800" :
          status === "Denied" ? "bg-red-100 text-red-800" :
          "bg-yellow-100 text-yellow-800"
        }`}>
          {status}
        </span>
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
            <DropdownMenuItem
              onClick={() => {
                toast.success(`Approved cancellation for load ${load.loadId}`);
              }}
              className="text-green-600"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                toast.success(`Denied cancellation for load ${load.loadId}`);
              }}
              className="text-red-600"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Deny
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                toast.success(`Initiating re-route for load ${load.loadId}`);
              }}
            >
              <Route className="mr-2 h-4 w-4" />
              Re-route
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
