import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="container flex flex-col items-center gap-4 py-20 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
        Build your SaaS
        <br />
        <span className="text-primary">in days, not months</span>
      </h1>
      <p className="max-w-2xl text-lg text-muted-foreground">
        A production-ready Next.js boilerplate with authentication, multi-tenancy,
        billing, and everything you need to ship your SaaS fast.
      </p>
      <div className="flex gap-4">
        <Link href="/register">
          <Button size="lg">Start free trial</Button>
        </Link>
        <Link href="#features">
          <Button size="lg" variant="outline">
            See features
          </Button>
        </Link>
      </div>
    </section>
  );
}
