
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
import { Calendar as CalendarIcon, Clock, Download, Filter, Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

// Mock activity data
const activityData = [
  {
    id: "act1",
    userId: "1",
    userName: "Alexander Johnson",
    action: "Booking",
    details: "Booked a stay at The Grand Hotel for Apr 10-15, 2025",
    timestamp: "Mar 29, 2025, 10:23 AM",
    ipAddress: "192.168.1.105",
    device: "iPhone, iOS 19.2",
  },
  {
    id: "act2",
    userId: "3",
    userName: "Michael Chen",
    action: "Service Request",
    details: "Requested room service - Breakfast",
    timestamp: "Mar 28, 2025, 9:17 PM",
    ipAddress: "192.168.1.109",
    device: "Android, Pixel 10",
  },
  {
    id: "act3",
    userId: "6",
    userName: "Olivia Martinez",
    action: "Account",
    details: "Updated payment information",
    timestamp: "Mar 28, 2025, 4:42 PM",
    ipAddress: "192.168.1.112",
    device: "MacOS, Chrome 124",
  },
  {
    id: "act4",
    userId: "2",
    userName: "Sarah Williams",
    action: "Login",
    details: "Logged in from new device",
    timestamp: "Mar 28, 2025, 11:30 AM",
    ipAddress: "192.168.1.108",
    device: "Windows 13, Firefox 126",
  },
  {
    id: "act5",
    userId: "5",
    userName: "Robert Anderson",
    action: "Admin",
    details: "Modified hotel listing - Seaside Resort",
    timestamp: "Mar 27, 2025, 3:15 PM",
    ipAddress: "192.168.1.111",
    device: "MacOS, Safari 19",
  },
  {
    id: "act6",
    userId: "1",
    userName: "Alexander Johnson",
    action: "Booking",
    details: "Modified reservation details for Sunset Inn",
    timestamp: "Mar 27, 2025, 1:48 PM",
    ipAddress: "192.168.1.105",
    device: "iPhone, iOS 19.2",
  },
  {
    id: "act7",
    userId: "3",
    userName: "Michael Chen",
    action: "Service Request",
    details: "Requested transportation to airport",
    timestamp: "Mar 27, 2025, 2:15 PM",
    ipAddress: "192.168.1.109",
    device: "Android, Pixel 10",
  },
  {
    id: "act8",
    userId: "4",
    userName: "Emily Davis",
    action: "Login",
    details: "Failed login attempt",
    timestamp: "Mar 26, 2025, 10:05 AM",
    ipAddress: "192.168.1.110",
    device: "Unknown",
  }
];

const ActivityTracking = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredActivity, setFilteredActivity] = React.useState(activityData);
  const [actionFilter, setActionFilter] = React.useState<string | null>(null);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  // Filter activities based on search term and filters
  React.useEffect(() => {
    let filtered = activityData;

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (activity) =>
          activity.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.action.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (actionFilter) {
      filtered = filtered.filter((activity) => activity.action === actionFilter);
    }

    if (date) {
      const dateStr = format(date, "MMM dd, yyyy");
      filtered = filtered.filter((activity) => 
        activity.timestamp.includes(dateStr)
      );
    }

    setFilteredActivity(filtered);
  }, [searchTerm, actionFilter, date]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setActionFilter(null);
    setDate(undefined);
  };

  const getBadgeColor = (action: string) => {
    switch (action) {
      case "Booking":
        return "bg-blue-600";
      case "Login":
        return "bg-purple-600";
      case "Admin":
        return "bg-orange-600";
      case "Service Request":
        return "bg-green-600";
      case "Account":
        return "bg-slate-600";
      default:
        return "";
    }
  };
  
  const actions = ["Booking", "Login", "Admin", "Service Request", "Account"];

  return (
    <AdminLayout currentPage="/admin/activity">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Activity Tracking</h1>
          <p className="text-slate-500">Monitor user interactions and system events</p>
        </div>
        <Button variant="outline" onClick={() => console.log("Export data")}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>
            Detailed record of user activities and system events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search activities..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[180px] justify-start">
                    <Filter className="mr-2 h-4 w-4" />
                    {actionFilter || "Filter by action"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[180px] p-0">
                  <div className="p-2">
                    {actions.map((action) => (
                      <Button
                        key={action}
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => setActionFilter(action)}
                      >
                        <Badge className={cn("mr-2", getBadgeColor(action))}>
                          &nbsp;
                        </Badge>
                        {action}
                      </Button>
                    ))}
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-slate-500"
                      onClick={() => setActionFilter(null)}
                    >
                      Clear filter
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal w-[160px]",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Filter by date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {(searchTerm || actionFilter || date) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  className="h-8 px-2 lg:px-3"
                >
                  Clear
                </Button>
              )}
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>IP / Device</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivity.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-medium">{activity.userName}</TableCell>
                    <TableCell>
                      <Badge className={getBadgeColor(activity.action)}>
                        {activity.action}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{activity.details}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-3 w-3 text-muted-foreground" />
                        <span>{activity.timestamp}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      <div>{activity.ipAddress}</div>
                      <div>{activity.device}</div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default ActivityTracking;
