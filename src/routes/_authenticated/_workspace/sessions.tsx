import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  Check,
  Clock,
  Coins,
  MapPin,
  Quote,
  Star,
} from "lucide-react";
import { StudentBadge } from "@/components/exchange/skill-card";
import { EmptyState } from "@/components/exchange/empty-state";
import {
  sessionPeer,
  sessionSkill,
  sessionsByStatus,
  type ExchangeSession,
} from "@/data/sessions";

export const Route = createFileRoute("/_authenticated/_workspace/sessions")({
  head: () => ({
    meta: [
      { title: "My Sessions — EXCHANGE" },
      {
        name: "description",
        content:
          "Prepare for upcoming peer exchanges and turn every completed session into verified career evidence.",
      },
      { property: "og:title", content: "My Sessions — EXCHANGE" },
      {
        property: "og:description",
        content: "Prepare for upcoming exchanges and turn completed sessions into verified proof.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SessionsPage,
});

function SessionsPage() {
  const upcoming = sessionsByStatus("upcoming");
  const awaiting = sessionsByStatus("awaiting");
  const completed = sessionsByStatus("completed");

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-7 sm:py-12">
      <header className="border-b border-workspace-border pb-9">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Exchange history</p>
        <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">My Sessions</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-workspace-muted">
          Every session you finish becomes evidence on your Skill Passport — what you learned, who you
          helped, and how peers rated the exchange.
        </p>
        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          <Stat label="Upcoming" value={String(upcoming.length + awaiting.length)} caption="Confirmed and pending" />
          <Stat label="Completed" value={String(completed.length)} caption="All rated by peers" />
          <Stat label="Average rating" value="5.0" caption="From your last 3 exchanges" accent />
        </div>
      </header>

      <section className="mt-9" aria-labelledby="upcoming-heading">
        <h2 id="upcoming-heading" className="font-display text-lg font-bold">
          Next up
        </h2>
        {upcoming.length + awaiting.length > 0 ? (
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {[...upcoming, ...awaiting].map((session) => (
              <UpcomingCard key={session.id} session={session} />
            ))}
          </div>
        ) : (
          <EmptyState
            className="mt-4"
            icon={<CalendarClock className="size-5" />}
            title="Your calendar is open for a first exchange."
            description="Pick one skill you want this month and book a peer who already teaches it."
            actionLabel="Explore your first skill"
            actionTo="/explore"
          />
        )}
      </section>

      <section className="mt-10" aria-labelledby="completed-heading">
        <h2 id="completed-heading" className="font-display text-lg font-bold">
          Completed exchanges
        </h2>
        <p className="mt-1 text-sm text-workspace-muted">
          Each one already added evidence to your passport.
        </p>
        <div className="mt-4 space-y-3">
          {completed.map((session) => (
            <CompletedRow key={session.id} session={session} />
          ))}
        </div>
        <Link
          to="/passport"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-strong"
        >
          See how this became verified evidence <ArrowRight className="size-4" />
        </Link>
      </section>
    </div>
  );
}

function UpcomingCard({ session }: { session: ExchangeSession }) {
  const skill = sessionSkill(session);
  const peer = sessionPeer(session);
  const pending = session.status === "awaiting";

  return (
    <article className="flex flex-col rounded-lg border border-workspace-border bg-workspace-card p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
              session.role === "learning"
                ? "bg-primary-soft text-primary-strong"
                : "bg-accent-soft text-accent-foreground"
            }`}
          >
            {session.role === "learning" ? "You are learning" : "You are teaching"}
          </span>
          <h3 className="mt-3 font-display text-lg font-bold leading-snug">{skill.name}</h3>
          <p className="text-xs text-workspace-muted">{skill.level} · {session.mode}</p>
        </div>
        {pending ? (
          <span className="rounded-full border border-workspace-border px-2.5 py-1 text-[11px] font-semibold text-workspace-muted">
            Awaiting confirmation
          </span>
        ) : (
          <span className="flex items-center gap-1 rounded-full bg-mint px-2.5 py-1 text-[11px] font-semibold text-primary-strong">
            <Check className="size-3" /> Confirmed
          </span>
        )}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <StudentBadge initials={peer.photo} />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{peer.name}</p>
          <p className="truncate text-xs text-workspace-muted">
            {peer.faculty} · {peer.major}
          </p>
        </div>
        <span className="ml-auto flex items-center gap-1 text-xs font-semibold">
          <Star className="size-3.5 fill-accent text-accent" /> {peer.rating.toFixed(1)}
        </span>
      </div>

      <ul className="mt-5 flex-1 space-y-2">
        {session.agenda.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-6 text-workspace-muted">
            <Check className="mt-1 size-3.5 shrink-0 text-primary" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-workspace-border pt-4 text-xs text-workspace-muted">
        <span className="flex items-center gap-1">
          <CalendarClock className="size-3.5" /> {session.when}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="size-3.5" /> {session.duration} min
        </span>
        <span className="ml-auto flex items-center gap-1 font-semibold text-workspace-foreground">
          <Coins className="size-3.5 text-accent" />
          {session.role === "learning" ? `−${session.credits}` : `+${session.credits}`} Credits
        </span>
      </div>

      <button className="mt-4 h-10 rounded-md bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-strong">
        {pending ? "View request" : session.role === "learning" ? "Prepare for session" : "Open teaching notes"}
      </button>
    </article>
  );
}

function CompletedRow({ session }: { session: ExchangeSession }) {
  const skill = sessionSkill(session);
  const peer = sessionPeer(session);

  return (
    <article className="rounded-lg border border-workspace-border bg-workspace-card p-5">
      <div className="flex flex-wrap items-start gap-4">
        <StudentBadge initials={peer.photo} />
        <div className="min-w-0 flex-1">
          <p className="font-display text-base font-bold leading-snug">
            {session.role === "learning" ? "Learned" : "Taught"} {skill.name}
          </p>
          <p className="mt-0.5 text-xs text-workspace-muted">
            {session.role === "learning" ? "with" : "to"} {peer.name} · {peer.faculty} · {session.when}
          </p>
          <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-primary-strong">
            <BadgeCheck className="size-4" /> {session.outcome}
          </p>
          {session.feedback && (
            <p className="mt-3 flex gap-2 rounded-md bg-workspace-soft p-3 text-sm leading-6 text-workspace-muted">
              <Quote className="mt-1 size-3.5 shrink-0" />
              {session.feedback}
            </p>
          )}
        </div>
        <div className="flex items-center gap-4 text-xs text-workspace-muted">
          <span className="flex items-center gap-1">
            <MapPin className="size-3.5" /> {session.mode.split(" · ")[1]}
          </span>
          <span className="flex items-center gap-1 font-semibold text-workspace-foreground">
            <Star className="size-3.5 fill-accent text-accent" /> {session.rating?.toFixed(1)}
          </span>
        </div>
      </div>
    </article>
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
