"use client";

import { ColumnDef, Row, Table } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/datatable/data-table-column-header";
import { DataTableRowActions } from "./row-actions";
import { LoadData, Location } from "../types";

interface TableMeta {
  updateLoadStatus: (loadId: string, status: string) => void;
  updateLoadDestination?: (loadId: string, destination: string, newRate: number) => void;
}

type RowWithMeta = Row<LoadData> & {
  table: Table<LoadData> & {
    options: {
      meta: TableMeta;
    };
  };
};

export const columns: ColumnDef<LoadData>[] = [
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
    cell: ({ row }) => {
      const location = row.getValue("pickupLocation") as Location;
      return location.name;
    },
  },
  {
    accessorKey: "deliveryLocation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Delivery Location" />
    ),
    cell: ({ row }) => {
      const location = row.getValue("deliveryLocation") as Location;
      return location.name;
    },
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
    accessorKey: "container_size",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Container Size" />
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
    cell: ({ row }) => {
      const rowWithMeta = {
        ...row,
        table: {
          options: {
            meta: {
              updateLoadStatus: (loadId: string, status: string) => {
                console.log(`Updating load ${loadId} status to ${status}`);
                // Implement your status update logic here
              },
              updateLoadDestination: (loadId: string, destination: string, newRate: number) => {
                console.log(`Updating load ${loadId} destination to ${destination} with rate ${newRate}`);
                // Implement your destination update logic here
              }
            }
          }
        }
      } as RowWithMeta;
      return <DataTableRowActions row={rowWithMeta} />;
    },
  },
];
