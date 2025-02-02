"use client";

import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal, CheckCircle, XCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { toast } from "sonner";
import { LoadboardEntry } from "../data";

interface DataTableRowActionsProps {
  row: Row<LoadboardEntry>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const load = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link href={`/admin/book-loads/${load.id}`}>
          <DropdownMenuItem className="cursor-pointer">
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          onClick={() => {
            toast.success(`Load ${load.id} booked successfully`);
          }}
          className="text-green-600"
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          Book Load
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            toast.error(`Load ${load.id} cancelled`);
          }}
          className="text-red-600"
        >
          <XCircle className="mr-2 h-4 w-4" />
          Cancel Load
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 