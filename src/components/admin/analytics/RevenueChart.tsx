
import React from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";

interface RevenueChartProps {
  timeframe?: "daily" | "weekly" | "monthly";
}

const dailyData = [
  { date: "Mar 21", revenue: 15000, lastYear: 12000 },
  { date: "Mar 22", revenue: 18000, lastYear: 13500 },
  { date: "Mar 23", revenue: 16000, lastYear: 14000 },
  { date: "Mar 24", revenue: 19000, lastYear: 15000 },
  { date: "Mar 25", revenue: 21000, lastYear: 16500 },
  { date: "Mar 26", revenue: 22000, lastYear: 17000 },
  { date: "Mar 27", revenue: 25000, lastYear: 18500 },
];

const weeklyData = [
  { date: "Week 1", revenue: 95000, lastYear: 82000 },
  { date: "Week 2", revenue: 105000, lastYear: 90000 },
  { date: "Week 3", revenue: 120000, lastYear: 105000 },
  { date: "Week 4", revenue: 135000, lastYear: 115000 },
];

const monthlyData = [
  { date: "Jan", revenue: 65000, lastYear: 48000 },
  { date: "Feb", revenue: 59000, lastYear: 43000 },
  { date: "Mar", revenue: 80000, lastYear: 60000 },
  { date: "Apr", revenue: 81000, lastYear: 70000 },
  { date: "May", revenue: 56000, lastYear: 45000 },
  { date: "Jun", revenue: 55000, lastYear: 40000 },
  { date: "Jul", revenue: 40000, lastYear: 35000 },
  { date: "Aug", revenue: 70000, lastYear: 55000 },
  { date: "Sep", revenue: 90000, lastYear: 70000 },
  { date: "Oct", revenue: 110000, lastYear: 85000 },
  { date: "Nov", revenue: 120000, lastYear: 90000 },
  { date: "Dec", revenue: 130000, lastYear: 95000 },
];

const RevenueChart: React.FC<RevenueChartProps> = ({ timeframe = "monthly" }) => {
  const getChartData = () => {
    switch (timeframe) {
      case "daily":
        return dailyData;
      case "weekly":
        return weeklyData;
      case "monthly":
      default:
        return monthlyData;
    }
  };

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={getChartData()}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey={timeframe === "daily" ? "date" : timeframe === "weekly" ? "date" : "date"} />
          <YAxis 
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip 
            formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} 
            labelFormatter={(label) => `${timeframe === "daily" ? "Day" : timeframe === "weekly" ? "Week" : "Month"}: ${label}`}
          />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="lastYear" 
            stackId="1" 
            stroke="#94a3b8" 
            fill="#94a3b8" 
            name="Last Year"
            fillOpacity={0.3}
          />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stackId="2" 
            stroke="#0F3460" 
            fill="#0F3460" 
            name="Current Year"
            fillOpacity={0.7}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
