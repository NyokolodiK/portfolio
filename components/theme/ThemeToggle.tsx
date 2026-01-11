"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showAiSuggestion, setShowAiSuggestion] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const hour = new Date().getHours();
    const isNightTime = hour >= 18 || hour < 6;
    const suggestedTheme = isNightTime ? "dark" : "light";
    
    if (theme !== suggestedTheme && !localStorage.getItem('theme-suggestion-dismissed')) {
      setTimeout(() => setShowAiSuggestion(true), 3000);
    }
  }, [theme]);

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setShowAiSuggestion(false);
  };

  const dismissSuggestion = () => {
    setShowAiSuggestion(false);
    localStorage.setItem('theme-suggestion-dismissed', 'true');
  };

  if (!mounted) return null;

  return (
    <div className="relative">
      <Button
        variant="outlined"
        size="sm"
        onClick={handleThemeChange}
        className="relative overflow-hidden w-12 h-12 p-0"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      <AnimatePresence>
        {showAiSuggestion && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute top-12 right-0 w-64 bg-accent/10 backdrop-blur-lg border border-accent/20 rounded-lg p-3 shadow-xl z-50"
          >
            <div className="flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-white/90 mb-2">
                  AI suggests switching to {theme === "dark" ? "light" : "dark"} mode based on the time of day
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleThemeChange}
                    className="text-xs bg-accent text-primary px-2 py-1 rounded hover:bg-accent-hover transition-colors"
                  >
                    Switch
                  </button>
                  <button
                    onClick={dismissSuggestion}
                    className="text-xs text-white/60 hover:text-white px-2 py-1 rounded transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
