# ADR 006: Next.js App Router

## Status
Accepted

## Context
We need a React framework that supports server-side rendering, API routes, and good developer experience.

## Decision
Use Next.js 14 with App Router.

## Consequences

### Positive
- File-based routing is intuitive
- Server Components reduce client-side JavaScript
- API routes simplify backend development
- Excellent performance with streaming and caching
- Strong ecosystem and Vercel integration

### Negative
- App Router is relatively new (some patterns still evolving)
- Server/Client component split requires mental model shift
- Some libraries don't yet support Server Components

## Alternatives Considered
- **Pages Router:** More mature but less performant
- **Remix:** Good but smaller ecosystem
- **Custom Express + React:** More control but significantly more work
