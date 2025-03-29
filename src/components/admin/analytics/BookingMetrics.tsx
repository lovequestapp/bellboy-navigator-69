
import React, { useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

interface BookingMetricsProps {
  timeframe?: "daily" | "weekly" | "monthly";
}

const dailyData = [
  {
    name: "Direct",
    completed: 84,
    abandoned: 12,
    conversionRate: 87.5
  },
  {
    name: "Mobile App",
    completed: 120,
    abandoned: 15,
    conversionRate: 88.9
  },
  {
    name: "Partners",
    completed: 65,
    abandoned: 25,
    conversionRate: 72.2
  },
  {
    name: "Social",
    completed: 40,
    abandoned: 15,
    conversionRate: 72.7
  },
  {
    name: "SEO",
    completed: 35,
    abandoned: 8,
    conversionRate: 81.4
  }
];

const weeklyData = [
  {
    name: "Direct",
    completed: 210,
    abandoned: 32,
    conversionRate: 86.8
  },
  {
    name: "Mobile App",
    completed: 340,
    abandoned: 45,
    conversionRate: 88.3
  },
  {
    name: "Partners",
    completed: 190,
    abandoned: 50,
    conversionRate: 79.2
  },
  {
    name: "Social",
    completed: 120,
    abandoned: 40,
    conversionRate: 75.0
  },
  {
    name: "SEO",
    completed: 100,
    abandoned: 20,
    conversionRate: 83.3
  }
];

const monthlyData = [
  {
    name: "Direct",
    completed: 340,
    abandoned: 52,
    conversionRate: 86.7
  },
  {
    name: "Mobile App",
    completed: 580,
    abandoned: 75,
    conversionRate: 88.5
  },
  {
    name: "Partners",
    completed: 450,
    abandoned: 120,
    conversionRate: 78.9
  },
  {
    name: "Social",
    completed: 280,
    abandoned: 90,
    conversionRate: 75.7
  },
  {
    name: "SEO",
    completed: 190,
    abandoned: 40,
    conversionRate: 82.6
  }
];

const BookingMetrics: React.FC<BookingMetricsProps> = ({ timeframe = "monthly" }) => {
  const [activeMetric, setActiveMetric] = useState<"bookings" | "conversion">("bookings");

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
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveMetric("bookings")}
          className={`px-4 py-2 text-sm rounded-full ${
            activeMetric === "bookings" 
              ? "bg-slate-900 text-white" 
              : "bg-slate-200 text-slate-700 hover:bg-slate-300"
          }`}
        >
          Booking Volume
        </button>
        <button
          onClick={() => setActiveMetric("conversion")}
          className={`px-4 py-2 text-sm rounded-full ${
            activeMetric === "conversion" 
              ? "bg-slate-900 text-white" 
              : "bg-slate-200 text-slate-700 hover:bg-slate-300"
          }`}
        >
          Conversion Rate
        </button>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {activeMetric === "bookings" ? (
            <BarChart
              data={getChartData()}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [value, value === "abandoned" ? "Abandoned Bookings" : "Completed Bookings"]}
                labelFormatter={(label) => `Channel: ${label}`}
              />
              <Legend />
              <Bar name="Completed Bookings" dataKey="completed" stackId="a" fill="#0F3460" />
              <Bar name="Abandoned Bookings" dataKey="abandoned" stackId="a" fill="#E94560" />
            </BarChart>
          ) : (
            <BarChart
              data={getChartData()}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Conversion Rate']}
                labelFormatter={(label) => `Channel: ${label}`}
              />
              <Bar name="Conversion Rate" dataKey="conversionRate" fill="#4CAF50" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BookingMetrics;
