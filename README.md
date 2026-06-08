# PraximaIMG

**Find your route to practising medicine in Australia.**

PraximaIMG is a web app that helps International Medical Graduates (IMGs) navigate
the Australian medical registration system, and helps employers hire them
compliantly. It is a sister product to the [PraximaCPD](https://praximacpd.com)
platform.

> **Status:** MVP scaffold. This is the initial project skeleton — a landing page
> and the supporting toolchain. Auth, database, and product features are added in
> later sessions.

## Tech stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS + [shadcn/ui](https://ui.shadcn.com)
- **Auth + database:** Supabase (Sydney region) — *planned, not yet wired up*
- **Hosting:** Netlify
- **Domain:** managed at VentraIP

## Project structure

```
src/
  app/                 # App Router routes, layouts, global styles
    layout.tsx         # Root layout + metadata
    page.tsx           # Landing page
    globals.css        # Tailwind layers + design tokens
  components/
    ui/                # shadcn/ui primitives (e.g. button)
  lib/
    utils.ts           # Shared helpers (cn class merger)
```

## Getting started

Requires Node.js 18.17+ (Node 20+ recommended).

```bash
npm install        # install dependencies
npm run dev        # start the dev server at http://localhost:3000
```

### Available scripts

| Script          | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the local development server   |
| `npm run build` | Create a production build            |
| `npm run start` | Serve the production build           |
| `npm run lint`  | Run ESLint                           |

## Environment variables

Copy `.env.example` to `.env.local` and fill in real values:

```bash
cp .env.example .env.local
```

Supabase keys are listed as placeholders only — nothing reads them yet.
`.env.local` is gitignored and must never be committed.

## Deployment (Netlify)

The repo includes `netlify.toml` with the build command (`npm run build`) and the
official `@netlify/plugin-nextjs`. Connect the repository in Netlify, add the
environment variables from `.env.example` in the Netlify dashboard, and deploy.

## Adding shadcn/ui components

```bash
npx shadcn@latest add <component>
```

Components land in `src/components/ui`.
