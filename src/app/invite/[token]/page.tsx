import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isTokenExpired } from "@/lib/tokens";
import { AcceptInviteButton } from "@/components/auth/accept-invite-button";

export default async function InvitePage({
  params,
}: {
  params: { token: string };
}) {
  const invitation = await prisma.invitation.findUnique({
    where: { token: params.token },
    include: {
      organization: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });

  if (!invitation) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Invalid invitation</h1>
          <p className="mt-2 text-muted-foreground">
            This invitation link is not valid.
          </p>
        </div>
      </div>
    );
  }

  if (isTokenExpired(invitation.expires)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Invitation expired</h1>
          <p className="mt-2 text-muted-foreground">
            This invitation has expired. Please ask the organization owner to send a new one.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-md space-y-6 rounded-lg border bg-card p-6 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold">You've been invited!</h1>
          <p className="mt-2 text-muted-foreground">
            Join <strong>{invitation.organization.name}</strong> as a{" "}
            <strong>{invitation.role.toLowerCase()}</strong>
          </p>
        </div>
        <div className="rounded-md bg-muted p-4 text-sm">
          <p><strong>Email:</strong> {invitation.email}</p>
          <p><strong>Organization:</strong> {invitation.organization.name}</p>
          <p><strong>Role:</strong> {invitation.role}</p>
        </div>
        <AcceptInviteButton token={params.token} />
      </div>
    </div>
  );
}
