# ADR 003: Stripe for Billing

## Status
Accepted

## Context
We need a billing system that supports subscriptions, usage-based pricing, and a customer portal.

## Decision
Use Stripe with webhook-based subscription management.

## Consequences

### Positive
- Industry standard, excellent documentation
- Supports subscriptions, one-time payments, and usage-based billing
- Built-in customer portal
- Webhook-based architecture is reliable and scalable

### Negative
- Requires careful webhook handling
- Stripe fees (2.9% + $0.30 per transaction)
- Requires PCI compliance considerations

## Alternatives Considered
- **Paddle:** Merchant of records, but less flexible
- **Chargebee:** More enterprise-focused, higher cost
- **Custom billing:** Significant development and compliance burden
