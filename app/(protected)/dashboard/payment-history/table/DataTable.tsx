"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TableMeta } from "./columns"; // or wherever TableMeta is defined

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  meta?: TableMeta;
}

export function DataTable<TData>({
  data,
  columns,
  meta,
}: DataTableProps<TData>) {
  // Initialize the TanStack Table instance
  const table = useReactTable({
    data,
    columns,
    // Pass our meta object in so `table.options.meta` is populated
    meta,
    // Enable row selection (if you want to use the built-in row selection utilities)
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // ... any other table options you need ...
  });

  return (
    <div className="w-full space-y-4">
      {/* Example table layout */}
      <table className="min-w-full border-collapse text-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-2 text-left">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination (optional) */}
      <div className="flex justify-end space-x-2 pt-2">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
}
