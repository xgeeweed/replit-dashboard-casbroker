"use client";

import { ColumnDef } from "@tanstack/react-table";

import { createIdenticalColumns } from "@/components/datatable/data-table-utils";
import { Checkbox } from "@/components/ui/checkbox";
// import { LoadboardEntry } from "@/model";
import { DataTableRowActions } from "./row-actions";

// Define your columns using the reusable function
export const columns: ColumnDef<any>[] = [
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
  ...createIdenticalColumns<any>([
    { accessorKey: "age", title: "Time Posted" },
    { accessorKey: "pickupLocation", title: "Pickup Location" },
    { accessorKey: "deliveryLocation", title: "Delivery Location" },
    { accessorKey: "pickupDate", title: "Pickup Date", options: { isDate: true } },
    // { accessorKey: "deliveryDate", title: "Delivery Date", options: { isDate: true } },
    { accessorKey: "weight", title: "Weight (lbs)" },
    {
      accessorKey: "rate",
      title: "Rate (GHS)",
      cell: ({ row }) => {
        const rate = Number(row.getValue("rate"));
        return new Intl.NumberFormat("en-GH", {
          style: "currency",
          currency: "GHS",
        }).format(rate);
      },
    },
    // { accessorKey: "status", title: "Status", options: { isStatus: true } },
    { accessorKey: "length", title: "Length" },
    { accessorKey: "equipmentType", title: "Equipment Type", options: { isEquipmentType: true } },
  ]),
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
