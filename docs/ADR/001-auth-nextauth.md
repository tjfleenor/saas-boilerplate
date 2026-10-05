# ADR 001: Authentication with NextAuth.js

## Status
Accepted

## Context
We need a secure, flexible authentication system that supports multiple providers (email/password, OAuth) and integrates well with Next.js App Router.

## Decision
Use NextAuth.js (Auth.js) with the Prisma adapter.

## Consequences

### Positive
- Battle-tested, widely adopted
- Easy to add new providers
- Built-in CSRF protection
- Works seamlessly with Next.js App Router
- Prisma adapter provides type-safe database integration

### Negative
- Adds a dependency that wraps auth logic
- JWT sessions require careful token management
- OAuth providers require external setup

## Alternatives Considered
- **Clerk:** More features but vendor lock-in and higher cost
- **Custom auth:** More control but significantly more work and security risk
- **Supabase Auth:** Good option but couples auth to database provider
