<div align="center">
<br />

# Bidyut Frontend

<p>A production-grade Next.js frontend for a smart electricity distribution management platform.</p>
<p>Built with server-first architecture, role-based access control, and real-time grid monitoring.</p>

<br />

<p>
  <img src="https://img.shields.io/badge/Next.js-16.x-111111?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/React-19-111111?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-111111?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-111111?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Shadcn/ui-Components-111111?style=for-the-badge&logoColor=white" />
  <img src="https://img.shields.io/badge/TanStack_Query-v5-111111?style=for-the-badge&logoColor=white" />
</p>

<br />

<img src="https://res.cloudinary.com/dhppwntdj/image/upload/v1789738471/bidyut_1_us0j97.png" alt="BIDYUT Cover" style="max-width: 100%; height: auto;" />

</div>

---

## Project Summary

| | |
|---|---|
| **Project** | Bidyut Frontend |
| **Type** | Full-Stack Next.js App — Electricity Distribution Management |
| **Roles** | Customer, Technician, Operator, Admin |
| **Language** | TypeScript (Strict Mode) |
| **Framework** | Next.js 16 with App Router + React Compiler |
| **Styling** | Tailwind CSS v4 + shadcn/ui |
| **State / Forms** | Zustand + React Hook Form + Zod |
| **Data Fetching** | TanStack Query v5 + ofetch |
| **Auth** | JWT via httpOnly cookies + Google OAuth |
| **Package Manager** | Bun |

---

## Overview

Bidyut Frontend is the client-facing application for a smart electricity distribution system. It pairs with the Bidyut backend to deliver a complete grid management workflow — from outage reporting and load scheduling through payment processing and infrastructure management.

The application is built around Next.js Server Components and a layered API client, keeping authentication and sensitive operations server-side. Role-based routing is enforced at the middleware level, giving each user role a strictly isolated dashboard experience.

---

## Product Scope

### Public (Unauthenticated)
- Browse service coverage areas and grid topology
- View public outage information and schedules
- Register as a Customer or apply as a Technician
- Secure login with role-aware redirect and Google OAuth

### Customer
- Submit outage and fault reports
- Track report status and history
- View and pay electricity bills
- Apply for a technician role upgrade

### Technician
- View assigned field tasks and work orders
- Manage assignment status and updates

### Operator
- Monitor outages across zones, substations, feeders, and areas
- Manage load schedules and planned maintenance
- View grid analytics and infrastructure data
- Manage users within their operational scope

### Admin
- Full platform oversight: users, applications, activity logs
- Manage grid infrastructure (zones, substations, feeders, areas)
- Review all outages, payments, and schedules
- Access platform-wide analytics

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, React Compiler) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui, Base UI, Lucide React |
| Forms & Validation | React Hook Form, TanStack Form, Zod |
| Data Fetching | TanStack Query v5, ofetch |
| State Management | Zustand |
| Auth | JWT (httpOnly cookies), Google OAuth (`@react-oauth/google`), jose |
| Animations | Framer Motion |
| Charts | Recharts |
| Date Handling | date-fns |
| Notifications | Sonner |
| i18n | Custom dictionary-based i18n |
| Package Manager | Bun |

---

## Project Structure

```
src/
├── app/
│   ├── (dashboard)/             # Protected role dashboards
│   │   ├── admin/               # Admin: users, applications, grid infra, analytics
│   │   ├── operator/            # Operator: outages, schedules, grid management
│   │   ├── technician/          # Technician: assignments
│   │   └── customer/            # Customer: reports, payments
│   └── (public)/                # Public-facing pages
│       ├── (portal)/            # Coverage, outages, schedules, payments
│       └── (authentication)/    # Login, register, apply-technician
├── api/                         # Typed API modules (auth, grid, outage, payment…)
├── components/
│   ├── dashboard/               # Role-specific dashboard components
│   ├── portal/                  # Public portal components
│   ├── layout/                  # Navbar, footer, sidebar
│   ├── guards/                  # Auth and role guard components
│   ├── form/                    # Reusable form components
│   └── ui/                      # shadcn/ui component library
├── hooks/                       # TanStack Query hooks per domain
├── lib/                         # API client, auth helpers, i18n, store, utils
├── providers/                   # App-level React providers
├── routes/                      # Route definitions per role
├── types/                       # Shared TypeScript interfaces
└── validation/                  # Zod schemas
```

---

## Key Architecture Decisions

**Layered API client** — A typed `ofetch`-based client in `src/lib/apiClient.ts` handles auth headers, token refresh, and error normalization. All domain modules in `src/api/` build on top of it, keeping fetch logic separate from UI.

**TanStack Query for server state** — All data fetching goes through domain-specific hooks in `src/hooks/`, giving consistent loading, error, and caching behavior across the app without manual state management.

**Zustand for client state** — Lightweight global state (auth session, UI preferences) lives in Zustand stores, keeping component trees clean.

**Role-based routing enforced at middleware** — Each role (customer, technician, operator, admin) has an isolated route namespace. The middleware validates the JWT and redirects unauthorized access before any page renders.

**httpOnly cookie tokens** — Access and refresh tokens are stored exclusively in httpOnly cookies — never in localStorage or client state — reducing XSS exposure.

**React Compiler enabled** — `reactCompiler: true` in `next.config.ts` enables automatic memoization, removing the need for manual `useMemo` and `useCallback` across the codebase.

---

## Local Setup

### Prerequisites
- Node.js 20+ or [Bun](https://bun.sh)
- A running instance of the Bidyut backend

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/your-org/bidyut-frontend.git
cd bidyut-frontend
```

**2. Install dependencies**
```bash
bun install
# or
npm install
```

**3. Configure environment variables**

Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_DEMO_AREA_ID=your_demo_area_id
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

**4. Start the development server**
```bash
bun run dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**5. Build for production**
```bash
bun run build
bun run start
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL of the Bidyut backend API |
| `NEXT_PUBLIC_DEMO_AREA_ID` | Area ID used for public demo/preview |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth client ID |

---

## License

Licensed under the ISC License. See `LICENSE` for details.
