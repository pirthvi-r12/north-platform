# NORTH® Platform

Production-oriented digital agency workspace built with Next.js 15, Prisma, NextAuth.js, and Stripe.

## Palette

- Soft Pearl `#F2F1ED` — background
- Obsidian `#0A0A0A` — typography / sidebar
- Deep Red `#710014` — primary accent
- Warm Sand `#B38F6F` — secondary accent

## Setup

1. Copy `.env.example` to `.env` and set MySQL credentials:
   ```env
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=north
   ```
   (`DATABASE_URL` is built automatically from these values for Prisma.)
2. Install dependencies: `npm install`
3. **Database:** `npm run db:setup` — applies `sql/north.sql` and syncs Prisma to MySQL.
4. Or manually: `npm run db:sql` then `npm run db:push`
5. Start dev server: `npm run dev`
6. Open `/signup` to create the first account (becomes **ADMIN**). Additional sign-ups receive the **CLIENT** role.

### Database SQL

- **`sql/north.sql`** — full PostgreSQL schema + sample showcase/journal rows  
- Apply manually: `npm run db:sql`

Sign-in uses email and password stored in MySQL. Admins can manage roles in **RBAC User Management**.
