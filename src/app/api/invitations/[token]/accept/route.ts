import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isTokenExpired } from "@/lib/tokens";

export async function POST(
  request: Request,
  { params }: { params: { token: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "You must be signed in to accept an invitation" },
        { status: 401 }
      );
    }

    const invitation = await prisma.invitation.findUnique({
      where: { token: params.token },
    });

    if (!invitation) {
      return NextResponse.json({ error: "Invalid invitation" }, { status: 404 });
    }

    if (isTokenExpired(invitation.expires)) {
      return NextResponse.json({ error: "Invitation has expired" }, { status: 410 });
    }

    // Check if the signed-in user's email matches the invitation
    if (session.user.email !== invitation.email) {
      return NextResponse.json(
        { error: "This invitation was sent to a different email address" },
        { status: 403 }
      );
    }

    // Check if already a member
    const existingMembership = await prisma.membership.findUnique({
      where: {
        userId_organizationId: {
          userId: session.user.id,
          organizationId: invitation.organizationId,
        },
      },
    });

    if (existingMembership) {
      // Delete the invitation and return success
      await prisma.invitation.delete({ where: { id: invitation.id } });
      return NextResponse.json({ success: true, alreadyMember: true });
    }

    // Create membership
    await prisma.membership.create({
      data: {
        userId: session.user.id,
        organizationId: invitation.organizationId,
        role: invitation.role,
      },
    });

    // Delete the invitation
    await prisma.invitation.delete({ where: { id: invitation.id } });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        organizationId: invitation.organizationId,
        action: "INVITATION_ACCEPTED",
        entity: "Invitation",
        entityId: invitation.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Accept invitation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
