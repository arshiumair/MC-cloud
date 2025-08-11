
// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Estimate from "./pages/estimate";
import Recommendation from "./pages/recommendation";
import CopilotChat from "./pages/copilotChat";
import Footer from "./components/Footer";


function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex items-center shadow-md relative">
  {/* Left-aligned brand title */}
  <div className="text-2xl font-bold text-indigo-500">MC Console</div>

  {/* Center-aligned nav links */}
  <div className="absolute left-1/2 transform -translate-x-1/2">
    <ul className="flex space-x-8 text-lg font-medium">
      <li>
        <Link to="/" className="hover:text-indigo-400 transition">
          Home
        </Link>
      </li>
      <li>
        <Link to="/estimate" className="hover:text-indigo-400 transition">
          Estimate
        </Link>
      </li>
    </ul>
  </div>
</nav>
  );
}

function Home() {
  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-semibold mb-4 text-indigo-400">Welcome</h1>
      <p className="text-gray-300">This is the MultiCloud Console Dashboard.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/estimate" element={<Estimate />} />
            <Route path="/recommendation" element={<RecommendationWrapper />} />
            <Route path="/copilot-chat" element={<CopilotChat />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}



// Wrapper to get location state for Recommendation 
function RecommendationWrapper() {
  const location = useLocation();
  const result = location.state?.result || "No recommendation available.";
  return <Recommendation result={result} />;
}

export default App;
