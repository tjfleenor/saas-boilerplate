import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stack = [
  { name: "Next.js 14", category: "Framework" },
  { name: "TypeScript", category: "Language" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Prisma", category: "ORM" },
  { name: "NextAuth.js", category: "Auth" },
  { name: "Stripe", category: "Payments" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "shadcn/ui", category: "UI Components" },
  { name: "Docker", category: "Deployment" },
  { name: "GitHub Actions", category: "CI/CD" },
];

export function TechStack() {
  return (
    <section className="container py-20">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Modern tech stack</h2>
        <p className="mt-2 text-muted-foreground">
          Built with the tools that power production applications
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {stack.map((tech) => (
          <Card key={tech.name}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{tech.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{tech.category}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
