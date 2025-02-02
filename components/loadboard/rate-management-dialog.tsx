"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DollarSign, AlertCircle, Plus, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";

interface RateManagementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (updates: RateUpdate) => void;
  currentRate: number;
  loadId: string;
}

interface RateUpdate {
  type: "rate" | "charge" | "penalty";
  amount: number;
  reason?: string;
  comment?: string;
  notifyDriver?: boolean;
  notifyAgent?: boolean;
}

// Predefined penalties
const PENALTIES = [
  {
    id: "late_arrival",
    label: "Late Arrival",
    amount: 200,
    description: "Penalty for arriving later than scheduled pickup time"
  },
  {
    id: "damaged_goods",
    label: "Damaged Goods",
    amount: 500,
    description: "Penalty for damage to goods during transport"
  },
  {
    id: "incomplete_docs",
    label: "Incomplete Documentation",
    amount: 100,
    description: "Penalty for missing or incomplete delivery documentation"
  },
  {
    id: "unauthorized_stop",
    label: "Unauthorized Stop",
    amount: 300,
    description: "Penalty for making unauthorized stops during transit"
  }
];

export function RateManagementDialog({
  isOpen,
  onClose,
  onConfirm,
  currentRate,
  loadId
}: RateManagementDialogProps) {
  const [activeTab, setActiveTab] = useState("update-rate");
  const [newRate, setNewRate] = useState(currentRate);
  const [chargeAmount, setChargeAmount] = useState(0);
  const [chargeComment, setChargeComment] = useState("");
  const [selectedPenalty, setSelectedPenalty] = useState("");
  const [notifyDriver, setNotifyDriver] = useState(true);
  const [notifyAgent, setNotifyAgent] = useState(true);

  const handleClose = () => {
    setActiveTab("update-rate");
    setNewRate(currentRate);
    setChargeAmount(0);
    setChargeComment("");
    setSelectedPenalty("");
    setNotifyDriver(true);
    setNotifyAgent(true);
    onClose();
  };

  const handleUpdateRate = () => {
    onConfirm({
      type: "rate",
      amount: newRate,
      notifyDriver,
      notifyAgent
    });
    handleClose();
  };

  const handleAddCharge = () => {
    if (!chargeAmount || !chargeComment) return;
    onConfirm({
      type: "charge",
      amount: chargeAmount,
      comment: chargeComment,
      notifyDriver,
      notifyAgent
    });
    handleClose();
  };

  const handleApplyPenalty = () => {
    if (!selectedPenalty) return;
    const penalty = PENALTIES.find(p => p.id === selectedPenalty);
    if (!penalty) return;

    onConfirm({
      type: "penalty",
      amount: penalty.amount,
      reason: penalty.label,
      comment: penalty.description,
      notifyDriver,
      notifyAgent
    });
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Rate Management</DialogTitle>
          <DialogDescription>
            Update rate, add charges, or apply penalties
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="update-rate">Update Rate</TabsTrigger>
            <TabsTrigger value="add-charge">Add Charge</TabsTrigger>
            <TabsTrigger value="apply-penalty">Apply Penalty</TabsTrigger>
          </TabsList>

          <TabsContent value="update-rate" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div>
                <Label>Current Rate</Label>
                <div className="text-2xl font-semibold text-muted-foreground">
                  GHS {currentRate.toLocaleString()}
                </div>
              </div>
              <div className="space-y-2">
                <Label>New Rate</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    value={newRate}
                    onChange={(e) => setNewRate(Number(e.target.value))}
                    className="pl-9"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="add-charge" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Charge Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    value={chargeAmount}
                    onChange={(e) => setChargeAmount(Number(e.target.value))}
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Comment</Label>
                <Textarea
                  placeholder="Explain the reason for this charge..."
                  value={chargeComment}
                  onChange={(e) => setChargeComment(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="apply-penalty" className="space-y-4 mt-4">
            <div className="space-y-4">
              <Label>Select Penalty</Label>
              <ScrollArea className="h-[200px]">
                <div className="space-y-2">
                  {PENALTIES.map((penalty) => (
                    <Card
                      key={penalty.id}
                      className={`cursor-pointer hover:shadow-md transition-shadow ${
                        selectedPenalty === penalty.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedPenalty(penalty.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">{penalty.label}</h4>
                            <p className="text-sm text-muted-foreground">
                              {penalty.description}
                            </p>
                          </div>
                          <Badge variant="secondary" className="bg-red-500/20 text-red-700">
                            -GHS {penalty.amount}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>

        <div className="space-y-4 mt-4">
          <div className="flex items-center space-x-2">
            <Label className="text-base">Notify:</Label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyDriver}
                  onChange={(e) => setNotifyDriver(e.target.checked)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span>Driver</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyAgent}
                  onChange={(e) => setNotifyAgent(e.target.checked)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span>Agent</span>
              </label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          {activeTab === "update-rate" && (
            <Button onClick={handleUpdateRate} disabled={newRate === currentRate}>
              Update Rate
            </Button>
          )}
          {activeTab === "add-charge" && (
            <Button onClick={handleAddCharge} disabled={!chargeAmount || !chargeComment}>
              Add Charge
            </Button>
          )}
          {activeTab === "apply-penalty" && (
            <Button onClick={handleApplyPenalty} disabled={!selectedPenalty} variant="destructive">
              Apply Penalty
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 