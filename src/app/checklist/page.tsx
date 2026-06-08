import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileCheck2, Info } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  CHECKLIST_DISCLAIMER,
  PATHWAY_INFO,
  getDocumentsForPathway,
  type Pathway,
} from "@/lib/checklist-data";

export const metadata: Metadata = {
  title: "Document checklist — PraximaIMG",
  description:
    "Prepare your AHPRA/AMC submission documents correctly the first time. A pathway-aware checklist with format, certification and common-rejection guidance.",
};

const PATHWAYS: Pathway[] = ["competent-authority", "standard", "specialist"];

export default function ChecklistIntroPage() {
  return (
    <main className="min-h-screen px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-sm font-medium text-muted-foreground">
            <FileCheck2 className="h-4 w-4 text-primary" />
            Document checklist
          </span>
          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Get your AHPRA submission right the first time
          </h1>
          <p className="mt-4 text-balance text-lg text-muted-foreground">
            Most IMG applications are delayed by avoidable document errors — wrong
            certification, black-and-white scans, expired tests. Pick your
            pathway for a tailored checklist with the format, certification and
            common-rejection notes for each document.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {PATHWAYS.map((p) => {
            const info = PATHWAY_INFO[p];
            const count = getDocumentsForPathway(p).length;
            return (
              <Link
                key={p}
                href={`/checklist/${p}`}
                className="group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Card className="flex h-full flex-col transition-colors hover:border-primary/50">
                  <CardContent className="flex h-full flex-col p-6">
                    <h2 className="text-lg font-semibold">{info.label}</h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {info.blurb}
                    </p>
                    <p className="mt-4 text-sm font-medium text-primary">
                      {count} documents
                      <ArrowRight className="ml-1 inline h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Not sure which pathway?{" "}
          <Link
            href="/pathway-check"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Take our Pathway Check first
          </Link>
          .
        </p>

        <Alert className="mt-10">
          <Info className="h-4 w-4" />
          <AlertTitle>Educational guidance only</AlertTitle>
          <AlertDescription className="text-muted-foreground">
            {CHECKLIST_DISCLAIMER}
          </AlertDescription>
        </Alert>
      </div>
    </main>
  );
}
