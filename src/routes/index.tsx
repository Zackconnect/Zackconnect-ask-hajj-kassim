import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BookOpen, ShieldCheck, Sparkle } from "lucide-react";
import { useState } from "react";

import heroImage from "@/assets/hero.jpg";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";
import { CATEGORIES, DAILY, POPULAR_QUESTION_KEYS } from "@/lib/islamic-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ask Hajj Kassim — Islamic Questions Answered with Evidence" },
      {
        name: "description",
        content:
          "Ask any question about Islam and receive clear answers grounded in the Qur'an, authentic Hadith and trusted scholarship — in English, Arabic, Hausa and Twi.",
      },
      { property: "og:title", content: "Ask Hajj Kassim — Islamic Questions Answered" },
      {
        property: "og:description",
        content: "Authentic Islamic answers with Qur'an and Hadith evidence, in four languages.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { t } = useI18n();
  const [question, setQuestion] = useState("");

  return (
    <AppShell>
      <section className="relative overflow-hidden">
        <img
          src={heroImage}
          alt="Serene mosque interior"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/85" />
        <div className="pattern-geometric relative mx-auto max-w-4xl px-4 py-24 text-center text-primary-foreground sm:px-6 sm:py-32">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 px-3 py-1 text-xs font-medium">
            <Sparkle className="size-3.5" /> {t("brand.tagline")}
          </span>
          <h1 className="mt-6 font-display text-4xl font-semibold text-balance sm:text-6xl">
            {t("hero.title")}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base opacity-90 sm:text-lg">
            {t("hero.subtitle")}
          </p>

          <form
            className="mx-auto mt-9 flex max-w-2xl flex-col gap-3 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder={t("hero.placeholder")}
              className="h-13 flex-1 rounded-xl border border-primary-foreground/25 bg-background/95 px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
            />
            <Button size="lg" variant="gold" asChild>
              <Link to="/ask" search={{ q: question || undefined }}>
                {t("hero.cta")} <ArrowRight className="size-4" />
              </Link>
            </Button>
          </form>

          <div className="mt-8">
            <p className="text-xs tracking-wide uppercase opacity-80">{t("hero.popular")}</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {POPULAR_QUESTION_KEYS.map((key) => (
                <Link
                  key={key}
                  to="/ask"
                  search={{ q: t(key) }}
                  className="rounded-full border border-primary-foreground/25 px-3.5 py-1.5 text-xs transition-colors hover:bg-primary-foreground/10"
                >
                  {t(key)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-semibold">{t("categories.title")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t("categories.subtitle")}</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map((category) => (
            <Link
              key={category.key}
              to="/ask"
              search={{ q: category.query }}
              className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
            >
              <span className="text-2xl">{category.icon}</span>
              <h3 className="mt-3 font-display text-base font-semibold group-hover:text-primary">
                {t(`cat.${category.key}`)}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {t(`cat.${category.key}.desc`)}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-secondary/50 py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-3">
          <article className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-xs font-semibold tracking-wide text-primary uppercase">
              {t("daily.ayah")}
            </h3>
            <p className="mt-4 text-right font-arabic text-2xl leading-loose">
              {DAILY.verse.arabic}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {DAILY.verse.translation}
            </p>
            <p className="mt-3 text-xs font-medium text-primary">
              Qur'an {DAILY.verse.surah}:{DAILY.verse.ayah} — {DAILY.verse.surahName}
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-xs font-semibold tracking-wide text-primary uppercase">
              {t("daily.hadith")}
            </h3>
            <p className="mt-4 text-right font-arabic text-xl leading-loose">
              {DAILY.hadith.arabic}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {DAILY.hadith.translation}
            </p>
            <p className="mt-3 text-xs font-medium text-primary">
              {DAILY.hadith.collection} {DAILY.hadith.number} · {DAILY.hadith.grade}
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-xs font-semibold tracking-wide text-primary uppercase">
              {t("daily.question")}
            </h3>
            <p className="mt-4 font-display text-xl leading-snug font-semibold">
              {t(DAILY.questionKey)}
            </p>
            <Button className="mt-5" asChild>
              <Link to="/ask" search={{ q: t(DAILY.questionKey) }}>
                {t("daily.learnMore")}
              </Link>
            </Button>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: BookOpen, title: t("sources.title"), desc: t("sources.desc") },
            { icon: ShieldCheck, title: t("scholar.title"), desc: t("scholar.desc") },
            { icon: Sparkle, title: t("how.title"), desc: t("cta.desc") },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-card p-6">
              <item.icon className="size-6 text-primary" />
              <h3 className="mt-4 font-display text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="gradient-emerald pattern-geometric">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center text-primary-foreground sm:px-6">
          <h2 className="font-display text-3xl font-semibold">{t("cta.title")}</h2>
          <p className="mt-3 text-sm opacity-90">{t("cta.desc")}</p>
          <Button size="lg" variant="gold" className="mt-7" asChild>
            <Link to="/ask">{t("hero.cta")}</Link>
          </Button>
        </div>
      </section>
    </AppShell>
  );
}
