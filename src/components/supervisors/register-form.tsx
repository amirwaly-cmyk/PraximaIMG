"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STATES, type SupervisionMode } from "@/lib/supervisors-data";

export function RegisterForm() {
  const [submitted, setSubmitted] = React.useState(false);

  // Required-ish fields we lightly validate before acknowledging.
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [practiceName, setPracticeName] = React.useState("");
  const [suburb, setSuburb] = React.useState("");
  const [state, setState] = React.useState("");
  const [level, setLevel] = React.useState("");
  const [availability, setAvailability] = React.useState("");
  const [modes, setModes] = React.useState<SupervisionMode[]>([]);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const canSubmit =
    name.trim() !== "" &&
    emailValid &&
    practiceName.trim() !== "" &&
    suburb.trim() !== "" &&
    state !== "" &&
    level !== "" &&
    availability !== "" &&
    modes.length > 0;

  function toggleMode(mode: SupervisionMode) {
    setModes((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    // MVP: no storage yet — acknowledge and move on.
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center py-10 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h2 className="text-xl font-semibold">Application received</h2>
          <p className="mt-2 max-w-md text-muted-foreground">
            We&apos;ll verify your credentials against the AHPRA register and be
            in touch. Listings only go live once verification is complete.
          </p>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            This is an early preview — your details haven&apos;t been stored yet,
            so we may ask you to re-submit when the directory launches.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* About you */}
      <Card>
        <CardHeader>
          <CardTitle>About you</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" htmlFor="reg-name" required>
            <Input
              id="reg-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Dr Jane Doe"
            />
          </Field>
          <Field label="Post-nominals" htmlFor="reg-postnominals">
            <Input id="reg-postnominals" placeholder="MBBS, FRACGP" />
          </Field>
          <Field label="Contact email" htmlFor="reg-email" required>
            <Input
              id="reg-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@practice.com.au"
            />
          </Field>
          <Field
            label="AHPRA registration number"
            htmlFor="reg-ahpra"
            hint="Used for verification. Optional here, required before going live."
          >
            <Input id="reg-ahpra" placeholder="MED0001234567" />
          </Field>
        </CardContent>
      </Card>

      {/* Practice */}
      <Card>
        <CardHeader>
          <CardTitle>Practice & location</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Field label="Practice name" htmlFor="reg-practice" required>
            <Input
              id="reg-practice"
              value={practiceName}
              onChange={(e) => setPracticeName(e.target.value)}
              placeholder="Riverside Family Practice"
            />
          </Field>
          <Field label="Suburb" htmlFor="reg-suburb" required>
            <Input
              id="reg-suburb"
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
              placeholder="Parramatta"
            />
          </Field>
          <Field label="State" htmlFor="reg-state" required>
            <Select value={state} onValueChange={setState}>
              <SelectTrigger id="reg-state">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {STATES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label} ({s.value})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Practice type" htmlFor="reg-practice-type">
            <Input
              id="reg-practice-type"
              placeholder="Urban GP / Rural GP / Telehealth / RACF…"
            />
          </Field>
          <Field label="Specialty" htmlFor="reg-specialty">
            <Input id="reg-specialty" defaultValue="General Practice" />
          </Field>
        </CardContent>
      </Card>

      {/* Supervision */}
      <Card>
        <CardHeader>
          <CardTitle>Supervision details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Field label="Supervisor level" htmlFor="reg-level" required>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger id="reg-level">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Level 1 — practice-based, on-site</SelectItem>
                <SelectItem value="2">Level 2 — remote / general</SelectItem>
                <SelectItem value="3">Level 3 — most experienced</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Current availability" htmlFor="reg-availability" required>
            <Select value={availability} onValueChange={setAvailability}>
              <SelectTrigger id="reg-availability">
                <SelectValue placeholder="Select availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="accepting">Currently accepting</SelectItem>
                <SelectItem value="waitlist">Waitlist</SelectItem>
                <SelectItem value="not-accepting">Not accepting</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <div className="sm:col-span-2">
            <Label className="text-sm">
              Supervision mode <span className="text-destructive">*</span>
            </Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {(["on-site", "remote"] as SupervisionMode[]).map((m) => {
                const active = modes.includes(m);
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => toggleMode(m)}
                    aria-pressed={active}
                    className={cn(
                      "rounded-md border px-4 py-2 text-sm font-medium capitalize transition-colors",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-input hover:bg-accent"
                    )}
                  >
                    {m === "on-site" ? "On-site" : "Remote"}
                  </button>
                );
              })}
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Select all that apply.
            </p>
          </div>

          <div className="sm:col-span-2">
            <Field
              label="Years of supervision experience"
              htmlFor="reg-years"
            >
              <Input
                id="reg-years"
                type="number"
                min={0}
                max={60}
                placeholder="8"
                className="sm:max-w-[160px]"
              />
            </Field>
          </div>
        </CardContent>
      </Card>

      {/* Profile detail */}
      <Card>
        <CardHeader>
          <CardTitle>Profile detail</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field
            label="Short bio"
            htmlFor="reg-bio"
            hint="1–2 sentences shown on your directory card."
          >
            <Textarea
              id="reg-bio"
              rows={3}
              placeholder="Level 2 GP supervisor focused on women's health, experienced mentoring early-career IMGs."
            />
          </Field>
          <Field
            label="Areas of clinical interest"
            htmlFor="reg-interests"
            hint="Comma-separated, e.g. Skin cancer medicine, Chronic disease, Aged care."
          >
            <Input
              id="reg-interests"
              placeholder="Skin cancer medicine, Chronic disease, Aged care"
            />
          </Field>
          <Field
            label="Languages spoken"
            htmlFor="reg-languages"
            hint="Comma-separated, e.g. English, Arabic, Mandarin."
          >
            <Input id="reg-languages" placeholder="English, Arabic" />
          </Field>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="text-destructive">*</span> Required fields.
        </p>
        <Button type="submit" size="lg" disabled={!canSubmit}>
          Submit application
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor} className="text-sm">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
