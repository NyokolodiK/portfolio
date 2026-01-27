"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, ArrowRight, Lightbulb } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

interface TourStep {
  title: string;
  description: string;
  highlight?: string;
}

const TOUR_STEPS: { [key: string]: TourStep[] } = {
  "/": [
    {
      title: "Welcome to my portfolio!",
      description: "I'm Kagiso, a Senior Software Engineer AI Enthusiast. Let me show you around.",
    },
    {
      title: "AI-Powered Experience",
      description: "Notice the AI chat assistant in the bottom right? Feel free to ask questions about my work anytime.",
    },
    {
      title: "Live GitHub Activity",
      description: "See what I'm currently working on with real-time updates from my GitHub.",
    },
    {
      title: "Daily Developer Tips",
      description: "Get insights and best practices I've learned throughout my career.",
    }
  ],
  "/projects": [
    {
      title: "My Project Showcase",
      description: "Here are some of the projects I'm most proud of, with detailed insights.",
    },
    {
      title: "AI Project Insights",
      description: "Each project includes AI-powered metrics showing complexity, team size, and duration.",
    }
  ],
  "/work": [
    {
      title: "Experience & Skills",
      description: "Explore my professional journey and technical expertise.",
    },
    {
      title: "Interactive Skill Cards",
      description: "Hover over any skill to see detailed proficiency insights powered by AI.",
    }
  ],
  "/services": [
    {
      title: "Services I Offer",
      description: "From frontend to backend, I provide comprehensive development services.",
    }
  ],
  "/contact": [
    {
      title: "Let's Connect",
      description: "Ready to work together? Use the contact form or reach out directly.",
    }
  ]
};

export default function AITourGuide() {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenTour, setHasSeenTour] = useState(true);
  const pathname = usePathname();
  const steps = TOUR_STEPS[pathname] || [];

  useEffect(() => {
    const seen = localStorage.getItem("tour-completed");
    if (!seen && pathname === "/") {
      setTimeout(() => {
        setHasSeenTour(false);
        setIsActive(true);
      }, 2000);
    }
  }, [pathname]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  };

  const handleSkip = () => {
    completeTour();
  };

  const completeTour = () => {
    setIsActive(false);
    setCurrentStep(0);
    localStorage.setItem("tour-completed", "true");
    setHasSeenTour(true);
  };

  const startTour = () => {
    setCurrentStep(0);
    setIsActive(true);
  };

  if (steps.length === 0) return null;

  return (
    <>
      {hasSeenTour && (
        <Button
          variant="outlined"
          size="sm"
          onClick={startTour}
          className="fixed bottom-4 left-4 z-40 flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
        >
          <Lightbulb className="h-4 w-4" />
          <span className="hidden sm:inline">Tour</span>
        </Button>
      )}

      <AnimatePresence>
        {isActive && steps[currentStep] && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-32 right-4 w-80 sm:w-96 bg-gradient-to-br from-accent/20 to-accent/10 backdrop-blur-xl border border-accent/30 rounded-lg shadow-2xl z-50 overflow-hidden"
          >
            <div className="bg-accent/20 p-3 flex items-center justify-between border-b border-accent/20">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent animate-pulse" />
                <span className="text-sm font-semibold text-white">AI Tour Guide</span>
              </div>
              <button
                onClick={handleSkip}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <X className="h-4 w-4 text-white/60" />
              </button>
            </div>

            <div className="p-4">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-lg font-bold text-white mb-2">
                  {steps[currentStep].title}
                </h3>
                <p className="text-sm text-white/80 mb-4">
                  {steps[currentStep].description}
                </p>
              </motion.div>

              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 rounded-full transition-all ${index === currentStep
                          ? "w-8 bg-accent"
                          : index < currentStep
                            ? "w-1.5 bg-accent/50"
                            : "w-1.5 bg-white/20"
                        }`}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleSkip}
                    className="text-sm text-white/60 hover:text-white px-3 py-1 rounded transition-colors"
                  >
                    Skip
                  </button>
                  <Button
                    onClick={handleNext}
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    {currentStep < steps.length - 1 ? (
                      <>
                        Next
                        <ArrowRight className="h-4 w-4" />
                      </>
                    ) : (
                      "Finish"
                    )}
                  </Button>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-accent/20">
                <p className="text-xs text-white/40 text-center">
                  Step {currentStep + 1} of {steps.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
