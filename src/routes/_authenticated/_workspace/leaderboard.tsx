import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Flame, Presentation, Star, TrendingUp } from "lucide-react";
import {
  categoryLabels,
  fastestGrowingSkills,
  mostHelpful,
  teachingHours,
  topContributors,
  topMentors,
  type Student,
} from "@/data/exchange";
import { StudentBadge } from "@/components/exchange/skill-card";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "contributors", label: "Top Contributors", icon: TrendingUp },
  { id: "mentors", label: "Top Skill Mentors", icon: Presentation },
  { id: "skills", label: "Fastest Growing Skills", icon: Flame },
  { id: "helpful", label: "Most Helpful Students", icon: Star },
] as const;

const searchSchema = z.object({
  board: fallback(z.enum(["contributors", "mentors", "skills", "helpful"]), "contributors").default(
    "contributors"
  ),
});

export const Route = createFileRoute("/_authenticated/_workspace/leaderboard")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Campus Leaderboard — EXCHANGE" },
      {
        name: "description",
        content:
          "Recognition for students who share knowledge: top contributors, mentors, and the fastest growing skills on campus.",
      },
      { property: "og:title", content: "Campus Leaderboard — EXCHANGE" },
      { property: "og:description", content: "Recognition for students who share knowledge." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LeaderboardPage,
});

function LeaderboardPage() {
  const { board } = Route.useSearch();
  const navigate = Route.useNavigate();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-7 sm:py-12">
      <header className="border-b border-workspace-border pb-8">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Campus recognition</p>
        <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Leaderboard</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-workspace-muted">
          Ranked by contribution, not activity. Every position here is backed by completed exchanges and peer
          ratings — the same evidence a recruiter can read on a Skill Passport.
        </p>
      </header>

      <div className="mt-7 flex flex-wrap gap-2" role="group" aria-label="Leaderboard category">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = board === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => navigate({ search: { board: tab.id }, replace: true })}
              className={cn(
                "flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-xs font-medium transition-colors",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-workspace-border bg-workspace-card text-workspace-muted hover:text-workspace-foreground"
              )}
            >
              <Icon className="size-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-workspace-border bg-workspace-card">
        {board === "contributors" &&
          topContributors.map((student, i) => (
            <Row
              key={student.id}
              rank={i + 1}
              student={student}
              metric={`${student.skillScore}`}
              metricLabel="Skill Score"
              impact={`${student.studentsHelped} students helped`}
            />
          ))}
        {board === "mentors" &&
          topMentors.map((student, i) => (
            <Row
              key={student.id}
              rank={i + 1}
              student={student}
              metric={`${student.studentsHelped}`}
              metricLabel="Students helped"
              impact={`${teachingHours(student)} teaching hours shared`}
            />
          ))}
        {board === "helpful" &&
          mostHelpful.map((student, i) => (
            <Row
              key={student.id}
              rank={i + 1}
              student={student}
              metric={student.rating.toFixed(1)}
              metricLabel="Peer rating"
              impact={`${student.exchangesCompleted} exchanges completed`}
            />
          ))}
        {board === "skills" &&
          fastestGrowingSkills.map((skill, i) => (
            <div
              key={skill.id}
              className="flex items-center gap-4 border-b border-workspace-border p-4 last:border-0 sm:p-5"
            >
              <Rank rank={i + 1} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-sm font-bold">{skill.name}</p>
                <p className="mt-0.5 text-xs text-workspace-muted">
                  {categoryLabels[skill.category]} · {skill.verifiedTeachers} verified teachers
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-num text-lg font-bold text-primary-strong">+{skill.growth}%</p>
                <p className="text-[11px] text-workspace-muted">{skill.completedExchanges} exchanges</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function Rank({ rank }: { rank: number }) {
  return (
    <span
      className={cn(
        "grid size-8 shrink-0 place-items-center rounded-md font-display text-sm font-bold",
        rank === 1
          ? "bg-accent text-accent-foreground"
          : rank <= 3
            ? "bg-primary-soft text-primary-strong"
            : "bg-workspace-soft text-workspace-muted"
      )}
    >
      {rank}
    </span>
  );
}

function Row({
  rank,
  student,
  metric,
  metricLabel,
  impact,
}: {
  rank: number;
  student: Student;
  metric: string;
  metricLabel: string;
  impact: string;
}) {
  return (
    <div className="flex items-center gap-4 border-b border-workspace-border p-4 last:border-0 sm:p-5">
      <Rank rank={rank} />
      <StudentBadge initials={student.photo} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{student.name}</p>
        <p className="mt-0.5 truncate text-xs text-workspace-muted">
          {student.faculty} · {student.level}
        </p>
        <p className="mt-1 truncate text-xs text-workspace-muted">{impact}</p>
      </div>
      <div className="shrink-0 text-right">
        <p className="font-num text-lg font-bold">{metric}</p>
        <p className="text-[11px] text-workspace-muted">{metricLabel}</p>
      </div>
    </div>
  );
}
