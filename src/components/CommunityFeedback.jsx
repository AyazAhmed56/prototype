// CommunityFeedback.jsx
import { useState } from "react";

export default function CommunityFeedback() {
  const [feedback, setFeedback] = useState("");
  const [list, setList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdd = () => {
    if (!feedback.trim()) return;

    setIsSubmitting(true);

    // Simulate API call
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
    }, 800);
  };

  const handleVote = (id, delta) => {
    setList(
      list.map((item) =>
        item.id === id ? { ...item, votes: item.votes + delta } : item
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-6 animate-fadeIn">
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 p-6 text-white">
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Community Feedback
        </h2>
        <p className="mt-2 opacity-90">
          Share your ideas and vote on community suggestions
        </p>
      </div>

      <div className="p-6">
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your idea or suggestion..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
            onKeyPress={(e) => e.key === "Enter" && handleAdd()}
          />
          <button
            onClick={handleAdd}
            disabled={isSubmitting}
            className="px-6 py-3 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
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
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p>No feedback yet. Be the first to share your idea!</p>
            </div>
          ) : (
            list.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-gray-800">{item.text}</p>
                    <div className="flex items-center mt-3 text-sm text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 rounded-full">
                        {item.date}
                      </span>
                      <span
                        className={`ml-3 px-2 py-1 rounded-full ${
                          item.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : item.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center ml-4">
                    <button
                      onClick={() => handleVote(item.id, 1)}
                      className="p-1 hover:text-pink-600 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    </button>
                    <span className="text-lg font-semibold my-1">
                      {item.votes}
                    </span>
                    <button
                      onClick={() => handleVote(item.id, -1)}
                      className="p-1 hover:text-pink-600 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
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
