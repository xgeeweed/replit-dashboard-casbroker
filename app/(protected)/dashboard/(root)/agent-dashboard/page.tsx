
"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { CalendarDays, Truck, DollarSign, Users, Package, TrendingUp } from "lucide-react";

export default function AgentDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div className="h-full w-full p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Agent Dashboard</h1>
        <p className="text-gray-600 mt-2">Monitor your brokerage performance and operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Active Loads</h3>
              <span className="text-2xl font-bold text-blue-600">18</span>
            </div>
            <Package className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-sm text-gray-500 mt-2">Currently being managed</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
              <span className="text-2xl font-bold text-green-600">₵85,450</span>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-sm text-gray-500 mt-2">This month</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Drivers</h3>
              <span className="text-2xl font-bold text-purple-600">32</span>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-sm text-gray-500 mt-2">Active drivers</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {[
              { event: "New load posted", time: "2 hours ago", route: "Tema → Kumasi" },
              { event: "Payment processed", time: "5 hours ago", route: "Accra → Tamale" },
              { event: "Driver assigned", time: "1 day ago", route: "Takoradi → Cape Coast" }
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-medium">{activity.event}</p>
                  <p className="text-sm text-gray-500">{activity.route}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Load Completion Rate</span>
              <span className="font-medium text-green-600">94%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Average Response Time</span>
              <span className="font-medium">2.5 hours</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Customer Satisfaction</span>
              <span className="font-medium text-green-600">4.8/5.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
