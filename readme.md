# Nudge

### Patronage & Micro-Contribution Infrastructure for Nepali Creators

[![Next.js](https://img.shields.io/badge/Next.js-15_App_Router-black?style=flat-square&logo=next.js)](https://nextjs.org/) [![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/) [![.NET](https://img.shields.io/badge/.NET-9.0_Web_API-512BD4?style=flat-square&logo=dotnet)](https://dotnet.microsoft.com/) [![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL_16-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/) [![PgBouncer](https://img.shields.io/badge/Pooler-PgBouncer-green?style=flat-square)](https://www.pgbouncer.org/) [![Dapper](https://img.shields.io/badge/ORM-Dapper-orange?style=flat-square)](https://github.com/DapperLib/Dapper) [![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS_v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/) [![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)](#license)

---

## 1. Why This Exists

Creators in Nepal — filmmakers, podcasters, game streamers, digital artists, open-source developers — face three structural hurdles when monetizing their influence online:

1. **High conversion & cross-border fees:** International tipping platforms (Buy Me a Coffee, Patreon) take 15–30% in gateway fees, intermediary cuts, and bank transfer charges before funds reach Nepal.
2. **Unsupported local payment rails:** Supporter checkout requires international credit/debit cards. The platforms do not integrate with **Fonepay QR**, **eSewa**, or **Khalti**, which constitute the vast majority of consumer micro-payments in Nepal.
3. **No livestream tooling for NPR:** Live overlays (OBS/Streamlabs alerts) cater almost entirely to USD/EUR streams, with no real-time TTS/banner support for domestic digital wallet transactions.

**Nudge closes this gap:**
- Supporter-to-creator micro-donations with near-zero custodial delays.
- Native integration with Fonepay, eSewa, and Khalti with next-day bank settlement compliant with Nepal Rastra Bank (NRB) guidelines.
- **Nudge Loom**: A fast, low-friction link-in-bio and patronage portal optimized for mobile WebKit and low-latency Nepali mobile networks.
- 0% platform service fee on verified open-source initiatives and community relief pools.

---

## 2. Product Architecture & Ecosystem

```text
                                  ┌─────────────────────────────────────────┐
                                  │               Nudge Core                │
                                  │     (Public Creator Profiles & Tipping) │
                                  └────────────────────┬────────────────────┘
                                                       │
                         ┌─────────────────────────────┴─────────────────────────────┐
                         ▼                                                           ▼
       ┌──────────────────────────────────┐                        ┌───────────────────────────────────┐
       │           Nudge Studio           │                        │            Nudge Loom             │
       │    (Creator Operating System)    │                        │     (Link-in-Bio & Tipping)       │
       ├──────────────────────────────────┤                        ├───────────────────────────────────┤
       │ • OBS WebSocket live overlays    │                        │ • Mobile-first patron cards       │
       │ • Transaction & settlement audit │                        │ • Quick-tap micro-tiers           │
       │ • TDS / PAN tax export (Nepal)   │                        │ • Modal checkout (eSewa/Fonepay)  │
       │ • Tier management & perks        │                        │ • Public verified creator portals │
       └──────────────────────────────────┘                        └───────────────────────────────────┘
```

---

## 3. Technology Stack & Key Decisions

### Frontend (`Nudge.UI`)
- **Framework:** Next.js 15 (App Router) + React 19.
- **Styling:** Tailwind CSS v4 featuring the Himalayan terracotta/rice-paper design system (`bg-surface`, `text-primary`, ivory accents, and Lokta radial paper background textures).
- **Mobile UX Safeguards:**
  - Strict touch separation: CSS/pointer properties (`(hover: none) and (pointer: coarse)`) disable intrusive desktop elements (like custom cursors and contextual menus) on mobile devices to prevent touch interception.
  - Zero-latency mobile taps: Buttons explicitly declare `touch-manipulation` and maintain isolated z-index stacking layers to prevent Safari/Chrome active-tap cancellation bugs.
  - Sticky glassmorphic navbar with an animated hamburger drawer and real-time scroll directional hiding.
- **Telemetry & Logging:** Client-side telemetry stream piped to Seq (`:5341`) tracking click vectors and route journeys.

### Backend (`Nudge.Presentation`, `Nudge.Application`, `Nudge.Infrastructure`)
- **Runtime:** .NET 9.0 Web API (C#).
- **Data Access:** High-performance Dapper with custom single-type handlers registered at startup for PostgreSQL `jsonb` columns (e.g., `TierDto`, `LinkItemDto`).
- **Connection Pooling:** **PgBouncer** running in **Transaction Pooling** mode to manage connection concurrency without exhausting PostgreSQL worker threads.
- **Database Driver:** Npgsql configured with transaction-pooling compatibility flags:
  - `No Reset On Close=true;` (avoids running session-level `DISCARD ALL` unsupported in transaction poolers).
  - `Max Auto Prepare=0;` (disables auto-statement preparation per connection).
- **Pattern:** CQRS implemented via MediatR with decoupled repository abstractions.
- **Documentation:** Interactive Scalar API explorer served at `/scalar/v1`.

---

## 4. Repository Layout

```text
Nudge/
├── Nudge.Presentation/                     # ASP.NET Core API layer
│   ├── Controllers/
│   │   ├── AuthController.cs
│   │   └── LoomController.cs              # Profile, tiers, and link-in-bio endpoints
│   ├── Middleware/
│   │   └── ExceptionMiddleware.cs          # Standardizes output to ApiResponse<T>
│   ├── Properties/
│   │   └── launchSettings.json
│   ├── appsettings.json
│   ├── Program.cs                         # CORS, Dapper type handlers, DI registrations
│   └── Dockerfile
├── Nudge.Application/                      # MediatR commands, queries, DTOs, interfaces
│   ├── DTOs/
│   │   └── Loom/                          # TierDto, LoomProfileDto, LinkItemDto
│   ├── Features/
│   └── Interfaces/
├── Nudge.Infrastructure/                   # Dapper repositories, database factory
│   ├── Persistence/
│   │   ├── DbConnectionFactory.cs
│   │   └── DapperTypeHandlers.cs           # SqlMapper.AddTypeHandler for JSONB
│   └── Repositories/
├── Nudge.Domain/                           # Domain models, entities, and enums
├── Nudge.Shared/                           # Shared utility models and constants
├── Nudge.DB/                               # Postgres initialization & seeding scripts
├── Nudge.UI/                               # Next.js 15+ application
│   ├── src/
│   │   ├── app/
│   │   │   ├── loom/[slug]/                # Public creator page (Next.js 15 async params)
│   │   │   ├── auth/                       # Creator login & registration
│   │   │   ├── layout.tsx                  # Root layout (Fonts, Providers, Safe Cursors)
│   │   │   └── page.tsx                    # Landing page
│   │   ├── components/
│   │   │   ├── loom/public/
│   │   │   │   ├── LoomNudgeCard.tsx       # Compact tier selector + checkout modal trigger
│   │   │   │   └── LoomIcon.tsx            # SVG mapper for social link icons
│   │   │   ├── public/common/
│   │   │   │   ├── NavBar.tsx              # Adaptive desktop/mobile drawer navbar
│   │   │   │   ├── CustomCursor.tsx        # Coarse-pointer guarded custom mouse
│   │   │   │   └── ContextMenu.tsx         # Desktop-only custom contextual menu
│   │   │   └── common/
│   │   ├── features/
│   │   │   ├── auth/                       # useAuth hook, auth services
│   │   │   └── public/loom/                # Loom types and client fetchers
│   │   └── lib/
│   ├── package.json
│   ├── tailwind.config.ts
│   └── Dockerfile
├── docker-compose.yml                      # Full local network environment
└── Nudge.sln
```

---

## 5. Local Infrastructure & Docker Architecture

The local stack runs on a shared Docker bridge network (`nudge-network`), exposing only essential ports to your development machine:

```text
  ┌────────────────────────────────────────────────────────────────────────┐
  │                           Docker Network                               │
  │                                                                        │
  │  ┌───────────────────────┐             ┌────────────────────────────┐  │
  │  │   postgres-database   │             │      nudge-pgbouncer       │  │
  │  │  (PostgreSQL 16 Engine)◄────────────┤   (Transaction Pooling)    │  │
  │  │   Internal Port: 5432 │             │  Internal: 5432, Host: 6432│  │
  │  └───────────────────────┘             └─────────────▲──────────────┘  │
  │                                                      │                 │
  │                                            Connection:                 │
  │                                            Host=127.0.0.1:6432         │
  │                                                      │                 │
  │  ┌───────────────────────┐             ┌─────────────┴──────────────┐  │
  │  │       nudge-seq       │             │     nudge-backend-api      │  │
  │  │   (Structured Logs)   │             │      (.NET 9 Web API)      │  │
  │  │      Host: 5341       │             │         Host: 5043         │  │
  │  └───────────────────────┘             └────────────────────────────┘  │
  └────────────────────────────────────────────────────────────────────────┘
```

### Docker Compose Service Matrix

| Service | Container Name | Image / Base | Internal Port | Host Port | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **PostgreSQL** | `postgres-database` | `postgres:latest` | `5432` | `5444` | Persistent relational database storage |
| **PgBouncer** | `nudge-pgbouncer` | `edoburu/pgbouncer` | `5432` | `6432` | High-throughput connection pooling |
| **Zitadel** | `nudge-zitadel` | `ghcr.io/zitadel/zitadel` | `8080` | `8080` | Headless IAM federated identity engine |
| **Seq** | `nudge-seq` | `datalust/seq:latest` | `5341` / `80` | `5341` | Structured centralized telemetry |
| **API** | `nudge-backend-api` | `.NET 9 SDK` | `5043` | `5043` | Core domain & payment services |
| **UI** | `nudge-frontend-ui` | `Node 20 Alpine` | `3000` | `3000` | Next.js 15 frontend |

---

## 6. Authentication, Onboarding & Creator Provisioning

### Headless Zitadel IAM Integration
Nudge uses **Zitadel** as its underlying identity and access management engine while retaining a **100% custom Himalayan-themed UI**:
- **BFF Architecture**: Browser credentials submitted to custom forms (`/auth`) are handled by Next.js API routes (`/api/auth/login`, `/api/auth/signup`) and forwarded to the .NET backend.
- **PostgreSQL User Sync**: On successful authentication or registration, the backend dispatches `SyncUserSessionCommand`, which calls PostgreSQL `permission.fn_upsert_user` to automatically sync user accounts, roles, and creator links.
- **Secure Sessions**: Client authentication is stored in an `HttpOnly` cookie (`nudge_auth_token`), guarded by Next.js edge middleware.
- **SSO Extensibility**: Full Google & Apple federated login support is built using Zitadel `idp_hint` (toggled via `NEXT_PUBLIC_ENABLE_SSO=true` in `.env.local`, hidden by default).

### User Onboarding & Analytics (`/onboarding`)
Upon initial signup, users are guided through an interactive onboarding workflow:
- **Discovery Analytics**: Records where creators and supporters heard about Nudge (TikTok, YouTube, Friends, Search, etc.) into `analytics.tbluseronboarding`.
- **Intent Segmentation**: Categorizes users based on primary goals (`creator_page`, `donate_streamers`, `exploring`).
- **Instant Creator Account Provisioning**: If a user chooses to launch a creator page, they configure their handle (`@slug`), brand name, category, and bio. The system automatically creates a record in `creator.tblcreators` via `creator.fn_create_creator`, ensuring the creator dashboard (`/dashboard`) immediately has active profile and metric data.

---

## 7. How to Run Locally

### Option A: The Docker Compose Path (Recommended)

Bring up all services simultaneously:
```bash
docker compose up --build -d
```

- API Base: `http://localhost:5043/api`
- Scalar API Explorer: `http://localhost:5043/scalar/v1`
- Next.js UI: `http://localhost:3000`
- Zitadel IAM Console: `http://localhost:8080/ui/console`
- Seq Log Dashboard: `http://localhost:5341`

---

### Option B: Running Bare-Metal on Host (Arch Linux / macOS / Ubuntu)

#### 1. Start the Supporting Containers
```bash
docker compose up -d postgres-database nudge-pgbouncer nudge-seq
```

#### 2. Run the ASP.NET Core Backend
Ensure your `Nudge.Presentation/appsettings.json` points to PgBouncer with transaction pooling parameters:

```json
{
  "ConnectionStrings": {
    "Nudge_DB": "Host=localhost;Port=6432;Database=nudge;Username=sa;Password=your_password;No Reset On Close=true;Max Auto Prepare=0;"
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

Start the API bound to all network interfaces (`0.0.0.0`) so mobile devices on the Wi-Fi network can connect:
```bash
cd Nudge.Presentation
dotnet run --urls "[http://0.0.0.0:5043](http://0.0.0.0:5043)"
```

#### 3. Run the Next.js Frontend
In `Nudge.UI/.env.local`:
```bash
# Public API consumed by the browser (mobile phone or desktop client)
NEXT_PUBLIC_API_URL=http://<YOUR_LAN_IP>:5043/api

# Internal API used by Next.js Server Components (SSR) on host
INTERNAL_API_URL=http://localhost:5043/api

# Analytics telemetry
NEXT_PUBLIC_SEQ_URL=http://<YOUR_LAN_IP>:5341
```

Launch with `pnpm` bound to `0.0.0.0`:
```bash
cd Nudge.UI
pnpm dev -H 0.0.0.0
```

---

When testing responsive interactions, touch tiers, and wallet handoffs from a physical mobile device:


### 3. Touch Interception & Pointer Safeguards
If UI buttons play active animations (`active:scale-95`) but clicks fail to trigger:
- **Custom Cursor & Context Menu:** Ensure desktop-specific overlays use the strict pointer check:
  ```ts
  const isTouchDevice =
    window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0;
  ```
- **Never listen to `contextmenu` on capture phase (`true`)** on elements covering the viewport, as mobile browsers will cancel synthetic click dispatch on touch events.
- **Background overlays:** Any texture layer (e.g., Lokta paper) must include:
  ```tsx
  <div 
    aria-hidden="true" 
    style={{ pointerEvents: "none" }} 
    className="fixed inset-0 -z-10 pointer-events-none select-none ..." 
  />
  ```

---

## 8. Critical Engineering Standards

1. **Standardized Response Envelope:** Every API endpoint returns `ApiResponse<T>`:
   ```json
   {
     "status": "0",
     "msg": "Success",
     "data": { ... }
   }
   ```
   `"0"` indicates success. Any non-zero status represents a handled business or validation error.
2. **Next.js 15 Dynamic Route Resolution:** All route segments (such as `params` in dynamic layouts and pages) are asynchronous promises and must be awaited before accessing properties:
   ```tsx
   export default async function PublicLoomPage({ params }: { params: Promise<{ slug: string }> }) {
     const { slug } = await params;
     // ...
   }
   ```
3. **Dapper JSONB Handling:** All Postgres complex JSON columns (e.g., `tiers`, `links_json`) must be accessed via models with registered `SqlMapper.ITypeHandler` implementations configured at infrastructure's common (Nudge.Infrastructure/Common/DapperTypeHandler.cs).
4. **State Integrity:** Client authentication tokens and identities must be managed exclusively through `useAuth()`. Avoid direct references to `localStorage` or loose cookie inspection within individual view components.

---

## 9. License

Copyright © 2026 Oyester Technologies Pvt. Ltd. All rights reserved.  
Proprietary software — unauthorized distribution, decompilation, copying, or extraction of the payment routing pipelines, alert webhooks, or transaction escrow logic is strictly prohibited.


# Architecture Deep Dive: `ICreatorContext`

`ICreatorContext` (and its concrete implementation `CreatorContext`) acts as the **ambient session boundary for creator identity and tenancy** across the Nudge backend.

In a multi-tenant creator platform like Nudge, application controllers, MediatR command/query handlers, and Dapper repositories should never repeatedly parse JWTs, unpack HTTP headers, or query the database just to answer: *"Who is the logged-in creator executing this operation?"*

`ICreatorContext` resolves this by acting as a scoped, per-request dependency that extracts, normalizes, and exposes the authenticated creator's identity across the application lifecycle.

---

## 1. Flow & Request Pipeline

```text
 Incoming HTTP Request (Bearer JWT / Cookie)
                 │
                 ▼
     Authentication Middleware (Validates Token & Claims)
                 │
                 ▼
         ICreatorContext (Scoped)
     ├── Inspects HttpContext.User.Claims
     ├── Resolves:
     │     • ClaimTypes.NameIdentifier / "sub" ──► UserId
     │     • "creator_id"                      ──► CreatorId
     │     • "slug"                            ──► Slug
     │     • "is_verified"                     ──► IsVerifiedCreator
     └── Holds state for the lifetime of the HTTP request
                 │
                 ▼
   Injectable into MediatR Handlers, Repositories, & Domain Services
```

---

## 2. Interface Contract (`ICreatorContext.cs`)

Located in `Nudge.Application/Interfaces/ICreatorContext.cs`:

```csharp
namespace Nudge.Application.Interfaces;

public interface ICreatorContext
{
    Guid? UserId { get; }
    Guid? CreatorId { get; }
    string? Slug { get; }
    string? Email { get; }
    bool IsAuthenticated { get; }
    bool IsVerifiedCreator { get; }

    /// <summary>
    /// Returns the active CreatorId or throws an UnauthorizedAccessException if not present.
    /// </summary>
    Guid GetRequiredCreatorId();

    /// <summary>
    /// Returns the active UserId or throws an UnauthorizedAccessException if unauthenticated.
    /// </summary>
    Guid GetRequiredUserId();
}
```

---

## 3. Concrete Implementation (`CreatorContext.cs`)

Located in `Nudge.Infrastructure/Persistence/` (or `Nudge.Presentation/`):

```csharp
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Nudge.Application.Interfaces;

namespace Nudge.Infrastructure.Services;

public class CreatorContext : ICreatorContext
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CreatorContext(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    private ClaimsPrincipal? User => _httpContextAccessor.HttpContext?.User;

    public bool IsAuthenticated => User?.Identity?.IsAuthenticated ?? false;

    public Guid? UserId
    {
        get
        {
            var idClaim = User?.FindFirst(ClaimTypes.NameIdentifier)?.Value 
                       ?? User?.FindFirst("sub")?.Value;
            return Guid.TryParse(idClaim, out var id) ? id : null;
        }
    }

    public Guid? CreatorId
    {
        get
        {
            var creatorClaim = User?.FindFirst("creator_id")?.Value;
            return Guid.TryParse(creatorClaim, out var id) ? id : null;
        }
    }

    public string? Slug => User?.FindFirst("slug")?.Value;
    
    public string? Email => User?.FindFirst(ClaimTypes.Email)?.Value;

    public bool IsVerifiedCreator => 
        bool.TryParse(User?.FindFirst("is_verified")?.Value, out var verified) && verified;

    public Guid GetRequiredCreatorId()
    {
        return CreatorId ?? throw new UnauthorizedAccessException("Action requires an active creator profile.");
    }

    public Guid GetRequiredUserId()
    {
        return UserId ?? throw new UnauthorizedAccessException("User is not authenticated.");
    }
}
```

---

## 4. Service Registration (`Program.cs`)

Because HTTP requests run on isolated threads with unique identity tokens, `ICreatorContext` is registered with a **Scoped** lifetime alongside `IHttpContextAccessor`:

```csharp
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ICreatorContext, CreatorContext>();
```

---

## 5. Practical Use Cases

### A. Preventing ID Tampering in MediatR Handlers
Without `ICreatorContext`, a client might post `{ "creatorId": "someone-elses-id", "tiers": [...] }`.

With `ICreatorContext`, the handler ignores any untrusted client payload identifiers and reads directly from the cryptographically verified JWT claims:

```csharp
public class UpdateLoomTiersCommandHandler : IRequestHandler<UpdateLoomTiersCommand, ApiResponse<bool>>
{
    private readonly ICreatorContext _creatorContext;
    private readonly ILoomRepository _loomRepository;

    public UpdateLoomTiersCommandHandler(
        ICreatorContext creatorContext, 
        ILoomRepository loomRepository)
    {
        _creatorContext = creatorContext;
        _loomRepository = loomRepository;
    }

    public async Task<ApiResponse<bool>> Handle(UpdateLoomTiersCommand request, CancellationToken ct)
    {
        // Safe: Extracted from verified token context, not user-submitted route/body parameters
        var creatorId = _creatorContext.GetRequiredCreatorId();

        await _loomRepository.UpdateTiersAsync(creatorId, request.Tiers);

        return ApiResponse<bool>.Success(true, "Tiers updated successfully");
    }
}
```

### B. Safe Unauthenticated Reads on Public Portals (`/loom/[slug]`)
When anonymous visitors or supporters load a public profile:
- `_creatorContext.IsAuthenticated` resolves to `false`.
- `_creatorContext.CreatorId` resolves to `null`.
- Public queries (reading tiers, viewing links) proceed smoothly.
- If a guest invokes a creator-restricted command, calling `GetRequiredCreatorId()` triggers an `UnauthorizedAccessException`, which `ExceptionMiddleware` catches and transforms into standard envelope JSON:

```json
{
  "status": "401",
  "msg": "Action requires an active creator profile.",
  "data": null
}
```

---

## 6. Architectural Advantages

| Benefit | Without `ICreatorContext` | With `ICreatorContext` |
| :--- | :--- | :--- |
| **Testability** | Must mock `HttpContext`, `ClaimsPrincipal`, and `ClaimsIdentity` to run unit tests. | Mock a single interface: `mockContext.Setup(c => c.GetRequiredCreatorId()).Returns(...)`. |
| **Separation of Concerns** | Application and Domain layers must take dependencies on `Microsoft.AspNetCore.Http`. | Application layer only references an abstraction in `Nudge.Application.Interfaces`. |
| **Tenant Safety** | Handlers trust `creatorId` parameters sent in request bodies, risking horizontal privilege escalation. | Creator tenancy is strictly tied to token signature checks on every write operation. |
| **Decoupling from HTTP** | Background queue consumers (Fonepay/Khalti webhooks) cannot execute logic expecting `HttpContext`. | Alternative contexts (e.g., `SystemWorkerCreatorContext`) can implement `ICreatorContext` seamlessly. |

