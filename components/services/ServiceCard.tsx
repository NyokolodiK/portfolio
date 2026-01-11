"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
  features: string[];
  delay?: number;
}

export default function ServiceCard({ 
  number, 
  title, 
  description, 
  icon, 
  features,
  delay = 0 
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="relative group"
    >
      <div className="relative h-full bg-gradient-to-br from-[#232329] to-[#1a1a1f] rounded-xl p-8 border border-white/10 hover:border-accent/50 transition-all duration-500 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={false}
        />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="text-5xl text-accent"
            >
              {icon}
            </motion.div>
            <div className="text-6xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">
              {number}
            </div>
          </div>

          <h3 className="text-3xl font-bold text-white group-hover:text-accent transition-colors duration-300 mb-4">
            {title}
          </h3>

          <p className="text-white/70 mb-6 leading-relaxed">
            {description}
          </p>

          <div className="space-y-3 mb-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: delay + (index * 0.1) }}
                className="flex items-center gap-3 text-sm text-white/60"
              >
                <ArrowRight className="h-4 w-4 text-accent flex-shrink-0" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-accent font-semibold group/btn"
          >
            <span>Learn more</span>
            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <motion.div
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.6 }}
        >
          <Sparkles className="h-6 w-6 text-accent" />
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}
