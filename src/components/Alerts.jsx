import { useState, useEffect } from "react";
import {
  Bell,
  Settings,
  MapPin,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Droplets,
} from "lucide-react";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState("All");
  const [animate, setAnimate] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [userThresholds, setUserThresholds] = useState({
    safeToSemiCritical: true,
    semiCriticalToCritical: true,
    criticalToOverExploited: true,
    seasonalUpdates: true,
    communityReports: true,
  });
  const [selectedRegions, setSelectedRegions] = useState([
    "Pune",
    "Nagpur",
    "Mumbai",
    "Nashik",
    "Aurangabad",
  ]);

  useEffect(() => {
    // Simulate real-time alerts with more comprehensive data
    setTimeout(() => {
      setAlerts([
        {
          id: 1,
          region: "Pune District",
          block: "Pune Urban",
          status: "Safe",
          previousStatus: "Safe",
          type: "Status Update",
          time: "2 mins ago",
          message: "Groundwater level remains stable at 68% extraction rate.",
          trend: "stable",
          source: "INGRES Database",
          priority: "low",
          season: "Post-Monsoon",
          extractionRate: 68,
          rechargeRate: 85,
        },
        {
          id: 2,
          region: "Nagpur District",
          block: "Nagpur Rural",
          status: "Semi-Critical",
          previousStatus: "Safe",
          type: "Status Change Alert",
          time: "15 mins ago",
          message:
            "Status changed from Safe to Semi-Critical. Extraction rate increased to 78%.",
          trend: "declining",
          source: "INGRES Database",
          priority: "medium",
          season: "Pre-Summer",
          extractionRate: 78,
          rechargeRate: 65,
          action: "Consider rainwater harvesting implementation",
        },
        {
          id: 3,
          region: "Aurangabad District",
          block: "Aurangabad Central",
          status: "Critical",
          previousStatus: "Semi-Critical",
          type: "Critical Alert",
          time: "30 mins ago",
          message:
            "URGENT: Status deteriorated to Critical. Immediate action required.",
          trend: "declining",
          source: "INGRES Database",
          priority: "high",
          season: "Summer Peak",
          extractionRate: 95,
          rechargeRate: 45,
          action: "Restrict usage, implement water conservation measures",
        },
        {
          id: 4,
          region: "Nashik District",
          block: "Nashik West",
          status: "Over-Exploited",
          previousStatus: "Critical",
          type: "Emergency Alert",
          time: "45 mins ago",
          message:
            "EMERGENCY: Over-exploited status reached. 118% extraction rate detected.",
          trend: "critical",
          source: "INGRES Database",
          priority: "critical",
          season: "Summer Peak",
          extractionRate: 118,
          rechargeRate: 35,
          action:
            "Immediate usage restrictions, alternative water sources needed",
        },
        {
          id: 5,
          region: "Mumbai Suburban",
          block: "Thane Block",
          status: "Saline",
          previousStatus: "Semi-Critical",
          type: "Quality Alert",
          time: "1 hour ago",
          message:
            "Saline intrusion detected. Water quality compromised in coastal areas.",
          trend: "declining",
          source: "INGRES Database + Community Reports",
          priority: "high",
          season: "Monsoon",
          extractionRate: 85,
          rechargeRate: 70,
          action: "Reduce coastal extraction, monitor salinity levels",
        },
        {
          id: 6,
          region: "Solapur District",
          block: "Solapur North",
          status: "Semi-Critical",
          previousStatus: "Semi-Critical",
          type: "Seasonal Update",
          time: "2 hours ago",
          message:
            "Recharge expected to improve by 25% after upcoming monsoon season.",
          trend: "improving",
          source: "INGRES Prediction Model",
          priority: "low",
          season: "Pre-Monsoon",
          extractionRate: 72,
          rechargeRate: 60,
          action: "Prepare for monsoon recharge, maintain current usage",
        },
        {
          id: 7,
          region: "Kolhapur District",
          block: "Kolhapur Rural",
          status: "Safe",
          previousStatus: "Safe",
          type: "Community Report",
          time: "3 hours ago",
          message:
            "Community reports successful rainwater harvesting project. Water table improved.",
          trend: "improving",
          source: "Community Feedback",
          priority: "low",
          season: "Post-Monsoon",
          extractionRate: 55,
          rechargeRate: 95,
          action: "Continue current conservation practices",
        },
      ]);
      setAnimate(true);
    }, 300);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Safe":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "Semi-Critical":
        return "bg-yellow-50 text-yellow-800 border-yellow-200";
      case "Critical":
        return "bg-orange-50 text-orange-800 border-orange-200";
      case "Over-Exploited":
        return "bg-red-50 text-red-800 border-red-200";
      case "Saline":
        return "bg-purple-50 text-purple-800 border-purple-200";
      default:
        return "bg-gray-50 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Safe":
        return <CheckCircle className="h-5 w-5 text-blue-600" />;
      case "Semi-Critical":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case "Critical":
        return <AlertCircle className="h-5 w-5 text-orange-600" />;
      case "Over-Exploited":
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case "Saline":
        return <Droplets className="h-5 w-5 text-purple-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "declining":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      case "critical":
        return <TrendingDown className="h-4 w-4 text-red-600 animate-pulse" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "critical":
        return "bg-red-600 text-white animate-pulse";
      case "high":
        return "bg-red-500 text-white";
      case "medium":
        return "bg-yellow-500 text-white";
      default:
        return "bg-blue-500 text-white";
    }
  };

  const filteredAlerts =
    filter === "All"
      ? alerts
      : alerts.filter((a) =>
          filter === "High Priority"
            ? ["critical", "high"].includes(a.priority)
            : a.status === filter
        );

  const handleThresholdChange = (key) => {
    setUserThresholds((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold flex items-center">
              <Bell className="h-8 w-8 mr-3" />
              Alerts & Notifications
            </h2>
            <p className="mt-2 opacity-90 text-blue-100">
              Real-time groundwater status updates and community reports
            </p>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-all"
          >
            <Settings className="h-6 w-6" />
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">
              {alerts.filter((a) => a.priority === "critical").length}
            </div>
            <div className="text-sm text-blue-100">Critical Alerts</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">
              {alerts.filter((a) => a.trend === "declining").length}
            </div>
            <div className="text-sm text-blue-100">Declining Trends</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">
              {alerts.filter((a) => a.source.includes("Community")).length}
            </div>
            <div className="text-sm text-blue-100">Community Reports</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">{selectedRegions.length}</div>
            <div className="text-sm text-blue-100">Monitored Regions</div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Settings Panel */}
        {showSettings && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-4">
              Alert Preferences
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  Status Change Alerts
                </h4>
                {Object.entries({
                  safeToSemiCritical: "Safe → Semi-Critical",
                  semiCriticalToCritical: "Semi-Critical → Critical",
                  criticalToOverExploited: "Critical → Over-Exploited",
                }).map(([key, label]) => (
                  <label key={key} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={userThresholds[key]}
                      onChange={() => handleThresholdChange(key)}
                      className="mr-2 text-blue-600"
                    />
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Other Alerts</h4>
                {Object.entries({
                  seasonalUpdates: "Seasonal Updates",
                  communityReports: "Community Reports",
                }).map(([key, label]) => (
                  <label key={key} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={userThresholds[key]}
                      onChange={() => handleThresholdChange(key)}
                      className="mr-2 text-blue-600"
                    />
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <div className="flex flex-wrap space-x-2 space-y-2">
            {[
              "All",
              "High Priority",
              "Critical",
              "Over-Exploited",
              "Semi-Critical",
              "Safe",
              "Saline",
            ].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === f
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                {f}{" "}
                {f !== "All" &&
                  f !== "High Priority" &&
                  `(${alerts.filter((a) => a.status === f).length})`}
              </button>
            ))}
          </div>
          <div className="text-sm text-gray-500 flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            Live Updates Active
          </div>
        </div>

        {/* Alert Cards */}
        <div className="space-y-4">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert, index) => (
              <div
                key={alert.id}
                className={`border-l-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all transform ${
                  animate
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                } ${getStatusColor(alert.status)}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="p-4">
                  {/* Alert Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-start space-x-3">
                      {getStatusIcon(alert.status)}
                      <div>
                        <h3 className="font-semibold text-gray-800 flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                          {alert.region}
                          <span className="text-sm text-gray-500 ml-2">
                            ({alert.block})
                          </span>
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                          <span>{alert.time}</span>
                          <span className="flex items-center">
                            {getTrendIcon(alert.trend)}
                            <span className="ml-1">{alert.trend}</span>
                          </span>
                          <span>{alert.season}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityBadge(
                          alert.priority
                        )}`}
                      >
                        {alert.priority.toUpperCase()}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          alert.status
                        )}`}
                      >
                        {alert.status}
                      </span>
                    </div>
                  </div>

                  {/* Alert Message */}
                  <p className="text-gray-700 mb-3 ml-8">{alert.message}</p>

                  {/* Progress Bars */}
                  <div className="ml-8 mb-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Extraction Rate</span>
                        <span className="font-medium">
                          {alert.extractionRate}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            alert.extractionRate > 100
                              ? "bg-red-500"
                              : alert.extractionRate > 90
                              ? "bg-orange-500"
                              : alert.extractionRate > 70
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                          }`}
                          style={{
                            width: `${Math.min(alert.extractionRate, 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Recharge Rate</span>
                        <span className="font-medium">
                          {alert.rechargeRate}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 bg-green-500 rounded-full"
                          style={{
                            width: `${Math.min(alert.rechargeRate, 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Action Recommendation */}
                  {alert.action && (
                    <div className="ml-8 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                      <p className="text-sm text-blue-800">
                        <strong>Recommended Action:</strong> {alert.action}
                      </p>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex justify-between items-center mt-3 ml-8 text-xs text-gray-500">
                    <span>Source: {alert.source}</span>
                    {alert.previousStatus &&
                      alert.previousStatus !== alert.status && (
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          Changed from {alert.previousStatus}
                        </span>
                      )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Bell className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <p className="text-lg">No alerts match your current filter</p>
              <p className="text-sm mt-2">
                Try changing the filter or check back later
              </p>
            </div>
          )}
        </div>

        {/* Pagination/Load More */}
        {filteredAlerts.length > 0 && (
          <div className="text-center mt-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
              Load More Alerts
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
