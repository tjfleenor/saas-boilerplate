import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { LandingNav } from "@/components/landing/nav";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { TechStack } from "@/components/landing/tech-stack";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default async function Home() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <LandingNav />
      <main className="flex-1">
        <Hero />
        <Features />
        <TechStack />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
