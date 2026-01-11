import { ComponentType } from "react";
import { Briefcase, FolderGit2, Code2, GitCommit } from "lucide-react";
import { calculateYearsSince } from "@/lib/utils";

export interface StatsItem {
  name: string;
  value: number;
  icon: ComponentType<{ className?: string }>;
  suffix: string;
}

export interface StatsData {
  items: StatsItem[];
}

export const statsData: StatsData = {
  items: [
    {
      name: "Years of Experience",
      value: calculateYearsSince(2013, 4),
      icon: Briefcase,
      suffix: "+",
    },
    {
      name: "Projects Completed",
      value: 50,
      icon: FolderGit2,
      suffix: "+",
    },
    {
      name: "Technologies Mastered",
      value: 10,
      icon: Code2,
      suffix: "+",
    },
    {
      name: "Code Commits",
      value: 1000,
      icon: GitCommit,
      suffix: "+",
    },
  ],
};
