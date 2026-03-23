import { client } from "@/sanity/lib/client";
import {
  PROFILE_QUERY,
  ALL_EXPERIENCE_QUERY,
  ALL_EDUCATION_QUERY,
  ALL_SKILLS_QUERY
} from "@/sanity/lib/queries";
import WorkClient from "@/components/work/WorkClient";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Resume | Portfolio - Kagiso Nyokolodi",
  description: "Professional experience, education, and technical skills of Kagiso Nyokolodi, Principal Frontend Engineer.",
};

// Revalidate every hour
export const revalidate = 3600;

export default async function WorkPage() {
  const [profile, experience, education, skills] = await Promise.all([
    client.fetch(PROFILE_QUERY),
    client.fetch(ALL_EXPERIENCE_QUERY),
    client.fetch(ALL_EDUCATION_QUERY),
    client.fetch(ALL_SKILLS_QUERY),
  ]);

  if (!profile) {
    notFound();
  }

  const mappedAbout = {
    title: "About",
    description: profile.description || "",
    info: [
      { title: "Name", description: profile.name || "" },
      { title: "Location", description: profile.location || "" },
      { title: "Email", description: profile.email || "" },
      { title: "Phone", description: profile.phone || "" },
    ],
  };

  const mappedExperience = {
    title: "Experience",
    description: "Work Experience",
    items: experience || [],
  };

  const mappedEducation = {
    title: "My Education",
    description: "Academic Background",
    items: education || [],
  };

  const mappedSkills = {
    title: "My Skills",
    description: "Technical Proficiency",
    items: skills || [],
  };

  return (
    <WorkClient
      about={mappedAbout}
      experience={mappedExperience}
      education={mappedEducation}
      skills={mappedSkills}
    />
  );
}
