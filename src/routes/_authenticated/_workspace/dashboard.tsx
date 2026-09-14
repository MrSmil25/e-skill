import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  Check,
  Clock,
  Coins,
  Plus,
  Presentation,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import {
  currentStudent,
  goalLabels,
  rankedOfferings,
  skillById,
  teachingHours,
} from "@/data/exchange";
import { ActivityFeed } from "@/components/exchange/activity-feed";
import { StudentBadge } from "@/components/exchange/skill-card";
import { EmptyState } from "@/components/exchange/empty-state";

export const Route = createFileRoute("/_authenticated/_workspace/dashboard")({
  head: () => ({
    meta: [
      { title: "Your Skill Journey — EXCHANGE" },
      {
        name: "description",
        content:
          "Track your skill score, credits, verified skills, and the next exchange that moves your goals forward.",
      },
      { property: "og:title", content: "Your Skill Journey — EXCHANGE" },
      { property: "og:description", content: "Track your skill score, credits, and verified skills." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const me = currentStudent;
  const firstName = me.name.split(" ")[0];
  const best = rankedOfferings(me)[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-7 sm:py-12">
      {/* Identity header */}
      <header className="flex flex-col gap-7 border-b border-workspace-border pb-9 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
            Your skill journey
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Hello, {firstName}{" "}
            <span className="font-emoji" aria-hidden>
              👋
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-workspace-muted">
            Every exchange creates learning, contribution, and career evidence. You are{" "}
            {900 - me.skillScore} points away from Campus Mentor.
          </p>

        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/teach"
            className="flex h-10 items-center gap-1.5 rounded-md border border-workspace-border bg-workspace-card px-4 text-sm font-medium transition-colors hover:bg-workspace-soft"
          >
            <Plus className="size-4" /> Offer a skill
          </Link>
          <Link
            to="/explore"
            className="flex h-10 items-center gap-1.5 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-strong"
          >
            Find an exchange <ArrowRight className="size-4" />
          </Link>
        </div>
      </header>

      {/* Headline stats */}
      <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Skill journey summary">
        <Stat label="Skill Level" value={me.level} caption={`${me.exchangesCompleted} exchanges completed`} />
        <Stat label="Skill Score" value={String(me.skillScore)} caption="+38 in the last 30 days" accent />
        <Stat label="Exchange Credits" value={String(me.credits)} caption="Earned by teaching peers" />
        <Stat
          label="Verified Skills"
          value={String(me.verifiedSkills.length)}
          caption="Backed by assessments"
        />
      </section>

      {/* Next opportunity + impact */}
      <section className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-lg border border-workspace-border bg-workspace-card p-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Next opportunity</p>
          <h2 className="mt-2 font-display text-xl font-bold">Your next recommended exchange</h2>
          {best ? (
            <div className="mt-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <StudentBadge initials={best.offering.teacher.photo} className="size-11 text-sm" />
                  <div>
                    <p className="font-display text-base font-bold">
                      Learn {best.offering.skill.name} {best.offering.skill.level}
                    </p>
                    <p className="mt-0.5 text-sm text-workspace-muted">
                      {best.offering.teacher.name} · {best.offering.teacher.faculty}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-num text-3xl font-bold text-primary-strong">{best.match.score}%</p>
                  <p className="text-[11px] uppercase text-workspace-muted">Match score</p>
                </div>
              </div>

              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {best.match.reasons.map((reason) => (
                  <li key={reason} className="flex items-center gap-2 text-sm">
                    <Check className="size-4 shrink-0 text-primary" />
                    {reason}
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-md bg-workspace-soft p-4">
                <p className="text-[11px] font-semibold uppercase text-workspace-muted">
                  How this match was calculated
                </p>
                <div className="mt-3 space-y-2">
                  {best.match.components.map((c) => (
                    <div key={c.label} className="flex items-center gap-3">
                      <span className="w-36 shrink-0 text-xs text-workspace-muted">{c.label}</span>
                      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-workspace-border">
                        <span
                          className="animate-passport-fill block h-full bg-primary"
                          style={{ width: `${(c.earned / c.weight) * 100}%` }}
                        />
                      </span>
                      <span className="w-16 shrink-0 text-right text-xs font-semibold">
                        {c.earned}/{c.weight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-workspace-muted">
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" /> {best.offering.skill.durationMinutes} minutes
                </span>
                <span className="flex items-center gap-1">
                  <CalendarClock className="size-3.5" /> {best.offering.availability}
                </span>
                <span className="flex items-center gap-1 font-semibold text-workspace-foreground">
                  <Coins className="size-3.5 text-accent" /> {best.offering.skill.credits} Credits
                </span>
                <Link
                  to="/explore"
                  className="ml-auto flex items-center gap-1 font-semibold text-primary-strong"
                >
                  Start exchange <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <EmptyState
              className="mt-5"
              icon={<Sparkles className="size-5" />}
              title="Tell us one goal and matching starts."
              description="Pick a goal like internship or competition, and EXCHANGE will surface the peers who can help you get there."
              actionLabel="Explore skills"
              actionTo="/explore"
            />
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-lg bg-sidebar p-6 text-sidebar-foreground">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Your impact</p>
            <h2 className="mt-2 font-display text-lg font-bold">What you gave back</h2>
            <div className="mt-5 space-y-4">
              <Impact
                icon={<Users className="size-4 text-primary" />}
                value={String(me.studentsHelped)}
                label="Students helped"
              />
              <Impact
                icon={<Clock className="size-4 text-primary" />}
                value={String(teachingHours(me))}
                label="Teaching hours"
              />
              <Impact
                icon={<Presentation className="size-4 text-primary" />}
                value={String(me.teaching.length)}
                label="Skills shared"
              />
            </div>
            <p className="mt-6 text-xs leading-5 text-sidebar-muted">
              Contribution is half of your Skill Score — teaching proves you understood it.
            </p>
          </div>

          <div className="rounded-lg border border-workspace-border bg-workspace-card p-6">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Reputation</p>
            <div className="mt-4 flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-num text-2xl font-bold">
                <Star className="size-5 fill-accent text-accent" /> {me.rating.toFixed(1)}
              </span>
              <span className="text-xs text-workspace-muted">
                from {me.exchangesCompleted} rated exchanges
              </span>
            </div>
            <Link
              to="/passport"
              className="mt-5 flex items-center justify-between border-t border-workspace-border pt-4 text-sm font-semibold"
            >
              Open Skill Passport <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Skill progress */}
      <section className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <div className="rounded-lg border border-workspace-border bg-workspace-card p-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Skill progress</p>
          <h2 className="mt-2 font-display text-lg font-bold">What you are building now</h2>
          {me.learning.length > 0 ? (
            <div className="mt-6 space-y-5">
              {me.learning.map((entry) => {
                const skill = skillById[entry.skillId];
                if (!skill) return null;
                const verified = me.verifiedSkills.includes(entry.skillId);
                return (
                  <div key={entry.skillId}>
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="flex items-center gap-1.5 text-sm font-semibold">
                        {skill.name}
                        {verified && <BadgeCheck className="size-4 text-primary" />}
                      </p>
                      <span className="font-num text-xs font-semibold text-workspace-muted">{entry.progress}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-workspace-soft">
                      <div
                        className="animate-passport-fill h-full rounded-full bg-primary"
                        style={{ width: `${entry.progress}%` }}
                      />
                    </div>
                    <p className="mt-1.5 text-[11px] text-workspace-muted">
                      {entry.progress >= 80
                        ? "Assessment ready — one session from verification"
                        : `Next step: book a session for your ${goalLabels[me.goals[0]!].toLowerCase()} goal`}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              className="mt-5"
              title="Your first skill is one exchange away."
              description="Pick a skill you want this semester and your progress bar starts filling with real, verified sessions."
              actionLabel="Explore your first skill"
              actionTo="/explore"
            />
          )}
        </div>

        <div className="rounded-lg border border-workspace-border bg-workspace-card p-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Campus activity</p>
          <h2 className="mt-2 font-display text-lg font-bold">Recent exchanges</h2>
          <ActivityFeed limit={5} />
          <Link
            to="/leaderboard"
            className="flex items-center justify-between border-t border-workspace-border pt-4 text-sm font-semibold"
          >
            See campus leaderboard <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  caption,
  accent,
}: {
  label: string;
  value: string;
  caption: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-lg border border-workspace-border bg-workspace-card p-5">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-workspace-muted">{label}</p>
      <p
        className={`mt-2 font-num text-2xl font-bold ${accent ? "text-primary-strong" : "text-workspace-foreground"}`}
      >
        {value}
      </p>
      <p className="mt-1 text-[11px] text-workspace-muted">{caption}</p>
    </div>
  );
}

function Impact({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-md bg-sidebar-panel">{icon}</span>
      <div>
        <p className="font-num text-xl font-bold">{value}</p>
        <p className="text-[11px] text-sidebar-muted">{label}</p>
      </div>
    </div>
  );
}
