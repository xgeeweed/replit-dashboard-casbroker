"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/datatable/data-table-column-header";
import { DataTableRowActions } from "./row-actions";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "rowId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Load ID" />
    ),
  },
  {
    accessorKey: "pickupLocation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pickup Location" />
    ),
  },
  {
    accessorKey: "deliveryLocation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Delivery Location" />
    ),
  },
  {
    accessorKey: "pickupDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pickup Date" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
  {
    accessorKey: "weight",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Weight" />
    ),
  },
  {
    accessorKey: "length",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Length" />
    ),
  },
  {
    accessorKey: "equipmentType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Equipment" />
    ),
  },
  {
    accessorKey: "confirmedRate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rate (GHS)" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("confirmedRate"));
      const formatted = new Intl.NumberFormat("en-GH", {
        style: "currency",
        currency: "GHS",
      }).format(amount);
      return formatted;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
