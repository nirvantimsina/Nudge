# Nudge Nepal 🇳🇵
### The Decentralized Patronage & Operating System for Himalayan Digital Creators

[![Next.js](https://img.shields.io/badge/Next.js-15_App_Router-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![.NET](https://img.shields.io/badge/.NET-9.0_Web_API-512BD4?style=flat-square&logo=dotnet)](https://dotnet.microsoft.com/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL_16-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Dapper](https://img.shields.io/badge/ORM-Dapper-orange?style=flat-square)](https://github.com/DapperLib/Dapper)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS_v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)](#license)

---

## 1. Executive Summary & Problem Statement

In Nepal and the wider Himalayan region, independent storytellers, documentary filmmakers, podcast hosts, animators, and open-source software developers face systemic barriers when attempting to monetize digital work:

1. **The Middleman Tax & Settlement Lag:** Traditional agency contracts or international tipping platforms siphon off 15% to 30% in foreign conversion fees, payment gateway cuts, and SWIFT processing delays.
2. **Payment Inaccessibility:** Global platforms like Patreon, Buy Me a Coffee, and Stripe do not natively support direct consumer wallets dominant in Nepal (**Fonepay QR**, **eSewa**, **Khalti**).
3. **Streamer Tooling Gap:** Local live streamers (YouTube, Twitch, Facebook Gaming) lack unified overlay alerts that integrate local currency (NPR/रु) micro-donations directly into Open Broadcaster Software (OBS).

**Nudge** bridges this infrastructure gap. It provides:
* **Zero-custody tipping:** Direct peer-to-creator digital patronage.
* **Instant clearing:** Native routing via Fonepay, eSewa, and Khalti with next-day direct bank settlement compliant with Nepal Rastra Bank (NRB) payment settlement bylaws.
* **Zero platform fees for public goods:** Humanitarian campaigns, disaster relief initiatives, and verified open-source software repositories pay a 0% platform take-rate.

---

## 2. Product Ecosystem Architecture

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
       │ • OBS WebSocket Live Overlays    │                        │ • 0% Platform Fee Campaigns      │
       │ • Transaction & Settlement Audit │                        │ • Open-Source Maintenance Pools  │
       │ • TDS / Pan Tax Export Ready     │                        │ • Verified Milestone Escrow Rails│
       │ • Fan Tier & Membership Engine   │                        │ • Multi-Donor Transparency Ledgers│
       └──────────────────────────────────┘                        └──────────────────────────────────┘
```

---

## 3. Technology Architecture & Deep Specifications

### 3.1 Frontend Client (App Router)
* **Framework:** Next.js 15+ (App Router, Server & Client Components) with React 19.
* **Design System & Aesthetics:**
  * **Himalayan Earth Palette:** Terracotta primary accents (`#bc4722`), warm ivory backing (`#fff9ed`), low-container surfaces, and high-contrast charcoal text.
  * **True Glassmorphism:** Translucent surface tokens (`bg-surface/75` to `bg-surface/85`) coupled with `backdrop-blur-md` and calibrated hero top-padding (`pt-24 md:pt-28`) ensuring ambient textures blur continuously under sticky navigational headers.
* **Micro-Interactions & Hardware Agnosticism:**
  * **Adaptive Hardware Cursor:** Custom vector pointer system dynamically toggling between default arrows, clickable pointers, and focused text I-beams. Uses fine-pointer media queries to automatically unmount and defer to native touch on mobile and tablet displays.
  * **Global Context Interceptor:** App-wide right-click context menu intercepting native browser actions to expose app navigation, clipboard utilities, and authenticated state routing.
  * **Topographic Overscroll Easter Egg:** Pulling beyond the top viewport edge displays a fluttering string of Tibetan Buddhist prayer flags (*Lung-ta*) and an 8,848m summit tag.

### 3.2 Backend Web API (.NET 9 Clean Architecture)
* **Framework:** ASP.NET Core Web API on .NET 9.
* **Data Access Layer:** High-performance micro-ORM via **Dapper**, leveraging custom column type handlers for PostgreSQL `jsonb` payloads.
* **Application Architecture:** CQRS (Command Query Responsibility Segregation) orchestrated through **MediatR**.
* **Security & Tokens:** Stateless JSON Web Tokens (JWT) signed using HMAC-SHA256, strictly validated against configured audience and issuer boundaries.
* **Interactive Documentation:** Real-time OpenAPI documentation served via modern **Scalar** API Reference at `/scalar/v1`.

---

## 4. Repository Directory Structure

```text
nudge-ecosystem/
├── nudge-frontend/                         # Next.js Presentation & Client Shell
│   ├── public/                             # Static brand assets, SVG icons, and loaders
│   ├── src/
│   │   ├── app/                            # App Router tree
│   │   │   ├── (public)/                   # Route group for unauthenticated viewers
│   │   │   │   ├── page.tsx                # Marketing landing & platform metrics
│   │   │   │   ├── features/               # Feature deep-dive showcase
│   │   │   │   ├── loom/                   # Nudge Loom crowdfunding landing
│   │   │   │   └── studio/                 # Nudge Studio feature breakdowns
│   │   │   ├── auth/                       # Unified authentication (/auth?tab=login|signup)
│   │   │   ├── test-loader/                # Isolated staging route for animation audits
│   │   │   ├── globals.css                 # Custom utility classes, variables & reset rules
│   │   │   └── layout.tsx                  # Root HTML shell, AuthProvider, Global Cursors
│   │   ├── components/                     # Reusable design system library
│   │   │   └── public/common/
│   │   │       ├── Button.tsx              # Polymorphic design-system button
│   │   │       ├── ContextMenu.tsx         # Global right-click context interceptor
│   │   │       ├── CustomCursor.tsx        # High-performance SVG pointer orchestrator
│   │   │       ├── LogoLoader.tsx          # Animated SVG loader component
│   │   │       ├── NavBar.tsx              # Translucent frosted header navigation
│   │   │       └── OverscrollEasterEgg.tsx # Himalayan prayer flag pull-down easter egg
│   │   ├── features/                       # Vertical sliced business logic
│   │   │   └── auth/
│   │   │       ├── hooks/use.auth.hook.tsx # Global Auth context & token synchronization
│   │   │       └── types/auth.types.ts     # Request/Response data models & envelope types
│   │   └── lib/
│   │       ├── api-client.ts               # Browser-side HTTP client with LAN resolution
│   │       └── api-client.server.ts        # Node.js RSC server client for data fetching
│   ├── package.json
│   ├── tsconfig.json
│   └── tailwind.config.ts
│
└── nudge-backend/                          # ASP.NET Core Solution Root
    ├── Nudge.Presentation/                 # API Entry Point & Middleware Configuration
    │   ├── Controllers/                    # RESTful endpoints grouped by domain
    │   ├── Middleware/
    │   │   └── ExceptionMiddleware.cs      # Global error normalization to ApiResponse<T>
    │   ├── Properties/
    │   │   └── launchSettings.json         # Kestrel server profiles and port configurations
    │   ├── appsettings.json                # JWT tokens, connection strings, and logging
    │   └── Program.cs                      # DI container, pipeline orders, and CORS rules
    ├── Nudge.Application/                  # Core Business Domain & Commands
    │   ├── Helpers/                        # Token generation, hashing, and formatting tools
    │   ├── Interfaces/                     # Persistence boundaries (IGenericRepository)
    │   └── Models/                         # Data transfer objects & standard response envelopes
    └── Nudge.Infrastructure/               # Persistence, Drivers, & External Integrations
        ├── Persistence/
        │   ├── DbConnectionFactory.cs      # Resilient Npgsql PostgreSQL connection provider
        │   └── DapperTypeHandlers.cs       # Custom JSONB type handlers for Dapper
        └── Repositories/
            └── GenericRepository.cs        # Generic data-access implementation
```

---

## 5. Local Development Setup

### 5.1 System Prerequisites
Make sure the following dependencies are installed and available in your system path:
* **Node.js:** `v20.x` or higher (LTS recommended)
* **Package Manager:** `npm` (v10+) or `pnpm`
* **.NET SDK:** `.NET 9.0 SDK`
* **Database:** PostgreSQL 15+ running locally or in Docker

---

### 5.2 Database Provisioning (PostgreSQL)

Execute the following commands in `psql` to create the initial database:

```sql
CREATE DATABASE bmab;
CREATE USER sa WITH ENCRYPTED PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE bmab TO sa;

\c bmab;

-- Enable UUID and cryptographic extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

---

### 5.3 Backend API Configuration & Execution

1. Navigate to the Presentation directory:
   ```bash
   cd nudge-backend/Nudge.Presentation
   ```

2. Inspect `appsettings.json` and ensure your database connection matches:
   ```json
   {
     "ConnectionStrings": {
       "Nudge_DB": "Server=localhost,5432;Database=bmab;User ID=sa;Password=password;TrustServerCertificate=True;"
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

3. Restore dependencies, compile, and run the API:
   ```bash
   dotnet restore
   dotnet run
   ```

4. Verify Kestrel is listening:
   * **Base API Address:** `http://localhost:5088/api`
   * **Scalar API Documentation:** `http://localhost:5088/scalar/v1`

---

### 5.4 Frontend Client Configuration & Execution

1. Navigate to the frontend directory:
   ```bash
   cd nudge-frontend
   ```

2. Create a local environment configuration file:
   ```bash
   cp .env.example .env.local
   ```
   Add the following values:
   ```env
   # Leave as dynamic or point to local LAN port:
   NEXT_PUBLIC_API_URL=http://localhost:5088/api
   ```

3. Install project dependencies:
   ```bash
   npm install
   ```

4. Launch the development server (configured with host binding for mobile & LAN testing):
   ```bash
   npm run dev -- -H 0.0.0.0 -p 3000
   ```

5. Open your browser:
   * **Local Access:** `http://localhost:3000`
   * **Network / Mobile Access:** `http://<YOUR_LOCAL_MACHINE_IP>:3000` (e.g., `http://192.168.147.2:3000`)

---

## 6. Mobile & Cross-Network Testing Protocol

To debug and test real-time mobile responsive views, payment redirects, and touch interactions directly on physical iOS and Android devices connected to the same Wi-Fi network:

```
                  ┌──────────────────────────────────────────────┐
                  │              Your Local Wi-Fi                │
                  │             (192.168.x.x Subnet)             │
                  └──────────────┬───────────────────────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
  ┌─────────────────────────────┐  ┌─────────────────────────────┐
  │      Development PC         │  │     Mobile Smartphone       │
  ├─────────────────────────────┤  ├─────────────────────────────┤
  │ Next.js (Port 3000)         │  │ Opens:                      │
  │ ASP.NET API (Port 5088)     │  │ [http://192.168.147.2:3000](http://192.168.147.2:3000)   │
  │ Bound to: 0.0.0.0           │  │ Communicates via LAN to API │
  └─────────────────────────────┘  └─────────────────────────────┘
```

1. **Firewall Inbound Rules:**
   Ensure incoming TCP traffic on ports **`3000`** and **`5088`** is permitted through your host firewall (e.g., Windows Defender Firewall or macOS Packet Filter).
2. **Kestrel Interface Binding:**
   The backend must bind to `0.0.0.0:5088` (not just `localhost:5088`) inside `Program.cs`:
   ```csharp
   builder.WebHost.UseUrls("[http://0.0.0.0:5088](http://0.0.0.0:5088)");
   ```
3. **CORS Origins:**
   The ASP.NET Core CORS policy dynamically evaluates the request origin and allows all local subnet IPs (`192.168.x.x`) along with `localhost:3000`.

---

## 7. Core Architectural Invariants

* **Standard API Envelope:** All controller endpoints return a standardized payload envelope:
  ```json
  {
    "status": "0",
    "msg": "Operation successful",
    "data": { ... }
  }
  ```
  Status `"0"` denotes success; non-zero alphanumeric codes represent domain-specific business exceptions handled via `ExceptionMiddleware`.
* **Zero Direct State Mutation in Components:** Authentication status must be consumed using the `useAuth()` hook. Avoid manual direct reads or writes to `localStorage` within components.
* **Layout Offset Coordination:** Navbars are fixed (`h-16` / 4rem). Hero and root containers must never use internal `h-[calc(100vh-4rem)] overflow-y-auto` nesting; top-level document scrolling must remain on the root window to preserve hardware-accelerated frosted glass blur effects.

---

## 8. Contributing & Code Standards

1. **Type Safety:** Ensure zero TypeScript errors across the build pipeline (`npm run build`).
2. **Component Separation:** Isolate presentation logic inside `src/components/` and API integrations inside `src/features/`.
3. **Backend Clean Architecture:** Controllers must not write raw SQL or interact directly with database connections. All workflows must flow through MediatR Queries or Commands to the appropriate Repository layer.

---

## 9. License

Copyright © 2026 **Nudge Nepal Pvt. Ltd.** All rights reserved.  
Unauthorized duplication, distribution, or reverse engineering of proprietary algorithms, OBS alert hooks, and payment gateway routing mechanisms is strictly prohibited.