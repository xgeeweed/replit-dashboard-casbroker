"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/datatable/data-table-column-header";

export interface TableMeta {
  name: string;
  plural?: string;
  // Custom callback to handle row selection in parent
  handleSelectionChange?: (id: string) => void;
}

// This is your Payment interface or a generic type
interface Payment {
  id: string;
  referenceNumber: string;
  blNumber: string;
  amount: number;
  status: string;
  dueDate: string;
  createdAt: string;
  paymentMethod: string;
  description: string;
}

export const columns: ColumnDef<Payment, any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row, table }) => {
      const isSelected = row.getIsSelected();
      const isPending = row.original.status === "Pending";

      return (
        <Checkbox
          checked={isSelected}
          onCheckedChange={(value) => {
            // First, let TanStack Table’s internal selection logic do its thing
            row.toggleSelected(!!value);

            // Then, call our custom meta callback if provided
            const handleSelectionChange = table.options.meta?.handleSelectionChange;
            if (handleSelectionChange) {
              handleSelectionChange(row.original.id);
            }
          }}
          disabled={!isPending}
          aria-label="Select row"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "referenceNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reference Number" />
    ),
  },
  {
    accessorKey: "blNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="BL Number" />
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      // Format the amount as currency
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "GHS",
      }).format(amount);

      return formatted;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due Date" />
    ),
  },
  {
    accessorKey: "paymentMethod",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Method" />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
  },
];
