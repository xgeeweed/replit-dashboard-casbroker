
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/datatable/data-table-column-header";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "loadId",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Load ID" />,
  },
  {
    accessorKey: "route",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Route" />,
  },
  {
    accessorKey: "completedDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Completed Date" />,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-GH", {
        style: "currency",
        currency: "GHS",
      }).format(amount);
      return formatted;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div className={`font-medium ${
          status === "Paid" ? "text-green-600" : "text-orange-600"
        }`}>
          {status}
        </div>
      );
    },
  },
];
