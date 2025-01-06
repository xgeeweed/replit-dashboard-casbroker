
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CancelLoadDialog } from "@/components/loadboard/cancel-load-dialog";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const rowData = row.original as any;
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const handleCancelConfirmed = () => {
    const updateLoadStatus = row.table?.options?.meta?.updateLoadStatus;
    if (typeof updateLoadStatus === 'function') {
      updateLoadStatus(rowData.rowId, "Cancelled");
    }
    setShowCancelDialog(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Link href={`/loadboard/agent-loadboard/${rowData.rowId}`}>
            <DropdownMenuItem className="cursor-pointer">
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
          </Link>
          {rowData.status === "In Progress" && (
            <DropdownMenuItem 
              className="cursor-pointer text-red-600"
              onClick={() => setShowCancelDialog(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Cancel Load
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <CancelLoadDialog 
        isOpen={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        onConfirm={handleCancelConfirmed}
        loadRate={rowData.rate}
      />
    </>
  );
}
