// KnowledgeAction.jsx
import { useState } from "react";

export default function KnowledgeAction() {
  const [selectedStatus, setSelectedStatus] = useState("Semi-Critical");

  const suggestions = {
    Safe: {
      description: "Groundwater levels are within sustainable limits",
      icon: "✅",
      color: "green",
      actions: [
        "Maintain current water usage patterns",
        "Continue rainwater harvesting practices",
        "Monitor water quality regularly",
        "Promote water conservation awareness in community",
      ],
    },
    "Semi-Critical": {
      description: "Groundwater extraction is nearing recharge capacity",
      icon: "⚠️",
      color: "yellow",
      actions: [
        "Adopt rainwater harvesting systems",
        "Reduce groundwater extraction by 20%",
        "Implement drip irrigation in agriculture",
        "Promote water-efficient appliances",
      ],
    },
    Critical: {
      description: "Groundwater extraction exceeds recharge significantly",
      icon: "🚨",
      color: "red",
      actions: [
        "Implement strict regulations on groundwater extraction",
        "Emergency water conservation measures needed",
        "Explore alternative water sources",
        "Community water auditing and management planning",
      ],
    },
  };

  const statusData = suggestions[selectedStatus];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-6 animate-fadeIn">
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-6 text-white">
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
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          Knowledge + Action Section
        </h2>
        <p className="mt-2 opacity-90">
          Get actionable insights based on groundwater status
        </p>
      </div>

      <div className="p-6">
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Select Groundwater Status:
          </h3>
          <div className="flex space-x-4">
            {Object.keys(suggestions).map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedStatus === status
                    ? `bg-${suggestions[status].color}-500 text-white shadow-md`
                    : `bg-${suggestions[status].color}-100 text-${suggestions[status].color}-800 hover:bg-${suggestions[status].color}-200`
                }`}
              >
                {suggestions[status].icon} {status}
              </button>
            ))}
          </div>
        </div>

        <div
          className={`p-6 rounded-xl border-l-4 bg-${statusData.color}-50 border-${statusData.color}-500 mb-8`}
        >
          <div className="flex items-start">
            <span className="text-3xl mr-4">{statusData.icon}</span>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Status: {selectedStatus}
              </h3>
              <p className="text-gray-700">{statusData.description}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Recommended Actions:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {statusData.actions.map((action, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg bg-white border border-${statusData.color}-200 shadow-sm hover:shadow-md transition-shadow animate-fadeIn`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start">
                  <span
                    className={`bg-${statusData.color}-100 text-${statusData.color}-800 rounded-full p-2 mr-3`}
                  >
                    {index + 1}
                  </span>
                  <p className="text-gray-700">{action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-blue-50 p-4 rounded-xl">
          <h4 className="font-semibold text-blue-800 mb-2">Did You Know?</h4>
          <p className="text-sm text-blue-700">
            According to the World Health Organization, approximately 50-100
            liters of water per person per day are needed to ensure most basic
            needs are met while minimizing health concerns. Efficient water use
            practices can reduce consumption by 30% or more without compromising
            quality of life.
          </p>
        </div>
      </div>
    </div>
  );
}
