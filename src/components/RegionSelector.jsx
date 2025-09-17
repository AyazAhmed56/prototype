// RegionSelector.jsx
import { useState } from "react";

export default function RegionSelector() {
  const [region, setRegion] = useState({
    state: "Maharashtra",
    district: "",
    block: "",
  });

  // Sample data - in a real app this would come from an API
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

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-6 animate-fadeIn">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
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
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Region / Location Selector
        </h2>
        <p className="mt-2 opacity-90">
          Select your region for localized groundwater information
        </p>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              State:
            </label>
            <select
              value={region.state}
              onChange={(e) =>
                setRegion({
                  ...region,
                  state: e.target.value,
                  district: "",
                  block: "",
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            >
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              District:
            </label>
            <select
              value={region.district}
              onChange={(e) =>
                setRegion({ ...region, district: e.target.value, block: "" })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              disabled={!districts[region.state]}
            >
              <option value="">Select District</option>
              {districts[region.state]?.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Block/Taluk:
            </label>
            <select
              value={region.block}
              onChange={(e) => setRegion({ ...region, block: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              disabled={!region.district || !blocks[region.district]}
            >
              <option value="">Select Block/Taluk</option>
              {blocks[region.district]?.map((block) => (
                <option key={block} value={block}>
                  {block}
                </option>
              ))}
            </select>
          </div>
        </div>

        {region.state && region.district && region.block && (
          <div className="mt-8 p-6 bg-green-50 rounded-xl border-l-4 border-green-500 animate-popIn">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              Selected Region
            </h3>
            <div className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-lg font-medium text-gray-800">
                {region.block} → {region.district} → {region.state}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                <div className="text-sm text-gray-500">Status</div>
                <div className="font-semibold text-green-600">Safe</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                <div className="text-sm text-gray-500">Water Level</div>
                <div className="font-semibold text-blue-600">8.2m</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                <div className="text-sm text-gray-500">Last Updated</div>
                <div className="font-semibold text-gray-600">15 days ago</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
