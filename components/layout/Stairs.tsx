"use client";

import { motion } from "framer-motion";

const stairAnimation = {
  initial: {
    top: "0%",
  },
  animate: {
    top: "100%",
  },
  exit: {
    top: ["100%", "0%"],
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

const reverseIndex = (index: number) => {
  const totalSteps = 5;
  return totalSteps - index - 1;
};

const Stairs = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <motion.div
          key={index}
          variants={stairAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: 0.4,
            ease: "easeInOut",
            delay: reverseIndex(index) * 0.1,
          }}
          className="h-full w-full bg-accent relative"
        />
      ))}
    </>
  );
};

export default Stairs;
