
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const MOMO_PROVIDERS = [
  { id: "mtn", label: "MTN Mobile Money" },
  { id: "vodafone", label: "Vodafone Cash" },
  { id: "airtel", label: "AirtelTigo Money" },
  { id: "gpay", label: "G-Money" },
];

const BANK_DETAILS = `ALL payments to be made to CASBROKER COMPANY LTD
BANKS:
1. FIDELITY BANK
   BRANCH: TEMA PORT
   ACC: 200012372838

2. STANBIC BANK
   BRANCH: SPINTEX
   ACC: 60009837363

All payment deposits should be made with payment reference.
For assistance call: 0800063738
Email: support@casbroker.com`;

export function PaymentWizard({ open, onClose, totalAmount, referenceNumber }) {
  const [paymentStep, setPaymentStep] = useState(1);
  const [momoProvider, setMomoProvider] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { toast } = useToast();

  const handlePayment = () => {
    // API integration will be added here
    toast({
      title: "Payment Initiated",
      description: `Payment reference: ${referenceNumber}`,
    });
    setPaymentStep(3);
  };

  const renderPaymentForm = () => {
    switch (paymentStep) {
      case 1:
        return (
          <Tabs defaultValue="momo" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="momo">Mobile Money</TabsTrigger>
              <TabsTrigger value="card">Card</TabsTrigger>
              <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
              <TabsTrigger value="cash">Cash</TabsTrigger>
            </TabsList>

            <TabsContent value="momo" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label>Select Provider</Label>
                  <Select onValueChange={setMomoProvider}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {MOMO_PROVIDERS.map((provider) => (
                        <SelectItem key={provider.id} value={provider.id}>
                          {provider.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="card" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label>Card Number</Label>
                  <Input type="text" placeholder="Card number" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Expiry Date</Label>
                    <Input type="text" placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label>CVV</Label>
                    <Input type="text" placeholder="CVV" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bank" className="space-y-4">
              <div className="whitespace-pre-line p-4 bg-muted rounded-md">
                {BANK_DETAILS}
                <div className="mt-4">
                  <strong>Payment Reference:</strong> {referenceNumber}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cash" className="space-y-4">
              <div className="p-4 bg-muted rounded-md">
                Please visit our office with the payment reference number:
                <div className="mt-4">
                  <strong>Payment Reference:</strong> {referenceNumber}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="border p-4 rounded-md">
              <h3 className="font-bold mb-4">Payment Invoice</h3>
              <div className="space-y-2">
                <p>Reference Number: {referenceNumber}</p>
                <p>Amount: GHS {totalAmount}</p>
                <p>Date: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
            <Button onClick={() => window.print()} className="w-full">
              Print Invoice
            </Button>
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Make Payment</h2>
          {renderPaymentForm()}
          {paymentStep === 1 && (
            <Button onClick={handlePayment} className="w-full">
              Proceed to Pay GHS {totalAmount}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
