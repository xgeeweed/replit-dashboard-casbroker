
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/datatable/data-table-column-header";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "agentName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Agent" />,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    cell: ({ row }) => `GH₵ ${row.getValue("amount").toLocaleString()}`,
  },
  {
    accessorKey: "date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
  },
  {
    accessorKey: "loadId",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Load ID" />,
  },
  {
    accessorKey: "route",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Route" />,
  },
  {
    accessorKey: "paymentMethod",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Payment Method" />,
  },
  {
    accessorKey: "category",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <span className={`px-2 py-1 rounded-full text-sm ${
        row.getValue("status") === "Completed" 
          ? "bg-green-100 text-green-800"
          : row.getValue("status") === "Failed"
            ? "bg-red-100 text-red-800"
            : "bg-yellow-100 text-yellow-800"
      }`}>
        {row.getValue("status")}
      </span>
    ),
  },
];
