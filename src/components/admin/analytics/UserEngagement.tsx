
import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const dailyData = [
  { date: "Mar 22", pageViews: 1400, sessions: 240, avgDuration: 3.2 },
  { date: "Mar 23", pageViews: 1600, sessions: 280, avgDuration: 3.5 },
  { date: "Mar 24", pageViews: 1000, sessions: 200, avgDuration: 2.8 },
  { date: "Mar 25", pageViews: 1200, sessions: 240, avgDuration: 3.1 },
  { date: "Mar 26", pageViews: 1800, sessions: 320, avgDuration: 3.8 },
  { date: "Mar 27", pageViews: 2400, sessions: 380, avgDuration: 4.2 },
  { date: "Mar 28", pageViews: 1800, sessions: 310, avgDuration: 3.7 },
  { date: "Mar 29", pageViews: 1900, sessions: 330, avgDuration: 3.9 },
];

const weeklyData = [
  { date: "Week 1", pageViews: 8400, sessions: 1470, avgDuration: 3.4 },
  { date: "Week 2", pageViews: 7800, sessions: 1380, avgDuration: 3.2 },
  { date: "Week 3", pageViews: 9200, sessions: 1620, avgDuration: 3.6 },
  { date: "Week 4", pageViews: 11200, sessions: 1880, avgDuration: 3.9 },
];

const monthlyData = [
  { date: "Nov 2024", pageViews: 32000, sessions: 5400, avgDuration: 3.1 },
  { date: "Dec 2024", pageViews: 35000, sessions: 5800, avgDuration: 3.2 },
  { date: "Jan 2025", pageViews: 28000, sessions: 4900, avgDuration: 2.9 },
  { date: "Feb 2025", pageViews: 34000, sessions: 5600, avgDuration: 3.3 },
  { date: "Mar 2025", pageViews: 42000, sessions: 6700, avgDuration: 3.7 },
];

const UserEngagement = () => {
  const [timeframe, setTimeframe] = React.useState("daily");
  const [metric, setMetric] = React.useState("pageViews");

  const getDataByTimeframe = () => {
    switch (timeframe) {
      case "daily":
        return dailyData;
      case "weekly":
        return weeklyData;
      case "monthly":
        return monthlyData;
      default:
        return dailyData;
    }
  };

  const getMetricName = () => {
    switch (metric) {
      case "pageViews":
        return "Page Views";
      case "sessions":
        return "Sessions";
      case "avgDuration":
        return "Avg. Session Duration";
      default:
        return "Page Views";
    }
  };

  const getMetricColor = () => {
    switch (metric) {
      case "pageViews":
        return "#0F3460";
      case "sessions":
        return "#1A97F5";
      case "avgDuration":
        return "#7352F5";
      default:
        return "#0F3460";
    }
  };

  const formatYAxis = (value: number) => {
    if (metric === "avgDuration") {
      return `${value} min`;
    }
    return value >= 1000 ? `${value / 1000}k` : value;
  };

  const formatTooltip = (value: number) => {
    if (metric === "avgDuration") {
      return [`${value} min`, 'Avg. Duration'];
    }
    return [`${value.toLocaleString()}`, getMetricName()];
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div className="flex space-x-2 items-center">
          <span className="text-sm text-gray-500">Metric:</span>
          <Select value={metric} onValueChange={setMetric}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pageViews">Page Views</SelectItem>
              <SelectItem value="sessions">Sessions</SelectItem>
              <SelectItem value="avgDuration">Avg. Duration</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex space-x-2 items-center">
          <span className="text-sm text-gray-500">Timeframe:</span>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={getDataByTimeframe()}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="date" />
            <YAxis 
              tickFormatter={formatYAxis}
            />
            <Tooltip 
              formatter={(value: number) => formatTooltip(value)}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey={metric}
              stroke={getMetricColor()}
              activeDot={{ r: 8 }}
              name={getMetricName()}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserEngagement;
