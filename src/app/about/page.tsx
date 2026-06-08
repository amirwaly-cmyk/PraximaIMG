import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About — PraximaIMG",
  description:
    "About PraximaIMG — helping International Medical Graduates navigate Australian medical registration.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          About PraximaIMG
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          PraximaIMG helps International Medical Graduates navigate the
          Australian medical registration system, and helps employers hire them
          compliantly. A sister product to PraximaCPD.
        </p>

        <Card className="mt-8 bg-muted/40">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground">
              More to come
            </p>
            <p className="mt-1 leading-relaxed">
              This page is a placeholder. A fuller story about the team, the
              mission, and how PraximaIMG works is on the way.
            </p>
          </CardContent>
        </Card>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/pathway-check">
              Check your pathway
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/eligibility">Check job eligibility</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
