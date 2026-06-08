import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  Compass,
  FileCheck2,
  ListChecks,
  MapPin,
  Stethoscope,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const TOOLS = [
  {
    href: "/pathway-check",
    icon: Compass,
    eyebrow: "Step 1",
    title: "Check your registration pathway",
    body: "Answer a few questions to see whether the Competent Authority, Standard, or Specialist pathway fits you — with the exams, timeframes and costs for each.",
    cta: "Check my pathway",
  },
  {
    href: "/eligibility",
    icon: MapPin,
    eyebrow: "Step 2",
    title: "Check job & location eligibility",
    body: "Understand section 19AB, the 10-year moratorium and DPA/DWS rules — then check any Australian location against the official Health Workforce Locator.",
    cta: "Check eligibility",
  },
  {
    href: "/supervisors",
    icon: Users,
    eyebrow: "Step 3",
    title: "Find an approved supervisor",
    body: "Search the first directory of AHPRA/RACGP supervisors for IMG GPs — filter by state, level, mode and availability, or list yourself as a supervisor.",
    cta: "Browse supervisors",
  },
  {
    href: "/checklist",
    icon: FileCheck2,
    eyebrow: "Step 4",
    title: "Prepare your documents",
    body: "Work through a pathway-aware AHPRA document checklist — with format, certification and common-rejection notes — and track your readiness as you go.",
    cta: "Open the checklist",
  },
];

const FEATURES = [
  {
    icon: Compass,
    title: "Find your pathway",
    body: "See which AHPRA registration route fits your training and qualifications.",
  },
  {
    icon: ListChecks,
    title: "Know what's required",
    body: "Exams, assessments, timeframes and rough costs — in plain language.",
  },
  {
    icon: ClipboardCheck,
    title: "Act with confidence",
    body: "Every result links to the official AHPRA, AMC, college and government sources.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="px-6 pb-12 pt-20 sm:pt-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-sm font-medium text-muted-foreground">
            <Stethoscope className="h-4 w-4 text-primary" />
            For International Medical Graduates &amp; employers
          </span>

          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Find your route to practising medicine in Australia
          </h1>

          <p className="mt-5 max-w-2xl text-balance text-lg text-muted-foreground">
            PraximaIMG helps International Medical Graduates navigate AHPRA
            registration — and helps employers hire them compliantly. Start with
            the four tools below.
          </p>
        </div>
      </section>

      {/* Two core tools */}
      <section className="px-6 pb-16">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TOOLS.map((tool) => (
            <Card
              key={tool.href}
              className="group flex h-full flex-col transition-colors hover:border-primary/50"
            >
              <CardContent className="flex h-full flex-col p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <tool.icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium uppercase tracking-wide text-primary">
                  {tool.eyebrow}
                </p>
                <h2 className="mt-1 text-xl font-semibold">{tool.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {tool.body}
                </p>
                <Button asChild className="mt-6 w-full sm:w-auto">
                  <Link href={tool.href}>
                    {tool.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mx-auto mt-4 max-w-4xl text-center text-sm text-muted-foreground">
          Free · No sign-up · A few minutes each
        </p>
      </section>

      {/* Feature strip */}
      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <Card key={f.title} className="h-full border-none bg-muted/40 shadow-none">
              <CardContent className="p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.body}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer className="border-t px-6 py-8">
        <p className="mx-auto max-w-4xl text-center text-xs text-muted-foreground">
          PraximaIMG provides informational guidance only and is not affiliated
          with AHPRA or the AMC. A sister product to PraximaCPD.
        </p>
      </footer>
    </main>
  );
}
