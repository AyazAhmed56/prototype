import { useState, useEffect } from "react";

// FAQ data - embedded directly
const faqData = [
  {
    question: "groundwater levels in maharashtra",
    answer:
      "Here's the current groundwater status in Maharashtra. The state has 50% safe areas, 30% semi-critical, and 20% critical zones. Conservation efforts are needed in the critical regions.",
    chartType: "bar",
    chartTitle: "Groundwater Status in Maharashtra",
    chartData: [
      { label: "Safe", value: 50, color: "#10B981" },
      { label: "Semi-Critical", value: 30, color: "#F59E0B" },
      { label: "Critical", value: 20, color: "#EF4444" },
    ],
  },
  {
    question: "karnataka status",
    answer:
      "Karnataka's groundwater distribution shows 40% safe areas, 40% semi-critical, and 20% critical regions. The state needs to focus on recharge initiatives.",
    chartType: "pie",
    chartTitle: "Groundwater Distribution in Karnataka",
    chartData: [
      { label: "Safe", value: 40, color: "#10B981" },
      { label: "Semi-Critical", value: 40, color: "#F59E0B" },
      { label: "Critical", value: 20, color: "#EF4444" },
    ],
  },
  {
    question: "compare state groundwater",
    answer:
      "Here's a comparison of groundwater levels across major states. Maharashtra has higher safe areas while Karnataka has more semi-critical zones.",
    chartType: "bar",
    chartTitle: "State-wise Groundwater Comparison (Safe Areas)",
    chartData: [
      { label: "Maharashtra", value: 50, color: "#3B82F6" },
      { label: "Karnataka", value: 40, color: "#8B5CF6" },
      { label: "Tamil Nadu", value: 60, color: "#EC4899" },
      { label: "Uttar Pradesh", value: 35, color: "#F59E0B" },
    ],
  },
  {
    question: "trends in maharashtra",
    answer:
      "Groundwater trends in Maharashtra over the past 5 years show improvement in safe zones due to conservation efforts. The percentage of safe areas has increased from 35% to 50%.",
    chartType: "line",
    chartTitle: "5-Year Groundwater Trend in Maharashtra (Safe Areas)",
    chartData: [
      { label: "2019", value: 35 },
      { label: "2020", value: 38 },
      { label: "2021", value: 42 },
      { label: "2022", value: 46 },
      { label: "2023", value: 50 },
    ],
  },
  {
    question: "show me conservation methods",
    answer:
      "These are the effectiveness rates of different groundwater conservation methods. Artificial recharge shows the highest effectiveness at 85%.",
    chartType: "bar",
    chartTitle: "Effectiveness of Conservation Methods",
    chartData: [
      { label: "Rainwater Harvesting", value: 80, color: "#3B82F6" },
      { label: "Drip Irrigation", value: 75, color: "#10B981" },
      { label: "Watershed Management", value: 70, color: "#F59E0B" },
      { label: "Artificial Recharge", value: 85, color: "#8B5CF6" },
    ],
  },
  {
    question: "what is groundwater",
    answer:
      "Groundwater is the water found beneath the Earth's surface in soil pore spaces and in the fractures of rock formations. It's a crucial water resource that supplies drinking water to billions of people worldwide.",
  },
  {
    question: "why is groundwater important",
    answer:
      "Groundwater is vital because it provides drinking water for over 2 billion people globally, supports agricultural irrigation, maintains river flows during dry seasons, and serves as a buffer against climate variability.",
  },
  {
    question: "what is water recharge",
    answer:
      "Water recharge is the natural or artificial process where surface water infiltrates into the ground and replenishes underground aquifers. This can happen through rainfall, rivers, or human-made recharge structures.",
  },
  {
    question: "what does critical status mean",
    answer:
      "Critical status means groundwater extraction exceeds 90% of the annual recharge, indicating severe depletion. Immediate conservation measures and usage restrictions are necessary to prevent aquifer collapse.",
  },
];
const BarChart = ({ data, title }) => {
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mt-4 border border-blue-100">
      <h3 className="font-semibold text-lg mb-4 text-center text-blue-900">
        {title}
      </h3>
      <div className="flex items-end justify-between h-48 px-4 pb-4 border-b border-blue-200">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center w-16">
            <div className="text-xs text-blue-600 mb-1 font-medium">
              {item.value}%
            </div>
            <div
              className="w-12 rounded-t transition-all duration-700 flex items-end justify-center hover:opacity-80"
              style={{
                height: `${(item.value / maxValue) * 100}%`,
                backgroundColor: item.color,
                boxShadow: "0 2px 4px rgba(59, 130, 246, 0.1)",
              }}
            >
              <div className="text-white text-xs font-bold mb-1">
                {item.value}%
              </div>
            </div>
            <div className="text-xs mt-2 text-center font-medium text-blue-800">
              {item.label}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-3 flex-wrap">
        {data.map((item, index) => (
          <div key={index} className="flex items-center mx-2 mb-1">
            <div
              className="w-3 h-3 rounded-full mr-1"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-xs text-blue-700">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const PieChart = ({ data, title }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercent = 0;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mt-4 border border-blue-100">
      <h3 className="font-semibold text-lg mb-4 text-center text-blue-900">
        {title}
      </h3>
      <div className="flex flex-col md:flex-row items-center justify-center">
        <div className="relative w-40 h-40 mb-4 md:mb-0">
          <svg viewBox="0 0 100 100" className="w-40 h-40">
            {data.map((item, index) => {
              const percent = (item.value / total) * 100;
              const startPercent = cumulativePercent;
              cumulativePercent += percent;

              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="45"
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth="10"
                  strokeDasharray={`${percent} ${100 - percent}`}
                  strokeDashoffset={-startPercent + 25}
                  transform="rotate(-90 50 50)"
                  className="transition-all duration-500 hover:opacity-80"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-blue-800">100%</span>
          </div>
        </div>

        <div className="ml-0 md:ml-6">
          {data.map((item, index) => (
            <div key={index} className="flex items-center mb-2">
              <div
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm font-medium text-blue-800">
                {item.label}:
              </span>
              <span className="text-sm font-bold ml-1 text-blue-900">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LineChart = ({ data, title }) => {
  const values = data.map((item) => item.value);
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const range = maxValue - minValue;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mt-4 border border-blue-100">
      <h3 className="font-semibold text-lg mb-4 text-center text-blue-900">
        {title}
      </h3>
      <div className="h-48 relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-blue-600 w-8">
          <span>{maxValue}%</span>
          <span>{Math.round((maxValue + minValue) / 2)}%</span>
          <span>{minValue}%</span>
        </div>

        {/* Chart area */}
        <div className="ml-8 h-full border-b border-l border-blue-200 relative">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="lineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1E40AF" />
              </linearGradient>
            </defs>
            <polyline
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              points={data
                .map(
                  (item, i) =>
                    `${(i / (data.length - 1)) * 90 + 5},${
                      90 - ((item.value - minValue) / range) * 80 + 5
                    }`
                )
                .join(" ")}
            />
            {data.map((item, i) => (
              <circle
                key={i}
                cx={(i / (data.length - 1)) * 90 + 5}
                cy={90 - ((item.value - minValue) / range) * 80 + 5}
                r="4"
                fill="#1E40AF"
                stroke="white"
                strokeWidth="2"
                className="hover:r-6 transition-all"
              />
            ))}
          </svg>

          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-blue-600 -mb-6 px-2">
            {data.map((item, i) => (
              <div key={i} className="text-center">
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Language selector component
const LanguageSelector = ({ currentLanguage, onLanguageChange }) => {
  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिन्दी" },
    { code: "mr", name: "मराठी" },
    { code: "kn", name: "ಕನ್ನಡ" },
    { code: "ta", name: "தமிழ்" },
    { code: "te", name: "తెలుగు" },
  ];

  return (
    <div className="flex items-center space-x-2 mb-2">
      <span className="text-xs text-blue-700 font-medium">Language:</span>
      <select
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="text-xs border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  // Custom speech recognition implementation
  useEffect(() => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = getCurrentLanguageCode();

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    window.speechRecognitionInstance = recognition;

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [currentLanguage]);

  const getCurrentLanguageCode = () => {
    const langMap = {
      en: "en-US",
      hi: "hi-IN",
      mr: "mr-IN",
      kn: "kn-IN",
      ta: "ta-IN",
      te: "te-IN",
    };
    return langMap[currentLanguage] || "en-US";
  };

  const startListening = () => {
    if (window.speechRecognitionInstance && !isListening) {
      setTranscript("");
      setIsListening(true);
      window.speechRecognitionInstance.start();
    }
  };

  const stopListening = () => {
    if (window.speechRecognitionInstance && isListening) {
      window.speechRecognitionInstance.stop();
      setIsListening(false);
    }
  };

  const resetTranscript = () => {
    setTranscript("");
  };

  const isSpeechSupported = () => {
    return "webkitSpeechRecognition" in window || "SpeechRecognition" in window;
  };

  // 📢 Enhanced speak function with language support
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    // Set language based on selection
    const langMap = {
      en: "en-US",
      hi: "hi-IN",
      mr: "mr-IN",
      kn: "kn-IN",
      ta: "ta-IN",
      te: "te-IN",
    };
    utterance.lang = langMap[currentLanguage] || "en-US";
    utterance.rate = 0.9;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = (customInput = null) => {
    const query = customInput || input || transcript;
    if (!query.trim()) return;

    const userMessage = { sender: "user", text: query };
    let newMessages = [...messages, userMessage];

    // Enhanced search logic - more flexible matching
    const found = faqData.find((faq) => {
      const queryLower = query.toLowerCase();
      const questionLower = faq.question.toLowerCase();

      // Check for keyword matches
      const queryWords = queryLower.split(" ");
      const questionWords = questionLower.split(" ");

      // If any significant words match, consider it a match
      const significantWords = [
        "groundwater",
        "maharashtra",
        "karnataka",
        "status",
        "levels",
        "conservation",
        "trends",
        "compare",
        "critical",
        "safe",
      ];
      const matchingWords = queryWords.filter(
        (word) =>
          questionWords.some((qWord) => qWord.includes(word)) ||
          significantWords.includes(word)
      );

      return (
        matchingWords.length >= 1 ||
        questionLower.includes(queryLower) ||
        queryLower.includes(questionLower)
      );
    });

    let answer = found
      ? found.answer
      : "I'm here to help with groundwater-related questions. Try asking about groundwater status in specific states, conservation methods, or trends. You can also ask me to 'show groundwater status of Maharashtra' or 'compare state groundwater levels'.";

    let chartComponent = null;
    if (found && found.chartData) {
      switch (found.chartType) {
        case "bar":
          chartComponent = (
            <BarChart data={found.chartData} title={found.chartTitle} />
          );
          break;
        case "pie":
          chartComponent = (
            <PieChart data={found.chartData} title={found.chartTitle} />
          );
          break;
        case "line":
          chartComponent = (
            <LineChart data={found.chartData} title={found.chartTitle} />
          );
          break;
        default:
          chartComponent = null;
      }
    }

    const botMessage = {
      sender: "bot",
      text: answer,
      chart: chartComponent,
    };

    newMessages = [...newMessages, botMessage];
    setMessages(newMessages);
    setInput("");
    resetTranscript();

    // 🔊 Speak out the bot reply
    speak(answer);
  };

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    // Update speech recognition language
    if (window.speechRecognitionInstance) {
      window.speechRecognitionInstance.lang = getCurrentLanguageCode();
    }
  };

  if (!isSpeechSupported()) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-6 border border-blue-200">
        <div className="text-red-500 font-medium flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Your browser does not support voice recognition.
        </div>
      </div>
    );
  }

  return (
    <div
      className={`max-w-2xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden mt-6 transition-all duration-300 border border-blue-200 ${
        isMinimized ? "h-16" : "h-auto"
      }`}
    >
      <div
        className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white p-4 flex justify-between items-center cursor-pointer"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <h2 className="text-xl font-bold flex items-center">
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
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          INGRES AI Assistant
        </h2>
        <button className="text-blue-100 hover:text-white transition-colors">
          {isMinimized ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>

      {!isMinimized && (
        <>
          <div className="h-80 overflow-y-auto p-4 bg-gradient-to-b from-blue-50 to-white">
            {messages.length === 0 ? (
              <div className="text-center text-gray-600 py-8">
                <div className="bg-white rounded-lg p-6 shadow-md border border-blue-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mx-auto text-blue-500 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  <p className="text-xl font-bold text-blue-900 mb-2">
                    AI Groundwater Assistant
                  </p>
                  <p className="text-blue-700 mb-4">
                    Get real-time groundwater data, trends, and conservation
                    insights
                  </p>
                  <div className="mt-6 text-sm bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="font-semibold text-blue-800 mb-2">
                      Try asking:
                    </p>
                    <div className="space-y-1 text-left">
                      <p className="text-blue-700">
                        • "Show me groundwater levels in Maharashtra"
                      </p>
                      <p className="text-blue-700">
                        • "What's the status in Karnataka?"
                      </p>
                      <p className="text-blue-700">
                        • "Compare state groundwater levels"
                      </p>
                      <p className="text-blue-700">
                        • "Show conservation methods effectiveness"
                      </p>
                      <p className="text-blue-700">• "Trends in Maharashtra"</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div key={i}>
                  <div
                    className={`flex mb-4 ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-none shadow-md"
                          : "bg-white text-gray-800 rounded-bl-none shadow-md border border-blue-100"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                  {msg.chart && (
                    <div className="flex justify-start mb-6">
                      <div className="max-w-full">{msg.chart}</div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t border-blue-200 bg-white">
            {/* Language Selector */}
            <LanguageSelector
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
            />

            {/* Typing input */}
            <div className="flex mb-3">
              <input
                type="text"
                value={input}
                placeholder="Type your groundwater question here..."
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 border border-blue-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={() => handleSend()}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 rounded-r-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center"
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
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>

            {/* 🎤 Enhanced Voice controls */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={startListening}
                disabled={isListening}
                className="flex items-center bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-2 rounded-lg text-sm hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
                {isListening ? "Listening..." : "Start Speaking"}
              </button>
              <button
                onClick={stopListening}
                disabled={!isListening}
                className="flex items-center bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-lg text-sm hover:from-red-600 hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Stop
              </button>
              <button
                onClick={() => handleSend(transcript)}
                disabled={!transcript}
                className="flex items-center bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-2 rounded-lg text-sm hover:from-purple-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Send Voice
              </button>
            </div>

            {isListening && (
              <div className="mt-3 flex items-center text-green-600 font-medium bg-green-50 p-2 rounded-lg border border-green-200">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
                Listening for your question...
              </div>
            )}
            {transcript && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200 text-sm">
                <span className="font-medium text-blue-800">You said:</span>
                <span className="text-blue-700"> {transcript}</span>
              </div>
            )}
          </div>
        </>
      )}

      {!isMinimized && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-2 px-4 text-center text-xs text-blue-100">
          INGRES AI Assistant © 2025 | Real-time Groundwater Monitoring System
        </div>
      )}
    </div>
  );
}
