"use client";

import { motion } from "framer-motion";
import ServiceCard from "@/components/services/ServiceCard";
import { Code2, Server, Smartphone, Palette, Sparkles } from "lucide-react";
import { ReactNode } from "react";

const ICON_MAP: Record<string, ReactNode> = {
    Code2: <Code2 />,
    Server: <Server />,
    Smartphone: <Smartphone />,
    Palette: <Palette />,
    Sparkles: <Sparkles />,
};

interface ServicesClientProps {
    initialServices: any[];
}

const ServicesClient = ({ initialServices }: ServicesClientProps) => {
    return (
        <section className="min-h-screen flex flex-col justify-center py-12 xl:py-24">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.2, duration: 0.6 },
                    }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="h-6 w-6 text-accent" />
                        <span className="text-accent font-semibold uppercase tracking-wider">Services</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        What I Can Do For You
                    </h1>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg">
                        Comprehensive development services tailored to bring your vision to life with cutting-edge technology and best practices.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {initialServices.map((service, index) => (
                        <ServiceCard
                            key={index}
                            {...service}
                            icon={ICON_MAP[service.icon] || <Code2 />}
                            delay={0.3 + (index * 0.1)}
                        />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="mt-16 text-center"
                >
                    <div className="bg-gradient-to-r from-accent/10 via-accent/20 to-accent/10 border border-accent/20 rounded-xl p-8">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Need a Custom Solution?
                        </h3>
                        <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                            Every project is unique. Let&apos;s discuss your specific requirements and create a tailored solution that exceeds expectations.
                        </p>
                        <motion.a
                            href="/contact"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 bg-accent text-primary px-8 py-3 rounded-lg font-semibold hover:bg-accent-hover transition-colors"
                        >
                            Get in Touch
                            <Sparkles className="h-4 w-4" />
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ServicesClient;
