import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CompleteDeliveryDialog } from "@/components/loadboard/complete-delivery-dialog";
import { CancelLoadDialog } from "@/components/loadboard/cancel-load-dialog";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const rowData = row.original as any;

  const [showCompleteDialog, setShowCompleteDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const handleCompleteDelivery = () => {
    setShowCompleteDialog(true);
  };

  const handleCancelLoad = () => {
    setShowCancelDialog(true);
  };

  const handleDeliveryCompleted = () => {
    const updateLoadStatus = row.table?.options?.meta?.updateLoadStatus;
    if (typeof updateLoadStatus === "function") {
      updateLoadStatus(rowData.rowId, "Completed");
    }
  };

  const handleLoadCancelled = () => {
    const updateLoadStatus = row.table?.options?.meta?.updateLoadStatus;
    if (typeof updateLoadStatus === "function") {
      updateLoadStatus(rowData.rowId, "Cancelled");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Link href={`/loadboard/my-loadboard/${rowData.rowId}`}>
            <DropdownMenuItem className="cursor-pointer">
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
          </Link>
          {rowData.status === "In Progress" && (
            <>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleCompleteDelivery}
              >
                <Check className="mr-2 h-4 w-4" />
                Completes Delivery
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-red-600"
                onClick={handleCancelLoad}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Cancel Load
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <CompleteDeliveryDialog
        isOpen={showCompleteDialog}
        onClose={() => setShowCompleteDialog(false)}
        onComplete={handleDeliveryCompleted}
        loadId={rowData.rowId}
      />
      <CancelLoadDialog
        isOpen={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        onConfirm={handleLoadCancelled}
        loadRate={rowData.rate}
      />
    </>
  );
}
