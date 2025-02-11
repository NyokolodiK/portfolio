"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Photo = () => {
  return (
    <div className="w-full h-full relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 2, duration: 0.6, ease: "easeIn" },
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 2.4, duration: 0.6, ease: "easeIn" },
          }}
          className="w-[298px] h-[298px] xl:w-[498px] xl:h-[498px]"
        >
          <div className="w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] mix-blend-lighten">
            <Image
              src="/images/kagiso.png"
              alt="Kagiso Nyokolodi"
              priority
              quality={100}
              fill
              className="object-contain border-[2px] rounded-full  border-accent"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Photo;
