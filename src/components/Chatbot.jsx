// Chatbot.jsx
import { useState } from "react";
import faqData from "../data/faqData";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

// Improved Chart components
const BarChart = ({ data, title }) => {
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4 border border-gray-200">
      <h3 className="font-semibold text-lg mb-4 text-center text-gray-800">
        {title}
      </h3>
      <div className="flex items-end justify-between h-48 px-4 pb-4 border-b border-gray-300">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center w-16">
            <div className="text-xs text-gray-600 mb-1">{item.value}%</div>
            <div
              className="w-12 rounded-t transition-all duration-500 flex items-end justify-center"
              style={{
                height: `${(item.value / maxValue) * 100}%`,
                backgroundColor: item.color,
              }}
            >
              <div className="text-white text-xs font-bold mb-1">
                {item.value}%
              </div>
            </div>
            <div className="text-xs mt-2 text-center font-medium text-gray-700">
              {item.label}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center mx-2">
            <div
              className="w-3 h-3 rounded-full mr-1"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-xs text-gray-600">{item.label}</span>
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
    <div className="bg-white p-4 rounded-lg shadow-md mt-4 border border-gray-200">
      <h3 className="font-semibold text-lg mb-4 text-center text-gray-800">
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
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-gray-700">100%</span>
          </div>
        </div>

        <div className="ml-0 md:ml-6">
          {data.map((item, index) => (
            <div key={index} className="flex items-center mb-2">
              <div
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm font-medium text-gray-700">
                {item.label}:
              </span>
              <span className="text-sm font-bold ml-1 text-gray-800">
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
    <div className="bg-white p-4 rounded-lg shadow-md mt-4 border border-gray-200">
      <h3 className="font-semibold text-lg mb-4 text-center text-gray-800">
        {title}
      </h3>
      <div className="h-48 relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-600 w-8">
          <span>{maxValue}%</span>
          <span>{Math.round((maxValue + minValue) / 2)}%</span>
          <span>{minValue}%</span>
        </div>

        {/* Chart area */}
        <div className="ml-8 h-full border-b border-gray-300 border-l relative">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polyline
              fill="none"
              stroke="#0da487"
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
                fill="#0da487"
                stroke="white"
                strokeWidth="2"
              />
            ))}
          </svg>

          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-600 -mb-6 px-2">
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

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);

  // 🎤 Speech recognition
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  // 📢 Speak function
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = (customInput = null) => {
    const query = customInput || input || transcript;
    if (!query.trim()) return;

    const userMessage = { sender: "user", text: query };
    let newMessages = [...messages, userMessage];

    // 🔎 Find matching FAQ answer
    const found = faqData.find((faq) =>
      query.toLowerCase().includes(faq.question.toLowerCase())
    );

    let answer = found
      ? found.answer
      : "Sorry, I don't understand. Please try another question related to groundwater management.";

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

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-6">
        <div className="text-red-500 font-medium">
          Your browser does not support voice recognition.
        </div>
      </div>
    );
  }

  return (
    <div
      className={`max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-6 transition-all duration-300 ${
        isMinimized ? "h-16" : "h-auto"
      }`}
    >
      <div
        className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-4 flex justify-between items-center cursor-pointer"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <h2 className="text-xl font-bold flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
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
          INGRES Assistant
        </h2>
        <button className="text-teal-100 hover:text-white">
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
          <div className="h-80 overflow-y-auto p-4 bg-gray-50">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-teal-400 mb-2"
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
                <p className="text-lg font-medium text-gray-700 mb-2">
                  AI Groundwater Assistant
                </p>
                <p>
                  Hello! Ask me about groundwater levels, trends, or
                  conservation methods.
                </p>
                <div className="mt-4 text-sm bg-teal-50 p-3 rounded-lg border border-teal-100">
                  <p className="font-medium text-teal-700">Try asking:</p>
                  <p className="mt-1">
                    "Show me groundwater levels in Maharashtra"
                  </p>
                  <p>"What's the status in Karnataka?"</p>
                  <p>"Compare state groundwater levels"</p>
                  <p>"Show conservation methods effectiveness"</p>
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
                          ? "bg-teal-600 text-white rounded-br-none"
                          : "bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-200"
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

          <div className="p-4 border-t border-gray-200">
            {/* Typing input */}
            <div className="flex mb-3">
              <input
                type="text"
                value={input}
                placeholder="Type your question here..."
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <button
                onClick={() => handleSend()}
                className="bg-teal-600 text-white px-4 rounded-r-lg hover:bg-teal-700 transition-colors flex items-center"
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
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* 🎤 Voice controls */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={SpeechRecognition.startListening}
                className="flex items-center bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
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
                Start Speaking
              </button>
              <button
                onClick={SpeechRecognition.stopListening}
                className="flex items-center bg-red-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
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
                className="flex items-center bg-purple-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors"
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
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Send Voice
              </button>
            </div>

            {listening && (
              <div className="mt-3 flex items-center text-red-500 font-medium">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
                Listening...
              </div>
            )}
            {transcript && (
              <div className="mt-3 p-2 bg-yellow-50 rounded border border-yellow-200 text-sm">
                <span className="font-medium">You said:</span> {transcript}
              </div>
            )}
          </div>
        </>
      )}

      {!isMinimized && (
        <div className="bg-gray-100 py-2 px-4 text-center text-xs text-gray-600 border-t border-gray-200">
          INGRES Virtual Assistant © 2025 | Groundwater Management System
        </div>
      )}
    </div>
  );
}

Chatbot.jsx;
