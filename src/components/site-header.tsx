import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";

import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { LANGUAGES, useI18n } from "@/i18n";
import { useSession } from "@/hooks/use-session";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", key: "nav.home" },
  { to: "/ask", key: "nav.ask" },
  { to: "/quran", key: "nav.quran" },
  { to: "/hadith", key: "nav.hadith" },
  { to: "/duas", key: "nav.duas" },
] as const;

export function Brand({ className }: { className?: string }) {
  const { t } = useI18n();
  return (
    <Link to="/" className={cn("flex items-center gap-2.5", className)}>
      <img src={logo} alt="" width={40} height={40} className="size-9 shrink-0" />
      <span className="font-display text-lg leading-none font-semibold tracking-tight">
        {t("brand.name")}
      </span>
    </Link>
  );
}

function LanguageSwitcher({ stacked }: { stacked?: boolean }) {
  const { lang, setLang } = useI18n();
  return (
    <div className={cn("flex items-center gap-1", stacked && "flex-wrap")}>
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
            lang === l.code
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
          )}
        >
          {l.native}
        </button>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const { t } = useI18n();
  const { user } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Brand />

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              activeProps={{ className: "text-primary bg-accent" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          {user ? (
            <Button variant="ghost" size="sm" onClick={() => void supabase.auth.signOut()}>
              {t("nav.logout")}
            </Button>
          ) : (
            <Button variant="ghost" size="sm" asChild>
              <Link to="/auth">{t("nav.login")}</Link>
            </Button>
          )}
          <Button size="sm" asChild>
            <Link to="/ask">{t("nav.ask")}</Link>
          </Button>
        </div>

        <button
          type="button"
          aria-label="Menu"
          className="rounded-md p-2 text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <Menu className="size-5" />
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-card px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground"
                activeProps={{ className: "text-primary bg-accent" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {t(item.key)}
              </Link>
            ))}
          </div>
          <div className="mt-4 border-t border-border pt-4">
            <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase">
              {t("nav.language")}
            </p>
            <LanguageSwitcher stacked />
          </div>
          <div className="mt-4">
            {user ? (
              <Button variant="outline" className="w-full" onClick={() => void supabase.auth.signOut()}>
                {t("nav.logout")}
              </Button>
            ) : (
              <Button variant="outline" className="w-full" asChild>
                <Link to="/auth" onClick={() => setOpen(false)}>
                  {t("nav.login")}
                </Link>
              </Button>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
