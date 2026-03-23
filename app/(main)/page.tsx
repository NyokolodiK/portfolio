import { client } from "@/sanity/lib/client";
import { PROFILE_QUERY } from "@/sanity/lib/queries";
import HomeClient from "@/components/home/HomeClient";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Resume | Portfolio - Kagiso Nyokolodi",
  description: "Professional experience, education, and technical skills of Kagiso Nyokolodi, Principal Frontend Engineer.",
};

// Revalidate every hour, or use 0 to always fetch live
export const revalidate = 3600;

export default async function HomePage() {
  const profile = await client.fetch(PROFILE_QUERY);

  if (!profile) {
    notFound();
  }

  return <HomeClient profile={profile} />;
}
