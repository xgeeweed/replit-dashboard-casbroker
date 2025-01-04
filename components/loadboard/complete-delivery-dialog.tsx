
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface CompleteDeliveryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  loadId: string;
}

export function CompleteDeliveryDialog({ isOpen, onClose, onComplete, loadId }: CompleteDeliveryDialogProps) {
  const [step, setStep] = useState<"confirm" | "otp">("confirm");
  const [otp, setOtp] = useState("");

  const handleRequestOTP = () => {
    // Here you would integrate SMS gateway
    toast.success("OTP sent to agent's phone");
    setStep("otp");
  };

  const handleVerifyOTP = () => {
    if (otp === "1111") {
      onComplete();
      onClose();
      toast.success("Delivery marked as complete");
    } else {
      toast.error("Invalid OTP");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete Delivery</DialogTitle>
          <DialogDescription>
            {step === "confirm" 
              ? "This will notify the agent to confirm the delivery completion." 
              : "Enter the OTP sent to the agent's phone"}
          </DialogDescription>
        </DialogHeader>

        {step === "otp" ? (
          <div className="space-y-4">
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button onClick={handleVerifyOTP}>Verify OTP</Button>
            </DialogFooter>
          </div>
        ) : (
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleRequestOTP}>Notify Agent</Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
