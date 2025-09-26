// WaterBudget.jsx
import { useState, useEffect } from "react";

export default function WaterBudget() {
  const [usage, setUsage] = useState("");
  const [result, setResult] = useState("");
  const [showResult, setShowResult] = useState(false);

  // Load saved result if available
  useEffect(() => {
    const saved = localStorage.getItem("waterBudgetResult");
    if (saved) {
      const { usage, result } = JSON.parse(saved);
      setUsage(usage);
      setResult(result);
      setShowResult(true);
    }
  }, []);

  const handleCheck = () => {
    if (!usage) return;

    const value = Number(usage);
    let assessment = "";
    if (value < 50) assessment = "Sustainable ✅";
    else if (value <= 100) assessment = "Semi-Critical ⚠️ – Save Water!";
    else assessment = "Critical ❌ – Immediate Action Required!";

    setResult(assessment);
    setShowResult(true);

    // Save to localStorage
    localStorage.setItem(
      "waterBudgetResult",
      JSON.stringify({ usage, result: assessment })
    );
  };

  const getResultColor = () => {
    if (result.includes("Sustainable")) return "text-emerald-600";
    if (result.includes("Semi-Critical")) return "text-amber-600";
    return "text-rose-600";
  };

  const getResultBg = () => {
    if (result.includes("Sustainable")) return "bg-emerald-100";
    if (result.includes("Semi-Critical")) return "bg-amber-100";
    return "bg-rose-100";
  };

  const getResultEmoji = () => {
    if (result.includes("Sustainable")) return "💧";
    if (result.includes("Semi-Critical")) return "⚠️";
    return "🚱";
  };

  const getProgressWidth = () => {
    if (!usage) return "0%";
    const val = Math.min(Number(usage), 150);
    return `${(val / 150) * 100}%`;
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mt-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-700 via-blue-600 to-sky-500 p-6 text-white">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          💧 Water Budget Calculator
        </h2>
        <p className="mt-2 text-sm opacity-90">
          Check if your water usage is within safe groundwater limits.
        </p>
      </div>

      {/* Input Section */}
      <div className="p-6 space-y-4">
        <label htmlFor="usage" className="block text-gray-700 font-semibold">
          Daily Water Usage (liters/person)
        </label>
        <input
          id="usage"
          type="number"
          placeholder="e.g., 80"
          value={usage}
          onChange={(e) => setUsage(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
        />
        <p className="text-xs text-gray-500">
          UN recommends 50–100 L/person/day for basic needs.
        </p>

        <button
          onClick={handleCheck}
          disabled={!usage}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
            usage
              ? "bg-cyan-600 hover:bg-cyan-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Calculate Sustainability
        </button>

        {/* Result Card */}
        {showResult && (
          <div
            className={`mt-6 p-6 rounded-xl text-center shadow-md animate-popIn ${getResultBg()}`}
          >
            <div className="text-4xl mb-3">{getResultEmoji()}</div>
            <h3 className="text-xl font-bold mb-2">Water Usage Assessment</h3>
            <p className={`text-lg font-bold ${getResultColor()}`}>{result}</p>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  result.includes("Sustainable")
                    ? "bg-emerald-500"
                    : result.includes("Semi-Critical")
                    ? "bg-amber-500"
                    : "bg-rose-500"
                }`}
                style={{ width: getProgressWidth() }}
              />
            </div>

            {/* Recommendations */}
            <div className="mt-4 p-4 bg-white rounded-lg text-left shadow-sm">
              <h4 className="font-medium text-gray-800 mb-2">
                Recommendations:
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                {result.includes("Sustainable") && (
                  <>
                    <li>• Maintain current water practices</li>
                    <li>• Consider rainwater harvesting</li>
                    <li>• Share best practices in community</li>
                  </>
                )}
                {result.includes("Semi-Critical") && (
                  <>
                    <li>• Fix leaking taps/pipes</li>
                    <li>• Reduce shower time & turn off taps when unused</li>
                    <li>• Use water-efficient appliances</li>
                  </>
                )}
                {result.includes("Critical") && (
                  <>
                    <li>• Conduct a detailed water audit ASAP</li>
                    <li>• Implement water reuse & recycling systems</li>
                    <li>
                      • Adopt strict conservation measures (drip irrigation)
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        )}

        {/* Water Guidelines */}
        <div className="mt-8 bg-cyan-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-3">
            Water Usage Guidelines
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <div className="text-2xl font-bold text-emerald-700">{"<50"}</div>
              <div className="text-sm text-emerald-600">Sustainable</div>
            </div>
            <div className="p-3 bg-amber-100 rounded-lg">
              <div className="text-2xl font-bold text-amber-700">50-100</div>
              <div className="text-sm text-amber-600">Semi-Critical</div>
            </div>
            <div className="p-3 bg-rose-100 rounded-lg">
              <div className="text-2xl font-bold text-rose-700">{">100"}</div>
              <div className="text-sm text-rose-600">Critical</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
