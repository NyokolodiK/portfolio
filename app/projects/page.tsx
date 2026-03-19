import { client } from "@/sanity/lib/client";
import { ALL_PROJECTS_QUERY } from "@/sanity/lib/queries";
import ProjectGrid from "@/components/projects/ProjectGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Portfolio",
  description: "Explore my latest work showcasing modern web technologies, innovative solutions, and best practices in software development.",
};

// Revalidate every hour, or use 0 to always fetch live
export const revalidate = 3600;

export default async function ProjectsPage() {
  const projects = await client.fetch(ALL_PROJECTS_QUERY);

  return <ProjectGrid initialProjects={projects} />;
}
