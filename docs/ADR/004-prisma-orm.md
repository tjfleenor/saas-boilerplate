# ADR 004: Prisma as ORM

## Status
Accepted

## Context
We need a type-safe ORM that works well with PostgreSQL and Next.js.

## Decision
Use Prisma with PostgreSQL.

## Consequences

### Positive
- Type-safe database access
- Excellent migration system
- Great developer experience with Prisma Studio
- Strong community and ecosystem

### Negative
- Adds a build step (Prisma generate)
- Some advanced SQL features require raw queries
- Migration conflicts in team development

## Alternatives Considered
- **Drizzle ORM:** Lighter weight, but less mature
- **TypeORM:** Good but decorator-based, less type-safe
- **Raw SQL:** Maximum control but no type safety
