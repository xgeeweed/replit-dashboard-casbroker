"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  Table as TanstackTable,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { FooterCell } from "./footer-cell";

export interface TableMetaData {
  name: string;
  plural?: string;
}

interface WithId {
  rowId: string; // Adjust the type of id as per your actual data structure
}

interface DataTableProps<TData extends WithId, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  meta?: {
    name: string;
    plural: string;
  };
  updateLoadStatus?: (loadId: string, status: string) => void;
  editable?: {
    cell?: boolean;
    footer?: boolean;
  };
}

export function DataTable<TData extends WithId, TValue>({
  columns,
  data: defaultData,
  meta,
  updateLoadStatus,
  editable,
}: DataTableProps<TData, TValue>) {
  const defaultDataWithId = React.useMemo(() => defaultData.map((row, index) => ({ ...row, rowId: index.toString() })), [defaultData]);

  const [data, setData] = React.useState<TData[]>([...defaultDataWithId]);
  const [originalData, setOriginalData] = React.useState<TData[]>([...defaultDataWithId]);

  const [editedRows, setEditedRows] = React.useState<Record<string, TData>>({});
  const [validRows, setValidRows] = React.useState<Record<string, TData>>({});

  const [rowSelection, setRowSelection] = React.useState<Record<string, boolean>>({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const addRow = (row: TData) => {
    setData((old) => [...old, row]);
    setOriginalData((old) => [...old, row]);
    setEditedRows((old) => ({ ...old, [row.rowId]: { ...row } }));
    setValidRows((old) => ({ ...old, [row.rowId]: { ...row } }));
  };

  const updateRow = (id: string, row: TData) => {
    setData((old) => old.map((oldRow) => (oldRow.rowId === id ? row : oldRow)));
    setOriginalData((old) => old.map((oldRow) => (oldRow.rowId === id ? row : oldRow)));
    setEditedRows((old) => ({ ...old, [id]: { ...row } }));
    setValidRows((old) => ({ ...old, [id]: { ...row } }));
  };

  const deleteRow = (id: string) => {
    const setFilterFunc = (old: TData[]) => old.filter((row) => row.rowId !== id);
    setData(setFilterFunc);
    setOriginalData(setFilterFunc);
    setEditedRows((old) => ({ ...old, [id]: { ...old[id] } }));
    setValidRows((old) => ({ ...old, [id]: { ...old[id] } }));
  };

    // Use useMemo to create a reactive data source

  const table = useReactTable({
    data: defaultData,
    columns,
    meta: {
      updateLoadStatus: updateLoadStatus
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    meta: {
      editedRows,
      setEditedRows,
      validRows,
      setValidRows,
      revertData: (rowIndex: number) => {
        setData((old) => old.map((row, index) => (index === rowIndex ? originalData[rowIndex] : row)));
      },
      updateRow: (rowIndex: number) => {
        updateRow(data[rowIndex].rowId, data[rowIndex]);
      },
      updateData: (rowIndex: number, columnId: string, value: string, isValid: boolean) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
        setValidRows((old) => ({
          ...old,
          [rowIndex]: { ...old[rowIndex], [columnId]: isValid },
        }));
      },
      addRow: () => {
        const id = Math.floor(Math.random() * 10000).toString(); // Ensure id is a string
        const newRow = {
          // id,
          // firstName: "",
          // lastName: "",
          // phoneNumber: "",
          // email: "",
        } as TData; // Cast to TData to satisfy type
        addRow(newRow);
      },
      removeRow: (rowIndex: number) => {
        deleteRow(data[rowIndex].rowId);
      },
      removeSelectedRows: (selectedRows: number[]) => {
        selectedRows.forEach((rowIndex) => {
          deleteRow(data[rowIndex].rowId);
        });
      },
    },
  });

  console.log({ "table.getRowModel().rows": table.getRowModel().rows, defaultData });

  return (
    <div className="space-y-4">
        <DataTableToolbar table={table} meta={meta} />
      <div className="rounded-md border max-h-[70vh] w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {editable?.footer && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={table.getCenterLeafColumns().length} align="right">
                  {/* Example footer component */}
                  <FooterCell table={table} />
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}