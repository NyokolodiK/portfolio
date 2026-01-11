"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TAGLINES = [
  "Building scalable web applications",
  "Crafting exceptional user experiences",
  "Leading high-performance engineering teams",
  "Architecting modern cloud solutions",
  "Driving innovation with React & Next.js",
  "Mastering full-stack development",
  "Transforming ideas into production-ready code",
];

export default function RotatingTagline() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TAGLINES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-8 flex items-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-xl text-white/90 block"
        >
          {TAGLINES[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
