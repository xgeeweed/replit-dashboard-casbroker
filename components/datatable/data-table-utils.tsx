import { ColumnDef, Row } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import TableCell from "./data-table-editable-cell";
import Link from "next/link";
import dayjs from "dayjs";

// ---------------------------------------------
// 1) Define the type for each column config
// ---------------------------------------------
export type TableColumn<T> = {
  accessorKey: keyof T;
  title: string;
  editable?: boolean;
  options?: {
    link?: boolean;
    basePath?: string;
    isDate?: boolean;
    isStatus?: boolean;
    isEquipmentType?: boolean;
  };
} & Partial<ColumnDef<T>>;
// ^ This allows custom ColumnDef props such as "cell"

// ---------------------------------------------
// 2) createColumn - merges your config with defaults
// ---------------------------------------------
export function createColumn<T>(columnConfig: TableColumn<T>): ColumnDef<T> {
  const { accessorKey, title, editable, options, cell, ...rest } = columnConfig;

  return {
    // Required fields
    accessorKey,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={title} />
    ),

    // If a custom cell is provided, use it.
    // Otherwise, if editable is true, use your TableCell.
    // Otherwise, fall back to the "renderCell" function.
    cell: cell
      ? cell
      : editable
        ? TableCell
        : ({ row }) => (
            <div className="flex space-x-2">
              {renderCell(row, accessorKey as string, options)}
            </div>
          ),

    // Spread any remaining config (e.g. enableSorting, etc.)
    ...rest,
  };
}

// ---------------------------------------------
// 3) The actual logic to display various cell types
// ---------------------------------------------
function renderCell<T>(
  row: Row<T>,
  accessorKey: string,
  options?: {
    link?: boolean;
    basePath?: string;
    isDate?: boolean;
    isStatus?: boolean;
    isEquipmentType?: boolean;
  },
) {
  // 3.1) Link
  if (options?.link) {
    return (
      <Link
        href={options.basePath + (row.original as any).id}
        className="max-w-[500px] truncate hover:underline"
      >
        {row.getValue(accessorKey)}
      </Link>
    );
  }

  // 3.2) Date
  if (options?.isDate) {
    return (
      <span>{dayjs(row.getValue(accessorKey)).format("MMM D, h:mm A")}</span>
    );
  }

  // 3.3) Status
  if (options?.isStatus) {
    const statusColors: { [key: string]: string } = {
      Available: "bg-green-100 text-green-800",
      "In Transit": "bg-blue-100 text-blue-800",
      Completed: "bg-gray-100 text-gray-800",
      "In Progress": "bg-green-100 text-green-800",
      Denied: "bg-red-100 text-gray-800",
      Suspended: "bg-orange-100 text-orange-800",
      Approved: "bg-green-100 text-green-800",
      Rejected: "bg-red-100 text-gray-800",
    };
    const status = row.getValue(accessorKey) as string;
    return (
      <span
        className={`px-2 py-1 rounded-full text-sm ${
          statusColors[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  }

  // 3.4) Equipment type
  if (options?.isEquipmentType) {
    const equipmentColors: { [key: string]: string } = {
      "Box Truck": "bg-purple-100 text-purple-800",
      Flatbed: "bg-orange-100 text-orange-800",
      Refrigerated: "bg-blue-100 text-blue-800",
      Tanker: "bg-yellow-100 text-yellow-800",
      Van: "bg-pink-100 text-pink-800",
    };
    const equipment = row.getValue(accessorKey) as string;
    return (
      <span
        className={`px-2 py-1 rounded-full text-sm ${
          equipmentColors[equipment] || "bg-gray-100 text-gray-800"
        }`}
      >
        {equipment}
      </span>
    );
  }

  // 3.5) isPublished
  if (accessorKey === "isPublished") {
    return <span>{row.getValue(accessorKey) ? "Yes" : "No"}</span>;
  }

  // 3.6) Default: just render the raw value
  return <span>{row.getValue(accessorKey)}</span>;
}

// ---------------------------------------------
// 4) createIdenticalColumns - uses createColumn
// ---------------------------------------------
export function createIdenticalColumns<T>(
  configs: TableColumn<T>[],
): ColumnDef<T>[] {
  return configs.map((config) => createColumn<T>(config));
}
