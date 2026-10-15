# Empireo Holidays

Node.js API (`server/`) + Next.js frontend (`web/`), backed by MySQL via Prisma. Chosen to match cPanel/phpMyAdmin hosting.

## Prerequisites

- Node.js 20.9+
- MySQL 8+ or MariaDB (cPanel's built-in MySQL works fine)

## Local development

### 1. Database

Create a database and point `DATABASE_URL` in `server/.env` at it:

```bash
mysql -u root -p -e "CREATE DATABASE empireoholidays CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

```
DATABASE_URL=mysql://user:password@localhost:3306/empireoholidays
```

### 2. API server

```bash
cd server
cp .env.example .env   # fill in DATABASE_URL, JWT_SECRET, mail/reCAPTCHA credentials, etc.
npx prisma migrate dev
npm run dev             # http://localhost:4000
```

### 3. Frontend

```bash
cd web
npm install
cp .env.example .env.local   # set NODE_API_URL and NEXT_PUBLIC_RECAPTCHA_SITE_KEY
npm run dev                   # http://localhost:3001 (or 3000 by default)
```

## Admin panel

The admin panel lives at `/admin` on the Next.js app, backed by JWT auth against the Node API (`/auth/login`). Admin users are stored in the `admin_users` table.

## Project layout

```
server/   Express + TypeScript + Prisma API
  prisma/schema.prisma   Data model
  prisma/seed.ts         Seed script (reads a JSON export; see prisma/seed.ts)
  src/routes/            Public + admin routes
  uploads/                Locally stored images, served at /uploads

web/      Next.js App Router frontend
  src/app/(site)/         Public marketing site
  src/app/admin/          Admin panel (auth-gated via src/proxy.ts)
  src/app/api/            Route Handlers that proxy to the Node API
```
