# SaaS Boilerplate

A production-ready Next.js SaaS boilerplate with authentication, multi-tenancy, billing, and everything you need to ship your SaaS fast.

## Features

- **Authentication** — Email/password + OAuth (Google) with NextAuth.js
- **Multi-Tenancy** — Organizations, teams, and role-based access control (Owner, Admin, Member)
- **Billing** — Stripe subscriptions with webhooks and customer portal
- **Admin Dashboard** — Manage users, organizations, and view audit logs
- **Security** — Rate limiting, CSRF protection, secure session management
- **Developer Experience** — TypeScript, ESLint, Prettier, CI/CD with GitHub Actions

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Auth:** NextAuth.js
- **Payments:** Stripe
- **Styling:** Tailwind CSS + shadcn/ui
- **Deployment:** Vercel / Railway / Docker

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Stripe account (for billing)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/saas-boilerplate.git
   cd saas-boilerplate
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your database URL, auth secrets, and Stripe keys.

5. Run database migrations:
   ```bash
   npm run db:push
   ```

6. (Optional) Seed the database:
   ```bash
   npm run db:seed
   ```

7. Start the development server:
   ```bash
   npm run dev
   ```

8. Open [http://localhost:3010](http://localhost:3010) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth pages (login, register)
│   ├── (dashboard)/        # Dashboard pages
│   ├── api/                # API routes
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/             # React components
│   ├── auth/               # Auth forms
│   ├── dashboard/          # Dashboard components
│   ├── landing/            # Landing page components
│   ├── providers/          # Context providers
│   └── ui/                 # UI components (shadcn/ui)
├── lib/                    # Utility functions
│   ├── auth.ts             # NextAuth config
│   ├── prisma.ts           # Prisma client
│   ├── session.ts          # Session helpers
│   └── utils.ts            # Utility functions
├── middleware.ts           # Next.js middleware
prisma/
├── schema.prisma           # Database schema
└── seed.ts                 # Database seed script
docs/
└── ADR/                    # Architecture Decision Records
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_URL` | Your app URL | Yes |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | No |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | No |
| `STRIPE_SECRET_KEY` | Stripe secret key | No |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | No |
| `STRIPE_PRICE_ID_PRO` | Stripe price ID for Pro plan | No |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to database |
| `npm run db:migrate` | Run migrations |
| `npm run db:seed` | Seed database |
| `npm run db:studio` | Open Prisma Studio |

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## License

[MIT](LICENSE)
