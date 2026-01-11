"use client";

import { motion } from "framer-motion";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import { Sparkles, TrendingUp, Users, Clock } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface ProjectMetrics {
  complexity: string;
  teamSize: number;
  duration: string;
  aiSuggestion?: string;
}

interface EnhancedProjectCardProps {
  num: string;
  category: string;
  title: string;
  description: string;
  stack: { name: string }[];
  image: string;
  live: string;
  github: string;
  metrics?: ProjectMetrics;
}

export default function EnhancedProjectCard({
  num,
  title,
  description,
  stack,
  image,
  live,
  github,
  metrics = {
    complexity: "High",
    teamSize: 3,
    duration: "3 months",
    aiSuggestion: "Great for showcasing full-stack expertise"
  }
}: EnhancedProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className="flex flex-col xl:flex-row gap-8">
        <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
          <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
            {num}
          </div>
          
          <motion.h2 
            className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize"
            whileHover={{ x: 10 }}
          >
            {title}
          </motion.h2>

          <p className="text-white/60 mb-4">{description}</p>

          <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-semibold text-accent">AI Project Insights</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-3 w-3 text-white/60" />
                <div>
                  <p className="text-white/40">Complexity</p>
                  <p className="text-white font-semibold">{metrics.complexity}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-3 w-3 text-white/60" />
                <div>
                  <p className="text-white/40">Team</p>
                  <p className="text-white font-semibold">{metrics.teamSize} devs</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 text-white/60" />
                <div>
                  <p className="text-white/40">Duration</p>
                  <p className="text-white font-semibold">{metrics.duration}</p>
                </div>
              </div>
            </div>
            {metrics.aiSuggestion && (
              <div className="mt-3 pt-3 border-t border-accent/10">
                <p className="text-xs text-white/70 italic">&quot;{metrics.aiSuggestion}&quot;</p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            {stack.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="bg-white/10 hover:bg-accent/20 border border-accent/10 hover:border-accent/30 transition-all duration-300 px-4 py-2 rounded-lg flex items-center gap-2 text-accent cursor-pointer"
              >
                <span className="text-sm">{item.name}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative"
                    >
                      <BsArrowUpRight className="w-10 h-10 text-white/60 group-hover/link:text-accent transition-all duration-300" />
                      <motion.div
                        className="absolute inset-0 bg-accent/20 rounded-full blur-lg opacity-0 group-hover/link:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Live preview</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative"
                    >
                      <BsGithub className="w-10 h-10 text-white/60 group-hover/link:text-accent transition-all duration-300" />
                      <motion.div
                        className="absolute inset-0 bg-accent/20 rounded-full blur-lg opacity-0 group-hover/link:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>GitHub repository</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="w-full xl:w-[50%] order-1 xl:order-none">
          <motion.div
            className="h-[460px] relative group flex justify-center items-center bg-black/10 rounded-lg overflow-hidden"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <motion.div 
              className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"
              animate={isHovered ? { opacity: 0.3 } : { opacity: 0.6 }}
            />
            
            <motion.div 
              className="relative w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={image}
                alt={title}
                className="object-contain"
                fill
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
              className="absolute top-4 right-4 bg-accent/90 text-primary px-3 py-2 rounded-lg z-20 flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">Featured Project</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
