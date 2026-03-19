"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import { Sparkles, Filter } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import ProjectInsights from "@/components/projects/ProjectInsights";

interface ProjectGridProps {
    initialProjects: any[];
}

const ProjectGrid = ({ initialProjects = [] }: ProjectGridProps) => {
    const [activeFilter, setActiveFilter] = useState("All");

    const filters = ["All", "Architecture", "Migration", "AI", "Engineering", "Full Stack", "Frontend", "Backend"];

    const filteredProjects = activeFilter === "All"
        ? initialProjects || []
        : (initialProjects || []).filter(project =>
            project.category?.toLowerCase() === activeFilter.toLowerCase()
        );

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
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                        >
                            <BsGithub className="h-6 w-6 text-accent" />
                        </motion.div>
                        <span className="text-accent font-semibold uppercase tracking-wider">Portfolio</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        Featured Projects
                    </h1>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg">
                        Explore my latest work showcasing modern web technologies, innovative solutions, and best practices in software development.
                    </p>
                </motion.div>

                {/* Filter Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-center gap-4 mb-12 flex-wrap"
                >
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Filter className="h-4 w-4" />
                        <span>Filter:</span>
                    </div>
                    {filters.map((filter, index) => (
                        <motion.button
                            key={filter}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + (index * 0.1) }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeFilter === filter
                                ? "bg-accent text-primary shadow-lg shadow-accent/50"
                                : "bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-accent/30"
                                }`}
                        >
                            {filter}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Projects Count */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center mb-8"
                >
                    <p className="text-white/60 text-sm">
                        Showing <span className="text-accent font-semibold">{filteredProjects.length}</span> {filteredProjects.length === 1 ? 'project' : 'projects'}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="bg-gradient-to-br from-[#232329] to-[#1a1a1f] rounded-xl border border-white/10 hover:border-accent/30 overflow-hidden transition-all duration-500 h-full flex flex-col">
                                {/* Project Image */}
                                <div className="relative h-[300px] overflow-hidden">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.5 }}
                                        className="relative w-full h-full"
                                    >
                                        {project.imageUrl ? (
                                            <Image
                                                src={project.imageUrl}
                                                alt={project.title}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/20">No Image</div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1f] via-transparent to-transparent opacity-60" />
                                    </motion.div>

                                    {/* Number Badge */}
                                    <div className="absolute top-4 left-4 text-6xl font-extrabold text-accent/20">
                                        {String(index + 1).padStart(2, '0')}
                                    </div>

                                    {/* Featured Badge */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        className="absolute top-4 right-4 bg-accent/90 text-primary px-3 py-1 rounded-full flex items-center gap-2"
                                    >
                                        <Sparkles className="h-3 w-3" />
                                        <span className="text-xs font-semibold">{project.category}</span>
                                    </motion.div>

                                    {/* Action Buttons Overlay */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <motion.a
                                                        href={project.live || '#'}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        whileHover={{ scale: 1.2, rotate: 5 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        className="bg-accent text-primary p-4 rounded-full"
                                                    >
                                                        <BsArrowUpRight className="w-6 h-6" />
                                                    </motion.a>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Live Demo</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <motion.a
                                                        href={project.github || '#'}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        whileHover={{ scale: 1.2, rotate: -5 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        className="bg-white/10 backdrop-blur-sm text-white p-4 rounded-full border border-white/20"
                                                    >
                                                        <BsGithub className="w-6 h-6" />
                                                    </motion.a>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Source Code</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </div>

                                {/* Project Details */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-2xl font-bold text-white group-hover:text-accent transition-colors mb-3">
                                        {project.title}
                                    </h3>

                                    <p className="text-white/60 text-sm mb-4 line-clamp-3">
                                        {project.description}
                                    </p>

                                    {/* AI Insights */}
                                    {project.metrics && (
                                        <div className="mb-4">
                                            <ProjectInsights metrics={project.metrics} stack={project.techStack || []} />
                                        </div>
                                    )}

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {(project.techStack || []).slice(0, 4).map((item: string, idx: number) => (
                                            <motion.span
                                                key={item}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.4 + (idx * 0.05) }}
                                                className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full border border-accent/20"
                                            >
                                                {item}
                                            </motion.span>
                                        ))}
                                        {(project.techStack || []).length > 4 && (
                                            <span className="text-xs text-white/40 px-3 py-1">
                                                +{(project.techStack || []).length - 4} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default ProjectGrid;
