"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import Link from "next/link";
import WorkSliderButtons from "@/components/WorkSliderButtons";
import { Swiper as SwiperType } from "swiper/types";

const projects = [
  {
    num: "01",
    category: "Full Stack",
    title: "Healthcare Patient Management",
    description:
      "A healthcare patient management application that allows patients to easily register, book, and manage their appointments with doctors, featuring administrative tools for scheduling, confirming, and canceling appointments, along with SMS notifications, all built using Next.js.",
    stack: [
      {
        name: "Next.js",
      },
      { name: "Typescript" },
      { name: "Tailwind CSS" },
      { name: "Appwrite" },
      { name: "Twillio" },
      { name: "Shadcn UI" },
    ],
    image: "/images/careconnect.png",
    live: "https://care-connect-seven.vercel.app/",
    github: "https://github.com/NyokolodiK/care-connect",
  },
  {
    num: "02",
    category: "frontend",
    title: "Ecommerce Website",
    description:
      "Full-ECommerce By Next.js 13+, App Router, Server Components and Actions",
    stack: [
      {
        name: "Next.js",
      },
      { name: "Typescript" },
      { name: "Tailwind CSS" },
      { name: "MongoDB" },
      { name: "Zustand" },
      { name: "Paypal" },
    ],
    image: "/images/amazon.png",
    live: "https://amazon-clone-three-alpha-14.vercel.app/",
    github: "https://github.com/NyokolodiK/amazon-clone",
  },
  {
    num: "03",
    category: "full stack",
    title: "Shuttle Client Web App",
    description:
      "A user-friendly web application for booking shuttle services, featuring real-time quotes, user authentication, and persistent data across login flows using Zustand state management.",
    stack: [
      {
        name: "React",
      },
      { name: "Typescript" },
      { name: "Next.js" },
      { name: "Zustand" },
      { name: "Tailwind CSS" },
    ],
    image: "/images/shuttle.png",
    live: "https://shuttle-client-web-app.vercel.app/",
    github: "https://github.com/NyokolodiK/shuttle-client-web-app",
  },
  {
    num: "04",
    category: "full stack",
    title: "Cine-Scope",
    description:
      "A modern movie discovery platform built with Next.js that allows users to browse trending, popular, and top-rated movies and TV shows, with detailed information pages, search functionality, and responsive design.",
    stack: [
      {
        name: "Next.js",
      },
      { name: "Typescript" },
      { name: "Tailwind CSS" },
      { name: "TMDB API" },
      { name: "SWR" },
    ],
    image: "/images/cine-scope.png",
    live: "https://cine-scope-pi.vercel.app/",
    github: "https://github.com/NyokolodiK/cine-scope",
  },
];

const Projects = () => {
  const [project, setProject] = useState(projects[0]);
  const handleSlideChange = (swiper: SwiperType) => {
    setProject(projects[swiper.realIndex]);
  };

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
        <div className="flex flex-col xl:flex-row ">
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none ">
            <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
              {project.num}
            </div>
            <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize ">
              {project.title}
            </h2>
            <p className="text-white/60">{project.description}</p>
            <div className="flex flex-wrap gap-6 mt-6">
              {project.stack.map((item) => (
                <div
                  key={item.name}
                  className="bg-white/10 hover:bg-white/20 transition-all duration-500 px-4 py-2 rounded flex items-center gap-2 text-accent"
                >
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6 mt-6">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={project.live}
                      target="_blank"
                      className="text-white/60 hover:text-white transition-all duration-500"
                    >
                      <BsArrowUpRight className="w-10 h-10 hover:animate-bounce hover:text-accent-hover" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Live preview</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={project.github}
                      target="_blank"
                      className="text-white/60 hover:text-white transition-all duration-500"
                    >
                      <BsGithub className="w-10 h-10 hover:animate-bounce hover:text-accent " />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>GitHub repository</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="w-full xl:w-[50%] order-1 xl:order-none ">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="xl:h-[520px] mb-12"
              onSlideChange={handleSlideChange}
            >
              {projects.map((project, index) => {
                return (
                  <SwiperSlide key={index} className="w-full">
                    <div className="h-[460px] relative group flex justify-center items-center bg-black/10">
                      <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                      <div className="relative w-full h-full">
                        <Image
                          src={project.image}
                          alt={project.title}
                          className="object-contain"
                          fill
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
              <WorkSliderButtons
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 x-20 w-full justify-between xl:w-max xl:justify-none z-50"
                btnStyles="bg-accent hover:bg-accent-hover text-primary transition-all duration-500  p-2 w-10 h-10 flex items-center justify-center"
                iconStyles="w-6 h-6"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;
