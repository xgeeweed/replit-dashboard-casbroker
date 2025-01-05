
"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { CalendarDays, Truck, DollarSign, MapPin, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function DriverDashboard() {
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
        <h1 className="text-3xl font-bold text-gray-900">Driver Dashboard</h1>
        <p className="text-gray-600 mt-2">Track your deliveries and earnings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Current Load</h3>
              <span className="text-2xl font-bold text-blue-600">Active</span>
            </div>
            <Truck className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-sm text-gray-500 mt-2">Tema → Kumasi</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Earnings</h3>
              <span className="text-2xl font-bold text-green-600">₵4,850</span>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-sm text-gray-500 mt-2">This week</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Total Distance</h3>
              <span className="text-2xl font-bold text-orange-600">1,284 km</span>
            </div>
            <MapPin className="h-8 w-8 text-orange-600" />
          </div>
          <p className="text-sm text-gray-500 mt-2">This month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Deliveries</h3>
          <div className="space-y-4">
            {[
              { route: "Accra → Tamale", status: "Completed", date: "Yesterday" },
              { route: "Tema → Ho", status: "Completed", date: "3 days ago" },
              { route: "Takoradi → Cape Coast", status: "Completed", date: "5 days ago" }
            ].map((delivery, i) => (
              <div key={i} className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-medium">{delivery.route}</p>
                  <p className="text-sm text-gray-500">{delivery.date}</p>
                </div>
                <span className="px-2 py-1 rounded-full text-sm bg-green-100 text-green-800">
                  {delivery.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Performance Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>On-Time Delivery Rate</span>
              <span className="font-medium text-green-600">96%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Average Trip Time</span>
              <span className="font-medium">4.2 hours</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Fuel Efficiency</span>
              <span className="font-medium">8.5 km/L</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
