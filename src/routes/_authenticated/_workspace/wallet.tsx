import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpenCheck,
  Check,
  Info,
  Presentation,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import {
  creditPackages,
  creditPricing,
  currentStudent,
  skillById,
} from "@/data/exchange";
import { creditLedger, creditsEarned, creditsSpent } from "@/data/sessions";

export const Route = createFileRoute("/_authenticated/_workspace/wallet")({
  head: () => ({
    meta: [
      { title: "Knowledge Contribution — EXCHANGE" },
      {
        name: "description",
        content:
          "Lihat bagaimana kontribusi pengetahuan kamu berubah menjadi Kredit EXCHANGE, dan bagaimana Kredit membuka skill berikutnya.",
      },
      { property: "og:title", content: "Knowledge Contribution — EXCHANGE" },
      {
        property: "og:description",
        content: "Setiap Kredit memiliki cerita: bagaimana kamu berkontribusi dan bagaimana kamu berkembang.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: WalletPage,
});

function WalletPage() {
  const me = currentStudent;
  const earned = creditLedger.filter((e) => e.direction === "earned");
  const spent = creditLedger.filter((e) => e.direction === "spent");
  const nextSkills = me.learning
    .map((entry) => skillById[entry.skillId])
    .filter((skill): skill is NonNullable<typeof skill> => Boolean(skill));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-7 sm:py-12">
      <header className="border-b border-workspace-border pb-9">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Exchange Credits</p>
        <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Knowledge Contribution</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-workspace-muted">
          Kredit EXCHANGE adalah representasi kontribusi yang kamu berikan kepada komunitas. Semakin banyak
          value yang kamu bagikan, semakin besar kesempatan kamu untuk mempelajari skill baru.
        </p>
      </header>

      <section className="mt-8 grid items-start gap-4 lg:grid-cols-[1.1fr_1fr]">
        <div className="rounded-lg bg-sidebar p-7 text-sidebar-foreground">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Current Credits</p>
          <p className="mt-4 flex items-baseline gap-2 font-display text-5xl font-bold">
            {me.credits}
            <span className="text-base font-semibold text-sidebar-muted">Credits</span>
          </p>
          <p className="mt-3 text-xs leading-5 text-sidebar-muted">
            Cukup untuk {Math.floor(me.credits / creditPricing.Intermediate.learn)} sesi Intermediate berdurasi
            60 menit.
          </p>
          <div className="mt-7 grid grid-cols-2 gap-4 border-t border-sidebar-border pt-6">
            <div>
              <p className="flex items-center gap-1.5 font-num text-2xl font-bold">
                <TrendingUp className="size-4 text-primary" /> {creditsEarned}
              </p>
              <p className="text-[11px] text-sidebar-muted">Earned by sharing knowledge</p>
            </div>
            <div>
              <p className="flex items-center gap-1.5 font-num text-2xl font-bold">
                <BookOpenCheck className="size-4 text-accent" /> {creditsSpent}
              </p>
              <p className="text-[11px] text-sidebar-muted">Invested in new skills</p>
            </div>
          </div>
          <Link
            to="/teach"
            className="mt-7 flex h-10 items-center justify-center gap-1.5 rounded-md bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-strong"
          >
            <Presentation className="size-4" /> Share Knowledge. Earn Credits.
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-lg border border-workspace-border bg-workspace-card p-6">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Session Pricing</p>
            <h2 className="mt-2 font-display text-lg font-bold">1 Session = 60 Minutes</h2>
            <div className="mt-4 space-y-4">
              {(["Beginner", "Intermediate", "Advanced"] as const).map((level) => {
                const tier = creditPricing[level];
                return (
                  <div key={level} className="border-t border-workspace-border pt-4 first:border-0 first:pt-0">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-sm font-semibold">{tier.label}</p>
                      <span className="font-num text-sm font-bold text-primary-strong">
                        {tier.learn} Credits
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs leading-6 text-workspace-muted">{tier.description}</p>
                    <p className="mt-1 text-[11px] text-workspace-muted">{tier.examples.join(" · ")}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-lg border border-workspace-border bg-workspace-card p-6">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Ready to unlock</p>
            <div className="mt-4 space-y-3">
              {nextSkills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{skill.name}</p>
                    <p className="text-[11px] text-workspace-muted">
                      {skill.level} · {skill.durationMinutes} minutes
                    </p>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-semibold">
                    <Zap className="size-3.5 text-accent" /> {skill.credits}
                  </span>
                </div>
              ))}
            </div>
            <Link
              to="/explore"
              className="mt-5 flex items-center justify-between border-t border-workspace-border pt-4 text-sm font-semibold"
            >
              Find your next exchange <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-2" aria-label="Credit stories">
        <div className="rounded-lg border border-workspace-border bg-workspace-card p-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Earned From</p>
          <h2 className="mt-2 font-display text-lg font-bold">Kontribusi kamu</h2>
          <div className="mt-5 space-y-4">
            {earned.map((entry) => (
              <div key={entry.id} className="flex gap-3 border-t border-workspace-border pt-4 first:border-0 first:pt-0">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-md bg-mint text-primary-strong">
                  <Check className="size-3.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{entry.reason}</p>
                  <p className="mt-0.5 text-[11px] text-workspace-muted">{entry.story}</p>
                  <p className="mt-0.5 text-[11px] text-workspace-muted">
                    {entry.peer} · {entry.when}
                  </p>
                </div>
                <span className="font-display text-sm font-bold text-primary-strong">+{entry.amount}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-workspace-border bg-workspace-card p-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Spent On</p>
          <h2 className="mt-2 font-display text-lg font-bold">Perkembangan kamu</h2>
          <div className="mt-5 space-y-4">
            {spent.map((entry) => (
              <div key={entry.id} className="flex gap-3 border-t border-workspace-border pt-4 first:border-0 first:pt-0">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-md bg-accent-soft text-accent-foreground">
                  <Sparkles className="size-3.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{entry.reason}</p>
                  <p className="mt-0.5 text-[11px] text-workspace-muted">{entry.story}</p>
                  <p className="mt-0.5 text-[11px] text-workspace-muted">
                    {entry.peer} · {entry.when}
                  </p>
                </div>
                <span className="font-display text-sm font-bold">−{entry.amount}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 flex gap-2 border-t border-workspace-border pt-4 text-xs leading-6 text-workspace-muted">
            <Info className="mt-0.5 size-3.5 shrink-0 text-primary" />
            Setiap Kredit memiliki cerita: bagaimana kamu berkontribusi dan bagaimana kamu berkembang.
          </p>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="store-heading">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Credit Store</p>
          <h2 id="store-heading" className="mt-2 font-display text-2xl font-bold">
            Just a Few Credits Away
          </h2>
          <p className="mt-3 text-sm leading-7 text-workspace-muted">
            Mengajar tetap menjadi cara utama mendapatkan Kredit. Kalau kamu hanya butuh sedikit tambahan untuk
            melanjutkan perjalanan, pilih paket yang paling sesuai. Pembelian minimum 10 Kredit.
          </p>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {creditPackages.map((pack) => (
            <article
              key={pack.id}
              className={`flex flex-col rounded-lg border bg-workspace-card p-6 ${
                "highlight" in pack && pack.highlight
                  ? "border-primary shadow-career"
                  : "border-workspace-border"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-display text-sm font-bold">{pack.name}</p>
                {"highlight" in pack && pack.highlight && (
                  <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-semibold text-primary">
                    Popular
                  </span>
                )}
              </div>
              <p className="mt-4 flex items-baseline gap-1.5 font-num text-3xl font-bold text-primary-strong">
                {pack.credits}
                <span className="text-xs font-semibold text-workspace-muted">Credits</span>
              </p>
              <p className="mt-3 flex-1 text-xs leading-6 text-workspace-muted">{pack.description}</p>
              <button className="mt-5 h-10 rounded-md bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-strong">
                Add Credits
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
