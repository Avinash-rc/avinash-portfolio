# Avinash Ramdas Chavan — Portfolio

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Avinash-rc/portfolio)
[![CI](https://github.com/Avinash-rc/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Avinash-rc/portfolio/actions)

A **professional 3D fullstack developer portfolio** built with Next.js 15, Three.js, Framer Motion, Prisma, and GraphQL — organized as a **Turborepo + pnpm monorepo**.

## ✨ Features

- 🎮 **3D Interactive Hero** — Three.js icosahedron with mouse parallax via `@react-three/fiber`
- 🌊 **Particle Field** — Animated background particles using drei
- ✍️ **Typing Animation** — Staggered tagline cycling animation
- 📱 **Fully Responsive** — Mobile-first design
- 🌙 **Dark Mode** — Default dark with light mode toggle (next-themes)
- 🖱️ **Custom Cursor** — Glowing cursor with ring effect
- 📊 **Scroll Progress** — Animated progress bar via Framer Motion
- 📬 **Contact Form** — Working form → Prisma DB → Resend email
- 🔮 **GraphQL API** — Apollo Server embedded in Next.js route handler
- 🏛️ **Timeline** — Education timeline with alternating cards
- 🃏 **3D Tilt Cards** — react-parallax-tilt project cards
- 🎭 **Loading Screen** — "AC" initials spinning animation

## 🏗️ Monorepo Structure

```
portfolio-monorepo/
├── apps/
│   └── web/               ← Next.js 15 App Router
├── packages/
│   ├── ui/                ← Shared component library
│   ├── config/            ← ESLint, Tailwind, TypeScript configs
│   └── types/             ← Shared TypeScript interfaces
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18.17.0
- pnpm ≥ 9.0.0

```bash
npm install -g pnpm
```

### Local Setup

```bash
# 1. Clone the repo
git clone https://github.com/Avinash-rc/portfolio.git
cd portfolio

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example apps/web/.env.local
# Edit apps/web/.env.local and fill in:
# - DATABASE_URL (SQLite default: file:./dev.db)
# - RESEND_API_KEY (get from https://resend.com)

# 4. Set up database
cd apps/web
pnpm db:push       # Create SQLite tables
pnpm db:seed       # Seed with project data

# 5. Start dev server
cd ../..
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the portfolio.

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all packages and apps |
| `pnpm lint` | Lint all packages |
| `pnpm format` | Format all files with Prettier |

From `apps/web`:

| Command | Description |
|---------|-------------|
| `pnpm db:push` | Push schema to database |
| `pnpm db:studio` | Open Prisma Studio |
| `pnpm db:seed` | Seed the database |

## 🌍 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | SQLite (`file:./dev.db`) or PostgreSQL URL | ✅ |
| `RESEND_API_KEY` | Resend API key for email delivery | For email |
| `NEXT_PUBLIC_SITE_URL` | Your production URL | For SEO |
| `NEXT_PUBLIC_OWNER_EMAIL` | Email for contact form delivery | ✅ |
| `GRAPHQL_SECRET` | Secret for GraphQL endpoint | Optional |

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router, RSC, Server Actions) |
| Language | TypeScript strict mode |
| Styling | Tailwind CSS v3 + shadcn/ui |
| 3D | Three.js + @react-three/fiber + @react-three/drei |
| Animation | Framer Motion |
| ORM | Prisma (SQLite / PostgreSQL) |
| API | Route Handlers + Apollo GraphQL |
| Email | Resend |
| Monorepo | Turborepo + pnpm workspaces |

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/contact` | Submit contact form |
| `GET` | `/api/projects` | Get project list |
| `GET/POST` | `/api/graphql` | GraphQL playground |
| `GET` | `/api/sitemap.xml` | XML sitemap |
| `GET` | `/api/robots.txt` | Robots file |

## 📄 License

MIT © 2025 Avinash Ramdas Chavan
