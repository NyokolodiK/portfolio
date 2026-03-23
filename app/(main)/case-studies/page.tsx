import { client } from "@/sanity/lib/client";
import { ALL_CASE_STUDIES_QUERY } from "@/sanity/lib/queries";
import CaseStudyGridClient from "@/components/case-studies/CaseStudyGridClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Case Studies | Engineering Deep Dives",
    description: "Comprehensive analysis of architectural shifts, legacy migrations, and solving complex problems at scale.",
};

// Revalidate every hour, or use 0 to always fetch live
export const revalidate = 3600;

export default async function CaseStudiesPage() {
    const caseStudies = await client.fetch(ALL_CASE_STUDIES_QUERY);

    return <CaseStudyGridClient caseStudies={caseStudies} />;
}
