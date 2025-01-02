import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { priorities, statuses } from "./data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { TableMetaData } from "./data-table";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  meta: TableMetaData;
}

export function DataTableToolbar<TData>({ table, meta }: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getState().globalFilter !== undefined &&
    table.getState().globalFilter !== null &&
    table.getState().globalFilter !== "";

  const handleSetGlobalFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    table.setGlobalFilter(event.target.value);
  };

  const handleGetGlobalFilter = () => {
    return (table.getState().globalFilter as string) ?? "";
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={`Filter ${meta.plural ?? meta.name}...`}
          value={handleGetGlobalFilter()}
          onChange={handleSetGlobalFilter}
          className="h-8 w-[150px] lg:w-[250px] bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
        />
        {isFiltered && (
          <Button variant="ghost" onClick={() => table.setGlobalFilter("")} className="h-8 px-2 lg:px-3">
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
