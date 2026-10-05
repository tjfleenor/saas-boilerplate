# ADR 005: Tailwind CSS + shadcn/ui for Styling

## Status
Accepted

## Context
We need a styling solution that is fast to develop with, consistent, and customizable.

## Decision
Use Tailwind CSS for utility-first styling and shadcn/ui for component primitives.

## Consequences

### Positive
- Rapid development with utility classes
- Consistent design system with shadcn/ui
- Easy to customize and theme
- Small bundle size with PurgeCSS

### Negative
- HTML can become verbose with many classes
- Learning curve for developers unfamiliar with Tailwind
- shadcn/ui components are copied into the project (not a dependency)

## Alternatives Considered
- **Styled Components:** CSS-in-JS, but larger bundle size
- **CSS Modules:** Good but slower development
- **Material-UI:** Comprehensive but heavy and opinionated
