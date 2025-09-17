// App.jsx (main entry point with all components integrated)
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Chatbot from "./components/Chatbot";
import RegionSelector from "./components/RegionSelector";
import Alerts from "./components/Alerts";
import CommunityFeedback from "./components/CommunityFeedback";
import ComparativeAnalysis from "./components/ComparativeAnalysis";
import WaterBudget from "./components/WaterBudget";
import KnowledgeAction from "./components/KnowledgeAction";
import Dashboard from "./components/Dashboard";
import About from "./components/About";
import "./App.css";
import FAQ from "./components/FAQ";
import MapView from "./components/MapView";
import Indicators from "./components/Indicators";
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for animations
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-teal-700 font-medium">
            Loading INGRES Assistant...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
        <Navbar />
        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chatbot />} />
            <Route path="/region" element={<RegionSelector />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/community" element={<CommunityFeedback />} />
            <Route path="/analysis" element={<ComparativeAnalysis />} />
            <Route path="/budget" element={<WaterBudget />} />
            <Route path="/knowledge" element={<KnowledgeAction />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/indicators" element={<Indicators />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <footer className="bg-teal-800 text-white text-center py-4 mt-8">
          <p>
            INGRES Virtual Assistant © {new Date().getFullYear()} | Groundwater
            Management System
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
