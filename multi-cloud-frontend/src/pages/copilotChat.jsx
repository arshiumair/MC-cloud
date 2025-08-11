import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import MarkdownRenderer from "../components/MarkdownRenderer";
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

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
    setLoading(true);
    try {
      const response = await fetch("http://13.232.83.252:8000/chat", {
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
      setInput("");
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

  return (
    <div className="min-h-screen bg-indigo-950 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl p-6 bg-gray-900 rounded-lg shadow-lg text-white">
        <h2 className="text-2xl font-bold mb-6 text-indigo-400">Copilot Chat</h2>
        <div className="bg-gray-800 text-indigo-100 p-8 rounded-lg shadow-lg flex flex-col h-[80vh]">
          <div className="flex-1 overflow-y-auto mb-4 bg-gray-900 rounded p-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`mb-4 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] p-3 rounded-lg ${msg.role === "user" ? "bg-indigo-600 text-white" : "bg-gray-700 text-indigo-200"}`}>
                  {msg.role === "assistant" ? (
                    <MarkdownRenderer content={msg.content} />
                  ) : (
                    <span>{msg.content}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="relative flex items-center gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 p-2 pr-10 rounded bg-gray-800 border border-gray-600 text-white resize-none h-16"
              placeholder="Type your message..."
              disabled={loading}
              rows={2}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="absolute right-3 bottom-3 bg-indigo-600 hover:bg-indigo-800 p-2 rounded-full text-white flex items-center justify-center shadow"
              style={{ pointerEvents: loading || !input.trim() ? 'none' : 'auto', opacity: loading || !input.trim() ? 0.5 : 1 }}
              tabIndex={-1}
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopilotChat;
