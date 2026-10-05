"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getInitials } from "@/lib/utils";

interface Member {
  id: string;
  role: string;
  user: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  };
}

export function MembersList({ members, orgId, currentUserRole }: { members: Member[]; orgId: string; currentUserRole: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function updateRole(userId: string, newRole: string) {
    setIsLoading(true);
    const res = await fetch(`/api/organizations/${orgId}/members/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    });
    if (res.ok) router.refresh();
    setIsLoading(false);
  }

  async function removeMember(userId: string) {
    if (!confirm("Are you sure you want to remove this member?")) return;
    setIsLoading(true);
    const res = await fetch(`/api/organizations/${orgId}/members/${userId}`, {
      method: "DELETE",
    });
    if (res.ok) router.refresh();
    setIsLoading(false);
  }

  const canManage = currentUserRole === "OWNER";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Members</CardTitle>
        <CardDescription>Manage who has access to this organization</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {members.map((member) => (
            <div key={member.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                  {getInitials(member.user.name || member.user.email || "?")}
                </div>
                <div>
                  <p className="text-sm font-medium">{member.user.name || "Unnamed"}</p>
                  <p className="text-xs text-muted-foreground">{member.user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {canManage && member.user.id !== members.find(m => m.role === "OWNER")?.user.id ? (
                  <>
                    <select
                      value={member.role}
                      onChange={(e) => updateRole(member.user.id, e.target.value)}
                      disabled={isLoading}
                      className="h-8 rounded-md border border-input bg-background px-2 text-xs"
                    >
                      <option value="MEMBER">Member</option>
                      <option value="ADMIN">Admin</option>
                      <option value="OWNER">Owner</option>
                    </select>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMember(member.user.id)}
                      disabled={isLoading}
                      className="text-destructive hover:text-destructive"
                    >
                      Remove
                    </Button>
                  </>
                ) : (
                  <span className="text-xs text-muted-foreground">{member.role}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
