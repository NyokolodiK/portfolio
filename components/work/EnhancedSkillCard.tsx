"use client";

import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Sparkles, TrendingUp } from "lucide-react";
import { ReactNode, useState } from "react";

interface SkillProficiency {
  yearsOfExperience: number;
  proficiencyLevel: string;
  recentProjects: number;
  trend: "up" | "stable";
  aiInsight: string;
}

interface EnhancedSkillCardProps {
  title: string;
  icon: ReactNode;
  proficiency?: SkillProficiency;
}

const DEFAULT_PROFICIENCIES: { [key: string]: SkillProficiency } = {
  "React": {
    yearsOfExperience: 7,
    proficiencyLevel: "Expert",
    recentProjects: 15,
    trend: "up",
    aiInsight: "Leading 20+ React projects with advanced patterns like custom hooks, context optimization, and performance tuning"
  },
  "TypeScript": {
    yearsOfExperience: 5,
    proficiencyLevel: "Expert",
    recentProjects: 12,
    trend: "up",
    aiInsight: "Building type-safe applications with advanced TypeScript features including generics, utility types, and strict mode"
  },
  "Next.js": {
    yearsOfExperience: 4,
    proficiencyLevel: "Expert",
    recentProjects: 10,
    trend: "up",
    aiInsight: "Architecting full-stack Next.js apps with SSR, ISR, and API routes for optimal performance"
  },
  "Node.js": {
    yearsOfExperience: 8,
    proficiencyLevel: "Expert",
    recentProjects: 18,
    trend: "stable",
    aiInsight: "Building scalable backend services with Express, NestJS, and microservices architecture"
  },
  "JavaScript": {
    yearsOfExperience: 10,
    proficiencyLevel: "Expert",
    recentProjects: 25,
    trend: "stable",
    aiInsight: "Mastering modern ES6+ features and functional programming paradigms"
  },
  "Angular": {
    yearsOfExperience: 6,
    proficiencyLevel: "Advanced",
    recentProjects: 8,
    trend: "stable",
    aiInsight: "Enterprise Angular applications with RxJS, NgRx state management, and modular architecture"
  },
  "Vue.js": {
    yearsOfExperience: 4,
    proficiencyLevel: "Advanced",
    recentProjects: 6,
    trend: "stable",
    aiInsight: "Building reactive Vue applications with Composition API and Pinia state management"
  },
};

export default function EnhancedSkillCard({ title, icon, proficiency }: EnhancedSkillCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const skillData = proficiency || DEFAULT_PROFICIENCIES[title];

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <motion.div
            className="relative w-full h-[150px] bg-[#232329] flex items-center justify-center group cursor-pointer overflow-hidden"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            
            <motion.div 
              className="text-6xl group-hover:text-accent transition-all duration-300 relative z-10"
              animate={isHovered ? { y: -10, scale: 1.1 } : { y: 0, scale: 1 }}
            >
              {icon}
            </motion.div>

            {skillData && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                className="absolute bottom-2 left-2 right-2 flex items-center justify-between z-10"
              >
                <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                  <Sparkles className="h-3 w-3 text-accent" />
                  <span className="text-xs text-white font-semibold">{skillData.proficiencyLevel}</span>
                </div>
                {skillData.trend === "up" && (
                  <div className="flex items-center gap-1 bg-green-500/20 backdrop-blur-sm px-2 py-1 rounded">
                    <TrendingUp className="h-3 w-3 text-green-400" />
                    <span className="text-xs text-green-400">Growing</span>
                  </div>
                )}
              </motion.div>
            )}

            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-accent/20 backdrop-blur-sm p-1 rounded-full">
                <Sparkles className="h-3 w-3 text-accent animate-pulse" />
              </div>
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-4 bg-[#232329] border-accent/20">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="font-bold text-accent">{title}</p>
              {skillData && (
                <span className="text-xs bg-accent/20 px-2 py-0.5 rounded text-accent">
                  {skillData.yearsOfExperience}+ years
                </span>
              )}
            </div>
            {skillData && (
              <>
                <div className="flex items-center gap-4 text-xs text-white/60">
                  <span>{skillData.recentProjects} projects</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Active
                  </span>
                </div>
                <div className="border-t border-white/10 pt-2">
                  <div className="flex items-start gap-2">
                    <Sparkles className="h-3 w-3 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-white/80 leading-relaxed">{skillData.aiInsight}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
