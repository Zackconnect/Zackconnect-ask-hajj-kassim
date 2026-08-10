import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { AppShell, PageHeader } from "@/components/app-shell";
import { useI18n } from "@/i18n";
import { HADITHS, HADITH_COLLECTIONS } from "@/lib/islamic-content";

export const Route = createFileRoute("/hadith")({
  head: () => ({
    meta: [
      { title: "Hadith Explorer — Ask Hajj Kassim" },
      {
        name: "description",
        content:
          "Search authentic hadith from Bukhari, Muslim and other collections with narrator, grade and reference.",
      },
      { property: "og:title", content: "Hadith Explorer — Ask Hajj Kassim" },
      {
        property: "og:description",
        content: "Authentic hadith with narrator, grading and full reference.",
      },
    ],
  }),
  component: HadithPage,
});

function HadithPage() {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [collection, setCollection] = useState<string>("all");

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    return HADITHS.filter(
      (hadith) =>
        (collection === "all" || hadith.collection === collection) &&
        (!term ||
          hadith.translation.toLowerCase().includes(term) ||
          hadith.narrator.toLowerCase().includes(term) ||
          hadith.topics.some((topic) => topic.includes(term))),
    );
  }, [query, collection]);

  return (
    <AppShell>
      <PageHeader title={t("hadith.title")} description={t("hadith.desc")}>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("hadith.search")}
          className="h-12 w-full rounded-xl border border-primary-foreground/25 bg-background/95 px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
      </PageHeader>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {["all", ...HADITH_COLLECTIONS].map((item) => (
            <button
              key={item}
              onClick={() => setCollection(item)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                collection === item
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:bg-accent"
              }`}
            >
              {item === "all" ? t("hadith.all") : item}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          {results.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t("hadith.noResults")}</p>
          ) : null}
          {results.map((hadith) => (
            <article key={hadith.id} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-primary/10 px-2.5 py-1 font-semibold text-primary">
                  {hadith.collection} {hadith.number}
                </span>
                <span className="rounded-full bg-secondary px-2.5 py-1 text-secondary-foreground">
                  {t("hadith.grade")}: {hadith.grade}
                </span>
              </div>
              <p className="mt-4 text-right font-arabic text-xl leading-loose">{hadith.arabic}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {hadith.translation}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                {t("hadith.narrator")}: {hadith.narrator} · {hadith.book}
              </p>
            </article>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
