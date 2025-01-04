
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/datatable/data-table-column-header";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "referenceNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Reference Number" />,
  },
  {
    accessorKey: "blNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="BL Number" />,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
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
        <Badge variant={status === "Completed" ? "default" : "secondary"}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Due Date" />,
  },
  {
    accessorKey: "paymentMethod",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Payment Method" />,
  },
  {
    accessorKey: "description",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
  }
];
