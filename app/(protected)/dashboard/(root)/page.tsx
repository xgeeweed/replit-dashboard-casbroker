"use client";
import { Spinner } from "@/components/ui/spinner";
import { basicErrorToast } from "@/components/toast";
import { useEffect, useState } from "react";


export default function Dashboard() {

  // handle loading & error
  // if (isLoading) return <Spinner />;
  // if (error) return basicErrorToast();

  // Mimic a loading state with a 2-second delay
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    // Cleanup timer when component is unmounted
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full w-full p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Welcome back to your logistics command center</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-700">Active Loads</h3>
            <span className="text-2xl font-bold text-blue-600">24</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">Currently in transit</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
            <span className="text-2xl font-bold text-green-600">₵45,280</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">This month</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-700">Available Trucks</h3>
            <span className="text-2xl font-bold text-orange-600">12</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">Ready for dispatch</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Shipments</h3>
          <div className="space-y-4">
            {[1,2,3].map((_, i) => (
              <div key={i} className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-medium">Accra → Kumasi</p>
                  <p className="text-sm text-gray-500">Box Truck • 2,500 lbs</p>
                </div>
                <span className="px-2 py-1 rounded-full text-sm bg-green-100 text-green-800">In Transit</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-medium">Post Load</h4>
              <p className="text-sm text-gray-500">Create new shipment</p>
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-medium">Find Carrier</h4>
              <p className="text-sm text-gray-500">Search available trucks</p>
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-medium">Track Shipment</h4>
              <p className="text-sm text-gray-500">Monitor deliveries</p>
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-medium">Reports</h4>
              <p className="text-sm text-gray-500">View analytics</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
