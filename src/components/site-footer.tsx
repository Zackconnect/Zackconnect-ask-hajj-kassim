import { Link } from "@tanstack/react-router";

import { Brand } from "@/components/site-header";
import { useI18n } from "@/i18n";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Brand />
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">{t("brand.tagline")}</p>
          </div>
          <div>
            <h3 className="font-display text-sm font-semibold">{t("nav.topics")}</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/quran" className="hover:text-primary">
                  {t("nav.quran")}
                </Link>
              </li>
              <li>
                <Link to="/hadith" className="hover:text-primary">
                  {t("nav.hadith")}
                </Link>
              </li>
              <li>
                <Link to="/duas" className="hover:text-primary">
                  {t("nav.duas")}
                </Link>
              </li>
              <li>
                <Link to="/ask" className="hover:text-primary">
                  {t("nav.ask")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-sm font-semibold">{t("sources.title")}</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Qur'an</li>
              <li>Sahih al-Bukhari</li>
              <li>Sahih Muslim</li>
              <li>Sunan Abu Dawud &amp; others</li>
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground">
          {t("disclaimer.short")}
        </p>
      </div>
    </footer>
  );
}
