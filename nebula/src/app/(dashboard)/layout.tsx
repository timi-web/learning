"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useSession } from "@/components/session-provider";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}): JSX.Element {
  const router = useRouter();
  const { user, isLoading } = useSession();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Nebula Lite
          </p>
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-300">
          {isLoading ? "Loading..." : user?.name ?? "Guest"}
          <Button type="button" variant="secondary" onClick={handleLogout}>
            Sign out
          </Button>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
