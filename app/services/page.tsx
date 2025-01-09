"use client";

import { motion } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Frontend Development",
    description:
      "Creating responsive, intuitive, and user-friendly interfaces for web applications.",
  },
  {
    number: "02",
    title: "Backend Development",
    description:
      "Building robust, scalable, and efficient server-side logic for web applications.",
  },
  {
    number: "03",
    title: "Mobile Development",
    description:
      "Developing mobile applications for both iOS and Android platforms.",
  },
  {
    number: "04",
    title: "UI/UX Design",
    description:
      "Designing seamless user interfaces and exceptional user experiences for web applications.",
  },
];

const Services = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 2.4, duration: 0.6, ease: "easeIn" },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
        >
          {services.map(({ description, number, title }, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col justify-center gap-6 group"
            >
              <div>
                <div className="text-5xl font-extrabold mb-6 text-outline text-transparent group-hover:text-outline-hover">
                  {number}
                </div>
                <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent mb-6">
                  {title}
                </h2>
                <p className="text-white/60">{description}</p>
              </div>
              <div className="border-b border-white/20 w-full"></div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
