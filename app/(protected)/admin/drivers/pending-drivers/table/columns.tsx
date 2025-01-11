
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { createIdenticalColumns } from "@/components/datatable/data-table-utils";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableRowActions } from "./row-actions";

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
    { accessorKey: "fullName", title: "Full Name" },
    { accessorKey: "dateOfBirth", title: "Date of Birth", options: { isDate: true } },
    { accessorKey: "nationality", title: "Nationality" },
    { accessorKey: "contact", title: "Contact" },
    { accessorKey: "email", title: "Email" },
    { accessorKey: "licenseNumber", title: "License Number" },
    { accessorKey: "vehicleType", title: "Vehicle Type" },
    { accessorKey: "status", title: "Status", options: { isStatus: true } },
  ]),
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
