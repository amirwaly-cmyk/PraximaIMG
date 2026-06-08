import type { Metadata } from "next";
import Link from "next/link";
import { Info, Search, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SupervisorDirectory } from "@/components/supervisors/supervisor-directory";
import { SUPERVISOR_DISCLAIMER } from "@/lib/supervisors-data";

export const metadata: Metadata = {
  title: "Supervisor directory — PraximaIMG",
  description:
    "Find an AHPRA-approved supervisor for IMG GPs working in Australia. Search by state, supervisor level, supervision mode and availability.",
};

export default function SupervisorsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="px-6 pb-10 pt-16 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-sm font-medium text-muted-foreground">
            First of its kind in Australia
          </span>
          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Find an AHPRA-approved supervisor for IMG GPs working in Australia
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-muted-foreground">
            Practices employing IMGs under section 19AB must demonstrate adequate
            supervision before AHPRA will approve registration. Finding a
            qualifying supervisor is often the single biggest bottleneck — this
            directory exists to remove it.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="#directory">
                <Search className="h-4 w-4" />
                Find a Supervisor
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/supervisors/register">
                <UserPlus className="h-4 w-4" />
                List Yourself as a Supervisor
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Directory */}
      <section className="px-6 pb-12">
        <div className="mx-auto max-w-6xl">
          <SupervisorDirectory />
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Directory only — verify independently</AlertTitle>
            <AlertDescription className="text-muted-foreground">
              {SUPERVISOR_DISCLAIMER}
            </AlertDescription>
          </Alert>
        </div>
      </section>
    </main>
  );
}
