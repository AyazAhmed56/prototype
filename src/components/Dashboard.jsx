// Dashboard.jsx
import { useState } from "react";

export default function Dashboard() {
  const [selectedState, setSelectedState] = useState(null);

  const data = [
    {
      state: "Maharashtra",
      safe: 50,
      semiCritical: 30,
      critical: 20,
      trend: "improving",
    },
    {
      state: "Karnataka",
      safe: 40,
      semiCritical: 40,
      critical: 20,
      trend: "stable",
    },
    {
      state: "Tamil Nadu",
      safe: 60,
      semiCritical: 25,
      critical: 15,
      trend: "improving",
    },
    {
      state: "Uttar Pradesh",
      safe: 35,
      semiCritical: 35,
      critical: 30,
      trend: "worsening",
    },
    {
      state: "Gujarat",
      safe: 55,
      semiCritical: 30,
      critical: 15,
      trend: "stable",
    },
    {
      state: "West Bengal",
      safe: 45,
      semiCritical: 30,
      critical: 25,
      trend: "stable",
    },
  ];

  const handleExportExcel = () => {
    // In a real app, this would use a library like xlsx
    alert("Exporting to Excel...");
  };

  const handleExportPDF = () => {
    // In a real app, this would use a library like jspdf
    alert("Exporting to PDF...");
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "improving":
        return "📈";
      case "worsening":
        return "📉";
      default:
        return "↔️";
    }
  };

  const getStatusColor = (value, type) => {
    if (type === "safe")
      return value >= 50
        ? "bg-green-500"
        : value >= 40
        ? "bg-green-400"
        : "bg-green-300";
    if (type === "semiCritical")
      return value >= 40
        ? "bg-yellow-500"
        : value >= 30
        ? "bg-yellow-400"
        : "bg-yellow-300";
    if (type === "critical")
      return value >= 30
        ? "bg-red-500"
        : value >= 20
        ? "bg-red-400"
        : "bg-red-300";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Policy Decision Maker Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor and analyze state-wise criticality metrics
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Total States
            </h3>
            <div className="text-4xl font-bold text-indigo-600">
              {data.length}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              States being monitored
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Average Safe Areas
            </h3>
            <div className="text-4xl font-bold text-green-600">
              {Math.round(
                data.reduce((sum, item) => sum + item.safe, 0) / data.length
              )}
              %
            </div>
            <div className="text-sm text-gray-500 mt-2">Across all states</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Critical Alert
            </h3>
            <div className="text-4xl font-bold text-red-600">
              {data.filter((item) => item.critical >= 25).length}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              States needing attention
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              State-wise Criticality Metrics
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={handleExportExcel}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
              >
                <span className="mr-2">📊</span> Export Excel
              </button>
              <button
                onClick={handleExportPDF}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center"
              >
                <span className="mr-2">📄</span> Export PDF
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    State
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Safe (%)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Semi-Critical (%)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Critical (%)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((d, i) => (
                  <tr
                    key={i}
                    className={`hover:bg-blue-50 cursor-pointer transition-colors ${
                      selectedState === d.state ? "bg-blue-100" : ""
                    }`}
                    onClick={() =>
                      setSelectedState(
                        d.state === selectedState ? null : d.state
                      )
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {d.state}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                          <div
                            className={`h-2.5 rounded-full ${getStatusColor(
                              d.safe,
                              "safe"
                            )}`}
                            style={{ width: `${d.safe}%` }}
                          ></div>
                        </div>
                        {d.safe}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                          <div
                            className={`h-2.5 rounded-full ${getStatusColor(
                              d.semiCritical,
                              "semiCritical"
                            )}`}
                            style={{ width: `${d.semiCritical}%` }}
                          ></div>
                        </div>
                        {d.semiCritical}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                          <div
                            className={`h-2.5 rounded-full ${getStatusColor(
                              d.critical,
                              "critical"
                            )}`}
                            style={{ width: `${d.critical}%` }}
                          ></div>
                        </div>
                        {d.critical}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-2xl">
                      {getTrendIcon(d.trend)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedState && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 animate-fadeIn">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Detailed View: {selectedState}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data
                .filter((d) => d.state === selectedState)
                .map((d, i) => (
                  <>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">
                        Safe Areas
                      </h4>
                      <div className="text-3xl font-bold text-green-600">
                        {d.safe}%
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div
                          className="h-2.5 rounded-full bg-green-500"
                          style={{ width: `${d.safe}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-medium text-yellow-800 mb-2">
                        Semi-Critical Areas
                      </h4>
                      <div className="text-3xl font-bold text-yellow-600">
                        {d.semiCritical}%
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div
                          className="h-2.5 rounded-full bg-yellow-500"
                          style={{ width: `${d.semiCritical}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-medium text-red-800 mb-2">
                        Critical Areas
                      </h4>
                      <div className="text-3xl font-bold text-red-600">
                        {d.critical}%
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div
                          className="h-2.5 rounded-full bg-red-500"
                          style={{ width: `${d.critical}%` }}
                        ></div>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Criticality Distribution
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.map((d, i) => (
              <div key={i}>
                <h4 className="font-medium text-gray-700 mb-2">{d.state}</h4>
                <div className="flex h-6 rounded-full overflow-hidden shadow-inner">
                  <div
                    className="bg-green-500 transition-all duration-500"
                    style={{ width: `${d.safe}%` }}
                    title={`Safe: ${d.safe}%`}
                  ></div>
                  <div
                    className="bg-yellow-500 transition-all duration-500"
                    style={{ width: `${d.semiCritical}%` }}
                    title={`Semi-Critical: ${d.semiCritical}%`}
                  ></div>
                  <div
                    className="bg-red-500 transition-all duration-500"
                    style={{ width: `${d.critical}%` }}
                    title={`Critical: ${d.critical}%`}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>Safe: {d.safe}%</span>
                  <span>Semi: {d.semiCritical}%</span>
                  <span>Critical: {d.critical}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
