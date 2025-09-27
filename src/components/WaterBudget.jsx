// FarmWaterBudget.jsx
import { useState } from "react";

export default function FarmWaterBudget() {
  const [crop, setCrop] = useState("");
  const [area, setArea] = useState("");
  const [method, setMethod] = useState("");
  const [borewells, setBorewells] = useState(1);
  const [hours, setHours] = useState(8);
  const [result, setResult] = useState(null);

  // Example water requirement data (liters per acre per hour)
  const cropData = {
    wheat: 2500,
    rice: 4000,
    maize: 2000,
  };

  const methodFactor = {
    drip: 0.5,
    sprinkler: 0.7,
    flood: 1,
  };

  const calculateBudget = () => {
    if (!crop || !area || !method) return;

    const waterPerHour = cropData[crop] * area * methodFactor[method];
    const totalWater = waterPerHour * hours;

    let status = "";
    if (totalWater < 20000) status = "Sustainable ✅";
    else if (totalWater <= 50000) status = "Semi-Critical ⚠️ – Save Water!";
    else status = "Critical ❌ – Immediate Action Required!";

    setResult({
      total: totalWater,
      status,
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">🌾 Farm Water Budget</h2>

      {/* Crop Type */}
      <label className="block mb-2 font-medium">Crop Type</label>
      <select
        value={crop}
        onChange={(e) => setCrop(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="">Select crop</option>
        <option value="wheat">Wheat</option>
        <option value="rice">Rice</option>
        <option value="maize">Maize</option>
      </select>

      {/* Area */}
      <label className="block mb-2 font-medium">Area (acres)</label>
      <input
        type="number"
        value={area}
        onChange={(e) => setArea(Number(e.target.value))}
        className="w-full border p-2 rounded mb-4"
        placeholder="Enter farm area"
      />

      {/* Irrigation Method */}
      <label className="block mb-2 font-medium">Irrigation Method</label>
      <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="">Select method</option>
        <option value="drip">Drip</option>
        <option value="sprinkler">Sprinkler</option>
        <option value="flood">Flood</option>
      </select>

      {/* Number of Borewells */}
      <label className="block mb-2 font-medium">Number of Borewells</label>
      <input
        type="number"
        min="1"
        value={borewells}
        onChange={(e) => setBorewells(Number(e.target.value))}
        className="w-full border p-2 rounded mb-4"
      />

      {/* Pumping Hours */}
      <label className="block mb-2 font-medium">
        Pumping Hours per Day: {hours}
      </label>
      <input
        type="range"
        min="1"
        max="24"
        value={hours}
        onChange={(e) => setHours(Number(e.target.value))}
        className="w-full mb-4"
      />

      <button
        onClick={calculateBudget}
        className="w-full bg-cyan-600 text-white py-2 rounded-lg font-semibold hover:bg-cyan-700 transition"
      >
        Calculate Water Budget
      </button>

      {result && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50 text-center">
          <h3 className="text-lg font-bold">💧 Water Budget Result</h3>
          <p className="mt-2">Total Water Needed: {result.total} liters/day</p>
          <p className="mt-1 font-semibold">{result.status}</p>
        </div>
      )}
    </div>
  );
}
