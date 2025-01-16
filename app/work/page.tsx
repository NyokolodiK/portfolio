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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from "@/components/ui/tooltip";

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
        transition: { delay: 2.4, duration: 0.6, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <Tabs
          defaultValue="experience"
          className="flex flex-col xl:flex-row gap-[60px]"
        >
          <TabsList className="flex flex-col gap-6 w-full max-w-[380px] mx-auto xl:mx-0">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="about">About me</TabsTrigger>
          </TabsList>

          <div className="min-h-[70vh] w-full">
            <TabsContent value="experience">
              <div className="flex flex-col items-center justify-center gap-[30px] text-center">
                <h3 className="text-4xl">{experience.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto">
                  {experience.description}
                </p>
                <ScrollArea className="h-[400px] w-full">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px] items-center">
                    {experience.items.map((item, index) => (
                      <li
                        key={index}
                        className="flex flex-col bg-[#232329] h-[184px] py-6 px-10 justify-center items-center gap-1"
                      >
                        <p className="text-sm font-semibold text-white">
                          {item.company}
                        </p>
                        <h3 className="text-lg max-w-[260px] min-h-[60px] text-white/60">
                          {item.position}
                        </h3>
                        <p className="text-accent text-sm">{item.duration}</p>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value="education">
              <div className="flex flex-col items-center justify-center gap-[30px] text-center">
                <h3 className="text-4xl">{education.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto">
                  {education.description}
                </p>
                <ScrollArea className="h-[400px] w-full">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px] items-center">
                    {education.items.map((item, index) => (
                      <li
                        key={index}
                        className="flex flex-col bg-[#232329] h-[184px] py-6 px-10 justify-center items-center gap-1"
                      >
                        <p className="text-sm font-semibold text-white">
                          {item.institution}
                        </p>
                        <h3 className="text-lg max-w-[260px] min-h-[60px] text-white/60">
                          {item.degree}
                        </h3>
                        <p className="text-accent text-sm">{item.duration}</p>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value="skills" className="w-full h-full">
              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{skills.title}</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                    {skills.description}
                  </p>
                  <ScrollArea className="h-[400px] w-full">
                    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:gap-[30px] gap-4">
                      {skills.items.map((item, index) => (
                        <li key={index}>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger className="w-full h-[150px] bg-[#232329] flex items-center justify-center group">
                                <div className="text-6xl group-hover:text-accent transition-all duration-300 ">
                                  {item.icon}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{item.title}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="about"
              className="w-full text-center xl:text-left"
            >
              <div className="flex flex-col gap-[30px]">
                <h3 className="text-4xl font-bold">{about.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {about.description}
                </p>
                <ul className="grid gird-cols-1 gapy-6">
                  {about.info.map((item, index) => (
                    <li key={index}>
                      <span>{item.title}</span>: <span>{item.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.section>
  );
};

export default Resume;
