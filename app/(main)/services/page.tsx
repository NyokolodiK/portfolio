import { client } from "@/sanity/lib/client";
import { ALL_SERVICES_QUERY } from "@/sanity/lib/queries";
import ServicesClient from "@/components/services/ServicesClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | What I Can Do For You",
  description: "Comprehensive development services tailored to bring your vision to life with cutting-edge technology and best practices.",
};

// Revalidate every hour, or use 0 to always fetch live
export const revalidate = 3600;

export default async function ServicesPage() {
  const services = await client.fetch(ALL_SERVICES_QUERY);

  return <ServicesClient initialServices={services} />;
}
