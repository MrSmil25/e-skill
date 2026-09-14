import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Copy, Repeat2, Sparkles, TrendingUp, UserPlus, Users } from "lucide-react";
import { referral } from "@/data/exchange";
import { EmptyState } from "@/components/exchange/empty-state";
import { StudentBadge } from "@/components/exchange/skill-card";

export const Route = createFileRoute("/_authenticated/_workspace/referral")({
  head: () => ({
    meta: [
      { title: "Campus Ambassador — EXCHANGE" },
      {
        name: "description",
        content:
          "Grow the campus skill network. Rewards activate only when invited students complete meaningful exchanges.",
      },
      { property: "og:title", content: "Campus Ambassador — EXCHANGE" },
      { property: "og:description", content: "Grow the campus skill network with meaningful invitations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ReferralPage,
});

function ReferralPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-7 sm:py-12">
      <header className="border-b border-workspace-border pb-8">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Community growth</p>
        <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">You are a {referral.identity}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-workspace-muted">
          A skill network only works when capable people join it. Invite students who have something to teach —
          rewards activate after invited students complete meaningful activity, never on sign-up alone.
        </p>
      </header>

      <section className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <div className="rounded-lg bg-sidebar p-6 text-sidebar-foreground sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Your referral identity</p>
          <p className="mt-4 font-display text-3xl font-bold tracking-wide">{referral.code}</p>
          <p className="mt-2 text-sm text-sidebar-muted">
            Share this code with students in your faculty and organizations.
          </p>
          <button className="mt-6 flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-strong">
            <Copy className="size-4" /> Copy invitation link
          </button>
          <p className="mt-6 border-t border-sidebar-border pt-5 text-xs leading-6 text-sidebar-muted">
            No tiers, no downlines, no recruitment targets. One code, and credit only for real learning that
            happens because of you.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Metric icon={<Users className="size-4" />} value={String(referral.studentsJoined)} label="Students joined" />
          <Metric
            icon={<Repeat2 className="size-4" />}
            value={String(referral.successfulExchanges)}
            label="Successful exchanges"
          />
          <Metric icon={<TrendingUp className="size-4" />} value={String(referral.creditsEarned)} label="Credits earned" />
          <Metric
            icon={<BadgeCheck className="size-4" />}
            value={`${Math.round((referral.successfulExchanges / referral.studentsJoined) * 100)}%`}
            label="Invites now active"
          />
        </div>
      </section>

      <section className="mt-10" aria-label="Grow Together">
        <h2 className="font-display text-xl font-bold">Grow Together</h2>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-workspace-muted">
          Kredit referral diberikan bertahap ketika temanmu benar-benar aktif belajar, bukan hanya saat mendaftar.
          Maksimal {referralMaxReward} Kredit per teman yang kamu ajak.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {referralRewards.map((reward, i) => (
            <Step
              key={reward.stage}
              step={String(i + 1)}
              title={`${reward.stage} · +${reward.credits} Credits${reward.pending ? " (pending)" : ""}`}
              body={reward.note}
            />
          ))}
        </div>
      </section>


      <section className="mt-10" aria-label="Students you invited">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-xl font-bold">Students you invited</h2>
          <Link to="/leaderboard" className="text-sm font-semibold text-primary-strong">
            Campus impact
          </Link>
        </div>
        {referral.invited.length === 0 ? (
          <EmptyState
            className="mt-4"
            icon={<UserPlus className="size-5" />}
            title="Your network starts with one person."
            description="Invite a friend who teaches something well. The first exchange they complete becomes evidence for both of you."
            actionLabel="Explore skills to share"
            actionTo="/explore"
          />
        ) : (
          <div className="mt-4 overflow-hidden rounded-lg border border-workspace-border bg-workspace-card">
            {referral.invited.map((person) => (
              <div
                key={person.name}
                className="flex items-center gap-4 border-b border-workspace-border p-4 last:border-0 sm:p-5"
              >
                <StudentBadge
                  initials={person.name
                    .split(" ")
                    .slice(0, 2)
                    .map((p) => p.charAt(0))
                    .join("")}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{person.name}</p>
                  <p className="mt-0.5 truncate text-xs text-workspace-muted">{person.faculty}</p>
                </div>
                <span className="hidden shrink-0 items-center gap-1.5 text-xs font-medium text-primary-strong sm:flex">
                  <Sparkles className="size-3.5" /> {person.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      <Link
        to="/explore"
        className="mt-8 flex items-center justify-between rounded-lg border border-workspace-border bg-workspace-card p-6 transition-colors hover:bg-workspace-soft"
      >
        <div>
          <p className="font-display text-base font-bold">Growth counts double when you teach</p>
          <p className="mt-1 text-sm text-workspace-muted">
            Every skill you offer makes the network worth joining for the next student.
          </p>
        </div>
        <ArrowRight className="size-5 shrink-0 text-primary" />
      </Link>
    </div>
  );
}

function Metric({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-lg border border-workspace-border bg-workspace-card p-5">
      <span className="grid size-9 place-items-center rounded-md bg-primary-soft text-primary-strong">
        {icon}
      </span>
      <p className="mt-3 font-num text-2xl font-bold">{value}</p>
      <p className="mt-0.5 text-[11px] uppercase tracking-wide text-workspace-muted">{label}</p>
    </div>
  );
}

function Step({ step, title, body }: { step: string; title: string; body: string }) {
  return (
    <div className="rounded-lg border border-workspace-border bg-workspace-card p-5">
      <span className="grid size-7 place-items-center rounded-md bg-accent-soft font-display text-xs font-bold text-accent-foreground">
        {step}
      </span>
      <p className="mt-3 font-display text-sm font-bold">{title}</p>
      <p className="mt-1.5 text-sm leading-6 text-workspace-muted">{body}</p>
    </div>
  );
}
