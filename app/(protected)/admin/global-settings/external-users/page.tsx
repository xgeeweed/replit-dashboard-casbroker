"use client";
import { Spinner } from "@/components/ui/spinner";
import { basicErrorToast } from "@/components/toast";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, User, Search, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

type ExternalUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  status: "Active" | "Inactive" | "Pending";
  dateAdded: string;
};

export default function ExternalUsersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<ExternalUser | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [users, setUsers] = useState<ExternalUser[]>([
    {
      id: "1",
      name: "Kwame Owusu",
      email: "k.owusu@example.com",
      role: "Supplier",
      company: "Accra Supplies Ltd",
      status: "Active",
      dateAdded: "2024-01-15"
    },
    {
      id: "2",
      name: "Abena Mensah",
      email: "a.mensah@example.com",
      role: "Customer",
      company: "Kumasi Traders Co",
      status: "Pending",
      dateAdded: "2024-01-10"
    },
  ]);

  const [newUser, setNewUser] = useState<Partial<ExternalUser>>({
    name: "",
    email: "",
    role: "",
    company: "",
    status: "Pending",
    dateAdded: new Date().toISOString().split('T')[0]
  });

  const handleAddUser = () => {
    setIsLoading(true);
    setTimeout(() => {
      const userToAdd = {
        ...newUser,
        id: (users.length + 1).toString(),
      } as ExternalUser;
      
      setUsers([...users, userToAdd]);
      setShowAddModal(false);
      setNewUser({
        name: "",
        email: "",
        role: "",
        company: "",
        status: "Pending",
        dateAdded: new Date().toISOString().split('T')[0]
      });
      toast.success("External user added successfully!");
      setIsLoading(false);
    }, 1000);
  };

  const handleRemoveUser = (userId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setUsers(users.filter(user => user.id !== userId));
      setShowDetailModal(false);
      setShowDeleteConfirm(false);
      toast.success("External user removed successfully!");
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">External Users</h1>
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add External User</DialogTitle>
              <DialogDescription>
                Enter the details of the external user below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  placeholder="e.g. Kwame Owusu"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  placeholder="e.g. k.owusu@example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select 
                  value={newUser.role} 
                  onValueChange={(value) => setNewUser({...newUser, role: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select user role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Supplier">Supplier</SelectItem>
                    <SelectItem value="Customer">Customer</SelectItem>
                    <SelectItem value="Partner">Partner</SelectItem>
                    <SelectItem value="Contractor">Contractor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={newUser.company}
                  onChange={(e) => setNewUser({...newUser, company: e.target.value})}
                  placeholder="Enter company name"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddUser}>Add User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => {
              setSelectedUser(user);
              setShowDetailModal(true);
            }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <User className="h-8 w-8 text-gray-600" />
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm">Company: {user.company}</p>
              <p className="text-sm">Role: {user.role}</p>
              <div className={`mt-2 inline-block px-2 py-1 rounded-full text-sm
                ${user.status === 'Active' ? 'bg-green-100 text-green-800' :
                  user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'}`}>
                {user.status}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* User Detail Modal */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>External User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                <p className="font-semibold">Name:</p>
                <p>{selectedUser.name}</p>
                <p className="font-semibold">Email:</p>
                <p>{selectedUser.email}</p>
                <p className="font-semibold">Role:</p>
                <p>{selectedUser.role}</p>
                <p className="font-semibold">Company:</p>
                <p>{selectedUser.company}</p>
                <p className="font-semibold">Status:</p>
                <p>{selectedUser.status}</p>
                <p className="font-semibold">Date Added:</p>
                <p>{selectedUser.dateAdded}</p>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button
                  variant="destructive"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove User
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this external user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => selectedUser && handleRemoveUser(selectedUser.id)}>
              Remove User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
