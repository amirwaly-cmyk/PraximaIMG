import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Info, ShieldCheck } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RegisterForm } from "@/components/supervisors/register-form";
import { SUPERVISOR_DISCLAIMER } from "@/lib/supervisors-data";

export const metadata: Metadata = {
  title: "List yourself as a supervisor — PraximaIMG",
  description:
    "Apply to list yourself in the PraximaIMG supervisor directory. Listings are manually verified against the AHPRA register before going live.",
};

export default function SupervisorRegisterPage() {
  return (
    <main className="min-h-screen px-6 py-10 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/supervisors"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to directory
        </Link>

        <div className="mt-6">
          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            List yourself as a supervisor
          </h1>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Help connect International Medical Graduates and the practices
            employing them with qualified supervision. Complete the form below to
            apply for a listing.
          </p>
        </div>

        <Alert className="mt-6">
          <ShieldCheck className="h-4 w-4" />
          <AlertTitle>Listings are verified before going live</AlertTitle>
          <AlertDescription className="text-muted-foreground">
            Every listing is manually reviewed and checked against the AHPRA
            public register before it appears in the directory. Submitting this
            form is an application, not an instant listing.
          </AlertDescription>
        </Alert>

        <div className="mt-8">
          <RegisterForm />
        </div>

        <Alert className="mt-8">
          <Info className="h-4 w-4" />
          <AlertTitle>Directory only</AlertTitle>
          <AlertDescription className="text-muted-foreground">
            {SUPERVISOR_DISCLAIMER}
          </AlertDescription>
        </Alert>
      </div>
    </main>
  );
}
