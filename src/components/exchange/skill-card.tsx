import { ArrowRight, BadgeCheck, CalendarClock, Clock, Coins, Star, Users } from "lucide-react";
import { matchScore, type Offering } from "@/data/exchange";
import { cn } from "@/lib/utils";

export function StudentBadge({ initials, className }: { initials: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-full bg-primary-soft font-display text-xs font-bold text-primary-strong",
        className
      )}
    >
      {initials}
    </span>
  );
}

export function MatchPill({ score, className }: { score: number; className?: string }) {
  return (
    <span
      className={cn(
        "rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground",
        className
      )}
    >
      {score}% match
    </span>
  );
}

export function SkillCard({ offering, showMatch = true }: { offering: Offering; showMatch?: boolean }) {
  const { skill, teacher } = offering;
  const match = matchScore(offering);

  return (
    <article className="group flex flex-col rounded-lg border border-workspace-border bg-workspace-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-workspace-muted">
            {skill.level}
          </p>
          <h3 className="mt-1 font-display text-base font-bold leading-snug">{skill.name}</h3>
        </div>
        {showMatch && <MatchPill score={match.score} />}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <StudentBadge initials={teacher.photo} />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{teacher.name}</p>
          <p className="truncate text-xs text-workspace-muted">
            {teacher.faculty} · {teacher.major}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-workspace-muted">
        {offering.verified ? (
          <span className="flex items-center gap-1 font-semibold text-primary-strong">
            <BadgeCheck className="size-3.5" /> EXCHANGE Verified
          </span>
        ) : (
          <span className="flex items-center gap-1">Verification in progress</span>
        )}
        <span className="flex items-center gap-1 font-semibold text-workspace-foreground">
          <Star className="size-3.5 fill-accent text-accent" /> {offering.rating.toFixed(1)}
        </span>
        <span className="flex items-center gap-1">
          <Users className="size-3.5" /> Helped {offering.studentsHelped} students
        </span>
      </div>

      <p className="mt-4 flex-1 text-sm leading-6 text-workspace-muted">
        <span className="font-medium text-workspace-foreground">Outcome: </span>
        {skill.outcomes[0]}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-workspace-border pt-4 text-xs text-workspace-muted">
        <span className="flex items-center gap-1">
          <Clock className="size-3.5" /> {skill.durationMinutes} minutes
        </span>
        <span className="flex items-center gap-1">
          <CalendarClock className="size-3.5" /> {offering.availability}
        </span>
        <span className="ml-auto flex items-center gap-1 font-semibold text-workspace-foreground">
          <Coins className="size-3.5 text-accent" /> {skill.credits} Credits
        </span>
      </div>

      <button className="mt-4 flex h-10 w-full items-center justify-center gap-1.5 rounded-md bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-strong">
        Start Exchange <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </article>
  );
}
