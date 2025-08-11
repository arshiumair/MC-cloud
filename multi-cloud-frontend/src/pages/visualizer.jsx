import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
// Example custom node type (can be extended)
const nodeTypes = {};

// Simple parser for extracting components from markdown (can be improved for JSON)
function parseComponents(markdown) {
  // Example: look for table rows like | EC2 | ... |
  const regex = /\|\s*([\w\s-]+)\s*\|/g;
  const components = new Set();
  let match;
  while ((match = regex.exec(markdown))) {
    if (match[1] && match[1].toLowerCase() !== 'service') {
      components.add(match[1].trim());
    }
  }
  return Array.from(components);
}

const Visualizer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const geminiResponse = location.state?.result || "";

  // Parse components from markdown (improve as needed)
  const components = parseComponents(geminiResponse);

  // Create nodes and edges for React Flow
  const nodes = components.map((comp, idx) => ({
    id: String(idx),
    data: { label: comp },
    position: { x: 100 + idx * 180, y: 200 },
    style: { minWidth: 120, background: '#3730a3', color: '#fff', borderRadius: 8, border: '2px solid #6366f1' },
  }));
  // Simple linear edges (improve for real relationships)
  const edges = components.slice(1).map((_, idx) => ({
    id: `e${idx}-${idx+1}`,
    source: String(idx),
    target: String(idx+1),
    animated: true,
    style: { stroke: '#6366f1', strokeWidth: 2 },
  }));

  return (
    <div className="min-h-screen bg-indigo-950 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl p-6 bg-gray-900 rounded-lg shadow-lg text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-indigo-400">Architecture Visualizer</h2>
          <button onClick={() => navigate(-1)} className="bg-indigo-600 hover:bg-indigo-800 px-4 py-2 rounded text-white">Back</button>
        </div>
        <div className="h-[60vh] w-full bg-gray-800 rounded-lg">
          <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
