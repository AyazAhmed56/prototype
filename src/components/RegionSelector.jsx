// RegionSelector.jsx
import { useState } from "react";

export default function RegionSelector() {
  const [region, setRegion] = useState({
    state: "Maharashtra",
    district: "",
    block: "",
  });

  const [loadingLocation, setLoadingLocation] = useState(false);

  // Sample data - Ideally fetched from an API
  const states = [
    "Maharashtra",
    "Karnataka",
    "Tamil Nadu",
    "Uttar Pradesh",
    "Gujarat",
  ];
  const districts = {
    Maharashtra: ["Pune", "Mumbai", "Nagpur", "Nashik", "Aurangabad", "Thane"],
    Karnataka: ["Bengaluru", "Mysuru", "Hubli", "Mangaluru", "Belagavi"],
    "Tamil Nadu": [
      "Chennai",
      "Coimbatore",
      "Madurai",
      "Tiruchirappalli",
      "Salem",
    ],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Prayagraj"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
  };
  const blocks = {
    Pune: ["Haveli", "Mulshi", "Baramati", "Indapur", "Bhor"],
    Mumbai: ["Mumbai City", "Mumbai Suburban"],
    Nagpur: ["Nagpur Urban", "Nagpur Rural", "Katol", "Kalmeshwar"],
    Nashik: ["Nashik East", "Nashik West", "Malegaon", "Sinnar"],
    Aurangabad: ["Aurangabad East", "Aurangabad West", "Gangapur", "Kannad"],
  };

  const handleAutoDetect = () => {
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        // Placeholder: In real app, convert lat/lon to state/district/block
        setRegion({ state: "Maharashtra", district: "Pune", block: "Haveli" });
        setLoadingLocation(false);
      },
      () => setLoadingLocation(false)
    );
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mt-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 via-green-600 to-cyan-600 p-6 text-white">
        <h2 className="text-2xl font-bold flex items-center">
          📍 Region / Location Selector
        </h2>
        <p className="mt-2 text-sm opacity-90">
          Select your region or use GPS for instant groundwater insights
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* State Selector */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">State:</label>
          <select
            value={region.state}
            onChange={(e) =>
              setRegion({ state: e.target.value, district: "", block: "" })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
          >
            {states.map((state) => (
              <option key={state}>{state}</option>
            ))}
          </select>
        </div>

        {/* District Selector */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            District:
          </label>
          <select
            value={region.district}
            onChange={(e) =>
              setRegion({ ...region, district: e.target.value, block: "" })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            disabled={!districts[region.state]}
          >
            <option value="">Select District</option>
            {districts[region.state]?.map((district) => (
              <option key={district}>{district}</option>
            ))}
          </select>
        </div>

        {/* Block Selector */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Block/Taluk:
          </label>
          <select
            value={region.block}
            onChange={(e) => setRegion({ ...region, block: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            disabled={!region.district || !blocks[region.district]}
          >
            <option value="">Select Block/Taluk</option>
            {blocks[region.district]?.map((block) => (
              <option key={block}>{block}</option>
            ))}
          </select>
        </div>

        {/* Auto Detect Button */}
        <button
          onClick={handleAutoDetect}
          className="w-full py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all"
        >
          {loadingLocation ? "Detecting..." : "📡 Auto-Detect My Location"}
        </button>

        {/* Selected Region Summary */}
        {region.state && region.district && region.block && (
          <div className="mt-6 p-6 bg-emerald-50 rounded-xl border-l-4 border-emerald-600 animate-popIn">
            <h3 className="text-lg font-bold text-emerald-800 mb-4">
              Selected Region
            </h3>
            <div className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow">
              🌍{" "}
              <span className="font-medium">
                {region.block} → {region.district} → {region.state}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                <div className="text-xs text-gray-500">Status</div>
                <div className="font-semibold text-emerald-600">Safe ✅</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                <div className="text-xs text-gray-500">Water Level</div>
                <div className="font-semibold text-cyan-600">8.2 m</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                <div className="text-xs text-gray-500">Last Updated</div>
                <div className="font-semibold text-gray-600">15 days ago</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
