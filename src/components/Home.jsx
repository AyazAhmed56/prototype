// Home.jsx
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      text: "AI-Powered Chatbot with Voice Support",
      icon: "💬",
      path: "/chat",
    },
    { text: "Regional Groundwater Analysis", icon: "📊", path: "/analysis" },
    { text: "Real-time Alerts & Notifications", icon: "🔔", path: "/alerts" },
    { text: "Community Feedback System", icon: "👥", path: "/community" },
    {
      text: "Comparative Data Visualization",
      icon: "📈",
      path: "/region",
    },
    { text: "Water Budget Calculator", icon: "🧮", path: "/budget" },
    { text: "Actionable Knowledge Base", icon: "📚", path: "/knowledge" },
    { text: "Decision Maker Dashboard", icon: "🗂️", path: "/dashboard" },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 via-cyan-50 to-white">
      <div className="max-w-5xl mx-auto text-center py-16 animate-fadeIn">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6 drop-shadow-sm">
          Welcome to{" "}
          <span className="text-teal-600">INGRES Virtual Assistant</span>
        </h1>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          An AI-driven platform for monitoring and managing groundwater
          resources with multilingual support, real-time alerts, and
          comprehensive analysis tools.
        </p>

        {/* Features */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6">
            🌊 Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {features.map((f, i) => (
              <button
                key={i}
                onClick={() => navigate(f.path)}
                className="flex items-start space-x-3 p-3 w-full text-left bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg hover:shadow-md hover:bg-cyan-100 transition-all duration-300"
              >
                <span className="text-xl">{f.icon}</span>
                <span className="text-gray-800">{f.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate("/chatbot")}
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            🚀 Get Started
          </button>
          <button
            onClick={() => navigate("/knowledge-base")}
            className="border border-teal-600 text-teal-600 hover:bg-teal-50 font-medium py-3 px-8 rounded-full transition-all duration-300"
          >
            ℹ️ Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
