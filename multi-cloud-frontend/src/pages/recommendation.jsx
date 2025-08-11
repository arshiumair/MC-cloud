import React from "react";
import MarkdownRenderer from "../components/MarkdownRenderer";
import { useNavigate } from "react-router-dom";

const Recommendation = ({ result }) => {
  const navigate = useNavigate();


  const handleAskCopilot = () => {
    navigate("/copilot-chat", { state: { initialAssistant: result } });
  };


  return (
    <div className="min-h-screen bg-indigo-950 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl p-8 bg-gray-900 rounded-lg shadow-lg text-white mb-8">
        <h2 className="text-2xl font-bold mb-6 text-indigo-400">Gemini Recommendation</h2>
        <div className="bg-gray-800 text-indigo-100 p-8 rounded-lg shadow-lg">
          <MarkdownRenderer content={result} />
        </div>
        <div className="flex gap-4 mt-8 justify-center">
          <button
            className="bg-indigo-500 hover:bg-indigo-700 px-6 py-2 rounded text-white font-semibold"
            onClick={handleAskCopilot}
          >
            Ask Copilot
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
