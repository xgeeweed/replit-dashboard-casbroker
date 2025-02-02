import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row, Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Trash2, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CancelLoadDialog } from "@/components/loadboard/cancel-load-dialog";
import { ChangeRouteWizard } from "../components/change-route-wizard";
import { useRouter } from "next/navigation";
import { LoadData } from "../types";

interface TableMeta {
  updateLoadStatus: (loadId: string, status: string) => void;
  updateLoadDestination?: (loadId: string, destination: string, newRate: number) => void;
}

interface DataTableRowActionsProps {
  row: Row<LoadData> & {
    table: Table<LoadData> & {
      options: {
        meta: TableMeta;
      };
    };
  };
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const router = useRouter();
  const rowData = row.original;
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showRouteWizard, setShowRouteWizard] = useState(false);

  const handleCancelConfirmed = () => {
    const updateLoadStatus = row.table.options.meta.updateLoadStatus;
    if (typeof updateLoadStatus === 'function') {
      updateLoadStatus(rowData.rowId, "Cancelled");
    }
    setShowCancelDialog(false);
  };

  const handleRemoveLoad = () => {
    const updateLoadStatus = row.table.options.meta.updateLoadStatus;
    if (typeof updateLoadStatus === 'function') {
      updateLoadStatus(rowData.rowId, "Removed");
    }
  };

  const handleRouteChange = (newDestination: string, newRate: number) => {
    const updateLoadDestination = row.table.options.meta.updateLoadDestination;
    if (typeof updateLoadDestination === 'function') {
      updateLoadDestination(rowData.rowId, newDestination, newRate);
    }
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
          
          {rowData.status === "Pending Review" && (
            <DropdownMenuItem 
              className="cursor-pointer text-red-600"
              onClick={handleRemoveLoad}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remove Load
            </DropdownMenuItem>
          )}

          {rowData.status === "In Progress" && (
            <>
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => setShowRouteWizard(true)}
              >
                <MapPin className="mr-2 h-4 w-4" />
                Change Route
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer text-red-600"
                onClick={() => setShowCancelDialog(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Cancel Load
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <CancelLoadDialog 
        isOpen={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        onConfirm={handleCancelConfirmed}
        loadRate={rowData.confirmedRate}
      />

      <ChangeRouteWizard
        isOpen={showRouteWizard}
        onClose={() => setShowRouteWizard(false)}
        onConfirm={handleRouteChange}
        currentDestination={rowData.deliveryLocation.name}
        distance={rowData.distance}
        currentRate={rowData.confirmedRate}
      />
    </>
  );
}
