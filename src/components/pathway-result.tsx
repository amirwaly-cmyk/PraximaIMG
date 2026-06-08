"use client";

import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Info,
  RotateCcw,
  ShieldAlert,
  Wallet,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  DISCLAIMER,
  recommendPathway,
  type PathwayAnswers,
} from "@/lib/pathway-data";

interface PathwayResultProps {
  answers: PathwayAnswers;
  onRestart: () => void;
}

export function PathwayResult({ answers, onRestart }: PathwayResultProps) {
  const { pathway, specialty, reason } = recommendPathway(answers);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-primary">
          Your recommended pathway
        </p>
        <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          {pathway.name}
        </h1>
        <p className="mt-2 text-muted-foreground">{pathway.tagline}</p>
      </div>

      <Alert className="border-primary/30 bg-accent/50">
        <Info className="h-4 w-4 text-primary" />
        <AlertTitle>Why this pathway</AlertTitle>
        <AlertDescription className="text-muted-foreground">
          {reason}
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>About this pathway</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed text-muted-foreground">
            {pathway.description}
          </p>
        </CardContent>
      </Card>

      {specialty && (
        <Card>
          <CardHeader>
            <CardTitle>Your assessing college</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-lg font-semibold">{specialty.college}</p>
            <p className="text-sm text-muted-foreground">
              {specialty.collegeFull}
            </p>
            <a
              href={specialty.collegeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Visit college IMG information
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>What you&apos;ll need to complete</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {pathway.requirements.map((req) => (
              <li key={req.label} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-medium">{req.label}</p>
                  {req.detail && (
                    <p className="text-sm text-muted-foreground">
                      {req.detail}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="flex items-start gap-3 p-6">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Estimated timeframe
              </p>
              <p className="mt-1 text-lg font-semibold">{pathway.timeframe}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-start gap-3 p-6">
            <Wallet className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Estimated total cost
              </p>
              <p className="mt-1 text-lg font-semibold">{pathway.costRange}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Next steps</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {pathway.nextSteps.map((step, i) => (
              <li key={step.href} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                <a
                  href={step.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline"
                >
                  {step.label}
                  <ArrowUpRight className="h-4 w-4 shrink-0" />
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Alert className="border-amber-300/60 bg-amber-50 text-amber-900 dark:border-amber-700/50 dark:bg-amber-950/40 dark:text-amber-100">
        <ShieldAlert className="h-4 w-4 !text-amber-600 dark:!text-amber-400" />
        <AlertTitle>Important — verify before you act</AlertTitle>
        <AlertDescription className="text-amber-900/90 dark:text-amber-100/90">
          {DISCLAIMER}
        </AlertDescription>
      </Alert>

      <div className="flex justify-center pt-2">
        <Button variant="outline" size="lg" onClick={onRestart}>
          <RotateCcw className="h-4 w-4" />
          Start again
        </Button>
      </div>
    </div>
  );
}
