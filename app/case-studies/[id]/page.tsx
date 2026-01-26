"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { caseStudies } from "@/data/case-studies";
import { ArrowLeft, CheckCircle2, Zap, Target, Box, Calendar, Sparkles } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const CaseStudyDetail = () => {
    const params = useParams();
    const id = params?.id as string;
    const study = caseStudies.find((s) => s.id === id);

    if (!study) return notFound();

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen py-12 xl:py-24"
        >
            <div className="container mx-auto max-w-4xl">
                {/* Back Link */}
                <Link
                    href="/case-studies"
                    className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors mb-8 group"
                >
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Case Studies</span>
                </Link>

                {/* Hero Section */}
                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-xs font-bold text-accent uppercase tracking-widest bg-accent/10 px-4 py-1 rounded-full">
                            {study.category}
                        </span>
                        <span className="text-white/40 text-sm">•</span>
                        <div className="flex items-center gap-1 text-white/40 text-sm">
                            <Calendar className="h-3 w-3" />
                            <span>{study.date}</span>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        {study.title}
                    </h1>
                    <p className="text-xl text-white/60 leading-relaxed font-light italic">
                        &quot;{study.description}&quot;
                    </p>
                </div>

                {/* Metrics Bar */}
                {study.metrics && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        {study.metrics.map((metric, idx) => (
                            <div key={idx} className="bg-[#232329] p-6 rounded-xl border border-white/10 text-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                <p className="text-4xl font-bold text-accent mb-1 relative z-10">{metric.value}</p>
                                <p className="text-xs text-white/40 uppercase tracking-widest relative z-10">{metric.label}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Main Content / Article Body */}
                <div className="mb-24 prose prose-invert max-w-none text-white/80 leading-relaxed text-lg prose-headings:text-accent prose-strong:text-accent prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {study.content}
                    </ReactMarkdown>
                </div>

                {/* Structured Outcome Grid */}
                <div className="space-y-24 border-t border-white/10 pt-24">
                    {/* Problem & Solution */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 text-accent">
                                <Target className="h-6 w-6" />
                                <h2 className="text-xl font-bold uppercase tracking-wider">The Challenge</h2>
                            </div>
                            <div className="text-white/70 leading-relaxed bg-white/5 p-8 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-accent/30" />
                                {study.problem}
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 text-accent">
                                <Zap className="h-6 w-6" />
                                <h2 className="text-xl font-bold uppercase tracking-wider">Our Approach</h2>
                            </div>
                            <div className="text-white/70 leading-relaxed bg-accent/5 p-8 rounded-2xl border border-accent/10 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
                                {study.solution}
                            </div>
                        </div>
                    </div>

                    {/* Outcomes */}
                    <div className="space-y-10">
                        <div className="flex items-center gap-3 text-accent justify-center">
                            <CheckCircle2 className="h-7 w-7" />
                            <h2 className="text-2xl font-bold uppercase tracking-wider text-white">Measurable Impact</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {study.outcomes.map((outcome, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-start gap-4 p-6 bg-[#232329] rounded-xl border border-white/5 hover:border-accent/20 transition-all group"
                                >
                                    <div className="mt-1.5 h-3 w-3 rounded-full bg-accent shrink-0 shadow-[0_0_10px_#00ff99]" />
                                    <p className="text-white/80 text-base leading-relaxed group-hover:text-white transition-colors">{outcome}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="space-y-8 text-center bg-white/5 p-12 rounded-3xl border border-white/10">
                        <div className="flex items-center gap-3 text-accent justify-center mb-4">
                            <Box className="h-6 w-6" />
                            <h2 className="text-xl font-bold uppercase tracking-wider text-white">Stack Architecture</h2>
                        </div>
                        <div className="flex flex-wrap gap-4 justify-center">
                            {study.techStack.map((tech, idx) => (
                                <span key={idx} className="bg-white/10 text-white px-6 py-2 rounded-full border border-white/10 text-sm font-medium hover:bg-accent hover:text-primary transition-all cursor-default">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Final Quote/Impact Footer */}
                <div className="mt-24 p-16 bg-gradient-to-br from-accent/20 via-transparent to-transparent rounded-3xl border border-accent/20 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Sparkles className="h-32 w-32 text-accent" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-6 relative z-10">&quot;{study.impact}&quot;</h2>
                    <p className="text-accent uppercase tracking-widest text-sm font-bold opacity-80">Principal Engineering Impact</p>
                </div>
            </div>
        </motion.section>
    );
};

export default CaseStudyDetail;
