# AGENTS.md — Nudge (Nepal Creator Patronage Platform)

Handoff doc for continuing this frontend build in Claude Code. Covers what
exists, why it's built the way it is, and what's still open.

## Project

**Nudge** — a Patreon-style direct patronage platform for Nepali creators
(filmmakers, musicians, streamers, writers). Public-facing marketing site +
creator pages + a "nudge" (tip) flow with local payment rails (eSewa, Khalti,
Fonepay) and diaspora card support.

## Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS v4
- **Backend:** .NET Core API, returns a `{ status, msg, data }` envelope on
  every response (status `"0"` = success, anything else = error)
- **Data fetching:** client-side (`useEffect` + `fetch`), not React Query/SWR,
  not Server Components (yet — see "Open decisions" below)

## Architecture convention (already established, keep following it)

```
src/
  app/            ← ONLY routing: page.tsx, layout.tsx, loading.tsx, etc.
                    Compose components here; no business logic, no fetch calls.
  components/     ← Presentational UI, organized by type (layout/, cards/,
                    cta/, sections/, decorative/). Can call hooks from
                    features/ but shouldn't contain fetch logic directly.
  features/
    <domain>/
      models/     ← TypeScript interfaces for that domain's data shapes
      services/   ← thin functions calling apiClient, one per endpoint
      hooks/      ← "use client" hooks wrapping services with loading/error
                    state (useX pattern), consumed by components/
  lib/
    api-client.ts         ← client-side fetch wrapper (browser only)
    api-client.server.ts  ← server-side fetch wrapper (Server Components/
                             Route Handlers only)
    utils.ts               ← cn() class-merge helper
```

**Path alias:** `@/*` → project root (NOT `./src`). So every import is
`@/src/lib/...`, `@/src/components/...`, `@/src/features/...`. This matches
the user's pre-existing `api-client.ts`/`auth-models.ts` import style — don't
"fix" it back to `@/lib/...`, that was a mistake I made once and corrected.

## What's built so far

### `lib/api-client.ts` (client-side)
Method-based: `apiClient.get/post/put/delete/upload/download`.
- Reads JWT from `localStorage.getItem("token")`, sent as `Authorization: Bearer`
- `API_BASE_URL` from `NEXT_PUBLIC_API_BASE_URL` env var, **already includes
  `/api`** (e.g. `http://localhost:5043/api`) — service files must NOT prefix
  paths with `/api` again (`/creators/featured`, not `/api/creators/featured`)
- Unwraps the `{status, msg, data}` envelope automatically; throws
  `ApiServerError` (has `.statusCode` from the envelope and `.httpStatus`
  from the HTTP response) on `status !== "0"` OR non-2xx HTTP status —
  parses the envelope on error responses too, not just success
- `.upload()` — takes `FormData` or a plain object (auto-builds FormData),
  never sets `Content-Type` manually (browser sets the multipart boundary)
- `.download()` — returns `{ blob, filename }`, reads filename from
  `Content-Disposition`, optional `triggerSave: true` to auto-download
- No `PATCH` (decided not needed yet — add if a partial-update endpoint
  shows up on the backend)

### `lib/api-client.server.ts` (server-side)
Same shape, for Server Components/Route Handlers. **Not wired into anything
yet** — takes `token` as an explicit parameter rather than reading
`localStorage` (which doesn't exist on the server). It's currently dead code
until either (a) login starts also setting an httpOnly cookie, or (b) you
decide to server-render a page and thread a token through. Don't delete it,
just don't expect it to be used yet.

### `features/creators/` and `features/nudge/`
Full models/services/hooks for:
- `useCreators(category)` — Featured Creators grid, category filter
- `useNudgePreview()` — hero widget: rotating creators, tier selection,
  custom amount, per-creator selection state kept separately
- `useSendNudge()` — mutation hook, submits a nudge, returns a payment
  redirect URL

Expected backend endpoints (adjust in `services/*.service.ts` if your actual
routes differ — that's the only place that needs to change):

| Method | Path | Notes |
|---|---|---|
| GET | `/creators/featured?category=music` | `category=all` omits the filter |
| GET | `/nudge/preview-creators` | rotating set for hero widget |
| GET | `/creators/{slug}/nudge-profile` | a creator's own page |
| POST | `/nudge` | body: `CreateNudgePayload`, returns `{ id, paymentUrl }` |

Exact response shapes are documented in each `models/*.model.ts` file and in
the original component-package README (see below).

### `components/`
- `layout/NavBar.tsx`, `layout/Footer.tsx` — props-driven, logo URL passed in
- `cards/CreatorCard.tsx` — single creator card
- `creators/FeaturedCreatorsSection.tsx` — wires `useCreators` + category
  chips + `CreatorCard` grid (horizontal scroll-snap, see deviations below)
- `nudge/LiveNudgePreview.tsx` — the hero "Live Creator Nudge Preview" widget,
  wires `useNudgePreview` + `useSendNudge`
- `stream/StreamOverlay.tsx` — OBS/Streamlabs alert mockup, purely
  presentational (props: `alert`, `widgetUrl`, `studioLabel`)
- `cta/CommunityCta.tsx` — closing banner ("Your community already wants to
  help")
- `cta/StartPageCta.tsx` — `nudge.np/@handle` claim bar with animated
  placeholder cycling
- `sections/FeatureBento.tsx` — 3-card "built for Nepal" grid
- `sections/PricingComparisonTable.tsx` — Nudge vs. Patreon/BMC table
- `sections/HowItWorksSteps.tsx` — 3-step numbered list
- `decorative/PagodaWatermark.tsx`, `decorative/MandalaWatermark.tsx` — SVG
  background decoration, extracted from the original design file

### `app/`
- `page.tsx` — assembles the full homepage from the components above
- `layout.tsx` — fonts (Epilogue, Plus Jakarta Sans via Google Fonts link
  tags), imports `globals.css`, sets base body classes
- `globals.css` — imports `theme.css`, adds custom utility classes
  (`.nepal-mandala-bg`, `.subtle-pagoda-border`, `.stream-alert-glow` +
  keyframes) that Tailwind's `@theme` block doesn't cover
- `theme.css` — Tailwind v4 `@theme` block with the full design token set
  (colors, spacing, font sizes/families) ported from the original design's
  Tailwind v3 JS config. Every custom class the components use
  (`bg-primary-container`, `text-on-surface`, `font-headline-sm`,
  `text-headline-sm`, `space-md`, etc.) is defined here.

## Deviations from the original static HTML (all intentional, flagged when made)

1. **Featured Creators marquee → scroll-snap row.** Original auto-scrolled
   an infinite loop of a *fixed, duplicated* card set. Since this section
   now loads real (possibly paginated) API data, faked an infinite loop
   didn't make sense — swapped for horizontal scroll-snap. Can add
   auto-scroll back on top of live data if wanted.
2. **Material Symbols icon font → `lucide-react`.** More idiomatic for React;
   avoids a second Google Fonts dependency. Can revert if intentional brand
   choice.
3. **`page.tsx` is a Client Component.** Several children
   (`StartPageCta`, `LiveNudgePreview`, `FeaturedCreatorsSection`) already
   fetch client-side; passing callback props into them from a Server
   Component isn't allowed (functions don't cross the RSC boundary), so the
   whole page is `"use client"` for now. See "Open decisions" below.
4. **Typewriter placeholder / tier selection / carousel** reimplemented as
   React state instead of direct DOM manipulation — same visual behavior.

## Open decisions (not yet resolved — pick up here)

1. **Server-render the homepage for SEO/perf?** Currently fully client-side.
   Since this is a public marketing site people will share links to
   (especially individual creator pages), server-rendering matters more here
   than on a typical dashboard. Would mean: move `useCreators`/
   `useNudgePreview`'s initial fetch to `serverApiClient` calls in the page
   itself (Server Component), keep only the truly interactive bits
   (tier picker, carousel arrows, category filter) as small client leaf
   components receiving server-fetched data as props.
2. **Auth token storage: `localStorage` only, or also an httpOnly cookie?**
   `api-client.server.ts` is unusable until the login flow also sets a
   cookie the server can read. This is a real security/architecture decision
   (httpOnly cookie is more XSS-resistant than `localStorage`), not just a
   wiring change — needs a decision before building it out.
3. **PATCH support** — not added, add when a partial-update endpoint exists.
4. **Placeholder values still in `page.tsx`:** `logoUrl="/logo.png"` (needs
   the actual asset in `public/`), footer `copyrightText`, no Open Graph
   metadata yet in `layout.tsx`.

## Page/routing conventions for what's NOT built yet (established, not implemented)

Discussed but not yet built — auth pages, creator profile pages, dashboard.
Follow this structure when building them:

```
src/app/
  (auth)/                   ← route group, doesn't affect the URL
    login/page.tsx          → /login
    signup/page.tsx         → /signup
    layout.tsx              ← shared centered-card layout for just these two
  creators/
    [slug]/page.tsx         → /creators/sisan-baniya (dynamic route)
  dashboard/page.tsx        → /dashboard

src/features/auth/
  models/auth-models.ts     ← already exists (pre-dates this session)
  services/auth.service.ts  ← not yet built
  hooks/useLogin.ts         ← not yet built
  hooks/useSignup.ts        ← not yet built

src/components/auth/
  LoginForm.tsx              ← not yet built — presentational, calls useLogin
  SignupForm.tsx             ← not yet built
```

Rule of thumb: only `page.tsx`/`layout.tsx`/`loading.tsx`/`error.tsx`/
`not-found.tsx` go in `app/`. Actual form components go in `components/`,
actual fetch logic goes in `features/`.

## Files delivered this session (for reference — should already be applied to the repo)

- `nudge-components.zip` — first pass: individual reusable components +
  features scaffolding (superseded by `nudge-page.zip`, which merges
  everything)
- `api-client.ts`, `api-client.server.ts` — final versions with upload/
  download/server variants
- `creator.service.ts`, `nudge.service.ts` — updated to call the
  method-based `apiClient`
- `theme.css`, `globals.css` — Tailwind v4 design tokens + utilities
- `nudge-page.zip` — **the current full state**, everything merged and
  import paths corrected to `@/src/...`. Treat this as source of truth.