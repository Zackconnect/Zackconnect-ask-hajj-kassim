import { Link } from "@tanstack/react-router";
import { BookOpen, Home, MessageCircleQuestion, HandHeart, User } from "lucide-react";

import { useI18n } from "@/i18n";

const items = [
  { to: "/", icon: Home, key: "nav.home" },
  { to: "/ask", icon: MessageCircleQuestion, key: "nav.ask" },
  { to: "/quran", icon: BookOpen, key: "nav.quran" },
  { to: "/duas", icon: HandHeart, key: "nav.duas" },
  { to: "/auth", icon: User, key: "mobile.profile" },
] as const;

export function MobileNav() {
  const { t } = useI18n();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur md:hidden">
      <ul className="mx-auto grid max-w-lg grid-cols-5">
        {items.map(({ to, icon: Icon, key }) => (
          <li key={to}>
            <Link
              to={to}
              className="flex flex-col items-center gap-1 py-2.5 text-[11px] text-muted-foreground transition-colors"
              activeProps={{ className: "text-primary font-semibold" }}
              activeOptions={{ exact: to === "/" }}
            >
              <Icon className="size-5" />
              <span className="truncate px-1">{t(key)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
