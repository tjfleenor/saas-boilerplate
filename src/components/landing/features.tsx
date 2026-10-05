import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, CreditCard, BarChart3, Lock, Zap } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Authentication",
    description: "Email/password + OAuth with NextAuth.js. Secure by default.",
  },
  {
    icon: Users,
    title: "Multi-Tenancy",
    description: "Organizations, teams, and role-based access control built-in.",
  },
  {
    icon: CreditCard,
    title: "Billing",
    description: "Stripe subscriptions with webhooks and customer portal.",
  },
  {
    icon: BarChart3,
    title: "Admin Dashboard",
    description: "Manage users, organizations, and view audit logs.",
  },
  {
    icon: Lock,
    title: "Security",
    description: "Rate limiting, CSRF protection, and secure session management.",
  },
  {
    icon: Zap,
    title: "Developer Experience",
    description: "TypeScript, ESLint, Prettier, and CI/CD out of the box.",
  },
];

export function Features() {
  return (
    <section id="features" className="container py-20">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Everything you need</h2>
        <p className="mt-2 text-muted-foreground">
          Production-ready features, not just a starter template
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <feature.icon className="h-8 w-8 text-primary" />
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
