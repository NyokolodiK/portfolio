"use client";

import { motion } from "framer-motion";
import ServiceCard from "@/components/services/ServiceCard";
import { Code2, Server, Smartphone, Palette, Sparkles } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Frontend Development",
    description:
      "Creating responsive, intuitive, and user-friendly interfaces that users love. Specializing in modern frameworks and cutting-edge technologies.",
    icon: <Code2 />,
    features: [
      "React, Next.js, & TypeScript expertise",
      "Responsive & mobile-first design",
      "Performance optimization & SEO",
      "Modern UI/UX implementation",
      "Component-driven architecture"
    ]
  },
  {
    number: "02",
    title: "Backend Development",
    description:
      "Building robust, scalable, and efficient server-side logic. From APIs to databases, creating the backbone of powerful applications.",
    icon: <Server />,
    features: [
      "Node.js & Express.js APIs",
      "Database design & optimization",
      "RESTful & GraphQL services",
      "Authentication & security",
      "Microservices architecture"
    ]
  },
  {
    number: "03",
    title: "Mobile Development",
    description:
      "Developing cross-platform mobile applications with native performance. Bringing your ideas to iOS and Android devices.",
    icon: <Smartphone />,
    features: [
      "React Native applications",
      "Cross-platform compatibility",
      "Native API integration",
      "App Store deployment",
      "Offline-first architecture"
    ]
  },
  {
    number: "04",
    title: "UI/UX Design",
    description:
      "Designing seamless user interfaces and exceptional user experiences. Creating intuitive flows that delight and engage users.",
    icon: <Palette />,
    features: [
      "User research & personas",
      "Wireframing & prototyping",
      "Design systems & style guides",
      "Accessibility compliance",
      "Interaction design & animations"
    ]
  },
];

const Services = () => {
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
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
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
              Every project is unique. Let's discuss your specific requirements and create a tailored solution that exceeds expectations.
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

export default Services;
