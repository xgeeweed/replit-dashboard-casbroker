
"use client";
import { useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { basicErrorToast } from "@/components/toast";
import { DataTable } from "@/components/datatable/data-table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { XCircle, Plus } from "lucide-react"; 
import { columns } from "./table/columns";
import pendingAgentsData from "./data";

export default function PendingAgents() {
  const [nonApprovedData, setNonApprovedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [newAgent, setNewAgent] = useState({
    fullName: "",
    dateOfBirth: "",
    townOfBirth: "",
    nationality: "",
    hometown: "",
    contact: "",
    email: "",
    gpsAddress: "",
    agentPicture: "",
    guarantor1FullName: "",
    guarantor1Contact: "",
    guarantor1GhanaCard: "",
    guarantor2FullName: "",
    guarantor2Contact: "",
    guarantor2GhanaCard: "",
    affiliateAssoc: "",
    japtuIdCardNumber: "",
    status: "In Progress",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const filteredData = pendingAgentsData.filter(
        (agent) => agent.status.toLowerCase() !== "approved"
      );
      setNonApprovedData(filteredData);
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);

  const handleAddAgent = () => {
    if (newAgent.fullName && newAgent.contact && newAgent.email) {
      setNonApprovedData((prev) => [...prev, { ...newAgent, rowId: Date.now().toString() }]);
      setIsModalOpen(false);
      setCurrentStep(1);
      setNewAgent({
        fullName: "",
        dateOfBirth: "",
        townOfBirth: "",
        nationality: "",
        hometown: "",
        contact: "",
        email: "",
        gpsAddress: "",
        agentPicture: "",
        guarantor1FullName: "",
        guarantor1Contact: "",
        guarantor1GhanaCard: "",
        guarantor2FullName: "",
        guarantor2Contact: "",
        guarantor2GhanaCard: "",
        affiliateAssoc: "",
        japtuIdCardNumber: "",
        status: "In Progress",
      });
    } else {
      basicErrorToast("Please fill in all required fields.");
    }
  };

  const meta = {
    name: "agent",
    plural: "agents",
  };

  if (isLoading) return <Spinner />;
  if (nonApprovedData.length === 0) return basicErrorToast();

  return (
    <div className="h-full w-full space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Pending Agents</h2>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add New Agent
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <DataTable columns={columns} data={nonApprovedData} meta={meta} />
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Add New Agent</span>
              <XCircle
                className="h-6 w-6 text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
                onClick={() => setIsModalOpen(false)}
              />
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-4">
            <form className="space-y-4">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={newAgent.fullName}
                      onChange={(e) => setNewAgent({ ...newAgent, fullName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input
                      type="date"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={newAgent.dateOfBirth}
                      onChange={(e) => setNewAgent({ ...newAgent, dateOfBirth: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Town of Birth</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={newAgent.townOfBirth}
                      onChange={(e) => setNewAgent({ ...newAgent, townOfBirth: e.target.value })}
                      required
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={newAgent.contact}
                      onChange={(e) => setNewAgent({ ...newAgent, contact: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={newAgent.email}
                      onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">GPS Address</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={newAgent.gpsAddress}
                      onChange={(e) => setNewAgent({ ...newAgent, gpsAddress: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Guarantor 1 Full Name</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={newAgent.guarantor1FullName}
                      onChange={(e) => setNewAgent({ ...newAgent, guarantor1FullName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Guarantor 1 Contact</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={newAgent.guarantor1Contact}
                      onChange={(e) => setNewAgent({ ...newAgent, guarantor1Contact: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Guarantor 1 Ghana Card</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={newAgent.guarantor1GhanaCard}
                      onChange={(e) => setNewAgent({ ...newAgent, guarantor1GhanaCard: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Affiliate</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={newAgent.affiliateAssoc}
                      onChange={(e) => setNewAgent({ ...newAgent, affiliateAssoc: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Agent Picture (URL)</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={newAgent.agentPicture}
                      onChange={(e) => setNewAgent({ ...newAgent, agentPicture: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </form>

            <div className="mt-6 flex justify-between">
              {currentStep > 1 && (
                <Button 
                  onClick={handleBack}
                  variant="outline"
                  className="px-4 py-2"
                >
                  Back
                </Button>
              )}
              {currentStep < 4 && (
                <Button 
                  onClick={handleNext}
                  className="px-4 py-2 ml-auto"
                >
                  Next
                </Button>
              )}
              {currentStep === 4 && (
                <Button
                  onClick={handleAddAgent}
                  className="px-4 py-2 ml-auto"
                >
                  Add Agent
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
