# AGENTS.md — System Architecture & Developer Guidelines for AI Agents & Engineers

Welcome to **Nudge**. This document serves as the single source of truth for AI agents (and human contributors) interacting with, refactoring, or extending this repository.

---

## 1. System Mission & Product Context

Nudge is a patronage and micro-contribution platform specifically engineered for Nepali creators, streamers, artists, and open-source contributors.
- **Problem Solved**: High cross-border processing fees and lack of domestic wallet support (eSewa, Khalti, Fonepay QR) on international platforms like Patreon and Buy Me a Coffee.
- **Core Pillars**:
  1. **Nudge Core & Loom**: Mobile-first link-in-bio and patronage portal (`/loom/[slug]`).
  2. **Nudge Studio**: Creator dashboard (`/dashboard`), live OBS WebSocket alerts, KYC verification (`/kyc/step-1..4`), and bank settlement.
  3. **Headless Identity**: Zitadel IAM federated identity engine with 100% custom Himalayan brand UI.

---

## 2. Solution Structure & Directory Map

```text
├── Nudge.sln                           # Master Visual Studio Solution (.NET 9)
├── docker-compose.yml                  # Full multi-container local environment
├── database/                           # Versioned database migration scripts (001_*.sql)
├── Nudge.DB/                           # Database container initialization directory
│   ├── backup-rename                   # Master PostgreSQL initial dump
│   └── 001_auth_onboarding_and_creators.sql
│
├── Nudge.Presentation/                 # ASP.NET Core 9 Web API
│   ├── Program.cs                      # Service registration, JWT, CORS, Serilog, Middleware
│   ├── API/                            # Feature-sliced API controllers
│   │   ├── Auth/Controllers/           # Login, SignUp, Me, Logout
│   │   ├── Creator/Controllers/        # Creator summary & profile registration
│   │   ├── Onboarding/Controllers/     # User analytics & onboarding survey submission
│   │   ├── KYC/Controllers/            # Step-by-step KYC verification
│   │   └── PublicAPI/Controllers/      # Public creator discovery
│   └── Extensions/                     # AuthCookieExtensions, HealthChecks, etc.
│
├── Nudge.Application/                  # MediatR CQRS Layer & Business Logic
│   ├── Common/Interfaces/              # IZitadelService, IGenericRepository, ICreatorContext
│   ├── Features/                       # CQRS Commands & Queries by domain
│   │   ├── Auth/                       # Login, SignUp, SyncUser
│   │   ├── CreatorSetup/               # CreateCreator, CreatorDetails
│   │   ├── Onboarding/                 # SubmitOnboarding, GetOnboardingStatus
│   │   ├── Dashboard/                  # GetDashboardQuery
│   │   └── KYC/                        # Address, Docs, Creator Info
│   └── Helpers/                        # JWTHelper, PasswordHelper
│
├── Nudge.Infrastructure/               # Persistence & External Service Integrations
│   ├── Persistence/                    # GenericRepository (Dapper), DbConnectionFactory
│   ├── Repositories/CreatorContext.cs  # ICreatorContext resolving UserId & CreatorId from token
│   └── Services/ZitadelService.cs      # Zitadel v2 User Management & OAuth Token Exchange
│
├── Nudge.Domain/                       # Entities, Dapper DB models, domain response wrappers
├── Nudge.Shared/                       # Common models, ApiResponse<T>, error codes
│
└── Nudge.UI/                           # Next.js 15 (App Router) + React 19 + Tailwind CSS v4
    ├── src/app/
    │   ├── (public)/                   # Marketing, Loom portal, public pages
    │   ├── (studio)/                   # Protected creator studio (dashboard, kyc, onboarding)
    │   ├── api/auth/                   # BFF route handlers (login, signup, me, logout, sso)
    │   ├── api/onboarding/             # BFF route handler for onboarding survey
    │   ├── api/creator/register/       # BFF route handler for creator provisioning
    │   ├── auth/page.tsx               # Custom Himalayan brand login & register screen
    │   └── onboarding/page.tsx         # Multi-step onboarding and analytics flow
    ├── src/features/                   # Domain modules (auth, onboarding, creators, kyc, loom)
    ├── src/context/                    # React Context (AuthContext, CreatorContext)
    ├── lib/api-client.ts               # Universal fetch wrapper with cookie forwarding
    └── src/middleware.ts               # Edge route protection using nudge_auth_token cookie
```

---

## 3. Authentication & Identity Flow (Zitadel Headless Pattern)

```
[User Browser]
      │
      │ 1. Submits custom credentials (LoginForm / SignupForm)
      ▼
[Next.js BFF /api/auth/login or /api/auth/signup]
      │
      │ 2. Forwards request to .NET Backend
      ▼
[.NET Backend /Auth/Login or /Auth/SignUp]
      │
      │ 3. Authenticates or provisions human user via IZitadelService
      ▼
[Zitadel IAM (localhost:8080)]
      │
      │ 4. Issues OAuth Token & Subject ID
      ▼
[.NET SyncUserSessionCommand]
      │
      │ 5. Executes permission.fn_upsert_user(subjectid, email, username)
      ▼
[PostgreSQL Database]
      │
      │ 6. Auto-provisions/links public.users and creator.tblcreators
      ▼
[Next.js Response]
      │
      │ 7. Issues HttpOnly Cookie: nudge_auth_token (Path=/, SameSite=lax)
      ▼
[Browser / Edge Middleware]
      Authenticated session active; protected routes (/dashboard, /onboarding, /kyc) unlocked.
```

### Social SSO (Google & Apple)
- **Status**: Extensibility fully built, hidden by default via feature flag `NEXT_PUBLIC_ENABLE_SSO=false`.
- **Mechanism**:
  - `GET /api/auth/sso/[provider]` passes `idp_hint=google` or `idp_hint=apple` to Zitadel authorize endpoint.
  - Zitadel bypasses its hosted login and redirects straight to Google/Apple.
  - `/api/auth/callback/zitadel` exchanges the authorization code, calls `.NET /Auth/Me` to populate PostgreSQL via `permission.fn_upsert_user`, sets `nudge_auth_token` cookie, and redirects to `/dashboard`.
  - To turn SSO on in production: Set `NEXT_PUBLIC_ENABLE_SSO=true` in `Nudge.UI/.env.local`.

---

## 4. User Onboarding & Creator Provisioning

1. **Signup Destination**: Upon initial registration, users are routed to `/onboarding`.
2. **Onboarding Survey**:
   - Captures discovery/referral source (`tiktok`, `youtube`, `friend`, `twitter`, `search`, `other`).
   - Captures primary platform intent (`creator_page`, `donate_streamers`, `exploring`).
   - Stored in `analytics.tbluseronboarding`.
3. **Creator Account Initialization**:
   - If user chooses `creator_page`, they provide Creator Slug (`nudge.np/@slug`), Display Name, Category, and Bio.
   - Automatically calls `creator.fn_create_creator` which provisions `creator.tblcreators`.
   - Refreshes `AuthContext` so `user.creatorId` is populated and `isCreator` is `true`.
   - **Crucial**: The dashboard (`/dashboard`) relies on `creator.tblcreators` existing for the authenticated user ID (`fn_dashboard(p_userid)`). Without a creator row, creator-specific metric queries return empty results.

---

## 5. Database Schema & Migration Guidelines

- **Database Engine**: PostgreSQL 16 (connected via PgBouncer on port `6432` or direct on `5444`).
- **Core Schemas**:
  - `"user"`: `tblusers`, user accounts, roles, password hashes.
  - `creator`: `tblcreators`, `tbltiers`, `tblpayoutdetails`.
  - `analytics`: `tbluseronboarding` (onboarding survey and referral tracking).
  - `permission`: `fn_upsert_user`, `fn_auth`, role and permission maps.
  - `kyc`: `tblcreatorinfo`, `tblcreatoraddress`, `tblcreatordocs`, `tblkycverifications`.
  - `nudge`: `tblnudges`, transaction records, live message queues.
- **Migration Index Convention**:
  - All database schema updates **MUST** be placed in both `database/` and `Nudge.DB/` directories.
  - Prefix with sequential 3-digit indexing: `001_auth_onboarding_and_creators.sql`, `002_*.sql`, etc.
  - Scripts must be idempotent (`CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN IF NOT EXISTS`, `CREATE OR REPLACE FUNCTION`).

---

## 6. Docker & Container Topologies

Run the complete local cluster with:
```bash
docker compose up -d --build
```

### Services & Port Mappings:
| Service | Image / Build | Port | Purpose |
|---|---|---|---|
| `postgres-db` | `postgres:latest` | `5444:5432` | PostgreSQL 16 relational database |
| `pgbouncer` | `edoburu/pgbouncer:latest` | `6432:5432` | Connection pooler for Npgsql (Transaction mode) |
| `seq-analytics` | `datalust/seq:latest` | `5341:80` | Real-time structured log & click analytics sink |
| `nudge-api` | `Nudge.Presentation/Dockerfile` | `5043:5043` | .NET 9 Web API backend |
| `nudge-ui` | `Nudge.UI/Dockerfile` | `3000:3000` | Next.js 15 App Router frontend |
| `nudge-zitadel` | `ghcr.io/zitadel/zitadel:latest` | `8080:8080` | Headless IAM engine with PostgreSQL backend |

---

## 7. Rules for Future AI Coding Agents

1. **Brand Aesthetic Integrity**:
   - Retain the Nepali Himalayan palette: `bg-surface`, `text-primary`, warm terracotta (`#C85A32`), rich rice-paper tones, and clean outline variants.
   - Do not replace Tailwind CSS v4 variables with arbitrary raw hex values without consulting `globals.css`.
2. **Path Aliasing**:
   - In Next.js, always use `@/*` alias (configured in `tsconfig.json`).
   - Do not create broken relative imports across deep directories.
3. **CQRS & Clean Architecture**:
   - Keep ASP.NET Core controllers thin: validate, dispatch MediatR command/query, return `HandleErrorOr(result)` or `HandleResponse(result)`.
   - Place business logic in `Nudge.Application/Features/<Feature>/Commands` or `Queries`.
4. **Cookie Security**:
   - The token cookie is strictly `nudge_auth_token`.
   - Never expose raw JWT tokens in browser `localStorage`. Cookies are `HttpOnly; SameSite=Lax; Path=/`.
5. **Database Functions**:
   - Use parameterized stored functions (`@p_param`) with Dapper.
   - When introducing database changes, create `database/00X_<feature_name>.sql` and mirror to `Nudge.DB/`.
