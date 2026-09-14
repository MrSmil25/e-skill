import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  BriefcaseBusiness,
  Check,
  Code2,
  Network,
  Presentation,
  Search,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const journey = [
  {
    number: "01",
    short: "Discover",
    eyebrow: "Discover a peer",
    title: "Find the right person to learn from.",
    text: "Explore trusted students across faculties by skill, goals, availability, and peer-verified experience.",
  },
  {
    number: "02",
    short: "Exchange",
    eyebrow: "Exchange knowledge",
    title: "Turn what you know into shared progress.",
    text: "Teach one skill, learn another, and build useful relationships beyond your own faculty.",
  },
  {
    number: "03",
    short: "Build reputation",
    eyebrow: "Build your reputation",
    title: "Every exchange strengthens your profile.",
    text: "Your sessions, contributions, and learning history become credible proof in a living Skill Passport.",
  },
  {
    number: "04",
    short: "Unlock",
    eyebrow: "Unlock opportunities",
    title: "Let verified ability open the next door.",
    text: "Match with internships and projects based on demonstrated skills—not just what fits on a traditional résumé.",
  },
] as const;

export function ScrollSkillUniverse() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset["step"]);
        if (Number.isFinite(index)) setActiveStep(index);
      },
      { rootMargin: "-26% 0px -42% 0px", threshold: [0, 0.35, 0.7] },
    );

    stepRefs.current.forEach((step) => step && observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="scroll-mt-18 overflow-clip border-b border-workspace-border bg-workspace">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase text-primary">How EXCHANGE works</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-workspace-foreground sm:text-5xl">From shared knowledge to career proof.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-workspace-muted sm:text-lg">
            A simple journey that turns everyday student knowledge into a trusted professional identity.
          </p>
        </div>

        <div className="mt-20 lg:grid lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <div>
            {journey.map((step, index) => (
              <article
                key={step.number}
                ref={(node) => { stepRefs.current[index] = node; }}
                data-step={index}
                className="flex min-h-[52vh] flex-col justify-center border-t border-workspace-border py-14 first:border-t-0 lg:min-h-[72vh] lg:py-20"
              >
                <div className={`transition-all duration-500 ${activeStep === index ? "translate-y-0 opacity-100" : "translate-y-2 opacity-55"}`}>
                  <div className="flex items-center gap-3">
                    <span className="font-num grid size-9 place-items-center rounded-lg bg-primary-soft text-xs font-bold text-primary">{step.number}</span>
                    <p className="text-xs font-semibold uppercase text-workspace-muted">{step.eyebrow}</p>
                  </div>
                  <h3 className="mt-6 max-w-md text-3xl font-bold leading-tight text-workspace-foreground sm:text-4xl">{step.title}</h3>
                  <p className="mt-5 max-w-md text-base leading-8 text-workspace-muted">{step.text}</p>
                  <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-primary">
                    {step.short} <ArrowRight className="size-4" />
                  </div>
                </div>
                <div className="mt-10 lg:hidden"><EditorialVisual step={index} compact /></div>
              </article>
            ))}
          </div>

          <div className="sticky top-24 hidden h-[calc(100vh-7rem)] items-center lg:flex">
            <div className="relative aspect-[1.05] w-full overflow-hidden rounded-2xl border border-workspace-border bg-workspace-card shadow-career">
              <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between border-b border-workspace-border bg-workspace-card/90 px-5 py-4 backdrop-blur-lg">
                <p className="text-xs font-semibold text-workspace-foreground">The EXCHANGE journey</p>
                <p className="font-num text-xs font-semibold text-primary">0{activeStep + 1} / 04</p>
              </div>
              {journey.map((step, index) => (
                <div key={step.number} className={`absolute inset-0 transition-all duration-500 ease-out ${activeStep === index ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}>
                  <EditorialVisual step={index} />
                </div>
              ))}
              <div className="absolute inset-x-5 bottom-5 z-20 flex gap-2 rounded-xl border border-workspace-border bg-workspace-card/95 p-2 shadow-sm backdrop-blur-lg">
                {journey.map((step, index) => (
                  <div key={step.number} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${activeStep === index ? "bg-primary" : "bg-workspace-soft"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EditorialVisual({ step, compact = false }: { step: number; compact?: boolean }) {
  return (
    <div className={`bright-network-field relative w-full overflow-hidden ${compact ? "h-[430px] rounded-2xl border border-workspace-border shadow-career" : "h-full pt-14"}`}>
      {step === 0 && <DiscoverVisual />}
      {step === 1 && <ExchangeVisual />}
      {step === 2 && <PassportVisual />}
      {step === 3 && <OpportunityVisual />}
    </div>
  );
}

const students = [
  { initials: "NA", name: "Nadia", faculty: "FEB UI", skill: "Financial Modeling", className: "left-[7%] top-[24%]" },
  { initials: "RK", name: "Raka", faculty: "Fasilkom UI", skill: "Python Basic", className: "right-[7%] top-[22%]" },
  { initials: "AL", name: "Alya", faculty: "FIB UI", skill: "UX Writing", className: "left-[9%] bottom-[24%]" },
  { initials: "DI", name: "Dimas", faculty: "FT UI", skill: "Product CAD", className: "right-[8%] bottom-[25%]" },
];

function DiscoverVisual() {
  return (
    <div className="absolute inset-0 pt-14">
      <svg className="absolute inset-[12%] size-[76%] text-primary-border" viewBox="0 0 100 100" aria-hidden>
        <path d="M50 50 L13 25 M50 50 L87 24 M50 50 L14 78 M50 50 L87 77" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      <div className="absolute left-1/2 top-1/2 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-primary-border bg-workspace-card shadow-career sm:size-36">
        <div className="text-center"><Network className="mx-auto size-7 text-primary" /><p className="mt-3 text-sm font-bold text-workspace-foreground">EXCHANGE</p><p className="mt-1 text-[10px] text-workspace-muted">Skill network</p></div>
      </div>
      {students.map((student) => <StudentCard key={student.name} {...student} />)}
    </div>
  );
}

function StudentCard({ initials, name, faculty, skill, className }: (typeof students)[number]) {
  return (
    <div className={`absolute ${className} w-36 rounded-xl border border-workspace-border bg-workspace-card p-3 shadow-career sm:w-44`}>
      <div className="flex items-center gap-2.5"><span className="grid size-8 place-items-center rounded-full bg-primary-soft font-num text-[10px] font-bold text-primary">{initials}</span><div><p className="text-xs font-semibold text-workspace-foreground">{name}</p><p className="text-[9px] text-workspace-muted">{faculty}</p></div></div>
      <div className="mt-2.5 flex items-center justify-between border-t border-workspace-border pt-2 text-[9px] text-workspace-muted"><span className="truncate">{skill}</span><BadgeCheck className="size-3 text-primary" /></div>
    </div>
  );
}

function ExchangeVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-6 pt-10">
      <div className="flex w-full items-center justify-between gap-3 sm:gap-5">
        <PersonCard initials="RK" name="Raka" faculty="Fasilkom" skill="Python" icon={<Code2 />} />
        <div className="flex min-w-20 flex-1 flex-col items-center">
          <div className="flex w-full items-center"><ArrowRight className="size-4 text-primary" /><span className="h-px flex-1 bg-primary-border" /><span className="grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm"><Users className="size-5" /></span><span className="h-px flex-1 bg-primary-border" /><ArrowRight className="size-4 text-primary" /></div>
          <span className="mt-4 rounded-full bg-accent-soft px-3 py-1.5 font-num text-[10px] font-semibold text-accent">+10 contribution credits</span>
        </div>
        <PersonCard initials="NA" name="Nadia" faculty="FEB" skill="Business Analysis" icon={<Presentation />} />
      </div>
      <p className="absolute bottom-[19%] text-center text-xs text-workspace-muted">One useful exchange. Two stronger profiles.</p>
    </div>
  );
}

function PersonCard({ initials, name, faculty, skill, icon }: { initials: string; name: string; faculty: string; skill: string; icon: ReactNode }) {
  return (
    <div className="w-28 rounded-xl border border-workspace-border bg-workspace-card p-3 text-center shadow-career sm:w-40 sm:p-5">
      <span className="mx-auto grid size-11 place-items-center rounded-full bg-primary-soft font-num text-xs font-bold text-primary">{initials}</span>
      <p className="mt-3 text-xs font-semibold text-workspace-foreground">{name}</p><p className="mt-1 text-[9px] text-workspace-muted">{faculty}</p>
      <div className="mt-4 flex items-center justify-center gap-1.5 border-t border-workspace-border pt-3 text-[9px] font-semibold text-workspace-foreground"><span className="text-primary [&>svg]:size-3">{icon}</span>{skill}</div>
    </div>
  );
}

function PassportVisual() {
  return (
    <div className="absolute inset-0 grid place-items-center px-5 pt-10">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-workspace-border bg-workspace-card shadow-career">
        <div className="flex items-center justify-between border-b border-workspace-border bg-primary-soft/60 px-5 py-3"><p className="text-[10px] font-semibold uppercase text-primary">EXCHANGE Skill Passport</p><BadgeCheck className="size-5 text-primary" /></div>
        <div className="p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3"><span className="grid size-12 place-items-center rounded-xl bg-primary font-num text-sm font-bold text-primary-foreground">RP</span><div><h4 className="text-base font-bold text-workspace-foreground">Raka Pratama</h4><p className="mt-1 text-[10px] text-workspace-muted">FEB UI · Management</p></div></div>
            <div className="text-right"><p className="text-[9px] uppercase text-workspace-muted">Skill Score</p><p className="font-num mt-1 text-3xl font-bold text-primary">842</p></div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3"><PassportMetric value="3" label="Verified skills" /><PassportMetric value="12h" label="Teaching" /><PassportMetric value="18" label="Sessions" /></div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <PassportList title="Verified skills" icon={<BadgeCheck />} items={["Excel Analytics", "Business Case", "Presentation Design"]} />
            <PassportList title="Learning history" icon={<BookOpenCheck />} items={["Python foundations", "Research methods", "Product thinking"]} />
          </div>
          <div className="mt-5 flex items-center gap-3 rounded-xl bg-workspace-soft p-3 text-[10px] text-workspace-muted"><Presentation className="size-4 text-primary" /><span><strong className="text-workspace-foreground">Teaching contribution:</strong> 8 students supported this semester</span></div>
        </div>
      </div>
    </div>
  );
}

function PassportMetric({ value, label }: { value: string; label: string }) {
  return <div className="rounded-xl bg-workspace-soft p-3"><p className="font-num text-lg font-bold text-workspace-foreground">{value}</p><p className="mt-1 text-[8px] uppercase text-workspace-muted">{label}</p></div>;
}

function PassportList({ title, icon, items }: { title: string; icon: ReactNode; items: string[] }) {
  return <div><p className="mb-3 flex items-center gap-2 text-[9px] font-semibold uppercase text-workspace-muted"><span className="text-primary [&>svg]:size-3.5">{icon}</span>{title}</p><div className="space-y-2">{items.map((item) => <p key={item} className="flex items-center gap-2 text-[10px] text-workspace-foreground"><Check className="size-3 text-primary" />{item}</p>)}</div></div>;
}

function OpportunityVisual() {
  return (
    <div className="absolute inset-0 grid place-items-center px-5 pt-10">
      <div className="w-full max-w-lg">
        <div className="mx-auto flex w-[84%] items-center justify-between rounded-xl border border-workspace-border bg-workspace-card p-4 shadow-career"><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-full bg-primary-soft font-num text-[10px] font-bold text-primary">RP</span><div><p className="text-xs font-semibold text-workspace-foreground">Raka Pratama</p><p className="text-[9px] text-workspace-muted">Verified Skill Passport</p></div></div><span className="font-num text-sm font-bold text-primary">842</span></div>
        <div className="mx-auto h-10 w-px bg-primary-border" />
        <div className="rounded-2xl border border-workspace-border bg-workspace-card p-5 shadow-career sm:p-6">
          <div className="flex items-start justify-between gap-4"><div className="flex gap-3"><span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary"><BriefcaseBusiness className="size-4" /></span><div><p className="text-sm font-semibold text-workspace-foreground">Business Analyst Internship</p><p className="mt-1 text-[9px] text-workspace-muted">Priority opportunity · Jakarta</p></div></div><div className="text-right"><p className="font-num text-2xl font-bold text-primary">94%</p><p className="text-[8px] uppercase text-workspace-muted">Match</p></div></div>
          <div className="mt-5 border-t border-workspace-border pt-4"><p className="mb-3 text-[9px] font-semibold uppercase text-workspace-muted">Matched because</p><div className="grid gap-2 sm:grid-cols-3"><MatchReason text="Verified Excel" /><MatchReason text="Business analysis" /><MatchReason text="Teaching reputation" /></div></div>
        </div>
        <div className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-full bg-primary-soft px-3 py-1.5 text-[9px] font-semibold text-primary"><Search className="size-3" /> Opportunity ready to explore</div>
      </div>
    </div>
  );
}

function MatchReason({ text }: { text: string }) {
  return <div className="flex items-center gap-1.5 rounded-lg bg-workspace-soft px-2 py-2 text-[8px] text-workspace-foreground"><Check className="size-2.5 shrink-0 text-primary" />{text}</div>;
}
