// ComparativeAnalysis.jsx
import React, { useState, useEffect, useMemo } from "react";
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

/**
 * ComparativeAnalysis
 * - Region selector (multi-select, recommended max 2 for clean comparison)
 * - Bar / Line toggle
 * - Animated charts
 * - Dynamic insights
 * - Export CSV and Print summary
 */
export default function ComparativeAnalysis() {
  // full dataset (could be replaced by API fetch)
  const fullData = useMemo(
    () => [
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
      { region: "Solapur", recharge: 35, extraction: 80, stage: "Critical" },
      { region: "Amravati", recharge: 60, extraction: 58, stage: "Safe" },
    ],
    []
  );

  const [comparison, setComparison] = useState([]);
  const [chartType, setChartType] = useState("bar");
  const [animate, setAnimate] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState([]); // selected region names
  const [maxSelectWarning, setMaxSelectWarning] = useState(false);

  // load initial data with slight delay to show animation flag use
  useEffect(() => {
    const t = setTimeout(() => {
      setComparison(fullData.slice(0, 5));
      setSelectedRegions(fullData.slice(0, 5).map((d) => d.region));
      setAnimate(true);
    }, 300);

    return () => clearTimeout(t);
  }, [fullData]);

  // Update comparison when selectedRegions changes
  useEffect(() => {
    if (!selectedRegions || selectedRegions.length === 0) {
      setComparison(fullData.slice(0, 5));
      setMaxSelectWarning(false);
      return;
    }
    // if user selects more than 4, show warning (UI choice)
    setMaxSelectWarning(selectedRegions.length > 4);

    const filtered = fullData.filter((d) => selectedRegions.includes(d.region));
    // If none matched (like user cleared), show top 5
    setComparison(filtered.length ? filtered : fullData.slice(0, 5));
  }, [selectedRegions, fullData]);

  // Toggle a region in selection. Restrict recommended selection to 2 for side-by-side.
  const toggleRegion = (region) => {
    setSelectedRegions((prev) => {
      if (prev.includes(region)) return prev.filter((r) => r !== region);
      // allow more, but keep a friendly recommended limit of 2 (not enforced)
      return [...prev, region];
    });
  };

  // CSV Export
  function downloadCSV(data) {
    if (!data || !data.length) return;
    const header = ["Region", "Recharge (%)", "Extraction (%)", "Stage"];
    const rows = data.map((d) =>
      [d.region, d.recharge, d.extraction, d.stage].join(",")
    );
    const csvContent = [header.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "comparative_analysis.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  // Print/Export summary (opens a new window with printable content)
  function printSummary() {
    const html = `
      <html>
        <head>
          <title>Comparative Analysis - Summary</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 24px; color: #073b4c; }
            h1 { color: #0077b6; }
            table { width: 100%; border-collapse: collapse; margin-top: 12px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background: #e0f2fe; color: #034f84; }
            .insight { margin-top: 16px; padding: 8px; background: #f0f9ff; border-left: 4px solid #00b4d8; }
            .badge { display:inline-block; padding:4px 8px; border-radius:999px; font-size:12px; }
          </style>
        </head>
        <body>
          <h1>Comparative Analysis Summary</h1>
          <p>Data source: CGWB 2023</p>
          <table>
            <thead>
              <tr>
                <th>Region</th><th>Recharge (%)</th><th>Extraction (%)</th><th>Stage</th>
              </tr>
            </thead>
            <tbody>
              ${comparison
                .map(
                  (c) =>
                    `<tr>
                       <td>${c.region}</td>
                       <td>${c.recharge}</td>
                       <td>${c.extraction}</td>
                       <td>${c.stage}</td>
                     </tr>`
                )
                .join("")}
            </tbody>
          </table>

          <div class="insight">
            <h3>Insights</h3>
            <ul>
              ${comparison
                .map((c) => {
                  const risk = c.extraction > c.recharge ? "At Risk" : "Stable";
                  return `<li><strong>${c.region}</strong>: Extraction ${c.extraction}% vs Recharge ${c.recharge}% — ${risk} (${c.stage})</li>`;
                })
                .join("")}
            </ul>
          </div>

          <script>
            window.onload = () => { window.print(); };
          </script>
        </body>
      </html>
    `;
    const w = window.open("", "_blank", "noopener,noreferrer");
    if (w) {
      w.document.write(html);
      w.document.close();
    } else {
      alert("Pop-up blocked. Please allow pop-ups to use print/export.");
    }
  }

  // Custom tooltip - improved safety for undefined payloads
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // find recharge and extraction values robustly
      const rechargeItem = payload.find((p) => p.dataKey === "recharge");
      const extractionItem = payload.find((p) => p.dataKey === "extraction");
      const payloadObj = (payload[0] && payload[0].payload) || {};
      return (
        <div className="bg-white p-3 rounded-lg shadow-md border text-sm">
          <p className="font-bold text-gray-800">{label}</p>
          <p className="text-green-600">
            Recharge: {rechargeItem ? rechargeItem.value : payloadObj.recharge}%
          </p>
          <p className="text-red-600">
            Extraction:{" "}
            {extractionItem ? extractionItem.value : payloadObj.extraction}%
          </p>
          <p className="text-gray-600">Stage: {payloadObj.stage}</p>
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

      {/* Controls */}
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start mb-6">
          <div className="w-full lg:w-2/3 bg-blue-50 p-4 rounded-xl border">
            <label className="block text-sm font-medium text-blue-800 mb-2">
              Select regions (recommended: 2 for side-by-side)
            </label>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {fullData.map((d) => {
                const checked = selectedRegions.includes(d.region);
                return (
                  <button
                    key={d.region}
                    onClick={() => toggleRegion(d.region)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg border hover:shadow-sm transition-colors text-sm ${
                      checked
                        ? "bg-cyan-100 border-cyan-300 text-cyan-900"
                        : "bg-white border-gray-200 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        readOnly
                        checked={checked}
                        className="w-4 h-4"
                      />
                      <span>{d.region}</span>
                    </div>
                    <div className="text-xs">
                      <span className="mr-2 text-green-600">{d.recharge}%</span>
                      <span className="text-red-600">{d.extraction}%</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {maxSelectWarning && (
              <p className="mt-2 text-xs text-yellow-700">
                You selected many regions — charts may become crowded. Consider
                picking 2 for clear side-by-side comparison.
              </p>
            )}
          </div>

          <div className="w-full lg:w-1/3 flex flex-col gap-3">
            <div className="flex items-center justify-between space-x-2">
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

              <div className="text-sm text-gray-500">
                Data source: CGWB 2023
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => downloadCSV(comparison)}
                className="flex-1 px-4 py-2 rounded-lg border bg-white hover:bg-gray-50"
                title="Download the table as CSV"
              >
                Download CSV
              </button>
              <button
                onClick={() => printSummary()}
                className="flex-1 px-4 py-2 rounded-lg border bg-white hover:bg-gray-50"
                title="Print / Export summary"
              >
                Print / Export
              </button>
            </div>

            <div className="text-xs text-gray-600">
              Tip: choose the regions you want above, then change chart type or
              export results.
            </div>
          </div>
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
                      radius={[6, 6, 0, 0]}
                      isAnimationActive={animate}
                      animationDuration={900}
                    />
                    <Bar
                      dataKey="extraction"
                      fill="#f87171"
                      name="Extraction (%)"
                      radius={[6, 6, 0, 0]}
                      isAnimationActive={animate}
                      animationDuration={900}
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
                      isAnimationActive={animate}
                      animationDuration={900}
                    />
                    <Line
                      type="monotone"
                      dataKey="extraction"
                      stroke="#f87171"
                      name="Extraction (%)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      isAnimationActive={animate}
                      animationDuration={900}
                    />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>

            {/* Legend / quick risk bar */}
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />
                  <span>Recharge</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                  <span>Extraction</span>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                Animated: {animate ? "On" : "Off"}
              </div>
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
                    <th className="px-4 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Risk
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
                        {c.stage === "Critical" && (
                          <span
                            className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-200 text-red-800"
                            title="Critical region"
                          >
                            ⚠ Critical
                          </span>
                        )}
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
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {c.extraction > c.recharge ? (
                          <span className="px-2 py-1 rounded-full text-xs bg-red-50 text-red-800">
                            At Risk
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded-full text-xs bg-green-50 text-green-800">
                            Stable
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* dynamic insights */}
            <div className="mt-4 bg-white p-3 rounded-md border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-800 mb-2">
                Analysis Insights
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-blue-700">
                {comparison.map((c, i) => (
                  <li key={i}>
                    <strong>{c.region}</strong>: Extraction {c.extraction}% vs
                    Recharge {c.recharge}% →{" "}
                    {c.extraction > c.recharge ? (
                      <span className="font-semibold text-red-600">
                        At Risk ({c.stage})
                      </span>
                    ) : (
                      <span className="font-semibold text-green-600">
                        Stable ({c.stage})
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer small note */}
        <div className="text-xs text-gray-500">
          Note: Stages (Safe / Semi-Critical / Critical) are illustrative and
          based on provided dataset. Replace <code>fullData</code> with real
          INGRES/CGWB data for production.
        </div>
      </div>
    </div>
  );
}
