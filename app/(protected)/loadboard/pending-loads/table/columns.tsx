
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { createIdenticalColumns } from "@/components/datatable/data-table-utils";
import { DataTableRowActions } from "./row-actions";

export const columns: ColumnDef<any>[] = [
  ...createIdenticalColumns<any>([
    { accessorKey: "blNumber", title: "BL Number" },
    { accessorKey: "submittedBy", title: "Submitted By" },
    { accessorKey: "submittedDate", title: "Submitted Date" },
    { accessorKey: "type", title: "Type" },
    { accessorKey: "status", title: "Status" },
    { accessorKey: "pickupLocation", title: "Pickup Location" },
    { accessorKey: "deliveryLocation", title: "Delivery Location" },
    { accessorKey: "weight", title: "Weight" },
  ]),
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
