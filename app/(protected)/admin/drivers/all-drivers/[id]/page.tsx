
"use client";

import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { driverTransactions } from "./data";
import allDriversData from "../data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DetailRow } from "@/components/ui/detail-row";
import { Spinner } from "@/components/ui/spinner";
import { basicErrorToast } from "@/components/toast";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function DriverView() {
  const { id } = useParams();
  const [driver, setDriver] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredTransactions, setFilteredTransactions] = useState(driverTransactions);

  useEffect(() => {
    const timer = setTimeout(() => {
      const driverData = allDriversData.find((driver) => driver.rowId === id);
      setDriver(driverData);
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) return <Spinner />;
  if (!driver) return basicErrorToast();

  return (
    <div className="p-6">
      <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details">Driver Details</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex justify-center mb-6">
              <img
                src="https://www.seekpng.com/png/detail/110-1100707_silhouette-person-png.png"
                alt={`${driver.fullName}'s picture`}
                className="w-32 h-32 rounded-full border border-gray-300"
              />
            </div>

            <div className="grid gap-6">
              <div>
                <h3 className="text-xl font-bold mb-4">Basic Information</h3>
                <DetailRow label="Full Name" value={driver.fullName} />
                <DetailRow label="Email" value={driver.email} />
                <DetailRow label="Contact" value={driver.contact} />
                <DetailRow label="Status" value={driver.status} />
                <DetailRow label="Rating" value={driver.rating} />
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Vehicle Information</h3>
                <DetailRow label="Vehicle Type" value={driver.vehicleType} />
                <DetailRow label="Vehicle Plate" value={driver.vehiclePlate} />
                <DetailRow label="Experience" value={driver.experience} />
                <DetailRow label="License Number" value={driver.licenseNumber} />
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Personal Information</h3>
                <DetailRow label="Date of Birth" value={driver.dateOfBirth} />
                <DetailRow label="Nationality" value={driver.nationality} />
                <DetailRow label="GPS Address" value={driver.gpsAddress} />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="transactions">
          <div className="flex flex-col gap-4 py-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium">Total Completed Transactions</h3>
              <p className="text-2xl font-bold text-green-600">
                GH₵ {filteredTransactions
                  .filter(transaction => transaction.status === "Completed")
                  .reduce((sum, transaction) => sum + (transaction.amount * 0.9), 0)
                  .toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search transactions..."
                className="max-w-sm"
                onChange={(e) => {
                  const searchTerm = e.target.value.toLowerCase();
                  const filtered = searchTerm === "" 
                    ? driverTransactions 
                    : driverTransactions.filter(transaction => 
                        Object.values(transaction)
                          .join(" ")
                          .toLowerCase()
                          .includes(searchTerm)
                      );
                  setFilteredTransactions(filtered);
                }}
              />
              <Select onValueChange={(value) => {
                const filtered = value === "all" 
                  ? driverTransactions 
                  : driverTransactions.filter(transaction => transaction.status === value);
                setFilteredTransactions(filtered);
              }}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Transactions</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Load ID</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Pickup Location</TableHead>
                  <TableHead>Delivery Location</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Agent</TableHead>
                  <TableHead>Truck</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.loadId}</TableCell>
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>{transaction.pickupLocation}</TableCell>
                    <TableCell>{transaction.deliveryLocation}</TableCell>
                    <TableCell>GH₵ {(transaction.amount * 0.9).toLocaleString()}</TableCell>
                    <TableCell>{transaction.agent?.name || 'N/A'}</TableCell>
                    <TableCell>{transaction.truck?.number || 'N/A'}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          transaction.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : transaction.status === "Pending"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { driverData } from "./data";

export default function DriverDetails({ params }: { params: { id: string } }) {
  const [driver] = useState(driverData);

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/drivers/all-drivers">
          <Button variant="ghost">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Driver Details</h1>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h2 className="font-semibold mb-2">Personal Information</h2>
            <div className="grid gap-2">
              <div className="flex justify-between p-2 bg-secondary/20 rounded">
                <span className="text-muted-foreground">Full Name</span>
                <span>{driver.fullName}</span>
              </div>
              <div className="flex justify-between p-2 bg-secondary/20 rounded">
                <span className="text-muted-foreground">Date of Birth</span>
                <span>{driver.dateOfBirth}</span>
              </div>
              <div className="flex justify-between p-2 bg-secondary/20 rounded">
                <span className="text-muted-foreground">Nationality</span>
                <span>{driver.nationality}</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Contact Information</h2>
            <div className="grid gap-2">
              <div className="flex justify-between p-2 bg-secondary/20 rounded">
                <span className="text-muted-foreground">Contact</span>
                <span>{driver.contact}</span>
              </div>
              <div className="flex justify-between p-2 bg-secondary/20 rounded">
                <span className="text-muted-foreground">Email</span>
                <span>{driver.email}</span>
              </div>
              <div className="flex justify-between p-2 bg-secondary/20 rounded">
                <span className="text-muted-foreground">GPS Address</span>
                <span>{driver.gpsAddress}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="font-semibold mb-2">Vehicle Information</h2>
            <div className="grid gap-2">
              <div className="flex justify-between p-2 bg-secondary/20 rounded">
                <span className="text-muted-foreground">License Number</span>
                <span>{driver.licenseNumber}</span>
              </div>
              <div className="flex justify-between p-2 bg-secondary/20 rounded">
                <span className="text-muted-foreground">Vehicle Type</span>
                <span>{driver.vehicleType}</span>
              </div>
              <div className="flex justify-between p-2 bg-secondary/20 rounded">
                <span className="text-muted-foreground">Vehicle Plate</span>
                <span>{driver.vehiclePlate}</span>
              </div>
              <div className="flex justify-between p-2 bg-secondary/20 rounded">
                <span className="text-muted-foreground">Experience</span>
                <span>{driver.experience}</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Status Information</h2>
            <div className="grid gap-2">
              <div className="flex justify-between p-2 bg-secondary/20 rounded">
                <span className="text-muted-foreground">Status</span>
                <span>{driver.status}</span>
              </div>
              <div className="flex justify-between p-2 bg-secondary/20 rounded">
                <span className="text-muted-foreground">Rating</span>
                <span>{driver.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
