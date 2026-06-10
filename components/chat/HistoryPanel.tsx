"use client";

import { motion } from "framer-motion";

export default function HistoryPanel({ history, onClearHistory, onPromptClick }) {
  if (!history || history.length === 0) return null;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="bg-accent/5 border-b border-accent/20 overflow-hidden"
    >
      <div className="p-3 max-h-32 overflow-y-auto">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-white/60 font-semibold">Recent Questions</p>
          <button onClick={onClearHistory} className="text-xs text-accent hover:text-accent-hover">
            Clear
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {history.slice(-5).map((item, index) => (
            <button
              key={index}
              onClick={() => onPromptClick(item)}
              className="text-xs bg-white/5 hover:bg-white/10 px-2 py-1 rounded text-white/80 transition-colors"
            >
              {item.length > 30 ? `${item.substring(0, 30)}...` : item}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
