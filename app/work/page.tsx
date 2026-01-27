"use client";

import {
  FaCss3,
  FaJs,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaVuejs,
  FaAngular,
} from "react-icons/fa";
import {
  SiMongodb,
  SiTailwindcss,
  SiNextdotjs,
  SiPrisma,
  SiPostgresql,
  SiGraphql,
  SiTypescript,
  SiMysql,
  SiNestjs,
  SiExpress,
  SiRubyonrails,
} from "react-icons/si";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Code, User, Sparkles } from "lucide-react";
import EnhancedSkillCard from "@/components/work/EnhancedSkillCard";

const about = {
  title: "About",
  description:
    "Over 10 years of experience in full-stack development, specializing in high-performance front-end applications using React, Next.js, and TypeScript. Expert in designing scalable APIs, databases, and enhancing user experience. Proven leader in mentoring teams and driving excellence through agile methodologies and best practices. Strong problem-solver with a passion for continuous learning.",
  info: [
    {
      title: "Name",
      description: "Kagiso Nyokolodi",
    },
    {
      title: "Age",
      description: "35",
    },
    {
      title: "Location",
      description: "South Africa",
    },
    {
      title: "Email",
      description: "knyokolodi@gmail.com",
    },
    {
      title: "Phone",
      description: "+27 72 382 8823",
    },
  ],
};

const experience = {
  icon: <FaCss3 />,
  title: "Experience",
  description: "Work Experience",
  items: [
    {
      company: "Nawiri Group",
      position: "Senior Software Engineer, AI Enthusiast",
      duration: "2022 – Present",
    },
    {
      company: "NTT",
      position: "Senior Software Engineer",
      duration: "July 2020 – 2022",
    },
    {
      company: "OneCart",
      position: "Software Engineer",
      duration: "April 2020 – June 2020",
    },
    {
      company: "Dimension Data",
      position: "Senior Software Engineer",
      duration: "October 2018 – March 2020",
    },
    {
      company: "XPERTEK",
      position: "Software Developer",
      duration: "September 2015 – September 2018",
    },
    {
      company: "IntelliLab",
      position: "Web & Mobile Developer",
      duration: "April 2013 – August 2015",
    },
    {
      company: "Tshwane University of Technology",
      position: "Web & Games Developer Intern",
      duration: "February 2012 – December 2012",
    },
    {
      company: "Prolific Interactive Designz",
      position: "Freelancer",
      duration: "February 2013 – June 2018",
    },
  ],
};

const education = {
  icon: <FaCss3 />,
  title: "My Education",
  description: "BTECH IT Web and Multimedia",
  items: [
    {
      institution: "Tshwane University of Technology",
      degree: "National Diploma IT Web and Multimedia",
      duration: "2013",
    },
    {
      institution: "Tshwane University of Technology",
      degree: "BTECH IT Web and Multimedia",
      duration: "2018",
    },
  ],
};

const skills = {
  title: "My Skills",
  description: "Summary of my skills",
  items: [
    {
      title: "HTML",
      icon: <FaHtml5 />,
    },
    {
      title: "CSS",
      icon: <FaCss3 />,
    },
    {
      title: "JavaScript",
      icon: <FaJs />,
    },
    {
      title: "TypeScript",
      icon: <SiTypescript />,
    },
    {
      title: "React",
      icon: <FaReact />,
    },
    {
      title: "Node.js",
      icon: <FaNodeJs />,
    },
    {
      title: "MongoDB",
      icon: <SiMongodb />,
    },
    {
      title: "Tailwind CSS",
      icon: <SiTailwindcss />,
    },
    {
      title: "Next.js",
      icon: <SiNextdotjs />,
    },
    {
      title: "Prisma",
      icon: <SiPrisma />,
    },
    {
      title: "PostgreSQL",
      icon: <SiPostgresql />,
    },
    {
      title: "GraphQL",
      icon: <SiGraphql />,
    },
    {
      title: "Angular",
      icon: <FaAngular />,
    },
    {
      title: "Vue.js",
      icon: <FaVuejs />,
    },
    {
      title: "Express.js",
      icon: <SiExpress />,
    },
    {
      title: "MySQL",
      icon: <SiMysql />,
    },
    {
      title: "Ruby on Rails",
      icon: <SiRubyonrails />,
    },
    {
      title: "Nest.js",
      icon: <SiNestjs />,
    },
  ],
};

const Resume = () => {
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
            whileInView={{ opacity: 1, y: 0 }}
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
                  icon={item.icon}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Resume;
