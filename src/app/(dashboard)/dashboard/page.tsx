import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/session";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { CreateOrgButton } from "@/components/dashboard/create-org-button";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const user = await requireAuth();

  const organizations = await prisma.organization.findMany({
    where: {
      memberships: {
        some: { userId: user.id },
      },
    },
    include: {
      memberships: {
        where: { userId: user.id },
      },
    },
  });

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar organizations={organizations} />
      <div className="flex-1">
        <DashboardHeader user={user} />
        <main className="p-6">
          {organizations.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12">
              <h2 className="text-lg font-semibold">No organizations yet</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Create your first organization to get started
              </p>
              <CreateOrgButton />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {organizations.map((org) => (
                <a
                  key={org.id}
                  href={`/dashboard/${org.slug}`}
                  className="rounded-lg border p-4 transition-colors hover:bg-muted/50"
                >
                  <h3 className="font-semibold">{org.name}</h3>
                  <p className="text-sm text-muted-foreground">{org.plan} plan</p>
                </a>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
