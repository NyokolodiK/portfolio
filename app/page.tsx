import { client } from "@/sanity/lib/client";
import { PROFILE_QUERY } from "@/sanity/lib/queries";
import HomeClient from "@/components/home/HomeClient";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Kagiso Nyokolodi | Senior Software Engineer",
  description: "Senior Software Engineer building scalable systems and leading teams to deliver efficient, high-quality software solutions.",
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
