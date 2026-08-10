import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { AppShell, PageHeader } from "@/components/app-shell";
import { useI18n } from "@/i18n";
import { DUAS, DUA_CATEGORIES } from "@/lib/islamic-content";

export const Route = createFileRoute("/duas")({
  head: () => ({
    meta: [
      { title: "Duas & Adhkar — Ask Hajj Kassim" },
      {
        name: "description",
        content:
          "Authentic duas and daily adhkar with Arabic, transliteration, translation and source reference.",
      },
      { property: "og:title", content: "Duas & Adhkar — Ask Hajj Kassim" },
      {
        property: "og:description",
        content: "Daily duas with Arabic, transliteration and authentic sources.",
      },
    ],
  }),
  component: DuasPage,
});

function DuasPage() {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    return DUAS.filter(
      (dua) =>
        (category === "all" || dua.category === category) &&
        (!term ||
          dua.title.toLowerCase().includes(term) ||
          dua.translation.toLowerCase().includes(term)),
    );
  }, [query, category]);

  return (
    <AppShell>
      <PageHeader title={t("duas.title")} description={t("duas.desc")}>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("duas.search")}
          className="h-12 w-full rounded-xl border border-primary-foreground/25 bg-background/95 px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
      </PageHeader>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {["all", ...DUA_CATEGORIES].map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                category === item
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:bg-accent"
              }`}
            >
              {item === "all" ? t("duas.all") : item}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {results.map((dua) => (
            <article key={dua.id} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-display text-base font-semibold">{dua.title}</h2>
              <p className="mt-4 text-right font-arabic text-xl leading-loose">{dua.arabic}</p>
              <p className="mt-3 text-sm italic text-muted-foreground">{dua.transliteration}</p>
              <p className="mt-2 text-sm leading-relaxed">{dua.translation}</p>
              <p className="mt-3 text-xs font-medium text-primary">
                {t("duas.source")}: {dua.source}
              </p>
            </article>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
