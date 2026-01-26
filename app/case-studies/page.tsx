"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { caseStudies } from "@/data/case-studies";
import CaseStudyCard from "@/components/work/CaseStudyCard";

const CaseStudiesPage = () => {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                transition: { delay: 0.2, duration: 0.6, ease: "easeIn" },
            }}
            className="min-h-screen py-12 xl:py-24"
        >
            <div className="container mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            <Sparkles className="h-6 w-6 text-accent" />
                        </motion.div>
                        <span className="text-accent font-semibold uppercase tracking-wider">Engineering Deep Dives</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        Case Studies
                    </h1>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg mb-8">
                        Comprehensive analysis of architectural shifts, legacy migrations, and solving complex problems at scale.
                    </p>

                    <Link href="/" className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors">
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to Home</span>
                    </Link>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {caseStudies.map((caseStudy, index) => (
                        <CaseStudyCard
                            key={caseStudy.id}
                            caseStudy={caseStudy}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default CaseStudiesPage;
