import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="container py-20">
      <div className="rounded-lg border bg-primary/5 p-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Ready to build your SaaS?
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
          Clone this boilerplate and start building. No more spending weeks on
          boilerplate setup.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link href="/register">
            <Button size="lg">Get started free</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
