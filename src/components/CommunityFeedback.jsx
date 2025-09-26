import { useState, useRef, useEffect } from "react";

export default function CommunityFeedback() {
  const [feedback, setFeedback] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [list, setList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const inputRef = useRef(null);

  // Sample existing feedback for demonstration
  useEffect(() => {
    const sampleFeedback = [
      {
        id: 1,
        text: "Our borewell in Pune district has been showing declining water levels. We need immediate rainwater harvesting in our area.",
        category: "critical_issue",
        location: "Pune, Maharashtra",
        date: new Date(
          Date.now() - 2 * 24 * 60 * 60 * 1000
        ).toLocaleDateString(),
        status: "Verified",
        votes: 15,
        priority: "High",
        reportType: "Water Depletion",
      },
      {
        id: 2,
        text: "Successfully implemented drip irrigation system. Water usage reduced by 40%. Highly recommend for other farmers.",
        category: "solution",
        location: "Nashik, Maharashtra",
        date: new Date(
          Date.now() - 5 * 24 * 60 * 60 * 1000
        ).toLocaleDateString(),
        status: "Approved",
        votes: 23,
        priority: "Medium",
        reportType: "Conservation Success",
      },
      {
        id: 3,
        text: "Water quality testing shows high salinity levels in our area. Need government intervention for treatment facilities.",
        category: "contamination",
        location: "Solapur, Maharashtra",
        date: new Date(
          Date.now() - 7 * 24 * 60 * 60 * 1000
        ).toLocaleDateString(),
        status: "Under Review",
        votes: 8,
        priority: "High",
        reportType: "Water Contamination",
      },
    ];
    setList(sampleFeedback);
    inputRef.current?.focus();
  }, []);

  const categories = [
    { value: "general", label: "General Feedback", icon: "💬" },
    { value: "critical_issue", label: "Critical Issue", icon: "🚨" },
    { value: "borewell_dry", label: "Borewell Drying", icon: "🏜️" },
    { value: "contamination", label: "Water Contamination", icon: "⚠️" },
    { value: "solution", label: "Conservation Solution", icon: "💡" },
    { value: "success_story", label: "Success Story", icon: "🌟" },
  ];

  const states = [
    "Maharashtra",
    "Karnataka",
    "Tamil Nadu",
    "Andhra Pradesh",
    "Telangana",
    "Kerala",
    "Gujarat",
    "Rajasthan",
    "Uttar Pradesh",
  ];

  const handleAdd = () => {
    if (!feedback.trim() || !selectedLocation) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newItem = {
        id: Date.now(),
        text: feedback,
        category: selectedCategory,
        location: selectedLocation,
        date: new Date().toLocaleDateString(),
        status: "Pending Verification",
        votes: 0,
        priority:
          selectedCategory === "critical_issue"
            ? "High"
            : selectedCategory === "contamination"
            ? "High"
            : "Medium",
        reportType: getReportType(selectedCategory),
      };

      setList([newItem, ...list]);
      setFeedback("");
      setSelectedLocation("");
      setIsSubmitting(false);
    }, 700);
  };

  const getReportType = (category) => {
    const typeMap = {
      critical_issue: "Critical Report",
      borewell_dry: "Borewell Issue",
      contamination: "Water Quality",
      solution: "Conservation Method",
      success_story: "Success Story",
      general: "General Feedback",
    };
    return typeMap[category] || "General Feedback";
  };

  const handleVote = (id, delta) => {
    setList(
      list.map((item) =>
        item.id === id && (delta > 0 || item.votes > 0)
          ? { ...item, votes: item.votes + delta }
          : item
      )
    );
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending Verification":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "Verified":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "Approved":
        return "bg-green-100 text-green-800 border border-green-200";
      case "Under Review":
        return "bg-purple-100 text-purple-800 border border-purple-200";
      case "Resolved":
        return "bg-emerald-100 text-emerald-800 border border-emerald-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border border-red-200";
      case "Medium":
        return "bg-orange-100 text-orange-800 border border-orange-200";
      case "Low":
        return "bg-gray-100 text-gray-800 border border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const getCategoryInfo = (categoryValue) => {
    return (
      categories.find((cat) => cat.value === categoryValue) || categories[0]
    );
  };

  const filteredAndSortedList = () => {
    let filtered = [...list];

    if (filter !== "all") {
      filtered = filtered.filter((item) => item.category === filter);
    }

    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "most_voted":
        filtered.sort((a, b) => b.votes - a.votes);
        break;
      case "priority":
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        filtered.sort(
          (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
        );
        break;
      default:
        break;
    }

    return filtered;
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden mt-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Community Feedback & Reports
            </h2>
            <p className="mt-2 opacity-90 text-blue-100">
              Share groundwater issues, solutions, and collaborate with the
              community
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{list.length}</div>
            <div className="text-sm text-blue-200">Total Reports</div>
          </div>
        </div>
      </div>

      {/* Enhanced Input Section */}
      <div className="p-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            Submit New Report
          </h3>

          {/* Category Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-800 mb-2">
              Report Category
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                    selectedCategory === category.value
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 bg-gray-50 text-gray-600 hover:border-blue-300"
                  }`}
                >
                  <div>{category.icon}</div>
                  <div>{category.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Location Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-800 mb-2">
              Location (District, State)
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                placeholder="e.g., Pune, Maharashtra"
                className="flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <select
                onChange={(e) =>
                  setSelectedLocation(
                    selectedLocation
                      ? selectedLocation.split(",")[0] + ", " + e.target.value
                      : e.target.value
                  )
                }
                className="px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Feedback Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-800 mb-2">
              Describe the Issue/Feedback
            </label>
            <textarea
              ref={inputRef}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Provide detailed information about the groundwater issue, solution, or feedback..."
              rows="4"
              className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              onKeyDown={(e) => e.key === "Enter" && e.ctrlKey && handleAdd()}
            />
            <div className="text-xs text-gray-500 mt-1">
              Press Ctrl+Enter to submit quickly
            </div>
          </div>

          <button
            onClick={handleAdd}
            disabled={isSubmitting || !feedback.trim() || !selectedLocation}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting Report...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Submit Report
              </>
            )}
          </button>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="px-6 py-4 bg-gray-50 border-t border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Filter:</span>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="text-sm border border-gray-300 rounded px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-300 rounded px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="most_voted">Most Voted</option>
                <option value="priority">High Priority First</option>
              </select>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Showing {filteredAndSortedList().length} of {list.length} reports
          </div>
        </div>
      </div>

      {/* Enhanced Feedback List */}
      <div className="p-6">
        <div className="space-y-6">
          {filteredAndSortedList().length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto mb-4 opacity-50 text-blue-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-lg font-medium">No reports found</p>
              <p>Be the first to share groundwater information in your area!</p>
            </div>
          ) : (
            filteredAndSortedList().map((item) => (
              <div
                key={item.id}
                className="border border-blue-200 rounded-lg p-6 hover:shadow-lg hover:shadow-blue-100 transition-all bg-gradient-to-r from-white to-blue-50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">
                        {getCategoryInfo(item.category).icon}
                      </span>
                      <div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                        <span
                          className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getPriorityClass(
                            item.priority
                          )}`}
                        >
                          {item.priority} Priority
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-800 mb-3 leading-relaxed">
                      {item.text}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {item.location}
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {item.date}
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {item.reportType}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Voting Section */}
                  <div className="flex flex-col items-center ml-6 bg-white rounded-lg p-3 shadow-sm border border-blue-100">
                    <button
                      onClick={() => handleVote(item.id, 1)}
                      className="p-2 hover:bg-blue-100 rounded-lg transition-colors group"
                      title="Upvote this report"
                    >
                      <svg
                        className="w-6 h-6 text-blue-600 group-hover:text-blue-700"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <span className="text-xl font-bold text-blue-800 my-1">
                      {item.votes}
                    </span>
                    <button
                      onClick={() => handleVote(item.id, -1)}
                      disabled={item.votes === 0}
                      className={`p-2 rounded-lg transition-colors group ${
                        item.votes > 0
                          ? "hover:bg-red-100"
                          : "opacity-30 cursor-not-allowed"
                      }`}
                      title="Downvote this report"
                    >
                      <svg
                        className={`w-6 h-6 group-hover:text-red-600 ${
                          item.votes > 0 ? "text-red-500" : "text-gray-400"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <div className="text-xs text-gray-500 mt-1 text-center">
                      Community
                      <br />
                      Votes
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-3 px-6 text-center text-sm text-blue-100">
        Help build a comprehensive groundwater database • Report issues • Share
        solutions • Build community
      </div>
    </div>
  );
}
