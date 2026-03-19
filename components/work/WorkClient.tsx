"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Code, User, Sparkles } from "lucide-react";
import EnhancedSkillCard from "@/components/work/EnhancedSkillCard";

interface WorkClientProps {
    about: {
        title: string;
        description: string;
        info: { title: string; description: string }[];
    };
    experience: {
        title: string;
        description: string;
        items: { company: string; position: string; duration: string }[];
    };
    education: {
        title: string;
        description: string;
        items: { institution: string; degree: string; duration: string }[];
    };
    skills: {
        title: string;
        description: string;
        items: { title: string; iconName: string }[];
    };
}

const WorkClient = ({ about, experience, education, skills }: WorkClientProps) => {
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
                        <span className="text-accent font-semibold uppercase tracking-wider">Resume</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        My Journey & Expertise
                    </h1>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg">
                        Over a decade of experience building exceptional software solutions. Explore my professional journey, technical skills, and educational background.
                    </p>
                </motion.div>

                <div className="space-y-20">
                    {/* About Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="bg-accent/10 p-3 rounded-lg">
                                <User className="h-6 w-6 text-accent" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-white">{about.title}</h2>
                                <p className="text-white/40 text-sm">Who I Am</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-[#232329] to-[#1a1a1f] rounded-xl border border-white/10 p-8">
                            <p className="text-white/70 leading-relaxed mb-6 text-lg">
                                {about.description}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {about.info.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white/5 rounded-lg p-4 border border-white/10"
                                    >
                                        <p className="text-white/50 text-sm mb-1">{item.title}</p>
                                        <p className="text-white font-medium">{item.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Experience Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="bg-accent/10 p-3 rounded-lg">
                                <Briefcase className="h-6 w-6 text-accent" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-white">{experience.title}</h2>
                                <p className="text-white/40 text-sm">{experience.description}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {experience.items.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className="flex flex-col bg-gradient-to-br from-[#232329] to-[#1a1a1f] min-h-[184px] p-6 justify-center items-center gap-3 rounded-lg border border-white/10 hover:border-accent/30 transition-all group cursor-pointer relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="relative z-10 text-center w-full">
                                        <p className="text-sm font-semibold text-accent mb-2">
                                            {item.company}
                                        </p>
                                        <h3 className="text-base font-medium text-white group-hover:text-accent transition-colors mb-2 px-4">
                                            {item.position}
                                        </h3>
                                        <div className="flex items-center justify-center gap-2 text-xs text-white/60">
                                            <div className="h-1 w-1 bg-accent rounded-full" />
                                            <p>{item.duration}</p>
                                            <div className="h-1 w-1 bg-accent rounded-full" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Education Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 0.5, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="bg-accent/10 p-3 rounded-lg">
                                <GraduationCap className="h-6 w-6 text-accent" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-white">{education.title}</h2>
                                <p className="text-white/40 text-sm">{education.description}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {education.items.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15 }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className="flex flex-col bg-gradient-to-br from-[#232329] to-[#1a1a1f] min-h-[184px] p-6 justify-center items-center gap-3 rounded-lg border border-white/10 hover:border-accent/30 transition-all group cursor-pointer relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="relative z-10 text-center w-full">
                                        <p className="text-sm font-semibold text-accent mb-2">
                                            {item.institution}
                                        </p>
                                        <h3 className="text-base font-medium text-white group-hover:text-accent transition-colors mb-2 px-4">
                                            {item.degree}
                                        </h3>
                                        <div className="flex items-center justify-center gap-2 text-xs text-white/60">
                                            <div className="h-1 w-1 bg-accent rounded-full" />
                                            <p>{item.duration}</p>
                                            <div className="h-1 w-1 bg-accent rounded-full" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Skills Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="bg-accent/10 p-3 rounded-lg">
                                <Code className="h-6 w-6 text-accent" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-white">{skills.title}</h2>
                                <p className="text-white/40 text-sm">{skills.description}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {skills.items.map((item, index) => (
                                <EnhancedSkillCard
                                    key={index}
                                    title={item.title}
                                    iconName={item.iconName}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default WorkClient;
