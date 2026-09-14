import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownLeft, ArrowRight, ArrowUpRight, Coins, Info, Presentation } from "lucide-react";
import { currentStudent, skillById } from "@/data/exchange";
import { creditLedger, creditsEarned, creditsSpent } from "@/data/sessions";

export const Route = createFileRoute("/_authenticated/_workspace/wallet")({
  head: () => ({
    meta: [
      { title: "Credit Wallet — EXCHANGE" },
      {
        name: "description",
        content:
          "See how the knowledge you contribute turns into credits, and how credits unlock the skills you want to learn next.",
      },
      { property: "og:title", content: "Credit Wallet — EXCHANGE" },
      { property: "og:description", content: "Track the credits you earn by teaching and spend by learning." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: WalletPage,
});

function WalletPage() {
  const me = currentStudent;
  const affordable = me.learning
    .map((entry) => skillById[entry.skillId])
    .filter((skill): skill is NonNullable<typeof skill> => Boolean(skill));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-7 sm:py-12">
      <header className="border-b border-workspace-border pb-9">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Internal economy</p>
        <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Credit Wallet</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-workspace-muted">
          Credits are not money. They are proof that you contributed knowledge before you asked for it —
          teach a peer, unlock a session for yourself.
        </p>
      </header>

      <section className="mt-8 grid items-start gap-4 lg:grid-cols-[1.1fr_1fr]">
        <div className="rounded-lg bg-sidebar p-7 text-sidebar-foreground">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Available balance</p>
          <p className="mt-4 flex items-baseline gap-2 font-display text-5xl font-bold">
            {me.credits}
            <span className="text-base font-semibold text-sidebar-muted">Credits</span>
          </p>
          <p className="mt-3 text-xs leading-5 text-sidebar-muted">
            Enough for {Math.floor(me.credits / 5)} more peer sessions at the average cost of 5 credits.
          </p>
          <div className="mt-7 grid grid-cols-2 gap-4 border-t border-sidebar-border pt-6">
            <div>
              <p className="flex items-center gap-1.5 font-num text-2xl font-bold">
                <ArrowDownLeft className="size-4 text-primary" /> {creditsEarned}
              </p>
              <p className="text-[11px] text-sidebar-muted">Earned by teaching</p>
            </div>
            <div>
              <p className="flex items-center gap-1.5 font-num text-2xl font-bold">
                <ArrowUpRight className="size-4 text-accent" /> {creditsSpent}
              </p>
              <p className="text-[11px] text-sidebar-muted">Invested in learning</p>
            </div>
          </div>
          <Link
            to="/teach"
            className="mt-7 flex h-10 items-center justify-center gap-1.5 rounded-md bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-strong"
          >
            <Presentation className="size-4" /> Earn more by teaching
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-lg border border-workspace-border bg-workspace-card p-6">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">How credits work</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-workspace-muted">
              <li className="flex gap-2">
                <Coins className="mt-1 size-3.5 shrink-0 text-accent" />
                Teaching a 45-minute session earns 5–7 credits, based on skill level and peer rating.
              </li>
              <li className="flex gap-2">
                <Coins className="mt-1 size-3.5 shrink-0 text-accent" />
                Learning spends the credit cost shown on the skill card, released only after both sides confirm.
              </li>
              <li className="flex gap-2">
                <Info className="mt-1 size-3.5 shrink-0 text-primary" />
                Credits cannot be bought. The only way in is contribution.
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-workspace-border bg-workspace-card p-6">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Ready to unlock</p>
            <div className="mt-4 space-y-3">
              {affordable.map((skill) => (
                <div key={skill.id} className="flex items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{skill.name}</p>
                    <p className="text-[11px] text-workspace-muted">
                      {skill.level} · {skill.durationMinutes} min
                    </p>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-semibold">
                    <Coins className="size-3.5 text-accent" /> {skill.credits}
                  </span>
                </div>
              ))}
            </div>
            <Link
              to="/explore"
              className="mt-5 flex items-center justify-between border-t border-workspace-border pt-4 text-sm font-semibold"
            >
              Spend credits on a match <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="ledger-heading">
        <h2 id="ledger-heading" className="font-display text-lg font-bold">
          Credit history
        </h2>
        <div className="mt-4 overflow-hidden rounded-lg border border-workspace-border bg-workspace-card">
          {creditLedger.map((entry, index) => (
            <div
              key={entry.id}
              className={`flex flex-wrap items-center gap-4 px-5 py-4 ${index > 0 ? "border-t border-workspace-border" : ""}`}
            >
              <span
                className={`grid size-9 shrink-0 place-items-center rounded-md ${
                  entry.direction === "earned" ? "bg-mint text-primary-strong" : "bg-accent-soft text-accent-foreground"
                }`}
              >
                {entry.direction === "earned" ? (
                  <ArrowDownLeft className="size-4" />
                ) : (
                  <ArrowUpRight className="size-4" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{entry.reason}</p>
                <p className="text-[11px] text-workspace-muted">
                  {entry.peer} · {entry.when}
                </p>
              </div>
              <span
                className={`font-display text-base font-bold ${
                  entry.direction === "earned" ? "text-primary-strong" : "text-workspace-foreground"
                }`}
              >
                {entry.direction === "earned" ? "+" : "−"}
                {entry.amount}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
