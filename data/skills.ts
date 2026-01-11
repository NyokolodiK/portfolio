import { IconType } from "react-icons";
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

export interface SkillItem {
  title: string;
  icon: IconType;
}

export interface SkillsData {
  title: string;
  description: string;
  items: SkillItem[];
}

export const skillsData: SkillsData = {
  title: "My Skills",
  description: "Summary of my skills",
  items: [
    {
      title: "HTML",
      icon: FaHtml5,
    },
    {
      title: "CSS",
      icon: FaCss3,
    },
    {
      title: "JavaScript",
      icon: FaJs,
    },
    {
      title: "TypeScript",
      icon: SiTypescript,
    },
    {
      title: "React",
      icon: FaReact,
    },
    {
      title: "Node.js",
      icon: FaNodeJs,
    },
    {
      title: "MongoDB",
      icon: SiMongodb,
    },
    {
      title: "Tailwind CSS",
      icon: SiTailwindcss,
    },
    {
      title: "Next.js",
      icon: SiNextdotjs,
    },
    {
      title: "Prisma",
      icon: SiPrisma,
    },
    {
      title: "PostgreSQL",
      icon: SiPostgresql,
    },
    {
      title: "GraphQL",
      icon: SiGraphql,
    },
    {
      title: "Angular",
      icon: FaAngular,
    },
    {
      title: "Vue.js",
      icon: FaVuejs,
    },
    {
      title: "Express.js",
      icon: SiExpress,
    },
    {
      title: "MySQL",
      icon: SiMysql,
    },
    {
      title: "Ruby on Rails",
      icon: SiRubyonrails,
    },
    {
      title: "Nest.js",
      icon: SiNestjs,
    },
  ],
};
