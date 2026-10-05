"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Invitation {
  id: string;
  email: string;
  role: string;
  expires: Date;
  createdAt: Date;
}

export function InvitationsList({ invitations, orgId, currentUserRole }: { invitations: Invitation[]; orgId: string; currentUserRole: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("MEMBER");
  const [error, setError] = useState("");

  const canInvite = currentUserRole === "OWNER" || currentUserRole === "ADMIN";

  async function sendInvitation(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const res = await fetch(`/api/organizations/${orgId}/invitations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, role }),
    });

    if (res.ok) {
      setEmail("");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to send invitation");
    }

    setIsLoading(false);
  }

  async function cancelInvitation(invitationId: string) {
    setIsLoading(true);
    const res = await fetch(`/api/organizations/${orgId}/invitations/${invitationId}`, {
      method: "DELETE",
    });
    if (res.ok) router.refresh();
    setIsLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invitations</CardTitle>
        <CardDescription>Invite team members to this organization</CardDescription>
      </CardHeader>
      <CardContent>
        {canInvite && (
          <form onSubmit={sendInvitation} className="mb-6 space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
            <div className="flex gap-2">
              <div className="flex-1 space-y-2">
                <Label htmlFor="invite-email">Email</Label>
                <Input
                  id="invite-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="teammate@example.com"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invite-role">Role</Label>
                <select
                  id="invite-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  disabled={isLoading}
                  className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="MEMBER">Member</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send invitation"}
            </Button>
          </form>
        )}

        {invitations.length === 0 ? (
          <p className="text-sm text-muted-foreground">No pending invitations</p>
        ) : (
          <div className="space-y-3">
            {invitations.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between rounded-md border p-3">
                <div>
                  <p className="text-sm font-medium">{inv.email}</p>
                  <p className="text-xs text-muted-foreground">
                    {inv.role} · Expires {new Date(inv.expires).toLocaleDateString()}
                  </p>
                </div>
                {canInvite && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => cancelInvitation(inv.id)}
                    disabled={isLoading}
                    className="text-destructive hover:text-destructive"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
