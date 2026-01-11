"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Sparkles } from "lucide-react";

const DEV_TIPS = [
  "Always write tests first - it saves debugging time later",
  "Code reviews are about learning, not ego",
  "Optimize for readability first, performance second",
  "Document your assumptions, not just your code",
  "Break big problems into smaller, testable units",
  "Embrace TypeScript - it catches bugs before runtime",
  "Version control is your safety net - commit often",
  "User experience trumps technical perfection",
  "Refactor regularly to prevent technical debt",
  "Learn by building, not just by reading",
];

export default function DailyDevTip() {
  const [tip, setTip] = useState("");

  useEffect(() => {
    const today = new Date().getDate();
    const tipIndex = today % DEV_TIPS.length;
    setTip(DEV_TIPS[tipIndex]);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-lg p-4 mt-4"
    >
      <div className="flex items-start gap-3">
        <div className="relative">
          <Lightbulb className="h-5 w-5 text-accent" />
          <Sparkles className="h-3 w-3 text-accent absolute -top-1 -right-1 animate-pulse" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-accent font-semibold mb-1">💡 Daily Dev Tip from Kagiso</p>
          <p className="text-sm text-white/80 italic">&quot;{tip}&quot;</p>
        </div>
      </div>
    </motion.div>
  );
}
