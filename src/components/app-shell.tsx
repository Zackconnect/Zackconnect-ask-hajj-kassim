import type { ReactNode } from "react";

import { MobileNav } from "@/components/mobile-nav";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function AppShell({ children, hideFooter }: { children: ReactNode; hideFooter?: boolean }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      {hideFooter ? null : <SiteFooter />}
      <MobileNav />
    </div>
  );
}

export function PageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="gradient-emerald pattern-geometric text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm opacity-90 sm:text-base">{description}</p>
        {children ? <div className="mt-6 max-w-2xl">{children}</div> : null}
      </div>
    </section>
  );
}
