// Shared TypeScript interfaces and types

export interface SocialLink {
  icon: React.ComponentType;
  path: string;
}

export interface NavLink {
  name: string;
  path: string;
}

export interface Project {
  num: string;
  category: string;
  title: string;
  description: string;
  stack: { name: string }[];
  image: string;
  live: string;
  github: string;
}

export interface Service {
  num: string;
  title: string;
  description: string;
}

export interface StatsItem {
  name: string;
  value: number;
  icon: React.ComponentType;
  suffix: string;
}
