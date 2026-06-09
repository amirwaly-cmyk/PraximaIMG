"use client";

import * as React from "react";
import Link from "next/link";
import { SearchX, UserPlus, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SupervisorCard } from "@/components/supervisors/supervisor-card";
import {
  getSupervisors,
  STATES,
  type Availability,
  type AustralianState,
  type SupervisionMode,
  type SupervisorLevel,
} from "@/lib/supervisors-data";

type StateFilter = AustralianState | "all";
type LevelFilter = SupervisorLevel | "any";
type ModeFilter = SupervisionMode | "either";
type AvailabilityFilter = Availability | "any";

const ALL_SUPERVISORS = getSupervisors();

export function SupervisorDirectory() {
  const [state, setState] = React.useState<StateFilter>("all");
  const [level, setLevel] = React.useState<LevelFilter>("any");
  const [mode, setMode] = React.useState<ModeFilter>("either");
  const [availability, setAvailability] =
    React.useState<AvailabilityFilter>("any");

  const filtered = React.useMemo(() => {
    return ALL_SUPERVISORS.filter((s) => {
      if (state !== "all" && s.state !== state) return false;
      if (level !== "any" && s.level !== level) return false;
      if (mode !== "either" && !s.modes.includes(mode)) return false;
      if (availability !== "any" && s.availability !== availability)
        return false;
      return true;
    });
  }, [state, level, mode, availability]);

  const isFiltered =
    state !== "all" ||
    level !== "any" ||
    mode !== "either" ||
    availability !== "any";

  function reset() {
    setState("all");
    setLevel("any");
    setMode("either");
    setAvailability("any");
  }

  // No supervisors are listed yet — show an inviting empty state instead of
  // the filter UI (which would be meaningless against an empty directory).
  if (ALL_SUPERVISORS.length === 0) {
    return (
      <div
        id="directory"
        className="flex flex-col items-center rounded-xl border border-dashed px-6 py-16 text-center scroll-mt-20"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Users className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-lg font-semibold">
          The directory is just getting started
        </h2>
        <p className="mt-1 max-w-md text-sm text-muted-foreground">
          No supervisors are listed yet. We&apos;re verifying supervisors against
          the AHPRA register before they appear here — check back soon, or add
          your own listing.
        </p>
        <Button asChild className="mt-6">
          <Link href="/supervisors/register">
            <UserPlus className="h-4 w-4" />
            List yourself as a supervisor
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div id="directory" className="scroll-mt-20">
      {/* Filters */}
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FilterSelect
            label="State"
            value={state}
            onValueChange={(v) => setState(v as StateFilter)}
            options={[
              { value: "all", label: "All states" },
              ...STATES.map((s) => ({ value: s.value, label: s.label })),
            ]}
          />
          <FilterSelect
            label="Supervisor level"
            value={String(level)}
            onValueChange={(v) =>
              setLevel(v === "any" ? "any" : (Number(v) as SupervisorLevel))
            }
            options={[
              { value: "any", label: "Any level" },
              { value: "1", label: "Level 1" },
              { value: "2", label: "Level 2" },
              { value: "3", label: "Level 3" },
            ]}
          />
          <FilterSelect
            label="Supervision mode"
            value={mode}
            onValueChange={(v) => setMode(v as ModeFilter)}
            options={[
              { value: "either", label: "Either" },
              { value: "on-site", label: "On-site" },
              { value: "remote", label: "Remote" },
            ]}
          />
          <FilterSelect
            label="Availability"
            value={availability}
            onValueChange={(v) => setAvailability(v as AvailabilityFilter)}
            options={[
              { value: "any", label: "Any" },
              { value: "accepting", label: "Currently accepting" },
              { value: "waitlist", label: "Waitlist" },
              { value: "not-accepting", label: "Not accepting" },
            ]}
          />
        </div>
      </div>

      {/* Result count */}
      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filtered.length}{" "}
          {filtered.length === 1 ? "supervisor" : "supervisors"}
          {isFiltered ? " match your filters" : " listed"}
        </p>
        {isFiltered && (
          <Button variant="ghost" size="sm" onClick={reset}>
            Clear filters
          </Button>
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <SupervisorCard key={s.id} supervisor={s} />
          ))}
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center rounded-xl border border-dashed py-16 text-center">
          <SearchX className="h-8 w-8 text-muted-foreground" />
          <p className="mt-3 font-medium">No supervisors match these filters</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try widening your search — for example, set State to “All states”.
          </p>
          <Button variant="outline" className="mt-4" onClick={reset}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onValueChange,
  options,
}: {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">
        {label}
      </Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
