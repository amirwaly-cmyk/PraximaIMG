"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CountryCombobox } from "@/components/country-combobox";
import { PathwayResult } from "@/components/pathway-result";
import {
  SPECIALTIES,
  WDOMS_HELP,
  type EnglishBackground,
  type PathwayAnswers,
  type WdomsListed,
  type YearsSinceDegree,
} from "@/lib/pathway-data";
import { cn } from "@/lib/utils";

type StepId =
  | "country"
  | "specialist"
  | "specialty"
  | "wdoms"
  | "years"
  | "english";

export default function PathwayCheckPage() {
  const [answers, setAnswers] = React.useState<PathwayAnswers>({});
  const [stepIndex, setStepIndex] = React.useState(0);
  const [showResult, setShowResult] = React.useState(false);

  // The specialty question only appears when the user is a specialist.
  const steps = React.useMemo<StepId[]>(() => {
    const base: StepId[] = ["country", "specialist"];
    if (answers.isSpecialist) base.push("specialty");
    base.push("wdoms", "years", "english");
    return base;
  }, [answers.isSpecialist]);

  // Keep the index valid if the step list shrinks (e.g. specialist → No).
  const currentIndex = Math.min(stepIndex, steps.length - 1);
  const currentStep = steps[currentIndex];
  const isLastStep = currentIndex === steps.length - 1;

  function update(patch: Partial<PathwayAnswers>) {
    setAnswers((prev) => ({ ...prev, ...patch }));
  }

  function isStepAnswered(step: StepId): boolean {
    switch (step) {
      case "country":
        return !!answers.countryCode;
      case "specialist":
        return answers.isSpecialist !== undefined;
      case "specialty":
        return !!answers.specialty;
      case "wdoms":
        return !!answers.wdomsListed;
      case "years":
        return !!answers.yearsSinceDegree;
      case "english":
        return !!answers.englishBackground;
    }
  }

  function next() {
    if (isLastStep) {
      setShowResult(true);
      return;
    }
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  }

  function back() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  function restart() {
    setAnswers({});
    setStepIndex(0);
    setShowResult(false);
  }

  const progress = showResult
    ? 100
    : Math.round(((currentIndex + 1) / (steps.length + 1)) * 100);

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-lg font-semibold tracking-tight">
              Pathway check
            </h1>
            {!showResult && (
              <span className="text-sm text-muted-foreground">
                Step {currentIndex + 1} of {steps.length}
              </span>
            )}
          </div>
          <div className="mt-4">
            <Progress value={progress} />
          </div>
        </header>

        {showResult ? (
          <PathwayResult answers={answers} onRestart={restart} />
        ) : (
          <div>
            <Card>
              <CardHeader>
                <StepHeader step={currentStep} />
              </CardHeader>
              <CardContent>
                <StepBody
                  step={currentStep}
                  answers={answers}
                  update={update}
                />
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="mt-6 flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={back}
                disabled={currentIndex === 0}
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button onClick={next} disabled={!isStepAnswered(currentStep)}>
                {isLastStep ? "See my result" : "Next"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Step header copy                                                    */
/* ------------------------------------------------------------------ */

const STEP_COPY: Record<StepId, { title: string; description?: string }> = {
  country: {
    title: "In which country did you complete your primary medical degree?",
    description:
      "Your primary qualification — your first medical degree (e.g. MBBS, MD).",
  },
  specialist: {
    title:
      "Are you a specialist seeking recognition of your specialist qualifications in Australia?",
    description:
      "Choose Yes only if you hold a completed specialist qualification (e.g. you are already a consultant/specialist).",
  },
  specialty: {
    title: "Which specialty?",
    description: "We'll match you to the relevant Australian specialist college.",
  },
  wdoms: {
    title: "Is your medical school listed in the World Directory of Medical Schools?",
  },
  years: {
    title: "How many years since you completed your primary medical degree?",
  },
  english: {
    title: "What is your English language background?",
    description:
      "This affects whether you'll need an English test such as IELTS or OET.",
  },
};

function StepHeader({ step }: { step: StepId }) {
  const copy = STEP_COPY[step];
  return (
    <>
      <CardTitle className="text-balance text-xl leading-snug sm:text-2xl">
        {copy.title}
      </CardTitle>
      {copy.description && (
        <CardDescription className="pt-1 text-pretty">
          {copy.description}
        </CardDescription>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Step bodies                                                         */
/* ------------------------------------------------------------------ */

interface StepBodyProps {
  step: StepId;
  answers: PathwayAnswers;
  update: (patch: Partial<PathwayAnswers>) => void;
}

function StepBody({ step, answers, update }: StepBodyProps) {
  switch (step) {
    case "country":
      return (
        <CountryCombobox
          value={answers.countryCode}
          onChange={(countryCode) => update({ countryCode })}
        />
      );

    case "specialist":
      return (
        <OptionRadioGroup
          value={
            answers.isSpecialist === undefined
              ? undefined
              : answers.isSpecialist
                ? "yes"
                : "no"
          }
          onValueChange={(v) =>
            update({
              isSpecialist: v === "yes",
              // Clear any stale specialty if they switch to No.
              ...(v === "no" ? { specialty: undefined } : {}),
            })
          }
          options={[
            {
              value: "yes",
              label: "Yes",
              description:
                "I hold a recognised specialist qualification and want it assessed.",
            },
            {
              value: "no",
              label: "No",
              description: "I'm seeking general registration to practise.",
            },
          ]}
        />
      );

    case "specialty":
      return (
        <div className="space-y-2">
          <Label htmlFor="specialty-select">Specialty</Label>
          <Select
            value={answers.specialty}
            onValueChange={(specialty) => update({ specialty })}
          >
            <SelectTrigger id="specialty-select" className="h-11">
              <SelectValue placeholder="Select your specialty…" />
            </SelectTrigger>
            <SelectContent>
              {SPECIALTIES.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );

    case "wdoms":
      return (
        <div className="space-y-4">
          <OptionRadioGroup
            value={answers.wdomsListed}
            onValueChange={(v) =>
              update({ wdomsListed: v as WdomsListed })
            }
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
              { value: "not_sure", label: "Not sure" },
            ]}
          />
          <p className="text-sm text-muted-foreground">
            {WDOMS_HELP.text}{" "}
            <a
              href={WDOMS_HELP.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline"
            >
              Search wdoms.org
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </p>
        </div>
      );

    case "years":
      return (
        <OptionRadioGroup
          value={answers.yearsSinceDegree}
          onValueChange={(v) =>
            update({ yearsSinceDegree: v as YearsSinceDegree })
          }
          options={[
            { value: "lt2", label: "Less than 2 years" },
            { value: "2to5", label: "2–5 years" },
            { value: "6to10", label: "6–10 years" },
            { value: "10plus", label: "More than 10 years" },
          ]}
        />
      );

    case "english":
      return (
        <OptionRadioGroup
          value={answers.englishBackground}
          onValueChange={(v) =>
            update({ englishBackground: v as EnglishBackground })
          }
          options={[
            {
              value: "studied_in_english",
              label: "I studied medicine in English",
              description: "Your medical degree was taught and examined in English.",
            },
            {
              value: "native",
              label: "I'm a native English speaker",
            },
            {
              value: "neither",
              label: "Neither",
              description: "You'll likely need IELTS Academic or OET.",
            },
          ]}
        />
      );
  }
}

/* ------------------------------------------------------------------ */
/* Reusable card-style radio group                                     */
/* ------------------------------------------------------------------ */

interface Option {
  value: string;
  label: string;
  description?: string;
}

function OptionRadioGroup({
  value,
  onValueChange,
  options,
}: {
  value?: string;
  onValueChange: (value: string) => void;
  options: Option[];
}) {
  return (
    <RadioGroup value={value} onValueChange={onValueChange} className="gap-3">
      {options.map((opt) => {
        const id = `opt-${opt.value}`;
        const selected = value === opt.value;
        return (
          <Label
            key={opt.value}
            htmlFor={id}
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-accent/50",
              selected
                ? "border-primary bg-accent/60 ring-1 ring-primary"
                : "border-input"
            )}
          >
            <RadioGroupItem id={id} value={opt.value} className="mt-0.5" />
            <div className="space-y-0.5">
              <p className="font-medium leading-none">{opt.label}</p>
              {opt.description && (
                <p className="text-sm font-normal text-muted-foreground">
                  {opt.description}
                </p>
              )}
            </div>
          </Label>
        );
      })}
    </RadioGroup>
  );
}
