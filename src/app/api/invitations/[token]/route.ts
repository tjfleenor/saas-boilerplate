import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isTokenExpired } from "@/lib/tokens";

export async function GET(
  request: Request,
  { params }: { params: { token: string } }
) {
  try {
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
      return NextResponse.json({ error: "Invalid invitation" }, { status: 404 });
    }

    if (isTokenExpired(invitation.expires)) {
      return NextResponse.json({ error: "Invitation has expired" }, { status: 410 });
    }

    return NextResponse.json({
      email: invitation.email,
      role: invitation.role,
      organization: invitation.organization,
    });
  } catch (error) {
    console.error("Validate invitation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
