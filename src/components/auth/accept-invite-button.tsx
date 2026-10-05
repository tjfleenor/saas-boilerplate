"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function AcceptInviteButton({ token }: { token: string }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function acceptInvitation() {
    setIsLoading(true);
    setError("");

    const res = await fetch(`/api/invitations/${token}/accept`, {
      method: "POST",
    });

    if (res.ok) {
      router.push("/dashboard");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to accept invitation");
    }

    setIsLoading(false);
  }

  if (status === "loading") {
    return null;
  }

  if (!session) {
    return (
      <div className="space-y-4">
        <p className="text-center text-sm text-muted-foreground">
          Sign in to accept this invitation
        </p>
        <Button
          className="w-full"
          onClick={() => signIn("credentials", { callbackUrl: `/invite/${token}` })}
        >
          Sign in to accept
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}
      <Button
        className="w-full"
        onClick={acceptInvitation}
        disabled={isLoading}
      >
        {isLoading ? "Accepting..." : "Accept invitation"}
      </Button>
    </div>
  );
}
