
import React from "react";
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

const data = [
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

const BookingMetrics = () => {
  const [activeMetric, setActiveMetric] = React.useState<"bookings" | "conversion">("bookings");

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
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
              data={data}
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
              <Tooltip />
              <Legend />
              <Bar name="Completed Bookings" dataKey="completed" stackId="a" fill="#0F3460" />
              <Bar name="Abandoned Bookings" dataKey="abandoned" stackId="a" fill="#E94560" />
            </BarChart>
          ) : (
            <BarChart
              data={data}
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
              <Tooltip formatter={(value) => [`${value}%`, 'Conversion Rate']} />
              <Bar name="Conversion Rate" dataKey="conversionRate" fill="#4CAF50" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BookingMetrics;
