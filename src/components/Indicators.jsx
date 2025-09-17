import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

export default function Indicators() {
  const data = [
    { year: "2023", recharge: 100, extraction: 63 },
    { year: "2024", recharge: 90, extraction: 70 },
  ];

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-teal-700 mb-4">
        Groundwater Indicators
      </h2>
      <BarChart width={400} height={300} data={data}>
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="recharge" fill="#4CAF50" />
        <Bar dataKey="extraction" fill="#F44336" />
      </BarChart>
      <div className="mt-4">
        <p>
          ✅ Groundwater extraction is <b>63%</b> of available resources →{" "}
          <span className="text-green-600">Safe</span>.
        </p>
        <p>📉 Trend: Slight increase in extraction compared to last year.</p>
      </div>
    </div>
  );
}
