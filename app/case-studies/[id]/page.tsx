import { client } from "@/sanity/lib/client";
import { CASE_STUDY_BY_ID_QUERY } from "@/sanity/lib/queries";
import CaseStudyDetailClient from "@/components/case-studies/CaseStudyDetailClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const study = await client.fetch(CASE_STUDY_BY_ID_QUERY, { id: resolvedParams.id });

    if (!study) {
        return { title: "Case Study Not Found" };
    }

    return {
        title: `${study.title} | Case Study`,
        description: study.description,
    };
}

// Revalidate every hour, or use 0 to always fetch live
export const revalidate = 3600;

export default async function CaseStudyDetailPage({ params }: Props) {
    const resolvedParams = await params;
    const study = await client.fetch(CASE_STUDY_BY_ID_QUERY, { id: resolvedParams.id });

    if (!study) {
        notFound();
    }

    return <CaseStudyDetailClient study={study} />;
}
