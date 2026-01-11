"use client";

import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Users, Clock, Code2 } from "lucide-react";

interface ProjectInsightsProps {
  metrics: {
    complexity: string;
    teamSize: number;
    duration: string;
    aiSuggestion: string;
  };
  stack: { name: string }[];
}

export default function ProjectInsights({ metrics, stack }: ProjectInsightsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-accent/5 border border-accent/20 rounded-lg p-4 mb-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-4 w-4 text-accent" />
        <span className="text-sm font-semibold text-accent">AI Project Insights</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/5 rounded-lg p-3"
        >
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-3 w-3 text-accent" />
            <p className="text-xs text-white/60">Complexity</p>
          </div>
          <p className="text-sm text-white font-semibold">{metrics.complexity}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/5 rounded-lg p-3"
        >
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-3 w-3 text-accent" />
            <p className="text-xs text-white/60">Team Size</p>
          </div>
          <p className="text-sm text-white font-semibold">{metrics.teamSize} {metrics.teamSize === 1 ? 'developer' : 'developers'}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/5 rounded-lg p-3"
        >
          <div className="flex items-center gap-2 mb-1">
            <Clock className="h-3 w-3 text-accent" />
            <p className="text-xs text-white/60">Duration</p>
          </div>
          <p className="text-sm text-white font-semibold">{metrics.duration}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/5 rounded-lg p-3"
        >
          <div className="flex items-center gap-2 mb-1">
            <Code2 className="h-3 w-3 text-accent" />
            <p className="text-xs text-white/60">Technologies</p>
          </div>
          <p className="text-sm text-white font-semibold">{stack.length} tools</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="pt-3 border-t border-accent/10"
      >
        <p className="text-xs text-white/70 italic leading-relaxed">
          &quot;{metrics.aiSuggestion}&quot;
        </p>
      </motion.div>
    </motion.div>
  );
}
