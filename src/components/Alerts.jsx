import { useState, useEffect } from "react";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState("All");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAlerts([
        {
          id: 1,
          region: "Pune",
          status: "Safe",
          type: "Normal",
          time: "2 mins ago",
        },
        {
          id: 2,
          region: "Nagpur",
          status: "Semi-Critical",
          type: "Warning",
          time: "15 mins ago",
        },
        {
          id: 3,
          region: "Aurangabad",
          status: "Critical",
          type: "Alert",
          time: "30 mins ago",
        },
        {
          id: 4,
          region: "Nashik",
          status: "Safe",
          type: "Normal",
          time: "45 mins ago",
        },
        {
          id: 5,
          region: "Mumbai",
          status: "Critical",
          type: "Alert",
          time: "1 hour ago",
        },
      ]);
      setAnimate(true);
    }, 300);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Safe":
        return "bg-green-100 text-green-800 border-green-500";
      case "Semi-Critical":
        return "bg-yellow-100 text-yellow-800 border-yellow-500";
      case "Critical":
        return "bg-red-100 text-red-800 border-red-500";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Safe":
        return "💧";
      case "Semi-Critical":
        return "⚠️";
      case "Critical":
        return "🚨";
      default:
        return "🔔";
    }
  };

  const filteredAlerts =
    filter === "All" ? alerts : alerts.filter((a) => a.status === filter);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-green-600 p-6 text-white">
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          Alerts & Notifications
        </h2>
        <p className="mt-2 opacity-90">
          Live groundwater status updates for selected regions
        </p>
      </div>

      <div className="p-6">
        {/* Filter Buttons */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            {["All", "Critical", "Semi-Critical", "Safe"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  filter === f
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="text-sm text-gray-500">Last updated: Just now</div>
        </div>

        {/* Alert Cards */}
        <div className="space-y-4">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert, index) => (
              <div
                key={alert.id}
                className={`p-4 border-l-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all transform ${
                  animate
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-3">
                    <span className="text-xl">
                      {getStatusIcon(alert.status)}
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {alert.region}
                      </h3>
                      <p className="text-sm text-gray-500">{alert.time}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      alert.status
                    )}`}
                  >
                    {alert.status}
                  </span>
                </div>
                <p className="mt-2 text-gray-700 ml-9">
                  Groundwater level is <b>{alert.status.toLowerCase()}</b>.{" "}
                  {alert.type} notification issued.
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-gray-400 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p>No alerts at this time</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
