import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Clock,
  Zap,
  Plus,
  Sparkles,
  Users,
} from "lucide-react";
import { currentStudent, goalLabels, skillById, skills, studentById, teachingHours } from "@/data/exchange";
import { listings, teachRequests } from "@/data/sessions";
import { StudentBadge } from "@/components/exchange/skill-card";
import { EmptyState } from "@/components/exchange/empty-state";

export const Route = createFileRoute("/_authenticated/_workspace/teach")({
  head: () => ({
    meta: [
      { title: "Teach What You Know — EXCHANGE" },
      {
        name: "description",
        content:
          "Package a skill you already have into a focused peer session, earn credits, and build verified teaching evidence.",
      },
      { property: "og:title", content: "Teach What You Know — EXCHANGE" },
      { property: "og:description", content: "Share your skills with peers and earn learning credits." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TeachPage,
});

function TeachPage() {
  const me = currentStudent;
  const openToTeach = skills
    .filter((skill) => me.verifiedSkills.includes(skill.id))
    .filter((skill) => !me.teaching.some((t) => t.skillId === skill.id))
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-7 sm:py-12">
      <header className="flex flex-col gap-6 border-b border-workspace-border pb-9 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Create value</p>
          <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Teach what you know</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-workspace-muted">
            You do not need to be an expert — you need to be one step ahead. Teaching is how EXCHANGE turns
            what you know into credits, reputation, and proof you can explain your work.
          </p>
        </div>
        <button className="flex h-10 shrink-0 items-center gap-1.5 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-strong">
          <Plus className="size-4" /> Create a session
        </button>
      </header>

      <section className="mt-8 grid gap-3 sm:grid-cols-4" aria-label="Teaching summary">
        <Stat label="Students helped" value={String(me.studentsHelped)} caption="Across 3 faculties" />
        <Stat label="Teaching hours" value={String(teachingHours(me))} caption="Logged and verified" />
        <Stat label="Credits earned" value="42" caption="From teaching only" accent />
        <Stat label="Open requests" value={String(teachRequests.length)} caption="Waiting for your reply" />
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <h2 className="font-display text-lg font-bold">Your skill offers</h2>
          <p className="mt-1 text-sm text-workspace-muted">What peers can currently book with you.</p>
          <div className="mt-4 space-y-3">
            {listings.map((listing) => {
              const skill = skillById[listing.skillId];
              if (!skill) return null;
              const verified = me.verifiedSkills.includes(listing.skillId);
              return (
                <article
                  key={listing.skillId}
                  className="rounded-lg border border-workspace-border bg-workspace-card p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="flex items-center gap-1.5 font-display text-base font-bold">
                        {skill.name}
                        {verified && <BadgeCheck className="size-4 text-primary" />}
                      </p>
                      <p className="mt-0.5 text-xs text-workspace-muted">
                        {skill.level} · {listing.slots}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        listing.status === "live"
                          ? "bg-mint text-primary-strong"
                          : "border border-workspace-border text-workspace-muted"
                      }`}
                    >
                      {listing.status === "live" ? "Live" : "Draft"}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-workspace-muted">
                    <span className="flex items-center gap-1">
                      <Users className="size-3.5" /> {listing.studentsHelped} helped
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3.5" /> {listing.hours} hours taught
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-workspace-foreground">
                      <Zap className="size-3.5 text-accent" /> {skill.credits} Credits per session
                    </span>
                    {listing.requests > 0 && (
                      <span className="ml-auto font-semibold text-primary-strong">
                        {listing.requests} new request{listing.requests > 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <h2 className="mt-9 font-display text-lg font-bold">Skills you could open next</h2>
          {openToTeach.length > 0 ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {openToTeach.map((skill) => (
                <div
                  key={skill.id}
                  className="rounded-lg border border-dashed border-workspace-border bg-workspace-card p-5"
                >
                  <p className="font-display text-sm font-bold">{skill.name}</p>
                  <p className="mt-2 text-xs leading-5 text-workspace-muted">
                    {skill.completedExchanges} exchanges on campus · {skill.verifiedTeachers} verified teachers
                  </p>
                  <button className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary-strong">
                    Open this offer <ArrowRight className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              className="mt-4"
              icon={<Sparkles className="size-5" />}
              title="Verify one more skill to unlock a new offer."
              description="Once a skill is verified, you can open it for teaching and start earning credits from it."
              actionLabel="Open Skill Passport"
              actionTo="/passport"
            />
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-lg border border-workspace-border bg-workspace-card p-6">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Requests for you</p>
            <h2 className="mt-2 font-display text-lg font-bold">Peers asking for your help</h2>
            <div className="mt-5 space-y-5">
              {teachRequests.map((request) => {
                const skill = skillById[request.skillId];
                const student = request.studentId;
                return (
                  <div key={request.id} className="border-b border-workspace-border pb-5 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <StudentBadge initials={initialsOf(student)} />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{nameOf(student)}</p>
                        <p className="truncate text-[11px] text-workspace-muted">
                          {facultyOf(student)} · {request.goal}
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-workspace-muted">“{request.message}”</p>
                    <p className="mt-2 text-[11px] text-workspace-muted">
                      {skill?.name} · {request.when}
                    </p>
                    <div className="mt-3 flex gap-2">
                      <button className="h-9 flex-1 rounded-md bg-primary text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-strong">
                        Accept exchange
                      </button>
                      <button className="h-9 rounded-md border border-workspace-border px-3 text-xs font-medium transition-colors hover:bg-workspace-soft">
                        Suggest time
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-lg bg-sidebar p-6 text-sidebar-foreground">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Why teach</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-sidebar-muted">
              {[
                "Teaching counts double toward your Skill Score",
                "Peer ratings become verification evidence",
                `Credits you earn fund your goal: ${goalLabels[me.goals[0]!]}`,
              ].map((line) => (
                <li key={line} className="flex gap-2">
                  <Check className="mt-1 size-3.5 shrink-0 text-primary" />
                  {line}
                </li>
              ))}
            </ul>
            <Link
              to="/leaderboard"
              className="mt-6 flex items-center justify-between border-t border-sidebar-border pt-4 text-sm font-semibold"
            >
              See top mentors on campus <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function nameOf(id: string) {
  return studentById[id]?.name ?? "Student";
}
function facultyOf(id: string) {
  return studentById[id]?.faculty ?? "UI";
}
function initialsOf(id: string) {
  return studentById[id]?.photo ?? "UI";
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
