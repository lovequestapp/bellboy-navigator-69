
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Search, UserPlus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";

// Mock user data
const mockUsers = [
  {
    id: "1",
    name: "Alexander Johnson",
    email: "alex.johnson@example.com",
    memberSince: "March 2022",
    status: "active",
    tier: "Gold Member",
    lastActive: "Today, 10:23 AM",
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    memberSince: "January 2023",
    status: "active",
    tier: "Silver Member",
    lastActive: "Yesterday, 5:47 PM",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael.c@example.com",
    memberSince: "July 2024",
    status: "active",
    tier: "Standard",
    lastActive: "Mar 27, 2025, 2:15 PM",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    memberSince: "May 2023",
    status: "inactive",
    tier: "Silver Member",
    lastActive: "Feb 12, 2025, 8:30 AM",
  },
  {
    id: "5",
    name: "Robert Anderson",
    email: "r.anderson@example.com",
    memberSince: "August 2024",
    status: "active",
    tier: "Admin",
    lastActive: "Today, 9:05 AM",
  },
  {
    id: "6",
    name: "Olivia Martinez",
    email: "o.martinez@example.com",
    memberSince: "October 2022",
    status: "active",
    tier: "Gold Member",
    lastActive: "Mar 28, 2025, 4:42 PM",
  },
];

const UserProfiles = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredUsers, setFilteredUsers] = React.useState(mockUsers);
  const [isAddUserOpen, setIsAddUserOpen] = React.useState(false);

  // Filter users based on search term
  React.useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(mockUsers);
    } else {
      const filtered = mockUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.tier.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm]);

  // Form for adding a new user
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      tier: "Standard",
    },
  });

  const onSubmit = (data: any) => {
    // In a real app, this would call an API
    console.log("New user:", data);
    
    toast({
      title: "User created",
      description: `${data.name} has been added successfully.`,
    });
    
    setIsAddUserOpen(false);
    form.reset();
  };

  const handleUserAction = (action: string, userId: string) => {
    const user = mockUsers.find((u) => u.id === userId);
    
    if (action === "edit") {
      toast({
        title: "Edit user",
        description: `Editing ${user?.name}'s profile.`,
      });
    } else if (action === "disable") {
      toast({
        title: "Account disabled",
        description: `${user?.name}'s account has been disabled.`,
      });
    } else if (action === "delete") {
      toast({
        title: "Account deleted",
        description: `${user?.name}'s account has been deleted.`,
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout currentPage="/admin/users">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">User Profiles</h1>
          <p className="text-slate-500">Manage user accounts and permissions</p>
        </div>
        <Button 
          onClick={() => setIsAddUserOpen(true)}
          className="mt-4 sm:mt-0"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            A list of all users registered in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Role/Tier</TableHead>
                  <TableHead>Member Since</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={user.status === "active" ? "default" : "secondary"}
                        className={user.status === "active" ? "bg-green-600" : ""}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={user.tier === "Admin" ? "border-orange-500 text-orange-500" : ""}
                      >
                        {user.tier}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.memberSince}</TableCell>
                    <TableCell>{user.lastActive}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleUserAction("view", user.id)}>
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUserAction("edit", user.id)}>
                            Edit user
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleUserAction("disable", user.id)}
                            className="text-amber-600"
                          >
                            Disable account
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleUserAction("delete", user.id)}
                            className="text-red-600"
                          >
                            Delete user
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account with the appropriate permissions
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role/Tier</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Gold Member">Gold Member</SelectItem>
                        <SelectItem value="Silver Member">Silver Member</SelectItem>
                        <SelectItem value="Standard">Standard</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Create User</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default UserProfiles;
