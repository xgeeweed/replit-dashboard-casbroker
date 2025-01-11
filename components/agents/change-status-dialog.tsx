
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

export function ChangeStatusDialog({ agent }: { agent: any }) {
  const [status, setStatus] = useState(agent.status);
  const [isOpen, setIsOpen] = useState(false);

  const handleStatusChange = () => {
    if (status === agent.status) {
      toast.error("Please select a different status");
      return;
    }
    // TODO: Implement actual status change logic here
    toast.success(`Status updated for ${agent.fullName}`);
    setIsOpen(false);
  };

  return (
    <>
      <Button variant="ghost" className="flex w-full items-center" onClick={() => setIsOpen(true)}>
        Change Status
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Agent Status</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Agent Name</label>
              <p>{agent.fullName}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Status</label>
              <p>{agent.status}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">New Status</label>
              <Select onValueChange={setStatus} defaultValue={agent.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={handleStatusChange}>Update Status</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
