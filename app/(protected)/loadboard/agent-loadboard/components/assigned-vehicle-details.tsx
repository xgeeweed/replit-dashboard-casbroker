
import { useState, useEffect } from "react";
import { DetailRow } from "../[id]/page";
import { Spinner } from "@/components/ui/spinner";
import { Truck, FileText, Phone, User } from "lucide-react";

export function AssignedVehicleDetails({ id }: { id: string }) {
  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/assigned-vehicle/${id}`)
      .then(res => res.json())
      .then(data => {
        setVehicle(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center py-4"><Spinner /></div>;

  if (!vehicle) return <p className="text-gray-500 text-sm">No vehicle assigned yet</p>;

  return (
    <>
      <DetailRow 
        icon={Truck}
        label="Truck Type" 
        value={vehicle.type || 'Not specified'} 
      />
      <DetailRow 
        icon={FileText}
        label="Plate Number" 
        value={vehicle.plateNumber || 'Not specified'} 
      />
      <DetailRow 
        icon={Phone}
        label="Driver Contact" 
        value={vehicle.driverContact || 'Not available'} 
      />
      <DetailRow 
        icon={User}
        label="Driver Name" 
        value={vehicle.driverName || 'Not assigned'} 
      />
    </>
  );
}
