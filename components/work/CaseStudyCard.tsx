"use client";

import { motion } from "framer-motion";
import { CaseStudy } from "@/data/case-studies";
import { BookOpen, ChevronRight, TrendingUp, Cpu, RefreshCcw } from "lucide-react";
import Link from "next/link";

interface CaseStudyCardProps {
    caseStudy: CaseStudy;
    index: number;
}

const CaseStudyCard = ({ caseStudy, index }: CaseStudyCardProps) => {
    const getIcon = (category: string) => {
        switch (category) {
            case "Architecture": return <Cpu className="h-5 w-5" />;
            case "Migration": return <RefreshCcw className="h-5 w-5" />;
            case "AI": return <TrendingUp className="h-5 w-5" />;
            default: return <BookOpen className="h-5 w-5" />;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-[#232329] border border-white/10 rounded-xl overflow-hidden hover:border-accent/30 transition-all duration-300"
        >
            <Link href={`/case-studies/${caseStudy.id}`} className="block h-full">
                <div className="p-8 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                        <div className="bg-accent/10 p-3 rounded-lg text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-300">
                            {getIcon(caseStudy.category)}
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-xs font-semibold text-accent/60 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full mb-2">
                                {caseStudy.category}
                            </span>
                            <span className="text-[10px] text-white/40 uppercase tracking-tighter">{caseStudy.date}</span>
                        </div>
                    </div>

                    {/* Title & Description */}
                    <div className="mb-8 flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                            {caseStudy.title}
                        </h3>
                        <p className="text-accent text-sm font-medium mb-4">{caseStudy.subtitle}</p>
                        <p className="text-white/60 leading-relaxed line-clamp-2">
                            {caseStudy.description}
                        </p>
                    </div>

                    {/* Metrics Grid */}
                    {caseStudy.metrics && (
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            {caseStudy.metrics.map((metric, idx) => (
                                <div key={idx} className="text-center p-3 bg-white/5 rounded-lg border border-white/5">
                                    <p className="text-accent font-bold text-lg">{metric.value}</p>
                                    <p className="text-[10px] uppercase tracking-tighter text-white/40">{metric.label}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Tech Stack Bubbles */}
                    <div className="flex flex-wrap gap-2 mb-8 lowercase">
                        {caseStudy.techStack.slice(0, 4).map((tech, idx) => (
                            <span key={idx} className="text-[10px] bg-white/5 text-white/50 px-2 py-1 rounded-md border border-white/10">
                                {tech}
                            </span>
                        ))}
                        {caseStudy.techStack.length > 4 && (
                            <span className="text-[10px] text-white/30 px-2 py-1">
                                +{caseStudy.techStack.length - 4} more
                            </span>
                        )}
                    </div>

                    {/* Footer Link */}
                    <div className="flex items-center text-accent font-semibold text-sm group-hover:gap-2 transition-all mt-auto pt-4 border-t border-white/5">
                        <span>Read Full Case Study</span>
                        <ChevronRight className="h-4 w-4" />
                    </div>
                </div>
            </Link>

            {/* Hover Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </motion.div>
    );
};

export default CaseStudyCard;
