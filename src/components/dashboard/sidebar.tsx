"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function DashboardSidebar({ organizations }: { organizations: any[] }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-muted/40 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold">Organizations</h2>
        <Button size="icon" variant="ghost" className="h-8 w-8">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <nav className="space-y-1">
        <Link
          href="/dashboard"
          className={cn(
            "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
            pathname === "/dashboard"
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
          )}
        >
          All Organizations
        </Link>
        {organizations.map((org) => (
          <div key={org.id}>
            <Link
              href={`/dashboard/${org.slug}`}
              className={cn(
                "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === `/dashboard/${org.slug}`
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
              )}
            >
              {org.name}
            </Link>
            <Link
              href={`/dashboard/${org.id}/settings`}
              className={cn(
                "block rounded-md px-3 py-1 pl-6 text-xs text-muted-foreground transition-colors hover:bg-accent/50 hover:text-accent-foreground",
                pathname === `/dashboard/${org.id}/settings` ? "bg-accent/50" : ""
              )}
            >
              Settings
            </Link>
          </div>
        ))}
      </nav>
    </aside>
  );
}
