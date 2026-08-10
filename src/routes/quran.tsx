import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { AppShell, PageHeader } from "@/components/app-shell";
import { useI18n } from "@/i18n";
import { SURAHS, VERSES } from "@/lib/islamic-content";

export const Route = createFileRoute("/quran")({
  head: () => ({
    meta: [
      { title: "Qur'an Explorer — Ask Hajj Kassim" },
      {
        name: "description",
        content: "Browse and search Qur'an verses with Arabic text, translation and references.",
      },
      { property: "og:title", content: "Qur'an Explorer — Ask Hajj Kassim" },
      { property: "og:description", content: "Search Qur'an verses with Arabic and translation." },
    ],
  }),
  component: QuranPage,
});

function QuranPage() {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [surah, setSurah] = useState<number | null>(null);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    return VERSES.filter(
      (verse) =>
        (surah === null || verse.surah === surah) &&
        (!term ||
          verse.translation.toLowerCase().includes(term) ||
          verse.surahName.toLowerCase().includes(term) ||
          verse.topics.some((topic) => topic.includes(term))),
    );
  }, [query, surah]);

  return (
    <AppShell>
      <PageHeader title={t("quran.title")} description={t("quran.desc")}>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("quran.search")}
          className="h-12 w-full rounded-xl border border-primary-foreground/25 bg-background/95 px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
      </PageHeader>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[260px_1fr]">
        <aside>
          <h2 className="font-display text-sm font-semibold">{t("quran.surahs")}</h2>
          <ul className="mt-3 space-y-1">
            <li>
              <button
                onClick={() => setSurah(null)}
                className={`w-full rounded-lg px-3 py-2 text-start text-sm ${surah === null ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/60"}`}
              >
                {t("hadith.all")}
              </button>
            </li>
            {SURAHS.map((item) => (
              <li key={item.number}>
                <button
                  onClick={() => setSurah(item.number)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-start text-sm ${surah === item.number ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/60"}`}
                >
                  <span>
                    {item.number}. {item.name}
                  </span>
                  <span className="font-arabic text-base">{item.arabic}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="space-y-4">
          {results.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t("quran.noResults")}</p>
          ) : null}
          {results.map((verse) => (
            <article
              key={`${verse.surah}-${verse.ayah}`}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                {verse.surahName} · {verse.surah}:{verse.ayah}
              </p>
              <p className="mt-4 text-right font-arabic text-2xl leading-loose">{verse.arabic}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {verse.translation}
              </p>
            </article>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
