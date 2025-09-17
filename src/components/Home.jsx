// Home.jsx
export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center py-8 animate-fadeIn">
        <h1 className="text-4xl md:text-5xl font-bold text-teal-800 mb-6">
          Welcome to INGRES Virtual Assistant
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          An AI-driven platform for monitoring and managing groundwater
          resources with multilingual support, real-time alerts, and
          comprehensive analysis tools.
        </p>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 transform transition-transform duration-300 hover:scale-105">
          <h2 className="text-2xl font-semibold text-teal-700 mb-4">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "AI-Powered Chatbot with Voice Support",
              "Regional Groundwater Analysis",
              "Real-time Alerts & Notifications",
              "Community Feedback System",
              "Comparative Data Visualization",
              "Water Budget Calculator",
              "Actionable Knowledge Base",
              "Decision Maker Dashboard",
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-teal-600 mt-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md">
            Get Started
          </button>
          <button className="border border-teal-600 text-teal-600 hover:bg-teal-50 font-medium py-2 px-6 rounded-lg transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
