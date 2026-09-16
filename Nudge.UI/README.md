# Nudge — Reusable Components

Built for Next.js App Router + TypeScript, following a `features/` (models, services,
hooks) + `components/` (UI) split, talking to your .NET Core API client-side.

## 1. Setup

```bash
npm install clsx tailwind-merge
```

Merge `tailwind.theme.snippet.ts`'s `nudgeThemeExtend` object into `theme.extend` in
your `tailwind.config.ts` — the components use custom tokens like `bg-primary-container`,
`text-on-surface`, `font-headline-sm`, `space-md`, etc. Also load the Epilogue and
Plus Jakarta Sans fonts (e.g. via `next/font/google`).

Add to `.env.local`:

```
NEXT_PUBLIC_API_BASE_URL=https://api.nudge.np
```

Copy `lib/`, `features/`, and `components/` into your project root (or into `src/`,
adjusting the `@/` alias in `tsconfig.json` accordingly).

## 2. Folder structure

```
features/
  creators/
    models/creator.model.ts       # Creator shape (Category, Name, Nudges, Description...)
    services/creator.service.ts   # apiClient calls to your .NET endpoints
    hooks/useCreators.ts          # client-side fetch + loading/error state
  nudge/
    models/nudge.model.ts         # NudgeCreator, NudgeTier, CreateNudgePayload
    services/nudge.service.ts
    hooks/useNudgePreview.ts      # drives the rotating hero widget + tier selection
    hooks/useSendNudge.ts         # mutation hook for submitting a nudge

components/
  layout/NavBar.tsx
  layout/Footer.tsx
  cards/CreatorCard.tsx
  creators/FeaturedCreatorsSection.tsx   # wires useCreators -> CreatorCard grid
  nudge/LiveNudgePreview.tsx             # wires useNudgePreview + useSendNudge
  stream/StreamOverlay.tsx               # presentational OBS alert mockup
  cta/CommunityCta.tsx                   # "Your community already wants to help"
  cta/StartPageCta.tsx                   # "nudge.np/@handle" claim bar
```

## 3. Expected .NET API endpoints

These are what the services in `features/*/services` call. Adjust paths/payloads to
match your actual controllers — the services are the single place to change if your
routes differ.

| Method | Path | Used by |
|---|---|---|
| GET | `/api/creators/featured?category=music` | `useCreators` |
| GET | `/api/nudge/preview-creators` | `useNudgePreview` (hero widget) |
| GET | `/api/creators/{slug}/nudge-profile` | a creator's own page |
| POST | `/api/nudge` | `useSendNudge` |

`GET /api/creators/featured` response:

```jsonc
{
  "items": [
    {
      "id": "c_123",
      "slug": "sisan-baniya",
      "category": "Storyteller",
      "name": "Sisan Baniya",
      "description": "Storyteller & Filmmaker capturing raw Nepal expeditions...",
      "nudgeCount": 1420,
      "avatarUrl": "https://...",
      "tierName": "Cinema Guild"
    }
  ],
  "total": 42
}
```

`GET /api/nudge/preview-creators` response — array of:

```jsonc
{
  "id": "c_123",
  "slug": "sisan-baniya",
  "name": "Sisan Baniya",
  "firstName": "Sisan",
  "bio": "Storyteller & Independent Filmmaker",
  "avatarUrl": "https://...",
  "isVerified": true,
  "tiers": [
    { "id": "t_1", "label": "Fan", "amount": 300, "note": "One-time" },
    { "id": "t_2", "label": "Patron", "amount": 750, "note": "Recommended" },
    { "id": "t_3", "label": "Producer", "amount": 1500, "note": "Deep Impact" }
  ],
  "recentNudge": {
    "senderName": "Aayush",
    "amount": 300,
    "comment": "Keep documenting the Himalayas!",
    "createdAt": "2026-09-15T10:04:00Z"
  }
}
```

## 4. Example usage (`app/page.tsx`)

```tsx
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { StartPageCta } from "@/components/cta/StartPageCta";
import { LiveNudgePreview } from "@/components/nudge/LiveNudgePreview";
import { FeaturedCreatorsSection } from "@/components/creators/FeaturedCreatorsSection";
import { StreamOverlay } from "@/components/stream/StreamOverlay";
import { CommunityCta } from "@/components/cta/CommunityCta";

export default function HomePage() {
  return (
    <>
      <NavBar logoUrl="/logo.png" />

      <section className="grid lg:grid-cols-12 gap-8 max-w-7xl mx-auto px-4 py-12">
        <div className="lg:col-span-7">
          <h1 className="text-display-hero font-display-hero">
            Fund your creative passions directly.
          </h1>
          <StartPageCta onSubmit={(handle) => console.log("check availability:", handle)} />
        </div>
        <div className="lg:col-span-5">
          <LiveNudgePreview onNudgeSent={(url) => (window.location.href = url)} />
        </div>
      </section>

      <StreamOverlay
        widgetUrl="https://nudge.np/widgets/alerts?key=np_live_8f7a..."
        alert={{
          senderName: "Anmol Shrestha",
          amount: 1000,
          comment: "Keep the Mustang vlog series going bro!",
          ttsVoiceLabel: "Nepali Female (Shreya)",
        }}
      />

      <FeaturedCreatorsSection onNudgeClick={(creator) => console.log(creator)} />

      <CommunityCta />

      <Footer logoUrl="/logo.png" copyrightText="© 2026 Nudge Nepal Pvt. Ltd." />
    </>
  );
}
```

## 5. Notes / things I deliberately changed from the static HTML

- **Featured Creators marquee → scroll-snap row.** The original auto-scrolling
  marquee duplicates a fixed card set for a seamless loop. Since this section now
  loads a real, possibly-paginated list from your API, I swapped it for a
  horizontally scrollable, snap-aligned row instead of faking a loop with
  API data. Happy to add auto-scroll back if you want it, just say so.
- **CreatorCard banner gradient** is a prop (`bannerGradientClassName`) rather than
  hardcoded per creator — pass a value from your API or cycle through a palette
  client-side.
- All data-bearing components are `"use client"` since they fetch via
  `useEffect`/`fetch` per your preference. If you later want faster first paint,
  the services in `features/*/services` can be called from a Server Component
  instead with no changes to their signatures.
- CORS: since the browser calls your .NET API directly, make sure
  `NEXT_PUBLIC_API_BASE_URL`'s origin is allowed in your API's CORS policy.
