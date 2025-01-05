
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface CancelLoadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loadRate: number;
}

export function CancelLoadDialog({ isOpen, onClose, onConfirm, loadRate }: CancelLoadDialogProps) {
  const [step, setStep] = useState<"reason" | "penalty">("reason");
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");

  const reasons = [
    "Equipment unavailable",
    "Rate too low",
    "Route changed",
    "Weather conditions",
    "Other"
  ];

  const handleReasonSubmit = () => {
    if (!reason || (reason === "Other" && !otherReason)) {
      toast.error("Please select or enter a reason");
      return;
    }
    setStep("penalty");
  };

  const handlePenaltyAccept = () => {
    onConfirm();
    toast.success("Load cancelled successfully");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {step === "reason" ? "Cancel Load" : "Confirm Penalty"}
          </DialogTitle>
        </DialogHeader>

        {step === "reason" ? (
          <div className="space-y-4">
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Select reason for cancellation" />
              </SelectTrigger>
              <SelectContent>
                {reasons.map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {reason === "Other" && (
              <Input
                placeholder="Enter reason"
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
              />
            )}

            <DialogFooter>
              <Button variant="outline" onClick={onClose}>Back</Button>
              <Button onClick={handleReasonSubmit}>Continue</Button>
            </DialogFooter>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm">A penalty fee of 10% (₵{(loadRate * 0.1).toFixed(2)}) may apply upon review.</p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setStep("reason")}>Back</Button>
              <Button onClick={handlePenaltyAccept}>Accept & Continue</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
