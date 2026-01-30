import "./globals.css";
import type { Metadata } from "next";

import { SessionProvider } from "@/components/session-provider";

export const metadata: Metadata = {
  title: "Nebula Platform",
  description: "Self-enforcing contract management for construction."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
