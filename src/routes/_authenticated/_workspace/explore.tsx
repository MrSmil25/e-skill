import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Compass,
  Flame,
  GraduationCap,
  MessagesSquare,
  Palette,
  Repeat2,
  Target,
  Trophy,
  Users,
  Code2,
  Search,
} from "lucide-react";
import {
  categoryLabels,
  currentStudent,
  goalLabels,
  goalTracks,
  trackSkills,
  mostExchangedSkills,
  offerings,
  offeringsAcrossCampus,
  offeringsFromFaculty,
  rankedOfferings,
  recommendedSkills,
  trendingSkills,
  type Goal,
  type SkillCategory,
} from "@/data/exchange";
import { SkillCard } from "@/components/exchange/skill-card";
import { EmptyState } from "@/components/exchange/empty-state";
import { cn } from "@/lib/utils";

const exploreSearchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  category: fallback(z.string(), "all").default("all"),
  goal: fallback(z.string(), "all").default("all"),
});

export const Route = createFileRoute("/_authenticated/_workspace/explore")({
  validateSearch: zodValidator(exploreSearchSchema),
  head: () => ({
    meta: [
      { title: "Explore Skills — EXCHANGE" },
      {
        name: "description",
        content:
          "A skill discovery network, not a course shop. Find verified student teachers across Universitas Indonesia faculties.",
      },
      { property: "og:title", content: "Explore Skills — EXCHANGE" },
      { property: "og:description", content: "Find verified student teachers across campus." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ExplorePage,
});

const categories: { id: SkillCategory | "all"; label: string; icon: typeof Compass }[] = [
  { id: "all", label: "All", icon: Compass },
  { id: "business", label: categoryLabels.business, icon: Briefcase },
  { id: "technology", label: categoryLabels.technology, icon: Code2 },
  { id: "design", label: categoryLabels.design, icon: Palette },
  { id: "communication", label: categoryLabels.communication, icon: MessagesSquare },
  { id: "career", label: categoryLabels.career, icon: Target },
];

const goals: { id: Goal | "all"; label: string; icon: typeof Compass }[] = [
  { id: "all", label: "All goals", icon: Compass },
  { id: "internship", label: "Internship", icon: Building2 },
  { id: "competition", label: "Competition", icon: Trophy },
  { id: "organization", label: "Organization", icon: Users },
  { id: "career", label: "Career", icon: Briefcase },
];

function ExplorePage() {
  const { q, category, goal } = Route.useSearch();
  const navigate = Route.useNavigate();
  const filtering = Boolean(q.trim()) || category !== "all" || goal !== "all";

  const ranked = rankedOfferings();
  const filtered = ranked.filter(({ offering }) => {
    const query = q.trim().toLowerCase();
    const haystack = `${offering.skill.name} ${offering.teacher.name} ${offering.teacher.faculty} ${offering.skill.outcomes.join(" ")}`;
    const matchesQuery = !query || haystack.toLowerCase().includes(query);
    const matchesCategory = category === "all" || offering.skill.category === category;
    const matchesGoal = goal === "all" || offering.skill.goals.includes(goal as Goal);
    return matchesQuery && matchesCategory && matchesGoal;
  });

  const recommended = recommendedSkills(currentStudent, 3);
  const facultyOfferings = offeringsFromFaculty(currentStudent.faculty).slice(0, 3);
  const campusOfferings = offeringsAcrossCampus(currentStudent.faculty)
    .filter((o) => o.rating >= 4.8)
    .slice(0, 3);
  const bestFor = (skillId: string) =>
    ranked.find((entry) => entry.offering.skill.id === skillId)?.offering;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-7 sm:py-12">
      <header className="border-b border-workspace-border pb-8">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
          Skill discovery network
        </p>
        <h1 className="mt-3 max-w-2xl font-display text-3xl font-bold leading-tight sm:text-4xl">
          Find the person on campus who already knows what you need.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-workspace-muted">
          {offerings.length} active teaching offers from {new Set(offerings.map((o) => o.teacher.id)).size}{" "}
          students across 10 faculties. Every exchange creates learning, contribution, and career evidence.
        </p>
      </header>

      {/* Search + filters */}
      <div className="mt-8 space-y-4">
        <div className="relative max-w-lg">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-workspace-muted" />
          <input
            value={q}
            onChange={(e) => navigate({ search: (prev) => ({ ...prev, q: e.target.value }), replace: true })}
            placeholder="Search a skill, student, or faculty…"
            aria-label="Search skills"
            className="h-11 w-full rounded-md border border-workspace-border bg-workspace-card pl-10 pr-4 text-sm outline-none placeholder:text-workspace-muted focus:border-primary"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
          <span className="mr-1 text-[11px] font-semibold uppercase text-workspace-muted">Category</span>
          {categories.map((c) => {
            const Icon = c.icon;
            const active = category === c.id;
            return (
              <button
                key={c.id}
                onClick={() => navigate({ search: (prev) => ({ ...prev, category: c.id }), replace: true })}
                className={cn(
                  "flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-workspace-border bg-workspace-card text-workspace-muted hover:text-workspace-foreground"
                )}
              >
                <Icon className="size-3.5" />
                {c.label}
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by goal">
          <span className="mr-1 text-[11px] font-semibold uppercase text-workspace-muted">Goal</span>
          {goals.map((g) => {
            const Icon = g.icon;
            const active = goal === g.id;
            return (
              <button
                key={g.id}
                onClick={() => navigate({ search: (prev) => ({ ...prev, goal: g.id }), replace: true })}
                className={cn(
                  "flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors",
                  active
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-workspace-border bg-workspace-card text-workspace-muted hover:text-workspace-foreground"
                )}
              >
                <Icon className="size-3.5" />
                {g.label}
              </button>
            );
          })}
        </div>
      </div>

      {filtering ? (
        <section className="mt-10" aria-label="Search results">
          <SectionHeading
            eyebrow="Results"
            title={`${filtered.length} exchange${filtered.length === 1 ? "" : "s"} match your filters`}
          />
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(({ offering }) => (
              <SkillCard key={offering.id} offering={offering} />
            ))}
          </div>
          {filtered.length === 0 && (
            <EmptyState
              className="mt-5"
              icon={<GraduationCap className="size-5" />}
              title="Nobody teaches this yet — that is an opening."
              description="No student has offered this exchange so far. Post it as a skill you want, or teach the version you already know and become the first verified teacher."
              actionLabel="Offer this skill"
              actionTo="/teach"
            />
          )}
        </section>
      ) : (
        <>
          {/* Goal-based discovery */}
          <section className="mt-12" aria-label="Goal based discovery">
            <SectionHeading
              eyebrow="Start with intent"
              title="What do you want to achieve?"
              description="Pilih tujuan kamu, lalu EXCHANGE menunjukkan skill dan mahasiswa yang paling relevan untuk langkah itu."
            />
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {goalTracks.map((track) => (
                <div
                  key={track.id}
                  className="flex flex-col rounded-lg border border-workspace-border bg-workspace-card p-5 transition-colors hover:border-primary"
                >
                  <p className="font-display text-base font-bold">{track.title}</p>
                  <p className="mt-2 text-sm leading-6 text-workspace-muted">{track.question}</p>
                  <ul className="mt-4 space-y-2 border-t border-workspace-border pt-4">
                    {trackSkills(track.id).map((skill) => (
                      <li key={skill.id} className="flex items-center justify-between gap-3 text-sm">
                        <span className="flex items-center gap-2 font-medium">
                          <Target className="size-3.5 shrink-0 text-primary" />
                          {skill.name}
                        </span>
                        <span className="font-num shrink-0 text-[11px] text-workspace-muted">
                          {skill.credits} Credits
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() =>
                      navigate({ search: (prev) => ({ ...prev, goal: track.goal }), replace: true })
                    }
                    className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-primary-strong"
                  >
                    Show exchanges for this goal <ArrowRight className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Recommended for your goals */}
          <section className="mt-12" aria-label="Recommended for your goals">
            <SectionHeading
              eyebrow="Recommended for your goals"
              title={`Because you are working towards: ${currentStudent.goals
                .map((g) => goalLabels[g].toLowerCase())
                .join(" and ")}`}
              description="Rule-based matching on skill relevance, goal fit, schedule overlap, and teacher rating."
            />
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recommended.map((skill) => {
                const offering = bestFor(skill.id);
                return offering ? <SkillCard key={skill.id} offering={offering} /> : null;
              })}
            </div>
          </section>

          {/* Trending */}
          <section className="mt-12" aria-label="Trending skills">
            <SectionHeading
              eyebrow="Trending this month"
              title="What campus is learning right now"
              icon={<Flame className="size-4 text-accent" />}
            />
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {trendingSkills.map((skill) => (
                <SkillStat
                  key={skill.id}
                  name={skill.name}
                  category={categoryLabels[skill.category]}
                  value={`+${skill.growth}%`}
                  caption="exchanges in 30 days"
                />
              ))}
            </div>
          </section>

          {/* Most exchanged */}
          <section className="mt-12" aria-label="Most exchanged skills">
            <SectionHeading
              eyebrow="Most exchanged all time"
              title="The skills this campus trades the most"
              icon={<Repeat2 className="size-4 text-primary" />}
            />
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {mostExchangedSkills.map((skill) => (
                <SkillStat
                  key={skill.id}
                  name={skill.name}
                  category={categoryLabels[skill.category]}
                  value={`${skill.completedExchanges}`}
                  caption={`completed · ${skill.verifiedTeachers} verified teachers`}
                />
              ))}
            </div>
          </section>

          {/* From your faculty */}
          <section className="mt-12" aria-label="Skills from your faculty">
            <SectionHeading
              eyebrow={`From ${currentStudent.faculty}`}
              title="People who share your hallway"
            />
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {facultyOfferings.map((offering) => (
                <SkillCard key={offering.id} offering={offering} />
              ))}
            </div>
          </section>

          {/* Across campus */}
          <section className="mt-12" aria-label="Skills across campus">
            <SectionHeading
              eyebrow="Across campus"
              title="Skills your faculty rarely teaches"
              description="The strongest exchanges usually happen between different faculties."
            />
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {campusOfferings.map((offering) => (
                <SkillCard key={offering.id} offering={offering} />
              ))}
            </div>
            <Link
              to="/leaderboard"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-strong"
            >
              See who contributes the most on campus <ArrowRight className="size-4" />
            </Link>
          </section>
        </>
      )}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  icon,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
        {icon}
        {eyebrow}
      </p>
      <h2 className="mt-2 font-display text-xl font-bold sm:text-2xl">{title}</h2>
      {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-workspace-muted">{description}</p>}
    </div>
  );
}

function SkillStat({
  name,
  category,
  value,
  caption,
}: {
  name: string;
  category: string;
  value: string;
  caption: string;
}) {
  return (
    <div className="rounded-lg border border-workspace-border bg-workspace-card p-4">
      <p className="text-[11px] uppercase text-workspace-muted">{category}</p>
      <p className="mt-1 font-display text-sm font-bold leading-snug">{name}</p>
      <p className="mt-3 font-num text-2xl font-bold text-primary-strong">{value}</p>
      <p className="mt-0.5 text-[11px] text-workspace-muted">{caption}</p>
    </div>
  );
}
