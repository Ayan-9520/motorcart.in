# Motorcart.in

**India's AI-Powered Automobile Ecosystem** — enterprise platform combining vehicle marketplace, auctions, finance, insurance, auto parts, services, dealer CRM, and AI automation.

## Tech Stack (Phase 1)

| Layer | Technology |
|-------|------------|
| Frontend | React 19 + TypeScript + **Vite** |
| Styling | Tailwind CSS 3 + shadcn/ui patterns |
| Routing | React Router v7 |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Backend | Supabase (Auth, PostgreSQL, Storage, Realtime) |
| Charts | Recharts (Phase 4+) |
| Notifications | React Hot Toast |
| Deploy | Vercel |

## Brand

- Primary Green: `#16a34a`
- Navy Blue: `#0f172a`
- Light Background: `#f8fafc`

## Quick Start

```bash
cp .env.example .env.local
# Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Phase 1 Deliverables ✅

- [x] Vite + React + TypeScript project (replaced Next.js)
- [x] Tailwind + shadcn-style UI components
- [x] React Router with public, auth, dashboard routes
- [x] Zustand stores (auth, UI)
- [x] Supabase client + useAuth hook
- [x] Protected + role-based routes
- [x] Theme provider (light/dark)
- [x] Toast notifications
- [x] SEO utility (document meta)
- [x] Loading skeletons
- [x] Premium homepage (12 sections)
- [x] Sticky navbar + mobile menu
- [x] Dashboard sidebar layout
- [x] WhatsApp + AI floating buttons
- [x] Login / Signup pages

## Project Structure

```
src/
├── components/     # UI, layout, auth
├── features/home/  # Homepage sections
├── layouts/        # Public, Auth, Dashboard
├── pages/          # Route pages
├── router/         # React Router config
├── hooks/          # useAuth, etc.
├── store/          # Zustand
├── integrations/   # Supabase
├── data/           # Mock data (Phase 1)
├── types/
├── utils/
└── lib/
```

## Roadmap

| Phase | Module |
|-------|--------|
| 2 | Supabase schema, Phone OTP auth, RLS |
| 3 | Vehicle marketplace |
| 4 | Dealer CRM + Excel upload |
| 5 | Live auctions |
| 6 | Finance marketplace |
| 7 | Auto parts ecommerce |
| 8 | Service booking |
| 9 | Community / social |
| 10 | AI agents |
| 11 | Admin super dashboard |
| 12 | SEO + performance |

## Build

```bash
npm run build
npm run preview
```
