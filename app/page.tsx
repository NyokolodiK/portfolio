"use client";

import Social from "@/components/Social";
import Stats from "@/components/Stats";
import { Button } from "@/components/ui/button";
import { FiDownload, FiArrowRight } from "react-icons/fi";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";

const Photo3D = dynamic(() => import("@/components/3d/Photo3D"), { ssr: false });

const Home = () => {
  return (
    <section className="relative min-h-screen" itemScope itemType="https://schema.org/Person">
      <div className="container mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-16 xl:pb-24 py-12 gap-16">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center xl:text-left order-2 xl:order-none flex-1 space-y-8"
          >
            <div className="space-y-6">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-accent font-medium tracking-wider uppercase text-sm"
                itemProp="jobTitle"
              >
                Senior Software Engineer
              </motion.p>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl xl:text-7xl font-bold leading-tight"
              >
                Hello, I&apos;m{" "}
                <span className="text-accent" itemProp="name">
                  Kagiso Nyokolodi
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-white/70 leading-relaxed max-w-[600px] mx-auto xl:mx-0"
                itemProp="description"
              >
                Building scalable systems and leading teams to deliver efficient, high-quality software solutions.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center xl:items-start gap-4"
            >
              <Link href="/contact" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-accent hover:bg-accent-hover text-primary font-semibold px-8 py-6 text-base">
                  Let&apos;s Work Together
                  <FiArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <a href="/cv/Kagiso_Nyokolodi_CV.pdf" download="Kagiso_Nyokolodi_CV.pdf" className="w-full sm:w-auto">
                <Button variant="outlined" className="w-full sm:w-auto px-8 py-6 text-base">
                  <FiDownload className="mr-2 h-5 w-5" />
                  Download CV
                </Button>
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="pt-4"
            >
              <Social
                containerStyles="flex gap-4 justify-center xl:justify-start"
                iconStyles="w-10 h-10 border border-accent/30 hover:border-accent p-2 rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-primary transition-all duration-300"
              />
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 xl:order-none"
          >
            <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] xl:w-[500px] xl:h-[500px]">
              <Photo3D />
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Stats />
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
