"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Building2,
  ExternalLink,
  Info,
  MapPin,
  ShieldAlert,
  Stethoscope,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  eligibilityContent,
  HEALTH_WORKFORCE_LOCATOR_URL,
} from "@/lib/eligibility-content";

type Perspective = "img" | "employer";
type SpecialtyKind = "gp" | "other";

export function EligibilityChecker() {
  const searchParams = useSearchParams();
  const perspective: Perspective =
    searchParams.get("as") === "employer" ? "employer" : "img";

  const [location, setLocation] = React.useState("");
  const [touched, setTouched] = React.useState(false);
  const [specialty, setSpecialty] = React.useState<SpecialtyKind>("gp");

  const trimmed = location.trim();
  const isNumeric = /^\d+$/.test(trimmed);
  // Only postcodes (all-digit input) are strictly validated to 4 digits;
  // a suburb name is accepted as free text.
  const postcodeInvalid = isNumeric && trimmed.length !== 4;
  const hasInput = trimmed.length > 0;
  const showError = touched && (postcodeInvalid || !hasInput);

  const classification = specialty === "gp" ? "DPA" : "DWS";
  const intro =
    perspective === "employer"
      ? eligibilityContent.employerIntro
      : eligibilityContent.imgIntro;

  return (
    <main className="min-h-screen">
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        {/* Heading + perspective */}
        <div className="mb-8">
          <PerspectiveSwitch perspective={perspective} />
          <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Check location eligibility
          </h1>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            {intro}
          </p>
        </div>

        {/* Checker form */}
        <Card>
          <CardHeader>
            <CardTitle>Look up a location</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Postcode or suburb</Label>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="location"
                  inputMode="text"
                  autoComplete="off"
                  placeholder="e.g. 3000 or Broken Hill"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onBlur={() => setTouched(true)}
                  className={cn(
                    "h-11 pl-9",
                    showError && "border-destructive focus-visible:ring-destructive"
                  )}
                  aria-invalid={showError}
                  aria-describedby="location-hint"
                />
              </div>
              <p
                id="location-hint"
                className={cn(
                  "text-sm",
                  showError ? "text-destructive" : "text-muted-foreground"
                )}
              >
                {showError
                  ? postcodeInvalid
                    ? "Australian postcodes are 4 digits — e.g. 3000."
                    : "Enter a postcode or suburb to look up."
                  : "Australian locations only. Enter a 4-digit postcode or a suburb name."}
              </p>
            </div>

            {/* Specialty */}
            <div className="space-y-2">
              <Label htmlFor="specialty">Specialty</Label>
              <Select
                value={specialty}
                onValueChange={(v) => setSpecialty(v as SpecialtyKind)}
              >
                <SelectTrigger id="specialty" className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gp">
                    General Practice (uses DPA classification)
                  </SelectItem>
                  <SelectItem value="other">
                    Other specialty (uses DWS classification)
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                GPs are assessed against{" "}
                <strong className="font-medium text-foreground">
                  Distribution Priority Areas (DPA)
                </strong>
                ; non-GP specialists are assessed against{" "}
                <strong className="font-medium text-foreground">
                  Districts of Workforce Shortage (DWS)
                </strong>
                . Pick the one that matches the role.
              </p>
            </div>

            {/* Primary CTA */}
            <div className="rounded-lg border bg-accent/40 p-4">
              <p className="mb-3 text-sm text-muted-foreground">
                {hasInput && !postcodeInvalid ? (
                  <>
                    Ready to check{" "}
                    <strong className="font-semibold text-foreground">
                      {trimmed}
                    </strong>{" "}
                    for{" "}
                    <strong className="font-semibold text-foreground">
                      {classification}
                    </strong>{" "}
                    status on the official government tool.
                  </>
                ) : (
                  <>
                    The official Health Workforce Locator shows the live{" "}
                    {classification} classification for any Australian location.
                  </>
                )}
              </p>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <a
                  href={HEALTH_WORKFORCE_LOCATOR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Check on Health Workforce Locator
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <p className="mt-2 text-xs text-muted-foreground">
                Opens health.gov.au in a new tab. PraximaIMG doesn&apos;t store
                anything you enter here.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Information panel */}
        <section className="mt-10 space-y-6">
          <h2 className="text-xl font-semibold tracking-tight">
            What this actually means
          </h2>

          <InfoBlock
            icon={MapPin}
            title="DPA & DWS — the location rule"
            body={eligibilityContent.dpaExplainer}
          />
          <InfoBlock
            icon={Info}
            title="The 10-year moratorium"
            body={eligibilityContent.moratoriumExplainer}
          />
          <InfoBlock
            icon={Info}
            title="The 5-Year Overseas Trained Doctor (5YOTD) scheme"
            body={eligibilityContent.fyotdExplainer}
          />

          <Card>
            <CardHeader>
              <CardTitle>Who is exempt?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {eligibilityContent.exemptions.map((ex) => (
                  <li key={ex.label} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <div>
                      <p className="font-medium">{ex.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {ex.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="mb-2 text-xl font-semibold tracking-tight">
            Frequently asked questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {eligibilityContent.faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`faq-${i}`}>
                <AccordionTrigger className="text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Disclaimer */}
        <Alert className="mt-10 border-amber-300/60 bg-amber-50 text-amber-900 dark:border-amber-700/50 dark:bg-amber-950/40 dark:text-amber-100">
          <ShieldAlert className="h-4 w-4 !text-amber-600 dark:!text-amber-400" />
          <AlertTitle>Verify before making decisions</AlertTitle>
          <AlertDescription className="text-amber-900/90 dark:text-amber-100/90">
            {eligibilityContent.disclaimer}
          </AlertDescription>
        </Alert>
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function PerspectiveSwitch({ perspective }: { perspective: Perspective }) {
  const options: { key: Perspective; label: string; icon: typeof Stethoscope }[] =
    [
      { key: "img", label: "I'm an IMG", icon: Stethoscope },
      { key: "employer", label: "I'm hiring", icon: Building2 },
    ];
  return (
    <div className="inline-flex rounded-lg border bg-card p-1">
      {options.map((opt) => {
        const active = opt.key === perspective;
        return (
          <Link
            key={opt.key}
            href={`/eligibility/check?as=${opt.key}`}
            scroll={false}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <opt.icon className="h-4 w-4" />
            {opt.label}
          </Link>
        );
      })}
    </div>
  );
}

function InfoBlock({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Info;
  title: string;
  body: string;
}) {
  return (
    <Card>
      <CardContent className="flex gap-4 p-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="mt-1.5 leading-relaxed text-muted-foreground">{body}</p>
        </div>
      </CardContent>
    </Card>
  );
}
