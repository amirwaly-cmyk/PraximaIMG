import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <span className="mb-4 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
          For International Medical Graduates &amp; employers
        </span>

        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          PraximaIMG
        </h1>

        <p className="mt-4 text-balance text-lg text-muted-foreground sm:text-xl">
          Find your route to practising medicine in Australia.
        </p>

        <p className="mt-6 max-w-xl text-balance text-muted-foreground">
          PraximaIMG helps International Medical Graduates navigate the Australian
          medical registration system, and helps employers hire them compliantly.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button size="lg">Get started</Button>
          <Button size="lg" variant="outline">
            For employers
          </Button>
        </div>

        <p className="mt-12 text-xs text-muted-foreground">
          A sister product to PraximaCPD.
        </p>
      </div>
    </main>
  );
}
