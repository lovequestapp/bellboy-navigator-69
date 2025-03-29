
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
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  MoreHorizontal, 
  Search,
  Eye
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock ticket data
const ticketData = [
  {
    id: "T-10253",
    userId: "1",
    userName: "Alexander Johnson",
    subject: "Reservation date change request",
    description: "I need to change my reservation at The Grand Hotel from Apr 10-15 to Apr 12-17. Is this possible?",
    status: "open",
    priority: "medium",
    category: "booking",
    createdAt: "Mar 29, 2025, 10:30 AM",
    updatedAt: "Mar 29, 2025, 10:30 AM",
    assignedTo: null,
    responses: []
  },
  {
    id: "T-10252",
    userId: "3",
    userName: "Michael Chen",
    subject: "Room service delivery issue",
    description: "I ordered breakfast this morning but it never arrived. I had to leave for a meeting without eating.",
    status: "inProgress",
    priority: "high",
    category: "service",
    createdAt: "Mar 28, 2025, 9:20 PM",
    updatedAt: "Mar 29, 2025, 8:45 AM",
    assignedTo: "Robert Anderson",
    responses: [
      {
        from: "staff",
        name: "Robert Anderson",
        message: "I apologize for the inconvenience. I'm looking into this right now and will get back to you shortly.",
        timestamp: "Mar 29, 2025, 8:45 AM"
      }
    ]
  },
  {
    id: "T-10251",
    userId: "6",
    userName: "Olivia Martinez",
    subject: "Payment method update failed",
    description: "I tried to update my credit card information but keep getting an error message saying 'Transaction failed'.",
    status: "resolved",
    priority: "medium",
    category: "account",
    createdAt: "Mar 28, 2025, 4:50 PM",
    updatedAt: "Mar 28, 2025, 5:30 PM",
    assignedTo: "Robert Anderson",
    responses: [
      {
        from: "staff",
        name: "Robert Anderson",
        message: "Thank you for reporting this. There was a temporary issue with our payment processor. Please try again now.",
        timestamp: "Mar 28, 2025, 5:10 PM"
      },
      {
        from: "user",
        name: "Olivia Martinez",
        message: "It worked! Thank you for the quick response.",
        timestamp: "Mar 28, 2025, 5:25 PM"
      },
      {
        from: "staff",
        name: "Robert Anderson",
        message: "You're welcome! Let us know if you need anything else.",
        timestamp: "Mar 28, 2025, 5:30 PM"
      }
    ]
  },
  {
    id: "T-10249",
    userId: "2",
    userName: "Sarah Williams",
    subject: "App login issue on new phone",
    description: "I recently got a new phone and I can't log into my account. It keeps saying 'Authentication failed'.",
    status: "open",
    priority: "low",
    category: "technical",
    createdAt: "Mar 28, 2025, 11:40 AM",
    updatedAt: "Mar 28, 2025, 11:40 AM",
    assignedTo: null,
    responses: []
  },
  {
    id: "T-10247",
    userId: "4",
    userName: "Emily Davis",
    subject: "Lost item in hotel room",
    description: "I think I left my diamond earrings in the bathroom of room 508 at Sunset Inn. I checked out yesterday morning.",
    status: "inProgress",
    priority: "high",
    category: "lost",
    createdAt: "Mar 27, 2025, 10:15 AM",
    updatedAt: "Mar 27, 2025, 11:30 AM",
    assignedTo: "Robert Anderson",
    responses: [
      {
        from: "staff",
        name: "Robert Anderson",
        message: "We've notified the hotel staff to check the room. They'll contact us as soon as they have information.",
        timestamp: "Mar 27, 2025, 11:30 AM"
      }
    ]
  }
];

const SupportTickets = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredTickets, setFilteredTickets] = React.useState(ticketData);
  const [statusFilter, setStatusFilter] = React.useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = React.useState<typeof ticketData[0] | null>(null);
  const [responseText, setResponseText] = React.useState("");

  // Filter tickets based on search term and status filter
  React.useEffect(() => {
    let filtered = ticketData;

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (ticket) =>
          ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((ticket) => ticket.status === statusFilter);
    }

    setFilteredTickets(filtered);
  }, [searchTerm, statusFilter]);

  const handleViewTicket = (ticketId: string) => {
    const ticket = ticketData.find((t) => t.id === ticketId);
    if (ticket) {
      setSelectedTicket(ticket);
    }
  };

  const handleSubmitResponse = () => {
    if (!responseText.trim() || !selectedTicket) return;

    // In a real app, this would call an API
    toast({
      title: "Response sent",
      description: `Your response to ticket ${selectedTicket.id} has been sent.`,
    });

    setResponseText("");
    setSelectedTicket(null);
  };

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    // In a real app, this would call an API
    const statusText = newStatus === "resolved" ? "Resolved" : newStatus === "inProgress" ? "In Progress" : "Reopened";
    
    toast({
      title: `Ticket ${statusText}`,
      description: `Ticket ${ticketId} has been marked as ${statusText.toLowerCase()}.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Open</Badge>;
      case "inProgress":
        return <Badge className="bg-amber-500">In Progress</Badge>;
      case "resolved":
        return <Badge className="bg-green-600">Resolved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="outline" className="border-red-500 text-red-500">High</Badge>;
      case "medium":
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Medium</Badge>;
      case "low":
        return <Badge variant="outline" className="border-green-500 text-green-500">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <AdminLayout currentPage="/admin/tickets">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Support Tickets</h1>
          <p className="text-slate-500">Manage customer support requests</p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>All Tickets</CardTitle>
          <CardDescription>
            View and respond to customer support tickets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tickets..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <Button 
                variant={statusFilter === null ? "default" : "outline"} 
                size="sm"
                onClick={() => setStatusFilter(null)}
              >
                All
              </Button>
              <Button 
                variant={statusFilter === "open" ? "default" : "outline"} 
                size="sm"
                onClick={() => setStatusFilter("open")}
              >
                Open
              </Button>
              <Button 
                variant={statusFilter === "inProgress" ? "default" : "outline"} 
                size="sm"
                onClick={() => setStatusFilter("inProgress")}
              >
                In Progress
              </Button>
              <Button 
                variant={statusFilter === "resolved" ? "default" : "outline"} 
                size="sm"
                onClick={() => setStatusFilter("resolved")}
              >
                Resolved
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {ticket.subject}
                    </TableCell>
                    <TableCell>{ticket.userName}</TableCell>
                    <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                    <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-3 w-3 text-muted-foreground" />
                        <span>{ticket.createdAt}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleViewTicket(ticket.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View ticket</span>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleViewTicket(ticket.id)}>
                              View details
                            </DropdownMenuItem>
                            {ticket.status !== "inProgress" && (
                              <DropdownMenuItem onClick={() => handleStatusChange(ticket.id, "inProgress")}>
                                Mark as in progress
                              </DropdownMenuItem>
                            )}
                            {ticket.status !== "resolved" && (
                              <DropdownMenuItem onClick={() => handleStatusChange(ticket.id, "resolved")}>
                                Mark as resolved
                              </DropdownMenuItem>
                            )}
                            {ticket.status === "resolved" && (
                              <DropdownMenuItem onClick={() => handleStatusChange(ticket.id, "open")}>
                                Reopen ticket
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => toast({
                              title: "Ticket assigned",
                              description: `Ticket ${ticket.id} has been assigned to you.`,
                            })}>
                              Assign to me
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Ticket Dialog */}
      <Dialog open={!!selectedTicket} onOpenChange={(open) => !open && setSelectedTicket(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedTicket && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <DialogTitle>Ticket {selectedTicket.id}</DialogTitle>
                  {getStatusBadge(selectedTicket.status)}
                  {getPriorityBadge(selectedTicket.priority)}
                </div>
                <DialogDescription>
                  {selectedTicket.subject}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <div className="font-medium">{selectedTicket.userName}</div>
                    <div className="text-sm text-muted-foreground">{selectedTicket.createdAt}</div>
                  </div>
                  <p>{selectedTicket.description}</p>
                </div>

                {selectedTicket.responses.map((response, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-md ${
                      response.from === "staff" 
                        ? "bg-blue-50 border-l-4 border-blue-300" 
                        : "bg-slate-50"
                    }`}
                  >
                    <div className="flex justify-between mb-2">
                      <div className="font-medium">{response.name}</div>
                      <div className="text-sm text-muted-foreground">{response.timestamp}</div>
                    </div>
                    <p>{response.message}</p>
                  </div>
                ))}

                {selectedTicket.status !== "resolved" && (
                  <div className="space-y-2 pt-4">
                    <h4 className="text-sm font-medium">Your Response</h4>
                    <Textarea
                      placeholder="Type your response here..."
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      rows={4}
                    />
                  </div>
                )}
              </div>

              <DialogFooter className="gap-2 sm:gap-0">
                {selectedTicket.status !== "resolved" && (
                  <div className="flex gap-2 w-full justify-between sm:justify-end">
                    <Button
                      variant="outline"
                      onClick={() => handleStatusChange(selectedTicket.id, "resolved")}
                    >
                      Mark as Resolved
                    </Button>
                    <Button
                      onClick={handleSubmitResponse}
                      disabled={!responseText.trim()}
                    >
                      Send Response
                    </Button>
                  </div>
                )}
                {selectedTicket.status === "resolved" && (
                  <Button
                    variant="outline"
                    onClick={() => handleStatusChange(selectedTicket.id, "open")}
                  >
                    Reopen Ticket
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default SupportTickets;
