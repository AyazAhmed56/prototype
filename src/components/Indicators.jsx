// Indicators.jsx
import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Indicators() {
  const [active, setActive] = useState("Water Level");

  // Dummy Data
  const data = [
    { month: "Jan", level: 8.1, rainfall: 45, extraction: 32, salinity: 220 },
    { month: "Feb", level: 7.8, rainfall: 20, extraction: 40, salinity: 230 },
    { month: "Mar", level: 7.5, rainfall: 10, extraction: 50, salinity: 240 },
    { month: "Apr", level: 7.2, rainfall: 5, extraction: 55, salinity: 250 },
    { month: "May", level: 6.9, rainfall: 2, extraction: 60, salinity: 260 },
    { month: "Jun", level: 7.6, rainfall: 70, extraction: 35, salinity: 210 },
    { month: "Jul", level: 8.4, rainfall: 120, extraction: 25, salinity: 190 },
  ];

  const tabs = ["Water Level", "Rainfall", "Extraction", "Salinity"];

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-6 mt-8 animate-fadeIn">
      {/* Header */}
      <h2 className="text-2xl font-bold text-teal-700 mb-4">
        📊 Groundwater Indicators
      </h2>

      {/* Tabs */}
      <div className="flex space-x-3 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              active === tab
                ? "bg-teal-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Charts */}
      <div className="h-80">
        {active === "Water Level" && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis label={{ value: "m bgl", angle: -90 }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="level"
                stroke="#00897B"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        )}

        {active === "Rainfall" && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis label={{ value: "mm", angle: -90 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="rainfall" fill="#0288D1" />
            </BarChart>
          </ResponsiveContainer>
        )}

        {active === "Extraction" && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis label={{ value: "MLD", angle: -90 }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="extraction"
                stroke="#F57C00"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        )}

        {active === "Salinity" && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis label={{ value: "ppm", angle: -90 }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="salinity"
                stroke="#C2185B"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
