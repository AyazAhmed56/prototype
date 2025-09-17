// WaterBudget.jsx
import { useState } from "react";

export default function WaterBudget() {
  const [usage, setUsage] = useState("");
  const [result, setResult] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleCheck = () => {
    if (!usage) return;

    if (usage < 50) setResult("Sustainable ✅");
    else if (usage < 100) setResult("Semi-Critical ⚠️ - Save Water!");
    else setResult("Critical ❌ - Immediate action required!");

    setShowResult(true);
  };

  const getResultColor = () => {
    if (result.includes("Sustainable")) return "text-green-600";
    if (result.includes("Semi-Critical")) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-6 animate-fadeIn">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Water Budget Calculator
        </h2>
        <p className="mt-2 opacity-90">
          Calculate your water usage sustainability score
        </p>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="usage"
          >
            Daily Water Usage (liters per person)
          </label>
          <input
            id="usage"
            type="number"
            placeholder="Enter water usage (liters/day)"
            value={usage}
            onChange={(e) => setUsage(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
          <p className="text-sm text-gray-500 mt-2">
            UN recommends 50-100 liters per person per day
          </p>
        </div>

        <button
          onClick={handleCheck}
          disabled={!usage}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${
            usage
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Calculate Sustainability
        </button>

        {showResult && (
          <div
            className={`mt-6 p-6 rounded-lg text-center animate-popIn ${getResultColor().replace(
              "text",
              "bg"
            )} bg-opacity-10`}
          >
            <div className="text-4xl mb-3">
              {result.includes("Sustainable")
                ? "💧"
                : result.includes("Semi-Critical")
                ? "⚠️"
                : "🚱"}
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Water Usage Assessment
            </h3>
            <p className={`text-lg font-bold ${getResultColor()}`}>{result}</p>

            <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
              <h4 className="font-medium text-gray-800 mb-2">
                Recommendations:
              </h4>
              <ul className="text-sm text-gray-600 text-left space-y-1">
                {result.includes("Sustainable") ? (
                  <>
                    <li>
                      • Continue your current water conservation practices
                    </li>
                    <li>
                      • Consider rainwater harvesting for non-potable uses
                    </li>
                    <li>• Share your sustainable practices with others</li>
                  </>
                ) : result.includes("Semi-Critical") ? (
                  <>
                    <li>• Fix any leaking taps or pipes immediately</li>
                    <li>
                      • Take shorter showers and turn off taps when not in use
                    </li>
                    <li>• Use water-efficient appliances and fixtures</li>
                  </>
                ) : (
                  <>
                    <li>• Conduct a water audit to identify waste areas</li>
                    <li>• Implement immediate water conservation measures</li>
                    <li>• Consider installing water recycling systems</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        )}

        <div className="mt-8 bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">
            Water Usage Guidelines
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <div className="text-2xl font-bold text-green-700">{"<50"}</div>
              <div className="text-sm text-green-600">Sustainable</div>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <div className="text-2xl font-bold text-yellow-700">50-100</div>
              <div className="text-sm text-yellow-600">Semi-Critical</div>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <div className="text-2xl font-bold text-red-700">{">100"}</div>
              <div className="text-sm text-red-600">Critical</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
