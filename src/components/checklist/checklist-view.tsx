"use client";

import * as React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Info,
  Lightbulb,
  Printer,
  Save,
  ShieldCheck,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AHPRA_CERTIFICATION_URL,
  CERTIFICATION_RULES,
  CHECKLIST_DISCLAIMER,
  NAATI_URL,
  PATHWAY_INFO,
  SECTIONS,
  getCertifiers,
  getDocumentsForPathway,
  type DocumentItem,
  type Pathway,
} from "@/lib/checklist-data";

type DocStatus = "not-started" | "in-progress" | "ready";

interface StoredState {
  statuses: Record<string, DocStatus>;
  translations: Record<string, boolean>;
}

const STATUS_META: Record<
  DocStatus,
  { label: string; badgeClass: string; dotClass: string }
> = {
  "not-started": {
    label: "Not started",
    badgeClass:
      "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300",
    dotClass: "bg-slate-400",
  },
  "in-progress": {
    label: "In progress",
    badgeClass:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-300",
    dotClass: "bg-amber-500",
  },
  ready: {
    label: "Ready",
    badgeClass:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300",
    dotClass: "bg-emerald-500",
  },
};

const STATUS_ORDER: DocStatus[] = ["not-started", "in-progress", "ready"];

function storageKey(pathway: Pathway) {
  return `praxima:checklist:v1:${pathway}`;
}
const COUNTRY_KEY = "praxima:checklist:v1:country";

export function ChecklistView({ pathway }: { pathway: Pathway }) {
  const documents = React.useMemo(
    () => getDocumentsForPathway(pathway),
    [pathway]
  );

  const [hydrated, setHydrated] = React.useState(false);
  const [statuses, setStatuses] = React.useState<Record<string, DocStatus>>({});
  const [translations, setTranslations] = React.useState<
    Record<string, boolean>
  >({});
  const [country, setCountry] = React.useState<string>("");

  // Load persisted progress once on mount.
  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey(pathway));
      if (raw) {
        const parsed = JSON.parse(raw) as StoredState;
        setStatuses(parsed.statuses ?? {});
        setTranslations(parsed.translations ?? {});
      }
      const savedCountry = window.localStorage.getItem(COUNTRY_KEY);
      if (savedCountry) setCountry(savedCountry);
    } catch {
      // Ignore malformed/unavailable storage.
    }
    setHydrated(true);
  }, [pathway]);

  // Persist on change (after initial load).
  React.useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        storageKey(pathway),
        JSON.stringify({ statuses, translations })
      );
    } catch {
      /* storage may be unavailable (private mode) */
    }
  }, [hydrated, pathway, statuses, translations]);

  React.useEffect(() => {
    if (!hydrated) return;
    try {
      if (country) window.localStorage.setItem(COUNTRY_KEY, country);
    } catch {
      /* noop */
    }
  }, [hydrated, country]);

  function statusOf(id: string): DocStatus {
    return statuses[id] ?? "not-started";
  }
  function setStatus(id: string, status: DocStatus) {
    setStatuses((prev) => ({ ...prev, [id]: status }));
  }
  function setTranslation(id: string, done: boolean) {
    setTranslations((prev) => ({ ...prev, [id]: done }));
  }

  const total = documents.length;
  const readyCount = documents.filter(
    (d) => statusOf(d.id) === "ready"
  ).length;
  const inProgressCount = documents.filter(
    (d) => statusOf(d.id) === "in-progress"
  ).length;
  const outstanding = total - readyCount;
  const percent = total ? Math.round((readyCount / total) * 100) : 0;

  const sectionsWithDocs = SECTIONS.map((s) => ({
    ...s,
    docs: documents.filter((d) => d.section === s.id),
  })).filter((s) => s.docs.length > 0);

  const pathwayLabel = PATHWAY_INFO[pathway].label;
  const certifierInfo = getCertifiers(country || undefined);

  return (
    <main className="min-h-screen">
      {/* Sticky progress bar */}
      <div className="sticky top-16 z-30 border-b bg-background/90 backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-6 py-2.5">
          <Progress value={percent} className="h-2 flex-1" />
          <span className="shrink-0 text-sm font-medium tabular-nums">
            {percent}% ready
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-8 print:py-0">
        {/* Header (screen only) */}
        <div className="print:hidden">
          <Link
            href="/checklist"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            All pathways
          </Link>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-balance text-3xl font-bold tracking-tight">
                Document checklist
              </h1>
              <p className="mt-1 text-muted-foreground">
                {pathwayLabel} pathway
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => window.print()}>
                <Printer className="h-4 w-4" />
                Print your checklist
              </Button>
              <SaveDialog />
            </div>
          </div>

          {/* Summary card */}
          <Card className="mt-6">
            <CardContent className="p-6">
              <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <div className="flex flex-wrap gap-x-8 gap-y-3">
                    <Stat label="Total documents" value={total} />
                    <Stat
                      label="Ready"
                      value={readyCount}
                      className="text-emerald-600 dark:text-emerald-400"
                    />
                    <Stat
                      label="In progress"
                      value={inProgressCount}
                      className="text-amber-600 dark:text-amber-400"
                    />
                    <Stat label="Outstanding" value={outstanding} />
                  </div>
                  <div className="mt-5">
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="font-medium">
                        Estimated readiness for submission
                      </span>
                      <span className="tabular-nums text-muted-foreground">
                        {percent}%
                      </span>
                    </div>
                    <Progress value={percent} />
                  </div>
                </div>
              </div>

              {/* Certification country */}
              <div className="mt-6 border-t pt-5">
                <Label
                  htmlFor="cert-country"
                  className="text-sm font-medium"
                >
                  Where were your documents issued?
                </Label>
                <p className="mb-2 mt-1 text-sm text-muted-foreground">
                  We&apos;ll tailor the &ldquo;who can certify your copies&rdquo;
                  guidance to that country.
                </p>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger id="cert-country" className="sm:max-w-xs">
                    <SelectValue placeholder="Select country of issue" />
                  </SelectTrigger>
                  <SelectContent>
                    {CERTIFICATION_RULES.map((r) => (
                      <SelectItem key={r.code} value={r.code}>
                        {r.country}
                      </SelectItem>
                    ))}
                    <SelectItem value="OTHER">Other / not listed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Sections */}
          <Accordion
            type="multiple"
            defaultValue={sectionsWithDocs.map((s) => s.id)}
            className="mt-8"
          >
            {sectionsWithDocs.map((section) => {
              const sectionReady = section.docs.filter(
                (d) => statusOf(d.id) === "ready"
              ).length;
              return (
                <AccordionItem key={section.id} value={section.id}>
                  <AccordionTrigger className="text-base font-semibold">
                    <span className="flex items-center gap-3">
                      {section.label}
                      <span className="text-xs font-normal text-muted-foreground">
                        {sectionReady}/{section.docs.length} ready
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pt-1">
                      {section.docs.map((doc) => (
                        <DocumentRow
                          key={doc.id}
                          doc={doc}
                          status={statusOf(doc.id)}
                          translationDone={!!translations[doc.id]}
                          certifierInfo={certifierInfo}
                          onStatus={(s) => setStatus(doc.id, s)}
                          onTranslation={(v) => setTranslation(doc.id, v)}
                        />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          <Alert className="mt-10">
            <Info className="h-4 w-4" />
            <AlertTitle>Educational guidance only</AlertTitle>
            <AlertDescription className="text-muted-foreground">
              {CHECKLIST_DISCLAIMER}
            </AlertDescription>
          </Alert>
        </div>

        {/* Print-only view */}
        <PrintView
          pathwayLabel={pathwayLabel}
          sections={sectionsWithDocs}
          statusOf={statusOf}
          total={total}
          readyCount={readyCount}
          outstanding={outstanding}
          percent={percent}
        />
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Document row                                                         */
/* ------------------------------------------------------------------ */

function DocumentRow({
  doc,
  status,
  translationDone,
  certifierInfo,
  onStatus,
  onTranslation,
}: {
  doc: DocumentItem;
  status: DocStatus;
  translationDone: boolean;
  certifierInfo: ReturnType<typeof getCertifiers>;
  onStatus: (s: DocStatus) => void;
  onTranslation: (v: boolean) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const meta = STATUS_META[status];
  const needsCertification = !/no certification/i.test(doc.certificationNotes);

  return (
    <Card
      className={cn(
        "overflow-hidden",
        status === "ready" && "border-emerald-200 dark:border-emerald-900"
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 p-4 text-left"
      >
        <span
          className={cn("h-2.5 w-2.5 shrink-0 rounded-full", meta.dotClass)}
          aria-hidden
        />
        <span className="flex-1 font-medium leading-snug">{doc.name}</span>
        <span
          className={cn(
            "hidden shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium sm:inline",
            meta.badgeClass
          )}
        >
          {meta.label}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="space-y-4 border-t px-4 py-4 text-sm">
          <Detail label="What it is">{doc.description}</Detail>
          <Detail label="Format required">{doc.format}</Detail>

          <Detail label="Certification">
            <p>{doc.certificationNotes}</p>
            {needsCertification && (
              <div className="mt-2 rounded-md bg-muted/60 p-3">
                <p className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Who can certify{" "}
                  {certifierInfo.country
                    ? `in ${certifierInfo.country}`
                    : "(general)"}
                </p>
                <ul className="mt-1.5 list-inside list-disc text-muted-foreground">
                  {certifierInfo.certifiers.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                {certifierInfo.isDefault && (
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    Select your country of issue above for tailored guidance.
                  </p>
                )}
                <a
                  href={AHPRA_CERTIFICATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary underline-offset-4 hover:underline"
                >
                  AHPRA certifying documents guide
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
          </Detail>

          {doc.commonRejections.length > 0 && (
            <Detail label="Common rejection reasons" icon={AlertTriangle}>
              <ul className="list-inside list-disc text-muted-foreground">
                {doc.commonRejections.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </Detail>
          )}

          {doc.tips.length > 0 && (
            <Detail label="Tips" icon={Lightbulb}>
              <ul className="list-inside list-disc text-muted-foreground">
                {doc.tips.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Detail>
          )}

          {doc.requiresTranslation && (
            <div className="rounded-md border border-dashed p-3">
              <p className="font-medium">Translation sub-checklist</p>
              <label className="mt-2 flex items-start gap-2.5">
                <Checkbox
                  checked={translationDone}
                  onCheckedChange={(v) => onTranslation(v === true)}
                  className="mt-0.5"
                />
                <span className="text-sm text-muted-foreground">
                  Certified NAATI-accredited translation prepared (if the
                  original is not in English).{" "}
                  <a
                    href={NAATI_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Find a NAATI translator
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </span>
              </label>
            </div>
          )}

          {/* Status control */}
          <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="inline-flex rounded-lg border p-1">
              {STATUS_ORDER.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => onStatus(s)}
                  aria-pressed={status === s}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                    status === s
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {STATUS_META[s].label}
                </button>
              ))}
            </div>
            {status !== "ready" && (
              <Button size="sm" onClick={() => onStatus("ready")}>
                <CheckCircle2 className="h-4 w-4" />
                Mark as ready
              </Button>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}

function Detail({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {label}
      </p>
      <div className="mt-1 leading-relaxed">{children}</div>
    </div>
  );
}

function Stat({
  label,
  value,
  className,
}: {
  label: string;
  value: number;
  className?: string;
}) {
  return (
    <div>
      <p className={cn("text-2xl font-bold tabular-nums", className)}>{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Save dialog (placeholder)                                           */
/* ------------------------------------------------------------------ */

function SaveDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Save className="h-4 w-4" />
          Save my progress
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign up to save</DialogTitle>
          <DialogDescription>
            Your progress is already saved in this browser. To save it to your
            account — and pick up on any device — create a PraximaIMG account.
            Accounts are coming soon.
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-md bg-muted/60 p-3 text-sm text-muted-foreground">
          For now, your checklist is stored locally on this device and will be
          here when you return.
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/* Print view                                                          */
/* ------------------------------------------------------------------ */

function PrintView({
  pathwayLabel,
  sections,
  statusOf,
  total,
  readyCount,
  outstanding,
  percent,
}: {
  pathwayLabel: string;
  sections: { id: string; label: string; docs: DocumentItem[] }[];
  statusOf: (id: string) => DocStatus;
  total: number;
  readyCount: number;
  outstanding: number;
  percent: number;
}) {
  return (
    <div className="hidden print:block">
      <h1 className="text-2xl font-bold">
        PraximaIMG — Document checklist ({pathwayLabel} pathway)
      </h1>
      <p className="mt-1 text-sm">
        {readyCount} of {total} ready · {outstanding} outstanding · {percent}%
        complete
      </p>

      {sections.map((section) => (
        <div key={section.id} className="mt-5 break-inside-avoid">
          <h2 className="border-b pb-1 text-lg font-semibold">
            {section.label}
          </h2>
          <ul className="mt-2 space-y-1.5">
            {section.docs.map((doc) => {
              const status = statusOf(doc.id);
              return (
                <li key={doc.id} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5">
                    {status === "ready" ? "☑" : "☐"}
                  </span>
                  <span>
                    <span className="font-medium">{doc.name}</span>
                    {" — "}
                    <span className="uppercase">
                      {STATUS_META[status].label}
                    </span>
                    <span className="block text-xs text-slate-600">
                      {doc.format}
                      {doc.requiresTranslation
                        ? " · NAATI translation if not in English"
                        : ""}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <p className="mt-6 text-xs text-slate-600">
        {CHECKLIST_DISCLAIMER}
      </p>
    </div>
  );
}
