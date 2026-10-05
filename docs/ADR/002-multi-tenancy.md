# ADR 002: Multi-Tenancy with Organization-User-Membership Model

## Status
Accepted

## Context
The SaaS needs to support multiple organizations, each with their own users, roles, and data isolation.

## Decision
Use a three-table model: `Organization`, `User`, and `Membership` (join table with role).

## Consequences

### Positive
- Clear separation of concerns
- Flexible role-based access control
- Easy to query user's organizations
- Supports future features like invitations

### Negative
- Requires careful query scoping to prevent data leakage
- More complex than single-tenant models

## Alternatives Considered
- **Single-tenant:** Simpler but doesn't support multi-tenancy
- **Schema-per-tenant:** Strong isolation but complex migrations
- **Row-level security:** Database-level but harder to implement with Prisma
