import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import MarkdownRenderer from "../components/MarkdownRenderer";
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import apiConfig from "../config/apiConfig";

const CopilotChat = () => {
  const location = useLocation();
  const initialAssistant = location.state?.initialAssistant;
  const [messages, setMessages] = useState(
    initialAssistant
      ? [{ role: "assistant", content: initialAssistant }]
      : []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput(""); // Clear input immediately after sending
    setLoading(true);
    try {
      const response = await fetch(apiConfig.CHAT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Error: Could not get response." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    // Shift+Ctrl inserts a new line
    if (e.key === "Enter" && e.shiftKey && e.ctrlKey) {
      e.preventDefault();
      const textarea = e.target;
      const value = input;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = value.slice(0, start) + "\n" + value.slice(end);
      setInput(newValue);
      // Move cursor to after the new line
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }, 0);
      return;
    }
    // Regular Enter sends message
    if (e.key === "Enter" && !loading && !(e.shiftKey || e.ctrlKey)) {
      sendMessage();
    }
  };


  // Helper for avatars
  const getAvatar = (role) => {
    if (role === "user") {
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500 text-white font-bold shadow-md animate-fade-in">
          <span>U</span>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-200 text-indigo-800 font-bold shadow-md animate-fade-in">
        <span>C</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-indigo-900 flex flex-col items-center justify-center">
      <div className="w-full max-w-screen p-4 sm:p-3 bg-gray-900 rounded-2xl shadow-2xl text-white animate-fade-in">
        <h2 className="text-3xl font-bold mb-6 text-indigo-300 tracking-tight text-left drop-shadow">Copilot Chat</h2>
        <div className="bg-gray-800 text-indigo-100 p-4 sm:p-2 rounded-xl shadow-lg flex flex-col h-[90vh] sm:h-[90vh] relative">
          <div className="flex-1 overflow-y-auto bg-gray-900 rounded-xl p-4 custom-scrollbar pb-28">
            {messages.map((msg, idx) => (
              <div key={idx} className={`mb-4 flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""} animate-fade-in`}>
                {getAvatar(msg.role)}
                <div className={`max-w-[75%] p-3 rounded-2xl shadow-md transition-all duration-200 ${msg.role === "user" ? "bg-indigo-600 text-white" : "bg-gray-700 text-indigo-200"}`}>
                  {msg.role === "assistant" ? (
                    <MarkdownRenderer content={msg.content} />
                  ) : (
                    <span>{msg.content}</span>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="mb-4 flex items-end gap-2 animate-pulse">
                {getAvatar("assistant")}
                <div className="max-w-[70%] p-3 rounded-2xl shadow-md bg-gray-700 text-indigo-200">
                  <span>Thinking...</span>
                </div>
              </div>
            )}
          </div>
          <div className="fixed left-0 right-0 bottom-0 w-full max-w-4xl mx-auto px-4 pb-4 z-10">
            <div className="relative flex items-center gap-2 bg-gray-900 rounded-xl shadow-lg p-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 p-2 pr-10 rounded-xl bg-gray-800 border border-gray-600 text-white resize-none h-12 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="Type your message..."
                disabled={loading}
                rows={2}
                style={{ minHeight: 48 }}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="absolute right-3 bottom-3 bg-indigo-600 hover:bg-indigo-800 p-2 rounded-full text-white flex items-center justify-center shadow-lg transition-all duration-200"
                style={{ pointerEvents: loading || !input.trim() ? 'none' : 'auto', opacity: loading || !input.trim() ? 0.5 : 1 }}
                tabIndex={-1}
              >
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; background: #232946; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #4f46e5; border-radius: 4px; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px);} to { opacity: 1; transform: none; } }
        .animate-fade-in { animation: fade-in 0.5s; }
      `}</style>
    </div>
  );
};

export default CopilotChat;
