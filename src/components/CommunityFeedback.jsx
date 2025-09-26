// CommunityFeedback.jsx
import { useState, useRef, useEffect } from "react";

export default function CommunityFeedback() {
  const [feedback, setFeedback] = useState("");
  const [list, setList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleAdd = () => {
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setList([
        ...list,
        {
          id: Date.now(),
          text: feedback,
          date: new Date().toLocaleDateString(),
          status: "Pending",
          votes: 0,
        },
      ]);
      setFeedback("");
      setIsSubmitting(false);
    }, 700);
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
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-6 text-white">
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Community Feedback
        </h2>
        <p className="mt-2 opacity-90">
          Share your ideas and vote on groundwater solutions
        </p>
      </div>

      {/* Input Box */}
      <div className="p-6">
        <div className="flex gap-3 mb-6">
          <input
            ref={inputRef}
            type="text"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="💧 Share your idea for groundwater conservation..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <button
            onClick={handleAdd}
            disabled={isSubmitting}
            className="px-6 py-3 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                Adding...
              </>
            ) : (
              "Add Feedback"
            )}
          </button>
        </div>

        {/* Feedback List */}
        <div className="space-y-4">
          {list.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto mb-4 opacity-50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 1.343-3 3v1H7l5 5 5-5h-2v-1c0-1.657-1.343-3-3-3z"
                />
              </svg>
              <p>No feedback yet. Be the first to share your idea!</p>
            </div>
          ) : (
            list.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md hover:shadow-cyan-100 transition-all bg-gradient-to-r from-blue-50 to-cyan-50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-gray-800">{item.text}</p>
                    <div className="flex items-center mt-3 text-sm text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 rounded-full">
                        {item.date}
                      </span>
                      <span
                        className={`ml-3 px-2 py-1 rounded-full ${getStatusClass(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center ml-4">
                    <button
                      onClick={() => handleVote(item.id, 1)}
                      className="p-1 hover:text-cyan-600 transition-colors"
                    >
                      💧
                    </button>
                    <span className="text-lg font-semibold my-1">
                      {item.votes}
                    </span>
                    <button
                      onClick={() => handleVote(item.id, -1)}
                      disabled={item.votes === 0}
                      className={`p-1 transition-colors ${
                        item.votes > 0
                          ? "hover:text-blue-500"
                          : "opacity-30 cursor-not-allowed"
                      }`}
                    >
                      🛑
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
