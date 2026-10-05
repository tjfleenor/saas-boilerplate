import { redirect } from "next/navigation";
import { requireOrg } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { OrgSettingsForm } from "@/components/dashboard/org-settings-form";
import { MembersList } from "@/components/dashboard/members-list";
import { InvitationsList } from "@/components/dashboard/invitations-list";

export default async function OrgSettingsPage({
  params,
}: {
  params: { orgId: string };
}) {
  const { user, membership } = await requireOrg(params.orgId);

  const organization = await prisma.organization.findUnique({
    where: { id: params.orgId },
    include: {
      memberships: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      },
    },
  });

  if (!organization) {
    redirect("/dashboard");
  }

  const members = organization.memberships;
  const invitations = await prisma.invitation.findMany({
    where: { organizationId: params.orgId },
    orderBy: { createdAt: "desc" },
  });

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
          <div className="mb-6">
            <h1 className="text-2xl font-bold">{organization.name}</h1>
            <p className="text-sm text-muted-foreground">Organization settings and members</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <OrgSettingsForm organization={organization} />
            <MembersList members={members} orgId={params.orgId} currentUserRole={membership.role} />
            <InvitationsList invitations={invitations} orgId={params.orgId} currentUserRole={membership.role} />
          </div>
        </main>
      </div>
    </div>
  );
}
