import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, MapPin, Stethoscope } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Job eligibility & DPA/DWS check — PraximaIMG",
  description:
    "Understand section 19AB, the 10-year moratorium and Distribution Priority Areas, and check a location against the official Health Workforce Locator.",
};

const PERSPECTIVES = [
  {
    href: "/eligibility/check?as=img",
    icon: Stethoscope,
    eyebrow: "For doctors",
    title: "I'm an IMG looking for work",
    body: "See whether a location lets you bill Medicare, and understand the 10-year moratorium, the 5YOTD scheme, and who's exempt.",
    cta: "Check a location",
  },
  {
    href: "/eligibility/check?as=employer",
    icon: Building2,
    eyebrow: "For employers",
    title: "I'm a practice looking to hire",
    body: "Confirm whether your site is a Distribution Priority Area or District of Workforce Shortage before you advertise a role to an IMG.",
    cta: "Check your site",
  },
];

export default function EligibilityLandingPage() {
  return (
    <main className="min-h-screen">
      <section className="px-6 pb-12 pt-16 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-sm font-medium text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            Section 19AB &amp; location eligibility
          </span>
          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Can you (or your hire) bill Medicare in this location?
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-muted-foreground">
            Most International Medical Graduates can only access a Medicare
            provider number in specific areas for their first 10 years. Choose
            your perspective to get the right context — then check the official
            tool.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          {PERSPECTIVES.map((p) => (
            <Card
              key={p.href}
              className="group flex h-full flex-col transition-colors hover:border-primary/50"
            >
              <CardContent className="flex h-full flex-col p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <p.icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium uppercase tracking-wide text-primary">
                  {p.eyebrow}
                </p>
                <h2 className="mt-1 text-xl font-semibold">{p.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
                <Button asChild className="mt-6 w-full sm:w-auto">
                  <Link href={p.href}>
                    {p.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-4xl text-center text-sm text-muted-foreground">
          Not sure which pathway you&apos;re on first?{" "}
          <Link
            href="/pathway-check"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Check your registration pathway
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
