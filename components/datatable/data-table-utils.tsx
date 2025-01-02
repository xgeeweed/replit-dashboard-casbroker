import { ColumnDef, Row } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table-column-header";
import TableCell from "./data-table-editable-cell";
import Link from "next/link";
import dayjs from "dayjs";

// Define a type for column configuration
type TableColumn<T> = {
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

// Reusable function to generate columns
export function createColumn<T>(columnConfig: TableColumn<T>): ColumnDef<T> {
  const { accessorKey, title, editable, options, ...rest } = columnConfig;

  return {
    accessorKey,
    header: ({ column }) => <DataTableColumnHeader column={column} title={title} />,
    cell: editable
      ? TableCell
      : ({ row }) => <div className="flex space-x-2">{renderCell(row, accessorKey, options)}</div>,
    ...rest,
  };
}

function renderCell<T>(
  row: Row<T>,
  accessorKey: string | number | symbol,
  options?: { link?: boolean; basePath?: string; isDate?: boolean; isStatus?: boolean; isEquipmentType?: boolean }
) {
  // link
  if (options?.link) {
    return (
      <Link href={options?.basePath + row.original.id} className="max-w-[500px] truncate hover:underline">
        {row.getValue(accessorKey as string)}
      </Link>
    );
  }

  // date
  if (options?.isDate) {
    return <span>{dayjs(row.getValue(accessorKey as string)).format("MMM D, h:mm A")}</span>;
  }

  // status
  if (options?.isStatus) {
    const statusColors: { [key: string]: string } = {
      Available: "bg-green-100 text-green-800",
      "In Transit": "bg-blue-100 text-blue-800", 
      Completed: "bg-gray-100 text-gray-800", 
      "In Progress": "bg-green-100 text-green-800",
      "Denied": "bg-red-100 text-gray-800", 
      "Suspended": "bg-orange-100 text-orange-800",
      "Approved": "bg-green-100 text-green-800",
      "Rejected": "bg-red-100 text-gray-800",
    };
    const status = row.getValue(accessorKey as string) as string;
    return (
      <span className={`px-2 py-1 rounded-full text-sm ${statusColors[status] || "bg-gray-100 text-gray-800"}`}>
        {status}
      </span>
    );
  }

  // equipment type
  if (options?.isEquipmentType) {
    const equipmentColors: { [key: string]: string } = {
      "Box Truck": "bg-purple-100 text-purple-800",
      "Flatbed": "bg-orange-100 text-orange-800",
      "Refrigerated": "bg-blue-100 text-blue-800",
      "Tanker": "bg-yellow-100 text-yellow-800",
      "Van": "bg-pink-100 text-pink-800"
    };
    const equipment = row.getValue(accessorKey as string) as string;
    return (
      <span className={`px-2 py-1 rounded-full text-sm ${equipmentColors[equipment] || "bg-gray-100 text-gray-800"}`}>
        {equipment}
      </span>
    );
  }

  // isPublished
  if (accessorKey === "isPublished") {
    return <span>{row.getValue(accessorKey as string) ? "Yes" : "No"}</span>;
  }
  
  return <span>{row.getValue(accessorKey as string)}</span>;
}

type ColumnConfig<T> = {
  accessorKey: keyof T;
  title: string;
  options?: {
    link?: boolean;
    basePath?: string;
    isDate?: boolean;
    isStatus?: boolean;
    isEquipmentType?: boolean;
  };
};

export function createIdenticalColumns<T>(configs: ColumnConfig<T>[]): ColumnDef<T>[] {
  return configs.map((config) =>
    createColumn<T>({
      accessorKey: config.accessorKey,
      title: config.title,
      options: config.options,
    })
  );
}
