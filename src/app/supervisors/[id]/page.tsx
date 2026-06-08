import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarClock,
  Globe,
  Info,
  Languages,
  MapPin,
  Stethoscope,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ConnectForm } from "@/components/supervisors/connect-form";
import {
  AVAILABILITY_INFO,
  describeModes,
  getInitials,
  getSupervisor,
  getSupervisors,
  LEVEL_INFO,
  SUPERVISOR_DISCLAIMER,
} from "@/lib/supervisors-data";

export function generateStaticParams() {
  return getSupervisors().map((s) => ({ id: s.id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const supervisor = getSupervisor(params.id);
  if (!supervisor) return { title: "Supervisor not found — PraximaIMG" };
  return {
    title: `${supervisor.name} — Supervisor directory — PraximaIMG`,
    description: supervisor.bio,
  };
}

export default function SupervisorDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supervisor = getSupervisor(params.id);
  if (!supervisor) notFound();

  const availability = AVAILABILITY_INFO[supervisor.availability];
  const level = LEVEL_INFO[supervisor.level];

  const facts = [
    {
      icon: CalendarClock,
      label: "Supervisor experience",
      value: `${supervisor.yearsExperience} years`,
    },
    {
      icon: Stethoscope,
      label: "Specialty",
      value: supervisor.specialty,
    },
    {
      icon: Globe,
      label: "Supervision mode",
      value: describeModes(supervisor.modes),
    },
    {
      icon: MapPin,
      label: "Practice type",
      value: supervisor.practiceType,
    },
  ];

  return (
    <main className="min-h-screen px-6 py-10 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/supervisors"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to directory
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Profile */}
          <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
                  {getInitials(supervisor.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold tracking-tight">
                    {supervisor.name}
                  </h1>
                  <Badge variant="secondary" title={level.label}>
                    {level.short}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {supervisor.postNominals}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0" />
                  {supervisor.practiceName}, {supervisor.suburb}{" "}
                  {supervisor.state}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
                  availability.badgeClass
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    availability.dotClass
                  )}
                />
                {availability.label}
              </span>
            </div>

            <p className="mt-6 leading-relaxed text-muted-foreground">
              {supervisor.bio}
            </p>

            <div className="mt-6 rounded-xl border bg-card p-4">
              <p className="text-sm text-muted-foreground">{level.description}</p>
            </div>

            {/* Facts */}
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="flex items-start gap-3 rounded-xl border bg-card p-4"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <f.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-muted-foreground">
                      {f.label}
                    </dt>
                    <dd className="font-medium">{f.value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            {/* Clinical interests */}
            <section className="mt-8">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Areas of clinical interest
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {supervisor.clinicalInterests.map((interest) => (
                  <Badge key={interest} variant="outline" className="font-normal">
                    {interest}
                  </Badge>
                ))}
              </div>
            </section>

            {/* Languages */}
            <section className="mt-6">
              <h2 className="flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                <Languages className="h-4 w-4" />
                Languages spoken
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {supervisor.languages.map((language) => (
                  <Badge key={language} variant="outline" className="font-normal">
                    {language}
                  </Badge>
                ))}
              </div>
            </section>
          </div>

          {/* Connect form */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <Card>
              <CardHeader>
                <CardTitle>Request to connect</CardTitle>
              </CardHeader>
              <CardContent>
                <ConnectForm supervisorName={supervisor.name} />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Disclaimer */}
        <Alert className="mt-10">
          <Info className="h-4 w-4" />
          <AlertTitle>Verify independently</AlertTitle>
          <AlertDescription className="text-muted-foreground">
            {SUPERVISOR_DISCLAIMER}
          </AlertDescription>
        </Alert>
      </div>
    </main>
  );
}
