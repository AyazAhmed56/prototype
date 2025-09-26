// ComparativeAnalysis.jsx
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export default function ComparativeAnalysis() {
  const [comparison, setComparison] = useState([]);
  const [chartType, setChartType] = useState("bar");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setComparison([
        { region: "Pune", recharge: 80, extraction: 60, stage: "Safe" },
        {
          region: "Nagpur",
          recharge: 50,
          extraction: 70,
          stage: "Semi-Critical",
        },
        { region: "Mumbai", recharge: 40, extraction: 85, stage: "Critical" },
        { region: "Nashik", recharge: 70, extraction: 55, stage: "Safe" },
        {
          region: "Aurangabad",
          recharge: 45,
          extraction: 75,
          stage: "Critical",
        },
      ]);
      setAnimate(true);
    }, 300);
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-md border">
          <p className="font-bold text-gray-800">{label}</p>
          <p className="text-green-600">Recharge: {payload[0].value}%</p>
          <p className="text-red-600">Extraction: {payload[1].value}%</p>
          <p className="text-gray-600">Stage: {payload[0].payload.stage}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-6 text-white">
        <h2 className="text-2xl font-bold flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Comparative Analysis
        </h2>
        <p className="mt-2 opacity-90">
          Compare groundwater recharge and extraction across regions
        </p>
      </div>

      {/* Chart Toggle */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setChartType("bar")}
              className={`px-4 py-2 rounded-lg ${
                chartType === "bar"
                  ? "bg-cyan-100 text-cyan-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              Bar Chart
            </button>
            <button
              onClick={() => setChartType("line")}
              className={`px-4 py-2 rounded-lg ${
                chartType === "line"
                  ? "bg-cyan-100 text-cyan-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              Line Chart
            </button>
          </div>
          <div className="text-sm text-gray-500">Data source: CGWB 2023</div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl shadow-sm hover:shadow-cyan-200 transition-all">
            <h3 className="font-semibold text-gray-800 mb-4">
              Recharge vs Extraction
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === "bar" ? (
                  <BarChart
                    data={comparison}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar
                      dataKey="recharge"
                      fill="#34d399"
                      name="Recharge (%)"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="extraction"
                      fill="#f87171"
                      name="Extraction (%)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                ) : (
                  <LineChart
                    data={comparison}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="recharge"
                      stroke="#34d399"
                      name="Recharge (%)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="extraction"
                      stroke="#f87171"
                      name="Extraction (%)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl shadow-sm hover:shadow-cyan-200 transition-all">
            <h3 className="font-semibold text-gray-800 mb-4">Data Summary</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Region
                    </th>
                    <th className="px-4 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recharge (%)
                    </th>
                    <th className="px-4 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Extraction (%)
                    </th>
                    <th className="px-4 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stage
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {comparison.map((c, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {c.region}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600">
                        {c.recharge}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600">
                        {c.extraction}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            c.stage === "Safe"
                              ? "bg-green-100 text-green-800"
                              : c.stage === "Semi-Critical"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {c.stage}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
          <h4 className="font-semibold text-blue-800 mb-2">
            Analysis Insights
          </h4>
          <p className="text-sm text-blue-700">
            Regions with extraction rates higher than recharge are at risk of
            groundwater depletion. Sustainable management practices are
            recommended for critical and semi-critical regions.
          </p>
        </div>
      </div>
    </div>
  );
}
