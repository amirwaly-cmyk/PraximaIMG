import type { Metadata } from "next";
import { Suspense } from "react";

import { EligibilityChecker } from "@/components/eligibility-checker";

export const metadata: Metadata = {
  title: "Check location eligibility — PraximaIMG",
  description:
    "Look up an Australian location for DPA/DWS status on the official Health Workforce Locator, with plain-English context on section 19AB, the 10-year moratorium and the 5YOTD scheme.",
};

export default function EligibilityCheckPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen">
          <div className="mx-auto max-w-3xl px-4 py-14 text-muted-foreground">
            Loading…
          </div>
        </main>
      }
    >
      <EligibilityChecker />
    </Suspense>
  );
}
