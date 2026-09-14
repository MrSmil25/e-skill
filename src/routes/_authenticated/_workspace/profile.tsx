import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  Check,
  Clock,
  Globe,
  GraduationCap,
  MessageSquare,
  Pencil,
  Star,
  Target,
  Users,
} from "lucide-react";
import { currentStudent, goalLabels, skillById } from "@/data/exchange";
import { profileStats } from "@/data/sessions";
import { StudentBadge } from "@/components/exchange/skill-card";

export const Route = createFileRoute("/_authenticated/_workspace/profile")({
  head: () => ({
    meta: [
      { title: "Your Student Identity — EXCHANGE" },
      {
        name: "description",
        content:
          "Keep the context behind your skills clear and credible: faculty, goals, availability, and what peers can learn from you.",
      },
      { property: "og:title", content: "Your Student Identity — EXCHANGE" },
      { property: "og:description", content: "Manage the student identity behind your verified skills." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const me = currentStudent;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-7 sm:py-12">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Student identity</p>

      <header className="mt-3 flex flex-col gap-6 border-b border-workspace-border pb-9 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <StudentBadge initials={me.photo} className="size-20 rounded-lg text-xl" />
          <div>
            <h1 className="font-display text-3xl font-bold">{me.name}</h1>
            <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-workspace-muted">
              <span className="flex items-center gap-1">
                <GraduationCap className="size-4" /> {me.faculty} · {me.major}
              </span>
              <span>Year {me.year}</span>
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary-strong">
              <BadgeCheck className="size-4" /> {me.level} · Skill Score {me.skillScore}
            </p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-workspace-muted">{me.bio}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="flex h-10 items-center gap-1.5 rounded-md border border-workspace-border bg-workspace-card px-4 text-sm font-medium transition-colors hover:bg-workspace-soft">
            <Pencil className="size-4" /> Edit profile
          </button>
          <Link
            to="/passport"
            className="flex h-10 items-center gap-1.5 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-strong"
          >
            View Skill Passport <ArrowRight className="size-4" />
          </Link>
        </div>
      </header>

      <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Reputation summary">
        <Stat icon={<Users className="size-4" />} label="Students helped" value={String(profileStats.studentsHelped)} />
        <Stat icon={<Clock className="size-4" />} label="Teaching hours" value={String(profileStats.teachingHours)} />
        <Stat icon={<Star className="size-4" />} label="Peer rating" value={me.rating.toFixed(1)} />
        <Stat
          icon={<MessageSquare className="size-4" />}
          label="Response rate"
          value={`${profileStats.responseRate}%`}
        />
      </section>

      <section className="mt-4 grid items-start gap-4 lg:grid-cols-[1.1fr_1fr]">
        <div className="rounded-lg border border-workspace-border bg-workspace-card p-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">This semester</p>
          <h2 className="mt-2 font-display text-lg font-bold">What you are working toward</h2>
          <p className="mt-4 text-sm leading-7 text-workspace-muted">{profileStats.goalHeadline}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {me.goals.map((goal) => (
              <span
                key={goal}
                className="flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary-strong"
              >
                <Target className="size-3.5" /> {goalLabels[goal]}
              </span>
            ))}
          </div>

          <div className="mt-7 border-t border-workspace-border pt-6">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-workspace-muted">
              Skills you can teach
            </p>
            <div className="mt-4 space-y-3">
              {me.teaching.map((entry) => {
                const skill = skillById[entry.skillId];
                if (!skill) return null;
                return (
                  <div key={entry.skillId} className="flex items-center gap-3">
                    <Check className="size-4 shrink-0 text-primary" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{skill.name}</p>
                      <p className="text-[11px] text-workspace-muted">
                        {entry.students} students · {entry.hours} hours
                      </p>
                    </div>
                    {me.verifiedSkills.includes(entry.skillId) && (
                      <BadgeCheck className="size-4 shrink-0 text-primary" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-lg border border-workspace-border bg-workspace-card p-6">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Availability</p>
            <p className="mt-3 flex items-center gap-2 text-sm font-semibold">
              <CalendarClock className="size-4 text-primary" /> {me.availability}
            </p>
            <p className="mt-2 text-xs leading-5 text-workspace-muted">{profileStats.responseTime}</p>
            <div className="mt-5 border-t border-workspace-border pt-5">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-workspace-muted">Languages</p>
              <p className="mt-2 flex items-center gap-2 text-sm">
                <Globe className="size-4 text-primary" /> {profileStats.languages.join(" · ")}
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-workspace-border bg-workspace-card p-6">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Interests</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {profileStats.interests.map((interest) => (
                <span
                  key={interest}
                  className="rounded-full border border-workspace-border px-3 py-1.5 text-xs font-medium text-workspace-muted"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-sidebar p-6 text-sidebar-foreground">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Member since</p>
            <p className="mt-3 font-num text-xl font-bold">{profileStats.joined}</p>
            <p className="mt-2 text-xs leading-5 text-sidebar-muted">
              {profileStats.exchanges} exchanges completed · {me.verifiedSkills.length} verified skills
            </p>
            <Link
              to="/referral"
              className="mt-6 flex items-center justify-between border-t border-sidebar-border pt-4 text-sm font-semibold"
            >
              Invite a peer from your faculty <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-workspace-border bg-workspace-card p-5">
      <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-workspace-muted">
        <span className="text-primary">{icon}</span>
        {label}
      </p>
      <p className="mt-2 font-num text-2xl font-bold">{value}</p>
    </div>
  );
}
