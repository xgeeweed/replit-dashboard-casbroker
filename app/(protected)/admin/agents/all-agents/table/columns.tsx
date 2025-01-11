"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/datatable/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Eye, MessageCircle, MoreHorizontal, RefreshCw, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useState } from "react";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "rowId",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Full Name" />,
  },
  {
    accessorKey: "contact",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Contact" />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const agent = row.original;
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [selectedStatus, setSelectedStatus] = useState("");
      const updateStatus = (status: string) => {
        //Implementation to update agent status
        console.log("Updating status to:", status);
        setIsModalOpen(false);
        toast.success(`Status updated for ${agent.fullName}`);

      };


      return (
        <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/admin/agents/all-agents/${agent.rowId}`}>
              <DropdownMenuItem className="cursor-pointer">
                <Eye className="mr-2 h-4 w-4" />
                Agent Details
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => {
                toast.info(`Sending message to ${agent.fullName}`);
              }}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Send Message
            </DropdownMenuItem>
            <Link href={`/admin/agents/all-agents/${agent.rowId}/payment-history`}>
              <DropdownMenuItem className="cursor-pointer">
                <Eye className="mr-2 h-4 w-4" />
                View Payment History
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => setIsModalOpen(true)}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Change Status
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                toast.info(`Removing ${agent.fullName}`);
              }}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

          {/* Modal for Status Update */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h3 className="text-xl font-bold mb-4">Update Status</h3>
                <div className="space-y-2">
                  {["Active", "Suspended", "Inactive", "Pending"].map(
                    (status) => (
                      <div
                        key={status}
                        className={`p-2 cursor-pointer rounded-md border ${
                          selectedStatus === status
                            ? "bg-blue-100 border-blue-500"
                            : "border-gray-300"
                        }`}
                        onClick={() => setSelectedStatus(status)}
                      >
                        {status}
                      </div>
                    )
                  )}
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    className="py-2 px-4 rounded-md"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => updateStatus(selectedStatus)}
                    className="py-2 px-4 bg-blue-500 text-white rounded-md"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      );
    },
  },
];