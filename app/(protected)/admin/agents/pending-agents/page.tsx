
"use client";
import { useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { basicErrorToast } from "@/components/toast";
import { DataTable } from "@/components/datatable/data-table";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react"; 
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
    <div className="font-light h-full w-full flex flex-col items-center">
      <div className="mb-4 flex justify-end w-full pr-4">
        <Button
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Agent
        </Button>
      </div>

      <DataTable columns={columns} data={nonApprovedData} meta={meta} />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
            <XCircle
              className="absolute top-4 right-4 w-6 h-6 text-gray-400 hover:text-red-500 hover:scale-110 transition duration-200 cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            />
            <h3 className="text-xl font-bold mb-4">Add New Agent</h3>
            <form className="space-y-4">
              {currentStep === 1 && (
                <>
                  <div>
                    <label className="block text-gray-700">Full Name</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2"
                      value={newAgent.fullName}
                      onChange={(e) => setNewAgent({ ...newAgent, fullName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Date of Birth</label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-md p-2"
                      value={newAgent.dateOfBirth}
                      onChange={(e) => setNewAgent({ ...newAgent, dateOfBirth: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Town of Birth</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2"
                      value={newAgent.townOfBirth}
                      onChange={(e) => setNewAgent({ ...newAgent, townOfBirth: e.target.value })}
                      required
                    />
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div>
                    <label className="block text-gray-700">Contact</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2"
                      value={newAgent.contact}
                      onChange={(e) => setNewAgent({ ...newAgent, contact: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                      type="email"
                      className="w-full border border-gray-300 rounded-md p-2"
                      value={newAgent.email}
                      onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">GPS Address</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2"
                      value={newAgent.gpsAddress}
                      onChange={(e) => setNewAgent({ ...newAgent, gpsAddress: e.target.value })}
                    />
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <div>
                    <label className="block text-gray-700">Guarantor 1 Full Name</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2"
                      value={newAgent.guarantor1FullName}
                      onChange={(e) =>
                        setNewAgent({ ...newAgent, guarantor1FullName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Guarantor 1 Contact</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2"
                      value={newAgent.guarantor1Contact}
                      onChange={(e) =>
                        setNewAgent({ ...newAgent, guarantor1Contact: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Guarantor 1 Ghana Card</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2"
                      value={newAgent.guarantor1GhanaCard}
                      onChange={(e) =>
                        setNewAgent({ ...newAgent, guarantor1GhanaCard: e.target.value })
                      }
                    />
                  </div>
                </>
              )}

              {currentStep === 4 && (
                <>
                  <div>
                    <label className="block text-gray-700">Affiliate</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2"
                      value={newAgent.affiliateAssoc}
                      onChange={(e) =>
                        setNewAgent({ ...newAgent, affiliateAssoc: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Agent Picture (URL)</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2"
                      value={newAgent.agentPicture}
                      onChange={(e) =>
                        setNewAgent({ ...newAgent, agentPicture: e.target.value })
                      }
                    />
                  </div>
                </>
              )}
            </form>

            <div className="mt-4 flex justify-between">
              {currentStep > 1 && (
                <Button onClick={handleBack} className="py-2 px-4 rounded-md">
                  Back
                </Button>
              )}
              {currentStep < 4 && (
                <Button onClick={handleNext} className="py-2 px-4 rounded-md">
                  Next
                </Button>
              )}
              {currentStep === 4 && (
                <Button
                  onClick={handleAddAgent}
                  className="py-2 px-4 bg-blue-500 text-white rounded-md"
                >
                  Add Agent
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
