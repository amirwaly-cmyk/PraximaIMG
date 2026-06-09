import { NextResponse } from "next/server";

/**
 * Maintenance mode.
 *
 * While this file exists, every page request is served a "temporarily offline"
 * holding page with HTTP 503 (Service Unavailable + Retry-After) — the correct
 * status for planned downtime, so search engines treat it as temporary.
 *
 * To bring the site back online: delete this file (src/middleware.ts) and
 * redeploy. Nothing else needs to change.
 */

const MAINTENANCE_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>PraximaIMG — Temporarily offline</title>
    <style>
      :root { color-scheme: light; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        background: hsl(190 30% 99%);
        color: hsl(200 24% 16%);
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
        line-height: 1.6;
      }
      .card {
        max-width: 32rem;
        width: 100%;
        text-align: center;
        background: #fff;
        border: 1px solid hsl(200 22% 89%);
        border-radius: 16px;
        padding: 40px 32px;
        box-shadow: 0 1px 2px rgba(0,0,0,0.04);
      }
      .badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        height: 44px;
        width: 44px;
        justify-content: center;
        border-radius: 12px;
        background: hsl(184 58% 32%);
        color: #fff;
        margin-bottom: 20px;
        font-size: 22px;
      }
      h1 { font-size: 1.6rem; margin: 0 0 12px; letter-spacing: -0.01em; }
      p { margin: 0 auto; color: hsl(200 12% 44%); max-width: 26rem; }
      .brand { margin-top: 28px; font-size: 0.8rem; color: hsl(200 12% 55%); }
    </style>
  </head>
  <body>
    <main class="card">
      <div class="badge" aria-hidden="true">⚕</div>
      <h1>We&rsquo;ll be back shortly</h1>
      <p>
        PraximaIMG is temporarily offline while we make some improvements.
        Please check back soon &mdash; thanks for your patience.
      </p>
      <div class="brand">PraximaIMG</div>
    </main>
  </body>
</html>`;

export function middleware() {
  return new NextResponse(MAINTENANCE_HTML, {
    status: 503,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "retry-after": "3600",
      "cache-control": "no-store",
    },
  });
}

// Apply to everything except Next's static assets and the favicon, so the
// holding page (which is fully self-contained) always renders.
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
