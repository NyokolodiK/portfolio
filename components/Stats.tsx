"use client";

import CountUp from "react-countup";
import { motion } from "framer-motion";
import { memo } from "react";
import { statsData } from "@/data/stats";

function Stats() {
  return (
    <section className="pt-12 pb-12 xl:pt-8 xl:pb-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statsData.items.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative group"
              >
                <div className="bg-white/5 dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-black/10 dark:border-white/5 hover:border-accent/20 transition-all duration-300 h-full">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                    className="text-gray-600 dark:text-slate-400 mb-4 opacity-60 group-hover:opacity-80 transition-opacity"
                  >
                    <Icon className="h-8 w-8" />
                  </motion.div>

                  {/* Counter */}
                  <div className="flex items-baseline gap-1 mb-2">
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      delay={0.5}
                      className="text-4xl xl:text-5xl font-extrabold text-gray-900 dark:text-white/90"
                    />
                    <span className="text-3xl xl:text-4xl font-extrabold text-gray-600 dark:text-white/60">
                      {stat.suffix}
                    </span>
                  </div>

                  {/* Label */}
                  <p className="text-sm text-gray-600 dark:text-white/50 font-medium">
                    {stat.name}
                  </p>

                  {/* Progress Bar */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.4, duration: 0.8 }}
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/20 to-accent/40 rounded-b-xl origin-left"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default memo(Stats);
