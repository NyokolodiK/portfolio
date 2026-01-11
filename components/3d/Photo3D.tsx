"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Photo3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="w-full h-full relative"
      style={{ perspective: "1000px" }}
    >
      {/* Glow background */}
      <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl scale-110 animate-pulse" />
      
      {/* 3D Photo Container */}
      <motion.div
        animate={{
          rotateY: mousePosition.x,
          rotateX: -mousePosition.y,
          y: [-60, -80, -60],
        }}
        transition={{
          rotateY: { type: "spring", stiffness: 100, damping: 20 },
          rotateX: { type: "spring", stiffness: 100, damping: 20 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Main Image */}
        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-accent/30 shadow-2xl shadow-accent/50">
          <Image
            src="/images/kagiso.png"
            alt="Kagiso Nyokolodi"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/20 pointer-events-none" />
        </div>

        {/* Accent rim behind */}
        <div 
          className="absolute inset-0 rounded-full bg-accent/20 blur-md"
          style={{ transform: "translateZ(-20px)" }}
        />
      </motion.div>

      {/* Decorative ring */}
      <div className="absolute inset-0 rounded-full border border-accent/10 pointer-events-none" style={{ transform: 'scale(1.1)' }} />
      
      {/* Light particles */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-10 right-10 w-2 h-2 bg-accent rounded-full blur-sm"
      />
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute bottom-10 left-10 w-2 h-2 bg-accent rounded-full blur-sm"
      />
    </motion.div>
  );
}
