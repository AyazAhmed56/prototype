import { useState } from "react";

export default function KnowledgeAction() {
  const [selectedStatus, setSelectedStatus] = useState("Semi-Critical");

  const suggestions = {
    Safe: {
      description: "Groundwater levels are within sustainable limits",
      icon: "💧",
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

  const tips = [
    "WHO recommends 50-100 liters of water per person per day for basic needs.",
    "Efficient irrigation can save up to 40% of agricultural water usage.",
    "One leaking tap can waste over 15 liters of water per day.",
    "Greywater recycling can reduce household freshwater demand by 30%.",
  ];

  const statusData = suggestions[selectedStatus];

  const colorClasses = {
    green: {
      bg: "bg-green-500",
      lightBg: "bg-green-100",
      border: "border-green-500",
      text: "text-green-800",
    },
    yellow: {
      bg: "bg-yellow-500",
      lightBg: "bg-yellow-100",
      border: "border-yellow-500",
      text: "text-yellow-800",
    },
    red: {
      bg: "bg-red-500",
      lightBg: "bg-red-100",
      border: "border-red-500",
      text: "text-red-800",
    },
  };

  const selectedColors = colorClasses[statusData.color];
  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-green-600 p-6 text-white">
        <h2 className="text-2xl font-bold flex items-center">
          🌍 Knowledge + Action
        </h2>
        <p className="mt-2 opacity-90">
          Get region-specific actions based on groundwater status
        </p>
      </div>

      {/* Selector */}
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-700 mb-3">
          Select Groundwater Status:
        </h3>
        <div className="flex flex-wrap gap-3">
          {Object.keys(suggestions).map((status) => {
            const colors = colorClasses[suggestions[status].color];
            return (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-all shadow-sm ${
                  selectedStatus === status
                    ? `${colors.bg} text-white shadow-md scale-105`
                    : `${colors.lightBg} ${colors.text} hover:bg-opacity-80`
                }`}
              >
                {suggestions[status].icon} {status}
              </button>
            );
          })}
        </div>

        {/* Status Card */}
        <div
          className={`p-6 mt-6 rounded-xl border-l-4 ${selectedColors.border} ${selectedColors.lightBg} transition-all duration-300`}
        >
          <div className="flex items-start">
            <span className="text-3xl mr-4 animate-bounce">
              {statusData.icon}
            </span>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Status: {selectedStatus}
              </h3>
              <p className="text-gray-700">{statusData.description}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
          Recommended Actions:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {statusData.actions.map((action, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1"
            >
              <div className="flex items-start">
                <span
                  className={`${selectedColors.lightBg} ${selectedColors.text} rounded-full px-3 py-1 mr-3 font-bold`}
                >
                  {index + 1}
                </span>
                <p className="text-gray-700">{action}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Knowledge Tip */}
        <div className="mt-8 bg-blue-50 p-4 rounded-xl shadow-inner">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Did You Know?</h4>
          <p className="text-sm text-blue-700">{randomTip}</p>
        </div>
      </div>
    </div>
  );
}
