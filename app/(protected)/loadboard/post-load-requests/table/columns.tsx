
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "blNumber",
    header: "BL Number"
  },
  {
    accessorKey: "submittedBy",
    header: "Submitted By"
  },
  {
    accessorKey: "submittedDate",
    header: "Submitted Date"
  },
  {
    accessorKey: "type",
    header: "Type"
  },
  {
    accessorKey: "pickupLocation",
    header: "Pickup Location"
  },
  {
    accessorKey: "deliveryLocation",
    header: "Delivery Location"
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <Badge variant="secondary">
          {row.getValue("status")}
        </Badge>
      );
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const handleApprove = () => {
        // TODO: Implement actual approval logic
        toast.success(`Load request ${row.original.blNumber} approved`);
      };

      const handleReject = () => {
        // TODO: Implement actual rejection logic
        toast.success(`Load request ${row.original.blNumber} rejected`);
      };

      return (
        <div className="flex gap-2">
          <Button onClick={handleApprove} size="sm" variant="default">
            Approve
          </Button>
          <Button onClick={handleReject} size="sm" variant="destructive">
            Reject
          </Button>
        </div>
      );
    }
  }
];
