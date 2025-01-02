"use client";

import { ColumnDef } from "@tanstack/react-table";

import { createIdenticalColumns } from "@/components/datatable/data-table-utils";
import { Checkbox } from "@/components/ui/checkbox";
// import { Program } from "@/model";
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
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  ...createIdenticalColumns<any>([
    { accessorKey: "title", title: "Title", options: { link: true, basePath: "/dashboard/" } },
    { accessorKey: "price", title: "Price ($)" },
    { accessorKey: "isPublished", title: "Published" },
    { accessorKey: "createdAt", title: "Date Created", options: { isDate: true } },
    { accessorKey: "updatedAt", title: "Date Updated", options: { isDate: true } },
  ]),
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
