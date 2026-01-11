"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code2, GitBranch, Activity } from "lucide-react";

interface GitHubData {
  currentProject: string;
  lastCommit: string;
  activeRepos: number;
}

export default function GitHubActivity() {
  const [githubData, setGithubData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockData: GitHubData = {
      currentProject: "AI-Powered Portfolio",
      lastCommit: "2 hours ago",
      activeRepos: 8,
    };
    
    setTimeout(() => {
      setGithubData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-white/60">
        <Activity className="h-4 w-4 animate-pulse" />
        <span className="text-sm">Loading activity...</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-2 mt-4"
    >
      <div className="flex items-center gap-2 text-accent">
        <Code2 className="h-4 w-4" />
        <span className="text-sm font-semibold">Currently working on:</span>
      </div>
      <div className="bg-white/5 border border-accent/20 rounded-lg p-3 space-y-2">
        <div className="flex items-center gap-2">
          <GitBranch className="h-4 w-4 text-accent" />
          <span className="text-sm text-white/90">{githubData?.currentProject}</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-white/60">
          <span>Last commit: {githubData?.lastCommit}</span>
          <span>•</span>
          <span>{githubData?.activeRepos} active repos</span>
        </div>
      </div>
    </motion.div>
  );
}
