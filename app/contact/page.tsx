import { client } from "@/sanity/lib/client";
import { PROFILE_QUERY } from "@/sanity/lib/queries";
import ContactClient from "@/components/contact/ContactClient";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Contact | Kagiso Nyokolodi",
  description: "Get in touch with Kagiso Nyokolodi for collaboration, inquiries, or just to say hello.",
};

// Revalidate every hour
export const revalidate = 3600;

export default async function ContactPage() {
  const profile = await client.fetch(PROFILE_QUERY);

  if (!profile) {
    notFound();
  }

  const info = [
    {
      icon: <FaPhoneAlt />,
      title: "Phone",
      description: profile.phone || "",
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      description: profile.email || "",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Address",
      description: profile.address || "",
    },
  ];

  return <ContactClient info={info} />;
}
