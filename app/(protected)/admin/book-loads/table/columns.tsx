"use client";

import { ColumnDef } from "@tanstack/react-table";
import { createIdenticalColumns } from "@/components/datatable/data-table-utils";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableRowActions } from "./row-actions";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal, CheckCircle, XCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { toast } from "sonner";
import { LoadboardEntry } from "../data";
import { calculateDiscountedRate } from "../utils/rate-calculator";

export const columns: ColumnDef<LoadboardEntry>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px] mb-3"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  ...createIdenticalColumns<LoadboardEntry>([
    { accessorKey: "age", title: "Time Posted" },
    { accessorKey: "pickupLocation", title: "Pickup Location" },
    { accessorKey: "deliveryLocation", title: "Delivery Location" },
    { accessorKey: "pickupDate", title: "Pickup Date", options: { isDate: true } },
    { accessorKey: "weight", title: "Weight (lbs)" },
    {
      accessorKey: "rate",
      title: "Rate (GHS)",
      cell: ({ row }) => {
        const originalRate = Number(row.getValue("rate"));
        const discountedRate = calculateDiscountedRate(originalRate);
        return new Intl.NumberFormat("en-GH", {
          style: "currency",
          currency: "GHS",
        }).format(discountedRate);
      },
    },
    { accessorKey: "container_size", title: "Container Size" },
    { accessorKey: "equipmentType", title: "Equipment Type", options: { isEquipmentType: true } },
  ]),
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]; 