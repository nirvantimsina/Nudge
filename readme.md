# Nudge

### Patronage infrastructure for Nepali creators

[![Next.js](https://img.shields.io/badge/Next.js-15_App_Router-black?style=flat-square&logo=next.js)](https://nextjs.org/) [![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/) [![.NET](https://img.shields.io/badge/.NET-9.0_Web_API-512BD4?style=flat-square&logo=dotnet)](https://dotnet.microsoft.com/) [![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL_16-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/) [![Dapper](https://img.shields.io/badge/ORM-Dapper-orange?style=flat-square)](https://github.com/DapperLib/Dapper) [![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS_v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/) [![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)](#license)

---

## 1. Why this exists

Creators in Nepal — filmmakers, podcasters, animators, open-source devs — run into the same three problems when they try to get paid for their work online:

1. **Fees eat the tip.** International tipping platforms take 15–30% between conversion fees, gateway cuts, and SWIFT delays before anything reaches the creator.
2. **The wallets people actually use aren't supported.** Patreon, Buy Me a Coffee, Stripe — none of them talk to Fonepay, eSewa, or Khalti, which is what most people in Nepal actually pay with.
3. **Streamers have no local tooling.** OBS overlay alerts exist for USD platforms, not for NPR micro-donations.

Nudge is built to close that gap:

- Tips go straight from supporter to creator, no custody in between.
- Payments route through Fonepay, eSewa, and Khalti, with next-day bank settlement in line with NRB rules.
- Disaster relief and verified open-source projects pay 0% platform fees.

---

## 2. How the pieces fit together

```
                                  ┌─────────────────────────────────────────┐
                                  │               Nudge Core                │
                                  │     (Public Creator Profiles & Tipping) │
                                  └────────────────────┬────────────────────┘
                                                       │
                         ┌─────────────────────────────┴─────────────────────────────┐
                         ▼                                                           ▼
       ┌──────────────────────────────────┐                        ┌──────────────────────────────────┐
       │           Nudge Studio           │                        │            Nudge Loom            │
       │    (Creator Operating System)    │                        │   (Crowdfunding / Public Goods)  │
       ├──────────────────────────────────┤                        ├──────────────────────────────────┤
       │ • OBS WebSocket live overlays    │                        │ • 0% fee campaigns                │
       │ • Transaction & settlement audit │                        │ • Open-source maintenance pools  │
       │ • TDS / PAN tax export           │                        │ • Milestone escrow                │
       │ • Fan tiers & memberships        │                        │ • Multi-donor transparency ledger │
       └──────────────────────────────────┘                        └──────────────────────────────────┘
```

---

## 3. Stack

### Frontend

- Next.js 15 (App Router) + React 19
- Design: terracotta/ivory palette, glassmorphic surfaces (`bg-surface/75–85` + `backdrop-blur-md`), a fixed 4rem navbar
- A custom cursor that swaps between pointer states on desktop and gets out of the way entirely on touch devices
- A global right-click menu that replaces the browser default with app navigation and clipboard actions
- A small easter egg: pull past the top of the page and prayer flags flutter down

### Backend

- ASP.NET Core on .NET 9
- Dapper for data access, with custom type handlers for Postgres `jsonb`
- CQRS via MediatR
- JWTs signed with HMAC-SHA256, validated against configured issuer/audience
- API docs served live through Scalar at `/scalar/v1`

---

## 4. Repo layout

Root-level monorepo — clean architecture on the backend, App Router on the frontend, one `docker-compose.yml` running the whole stack.

```text
Nudge/
├── Nudge.Presentation/                     # API layer
│   ├── Controllers/
│   ├── Middleware/
│   │   └── ExceptionMiddleware.cs          # Normalizes errors into ApiResponse<T>
│   ├── Properties/
│   │   └── launchSettings.json
│   ├── appsettings.json
│   ├── Program.cs
│   └── Dockerfile
├── Nudge.Application/                      # Use cases, CQRS handlers, interfaces
│   ├── Helpers/
│   ├── Interfaces/
│   └── Models/
├── Nudge.Infrastructure/                   # Dapper, repositories, external services
│   ├── Persistence/
│   │   ├── DbConnectionFactory.cs
│   │   └── DapperTypeHandlers.cs           # Custom handlers for Postgres jsonb
│   └── Repositories/
│       └── GenericRepository.cs
├── Nudge.Domain/                           # Entities, enums, domain logic
├── Nudge.Shared/                           # Cross-cutting constants & utilities
├── Nudge.DB/                               # SQL init/seed scripts for the postgres container
├── Nudge.UI/                               # Next.js app
│   ├── src/
│   │   ├── app/
│   │   │   ├── kyc/                        # Multi-step KYC flow (step-1..4)
│   │   │   ├── loading.tsx
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   │   ├── ui/                         # InputField, RadioGroup, Button, etc.
│   │   │   ├── common/                     # FlagSelect, NepaliDatePicker
│   │   │   └── kyc/
│   │   │       └── KycStepContainer.tsx
│   │   ├── features/
│   │   │   └── kyc/
│   │   │       ├── services/kyc.service.ts
│   │   │       ├── schemas/kyc.schemas.ts  # Zod validation, draft + proceed variants
│   │   │       ├── types/                  # One DTO per KYC step
│   │   │       └── hooks/useKycStep.ts     # Shared load/save/validate/submit logic
│   │   ├── context/
│   │   │   └── CreatorContext.tsx
│   │   ├── lib/
│   │   │   ├── api-client.ts               # Browser HTTP client + ApiResponse envelope
│   │   │   ├── api-client.server.ts        # Server-side (RSC) client, cookie-forwarding
│   │   │   └── nepali-calendar.ts          # BS/AD date conversion
│   │   └── types/
│   │       └── api.types.ts                # Shared ApiResponse<T> envelope type
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   └── Dockerfile
├── docker-compose.yml
└── Nudge.sln
```

---

## 5. Running it locally

### Prerequisites

- Docker + Docker Compose
- Node.js 20+ and .NET 9 SDK, if you want to run services outside their containers

### Quickest path: Docker Compose

Everything — Postgres, Seq, the API, and the Next.js dev server — comes up together:

```bash
docker compose up --build -d
```

This starts:

| Service | Container | Port (host) |
| --- | --- | --- |
| PostgreSQL | `postgres-database` | `5444` → `5432` |
| Seq (logs) | `nudge-seq` | `5341` |
| API | `nudge-backend-api` | `5043` |
| Frontend | `nudge-frontend-ui` | `3000` |

- API: `http://localhost:5043/api`
- Frontend: `http://localhost:3000`
- Seq logs: `http://localhost:5341`

The API container runs `dotnet watch run`, and the frontend container bind-mounts your source, so both pick up file changes without a rebuild. Database data persists in a named volume (`nudge_postgres_data`) across restarts.

Database, user, and connection details are already wired up in `docker-compose.yml` (`nudge` database, `postgres` user) — no manual `psql` setup needed for the Docker path.

### Manual setup (without Docker)

If you'd rather run things directly:

**Database**

```sql
CREATE DATABASE nudge;
CREATE USER postgres WITH ENCRYPTED PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE nudge TO postgres;

\c nudge;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

**Backend**

```bash
cd Nudge.Presentation
```

Check `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "Nudge_DB": "Host=localhost;Port=5432;Database=nudge;Username=postgres;Password=password;"
  },
  "JWTSettings": {
    "SecretKey": "YOUR_SUPER_SECRET_KEY_WITH_MINIMUM_32_CHARACTERS_HERE",
    "Issuer": "Nudge_API",
    "Audience": "Nudge_UI",
    "ExpiryHours": 8
  },
  "AllowedHosts": "*"
}
```

```bash
dotnet restore
dotnet run
```

- API: `http://localhost:5043/api`
- Docs: `http://localhost:5043/scalar/v1`

**Frontend**

```bash
cd Nudge.UI
cp .env.example .env.local
```

```env
NEXT_PUBLIC_API_URL=http://localhost:5043/api
```

```bash
npm install
npm run dev -- -H 0.0.0.0 -p 3000
```

- Local: `http://localhost:3000`
- On your LAN (for mobile testing): `http://<your-machine-ip>:3000`

---

## 6. Testing on a phone

Useful for checking payment redirects and touch interactions on a real device, on the same Wi-Fi:

```
                  ┌──────────────────────────────────────────────┐
                  │              Your Local Wi-Fi                │
                  │             (192.168.x.x Subnet)             │
                  └──────────────┬───────────────────────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
  ┌─────────────────────────────┐  ┌─────────────────────────────┐
  │      Development PC         │  │     Mobile Phone            │
  ├─────────────────────────────┤  ├─────────────────────────────┤
  │ Next.js on :3000            │  │ Opens 192.168.x.x:3000      │
  │ ASP.NET API on :5043        │  │ Talks to the API over LAN   │
  │ Both bound to 0.0.0.0       │  │                              │
  └─────────────────────────────┘  └─────────────────────────────┘
```

A few things need to be true for this to work:

1. **Firewall:** ports `3000` and `5088` need to allow inbound traffic on your machine.
2. **Kestrel binding:** the backend needs to bind to `0.0.0.0`, not just `localhost`, in `Program.cs`:

   ```csharp
   builder.WebHost.UseUrls("http://0.0.0.0:5043");
   ```
3. **CORS:** the policy needs to allow your local subnet (`192.168.x.x`) alongside `localhost:3000`.

---

## 7. Rules we don't break

- **Response envelope.** Every endpoint returns:

  ```json
  {
    "status": "0",
    "msg": "Operation successful",
    "data": { ... }
  }
  ```

  `"0"` means success. Anything else is a business-logic error, handled by `ExceptionMiddleware`.
- **Auth state goes through `useAuth()`.** No reading or writing `localStorage` directly from a component.
- **Don't nest scroll containers.** The navbar is fixed at `h-16`. Hero/root containers shouldn't wrap themselves in `h-[calc(100vh-4rem)] overflow-y-auto` — scrolling stays on the root window, or the frosted-glass blur breaks.

---

## 8. Contributing

1. `npm run build` should come back with zero TypeScript errors before you open a PR.
2. Keep presentation logic in `src/components/`, API logic in `src/features/`.
3. Backend controllers don't touch SQL or DB connections directly — everything goes through MediatR to the repository layer.
4. New frontend features follow the KYC feature's shape: one DTO type per data shape, service methods grouped in a single `*.service.ts`, Zod schemas (draft + proceed variants) in a single `*.schemas.ts`, and a shared step hook for load/validate/save/submit — see `src/features/kyc/` for the reference implementation.
5. `null` vs `undefined`: backend DTOs use `string | null` for optional fields, matching Postgres/Dapper's nullable columns. Form inputs need a `value ?? ""` fallback since native `<input>` elements don't accept `null`.

---

## 9. License

Copyright © 2026 Nudge Nepal Pvt. Ltd. All rights reserved. Proprietary — do not copy, distribute, or reverse-engineer the payment routing logic, OBS alert hooks, or anything else in here without permission.