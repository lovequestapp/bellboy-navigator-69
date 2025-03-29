
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

const data = [
  { month: "Jan", revenue: 65000, lastYear: 48000 },
  { month: "Feb", revenue: 59000, lastYear: 43000 },
  { month: "Mar", revenue: 80000, lastYear: 60000 },
  { month: "Apr", revenue: 81000, lastYear: 70000 },
  { month: "May", revenue: 56000, lastYear: 45000 },
  { month: "Jun", revenue: 55000, lastYear: 40000 },
  { month: "Jul", revenue: 40000, lastYear: 35000 },
  { month: "Aug", revenue: 70000, lastYear: 55000 },
  { month: "Sep", revenue: 90000, lastYear: 70000 },
  { month: "Oct", revenue: 110000, lastYear: 85000 },
  { month: "Nov", revenue: 120000, lastYear: 90000 },
  { month: "Dec", revenue: 130000, lastYear: 95000 },
];

const RevenueChart = () => {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="month" />
          <YAxis 
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip 
            formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} 
            labelFormatter={(label) => `Month: ${label}`}
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
