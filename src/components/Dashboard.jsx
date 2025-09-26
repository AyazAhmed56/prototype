// Dashboard.jsx
import React, { useMemo, useState } from "react";
import Indicators from "./Indicators";
import WaterBudget from "./WaterBudget";
/**
 * Dashboard.jsx
 * - Policy Decision Maker Dashboard (enhanced)
 * - Exports: CSV, JSON, Print-friendly summary
 * - Search, sort, select state for detailed view
 * - Groundwater theme: sea blues + white
 *
 * Note: Replace `initialData` with API/INGRES data for production.
 */

export default function Dashboard() {
  const initialData = useMemo(
    () => [
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
    ],
    []
  );

  const [data, setData] = useState(initialData);
  const [selectedState, setSelectedState] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState({ key: "state", dir: "asc" });

  // Exports
  const downloadCSV = (rows) => {
    if (!rows || !rows.length) return;
    const header = [
      "State",
      "Safe (%)",
      "Semi-Critical (%)",
      "Critical (%)",
      "Trend",
    ];
    const lines = rows.map((r) =>
      [r.state, r.safe, r.semiCritical, r.critical, r.trend].join(",")
    );
    const csv = [header.join(","), ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "state_criticality.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadJSON = (rows) => {
    const str = JSON.stringify(rows, null, 2);
    const blob = new Blob([str], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "state_criticality.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const printSummary = () => {
    // simple printable HTML; replace with prettier template as needed
    const html = `
      <html>
        <head>
          <title>Policy Dashboard - Summary</title>
          <style>
            body { font-family: Inter, Arial, sans-serif; padding: 20px; color: #083344;}
            h1 { color: #0077b6; }
            table { width: 100%; border-collapse: collapse; margin-top: 12px; }
            th, td { border: 1px solid #e6eef3; padding: 8px; text-align: left; }
            th { background: #e8f8ff; color: #034f84; }
            .badge { padding: 4px 8px; border-radius: 999px; font-size: 12px; }
            .note { margin-top: 12px; color: #555; font-size: 13px; }
          </style>
        </head>
        <body>
          <h1>Policy Decision Maker Dashboard - Summary</h1>
          <p>Generated: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr><th>State</th><th>Safe (%)</th><th>Semi-Critical (%)</th><th>Critical (%)</th><th>Trend</th></tr>
            </thead>
            <tbody>
              ${data
                .map(
                  (r) =>
                    `<tr>
                      <td>${r.state}</td>
                      <td>${r.safe}%</td>
                      <td>${r.semiCritical}%</td>
                      <td>${r.critical}%</td>
                      <td>${r.trend}</td>
                    </tr>`
                )
                .join("")}
            </tbody>
          </table>
          <p class="note">Note: Stages and percentages are illustrative. Replace with INGRES/CGWB API for production accuracy.</p>
          <script>window.onload = () => window.print();</script>
        </body>
      </html>
    `;
    const w = window.open("", "_blank", "noopener,noreferrer");
    if (w) {
      w.document.write(html);
      w.document.close();
    } else {
      alert("Pop-up blocked. Please allow pop-ups for print/export.");
    }
  };

  // Utilities
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

  // Tailwind color classes for status bars
  const getStatusColor = (value, type) => {
    if (type === "safe") {
      return value >= 50
        ? "bg-green-500"
        : value >= 40
        ? "bg-green-400"
        : "bg-green-300";
    }
    if (type === "semiCritical") {
      return value >= 40
        ? "bg-yellow-500"
        : value >= 30
        ? "bg-yellow-400"
        : "bg-yellow-300";
    }
    if (type === "critical") {
      return value >= 30
        ? "bg-red-500"
        : value >= 20
        ? "bg-red-400"
        : "bg-red-300";
    }
    return "bg-gray-300";
  };

  // filter + sort
  const visibleData = useMemo(() => {
    const filtered = data.filter((d) =>
      d.state.toLowerCase().includes(search.trim().toLowerCase())
    );
    const sorted = filtered.sort((a, b) => {
      const key = sortBy.key;
      const dir = sortBy.dir === "asc" ? 1 : -1;
      if (typeof a[key] === "string") return a[key].localeCompare(b[key]) * dir;
      return (a[key] - b[key]) * dir;
    });
    return sorted;
  }, [data, search, sortBy]);

  const toggleSort = (key) => {
    setSortBy((s) => {
      if (s.key === key) {
        return { key, dir: s.dir === "asc" ? "desc" : "asc" };
      }
      return { key, dir: "asc" };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Policy Decision Maker Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor and analyze state-wise criticality metrics
          </p>
        </div>

        {/* Top KPIs */}
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

        {/* Controls: search + exports */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="flex items-center gap-3 w-full md:w-1/2">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search state..."
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-300"
              aria-label="Search states"
            />
            <button
              onClick={() => {
                setSearch("");
              }}
              className="px-3 py-2 bg-white border rounded-lg shadow-sm"
              aria-label="Clear search"
            >
              Clear
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => downloadCSV(visibleData)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
            >
              <span className="mr-2">📊</span> CSV
            </button>
            <button
              onClick={() => downloadJSON(visibleData)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
            >
              <span className="mr-2">🗂️</span> JSON
            </button>
            <button
              onClick={() => printSummary()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
            >
              <span className="mr-2">🖨️</span> Print / Export
            </button>
          </div>
        </div>

        {/* Table card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              State-wise Criticality Metrics
            </h2>
            <div className="text-sm text-gray-500">
              Showing {visibleData.length} of {data.length}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => toggleSort("state")}
                    role="button"
                    tabIndex={0}
                  >
                    State{" "}
                    {sortBy.key === "state" &&
                      (sortBy.dir === "asc" ? "▲" : "▼")}
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => toggleSort("safe")}
                    role="button"
                    tabIndex={0}
                  >
                    Safe (%){" "}
                    {sortBy.key === "safe" &&
                      (sortBy.dir === "asc" ? "▲" : "▼")}
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => toggleSort("semiCritical")}
                    role="button"
                    tabIndex={0}
                  >
                    Semi-Critical (%){" "}
                    {sortBy.key === "semiCritical" &&
                      (sortBy.dir === "asc" ? "▲" : "▼")}
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => toggleSort("critical")}
                    role="button"
                    tabIndex={0}
                  >
                    Critical (%){" "}
                    {sortBy.key === "critical" &&
                      (sortBy.dir === "asc" ? "▲" : "▼")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trend
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {visibleData.map((d, i) => (
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
                        <div className="w-36 bg-gray-200 rounded-full h-2.5 mr-3">
                          <div
                            className={`h-2.5 rounded-full ${getStatusColor(
                              d.safe,
                              "safe"
                            )}`}
                            style={{ width: `${d.safe}%` }}
                            aria-hidden
                          />
                        </div>
                        <div className="text-sm text-gray-700">{d.safe}%</div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-36 bg-gray-200 rounded-full h-2.5 mr-3">
                          <div
                            className={`h-2.5 rounded-full ${getStatusColor(
                              d.semiCritical,
                              "semiCritical"
                            )}`}
                            style={{ width: `${d.semiCritical}%` }}
                            aria-hidden
                          />
                        </div>
                        <div className="text-sm text-gray-700">
                          {d.semiCritical}%
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-36 bg-gray-200 rounded-full h-2.5 mr-3">
                          <div
                            className={`h-2.5 rounded-full ${getStatusColor(
                              d.critical,
                              "critical"
                            )}`}
                            style={{ width: `${d.critical}%` }}
                            aria-hidden
                          />
                        </div>
                        <div className="text-sm text-gray-700">
                          {d.critical}%
                        </div>
                      </div>
                    </td>

                    <td
                      className="px-6 py-4 whitespace-nowrap text-2xl"
                      aria-label={`Trend ${d.trend}`}
                    >
                      {getTrendIcon(d.trend)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected State Detailed View */}
        {selectedState && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 animate-fadeIn">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Detailed View: {selectedState}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data
                .filter((d) => d.state === selectedState)
                .map((d, idx) => (
                  <React.Fragment key={idx}>
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
                        />
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
                        />
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
                        />
                      </div>
                    </div>
                  </React.Fragment>
                ))}
            </div>
          </div>
        )}

        {/* Criticality Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Criticality Distribution
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.map((d, i) => (
              <div key={i}>
                <h4 className="font-medium text-gray-700 mb-2">{d.state}</h4>
                <div
                  className="flex h-6 rounded-full overflow-hidden shadow-inner"
                  role="img"
                  aria-label={`Distribution for ${d.state}`}
                >
                  <div
                    className="bg-green-500 transition-all duration-500"
                    style={{ width: `${d.safe}%` }}
                    title={`Safe: ${d.safe}%`}
                  />
                  <div
                    className="bg-yellow-500 transition-all duration-500"
                    style={{ width: `${d.semiCritical}%` }}
                    title={`Semi-Critical: ${d.semiCritical}%`}
                  />
                  <div
                    className="bg-red-500 transition-all duration-500"
                    style={{ width: `${d.critical}%` }}
                    title={`Critical: ${d.critical}%`}
                  />
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
      {/* Indicators Section */}
      <Indicators />

      {/* Water Budget Integration */}
      <WaterBudget />
    </div>
  );
}
