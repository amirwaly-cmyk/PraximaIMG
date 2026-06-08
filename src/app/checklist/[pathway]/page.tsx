import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ChecklistView } from "@/components/checklist/checklist-view";
import { PATHWAY_INFO, isPathway } from "@/lib/checklist-data";

export function generateStaticParams() {
  return (
    ["competent-authority", "standard", "specialist"] as const
  ).map((pathway) => ({ pathway }));
}

export function generateMetadata({
  params,
}: {
  params: { pathway: string };
}): Metadata {
  if (!isPathway(params.pathway)) {
    return { title: "Checklist not found — PraximaIMG" };
  }
  const label = PATHWAY_INFO[params.pathway].label;
  return {
    title: `${label} document checklist — PraximaIMG`,
    description: `A pathway-aware AHPRA/AMC document checklist for the ${label} pathway, with format, certification and common-rejection guidance.`,
  };
}

export default function ChecklistPathwayPage({
  params,
}: {
  params: { pathway: string };
}) {
  if (!isPathway(params.pathway)) notFound();
  return <ChecklistView pathway={params.pathway} />;
}
