import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Menu,
  Network,
  Presentation,
  Search,
  Share2,
  Sparkles,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ScrollSkillUniverse } from "@/components/exchange/scroll-skill-universe";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EXCHANGE — Build Your Skill Reputation" },
      {
        name: "description",
        content: "Exchange knowledge across campus, build verified skills, and create a professional identity backed by real contribution.",
      },
      { property: "og:title", content: "EXCHANGE — Build Your Skill Reputation" },
      { property: "og:description", content: "A living skill network where university students learn, contribute, and build trusted career evidence." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

const navItems = [
  { label: "Skill Universe", href: "#universe" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Skill Passport", href: "#passport" },
  { label: "Network", href: "#network" },
];

const skillNodes = [
  { label: "Business", className: "left-[3%] top-[20%]" },
  { label: "Technology", className: "right-[1%] top-[19%]" },
  { label: "Design", className: "left-[2%] bottom-[19%]" },
  { label: "Communication", className: "right-[-5%] bottom-[19%]" },
  { label: "Research", className: "left-1/2 top-[2%] -translate-x-1/2" },
];

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground antialiased">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-workspace-border bg-workspace-card/90 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center px-5 sm:px-8 lg:px-10">
          <a href="#top" className="flex items-center gap-3" aria-label="EXCHANGE home">
            <BrandMark />
            <span className="font-display text-base font-bold">EXCHANGE</span>
          </a>
          <nav className="ml-auto hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{item.label}</a>
            ))}
          </nav>
          <Button asChild size="sm" className="ml-8 hidden rounded-full lg:inline-flex">
            <Link to="/auth">Enter EXCHANGE <ArrowRight className="size-4" /></Link>
          </Button>
          <Button variant="ghost" size="icon" className="ml-auto lg:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
        {menuOpen && (
          <nav className="border-t border-workspace-border bg-workspace-card/95 px-5 py-4 backdrop-blur-xl lg:hidden" aria-label="Mobile navigation">
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {navItems.map((item) => <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-3 text-sm text-muted-foreground hover:bg-workspace-soft hover:text-foreground">{item.label}</a>)}
              <Button asChild className="mt-3 rounded-full"><Link to="/auth">Enter EXCHANGE</Link></Button>
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        <section id="universe" className="bright-hero relative min-h-[820px] overflow-hidden border-b border-workspace-border pt-18">
          <div className="bright-grid absolute inset-0 opacity-60" />
          <div className="mx-auto grid min-h-[calc(860px-4.5rem)] max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
            <div className="relative z-10 animate-exchange-rise">
              <p className="mb-7 flex items-center gap-3 text-[11px] font-semibold uppercase text-signal">
                <span className="size-1.5 rounded-full bg-signal shadow-signal" /> Living Skill Universe · UI Pilot
              </p>
              <h1 className="max-w-3xl font-display text-5xl font-bold leading-[0.96] sm:text-6xl lg:text-7xl">
                Your Skills.<br />Your Reputation.<br /><span className="text-primary">Your Future.</span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                Belajar dari mahasiswa lain, ajarkan skill yang kamu kuasai, dan bangun reputasi yang bisa dipercaya dunia kerja.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-full shadow-sm"><Link to="/auth">Start Learning <ArrowRight className="size-4" /></Link></Button>
                <Button asChild variant="outline" size="lg" className="rounded-full border-workspace-border bg-workspace-card"><Link to="/auth">Share Your Skill <Search className="size-4" /></Link></Button>
              </div>
              <div className="mt-12 grid max-w-xl grid-cols-3 border-y border-workspace-border py-5">
                <HeroStat value="30+" label="Student identities" />
                <HeroStat value="15" label="Active skills" />
                <HeroStat value="156" label="Verified exchanges" />
              </div>
            </div>

            <SkillUniverse />
          </div>
          <div className="relative mx-auto -mt-12 grid max-w-5xl gap-px overflow-hidden rounded-t-2xl border border-b-0 border-workspace-border bg-workspace-border shadow-career sm:grid-cols-3">
            <Signal icon={<BadgeCheck />} label="Verified evidence" value="Peer-backed" />
            <Signal icon={<Network />} label="Cross-faculty" value="10 faculties" />
            <Signal icon={<Sparkles />} label="Skill reputation" value="Always evolving" />
          </div>
        </section>

        <ScrollSkillUniverse />

        <section id="passport" className="scroll-mt-18 border-b border-workspace-border bg-workspace-card py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
            <div>
              <p className="text-[11px] font-semibold uppercase text-signal">Skill Passport</p>
              <h2 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl">Your ability, made visible.</h2>
              <p className="mt-6 max-w-lg text-base leading-8 text-muted-foreground">Identitas profesional yang hidup, dibangun dari apa yang kamu pelajari, apa yang kamu bagikan, dan orang-orang yang bisa memverifikasinya.</p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <PassportPoint icon={<BadgeCheck />} text="Verified skills" />
                <PassportPoint icon={<Presentation />} text="Teaching contribution" />
                <PassportPoint icon={<BookOpenCheck />} text="Learning history" />
                <PassportPoint icon={<Share2 />} text="Shareable evidence" />
              </div>
            </div>
            <IdentityPassport />
          </div>
        </section>

        <section id="network" className="scroll-mt-18 bg-workspace py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 text-center sm:px-8 lg:px-10">
            <p className="text-[11px] font-semibold uppercase text-signal">Across campus</p>
            <h2 className="mx-auto mt-5 max-w-4xl font-display text-4xl font-bold leading-tight sm:text-6xl">What you know can unlock what someone else needs.</h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground">Jaringan mahasiswa terkuat tidak dibangun dari jumlah pengikut, tetapi dari pertukaran pengetahuan yang benar-benar bermanfaat.</p>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {["FEB", "Fasilkom", "FIB", "Psikologi", "FISIP", "FH", "FT", "FMIPA", "FK", "Vokasi"].map((faculty) => <span key={faculty} className="rounded-full border border-workspace-border bg-workspace-card px-4 py-2 text-xs text-workspace-muted shadow-sm">{faculty}</span>)}
            </div>
            <Button asChild size="lg" className="mt-12 rounded-full"><Link to="/auth">Create your skill identity <ArrowRight className="size-4" /></Link></Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-workspace-border bg-workspace-card py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <div className="flex items-center gap-3 text-foreground"><BrandMark /><span className="font-display font-bold">EXCHANGE</span></div>
          <p>Knowledge belongs in motion.</p><p>Universitas Indonesia pilot</p>
        </div>
      </footer>
    </div>
  );
}

function BrandMark() { return <span className="grid size-9 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">E</span>; }

function SkillUniverse() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[590px] animate-exchange-rise">
      <div className="absolute inset-[10%] rounded-[2rem] border border-workspace-border bg-workspace-card shadow-career">
        <div className="absolute inset-x-5 top-5 flex items-center justify-between border-b border-workspace-border pb-4"><div><p className="text-[10px] font-semibold uppercase text-primary">Student skill network</p><p className="mt-1 text-xs text-workspace-muted">Across Universitas Indonesia</p></div><Network className="size-5 text-primary" /></div>
        <svg aria-hidden className="absolute inset-[12%] size-[76%] text-primary-border" viewBox="0 0 100 100"><path d="M50 50 L15 27 M50 50 L85 26 M50 50 L17 76 M50 50 L84 75 M50 50 L50 12" fill="none" stroke="currentColor" strokeWidth="1" /></svg>
        <div className="absolute left-1/2 top-1/2 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-primary text-center text-primary-foreground shadow-sm"><div><BadgeCheck className="mx-auto size-6" /><p className="mt-2 text-xs font-bold">Your profile</p><p className="mt-1 text-[8px] opacity-80">Verified identity</p></div></div>
        {skillNodes.map((node) => <div key={node.label} className={`absolute ${node.className}`}><span className="flex items-center gap-2 rounded-xl border border-workspace-border bg-workspace-card px-3 py-2 text-[11px] font-semibold text-workspace-foreground shadow-career"><span className="size-1.5 rounded-full bg-primary" />{node.label}</span></div>)}
      </div>
      <div className="absolute bottom-[1%] left-1/2 w-[72%] -translate-x-1/2 rounded-xl border border-workspace-border bg-workspace-card p-4 shadow-career">
        <div className="flex items-center justify-between gap-4"><div><p className="text-[10px] uppercase text-workspace-muted">Profile progress</p><p className="mt-1 text-sm font-semibold text-workspace-foreground">Your identity grows with each exchange</p></div><span className="font-num text-2xl font-bold text-primary">+12</span></div>
      </div>
    </div>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) { return <div className="border-r border-workspace-border px-3 first:pl-0 last:border-r-0"><p className="font-num text-xl font-bold text-workspace-foreground">{value}</p><p className="mt-1 text-[10px] uppercase text-workspace-muted">{label}</p></div>; }
function Signal({ icon, label, value }: { icon: ReactNode; label: string; value: string }) { return <div className="flex items-center gap-3 bg-workspace-card px-5 py-4"><span className="text-primary [&>svg]:size-4">{icon}</span><div><p className="text-[10px] uppercase text-workspace-muted">{label}</p><p className="mt-1 text-sm font-semibold text-workspace-foreground">{value}</p></div></div>; }
function PassportPoint({ icon, text }: { icon: ReactNode; text: string }) { return <div className="flex items-center gap-3 text-sm text-workspace-foreground"><span className="grid size-9 place-items-center rounded-lg bg-primary-soft text-primary [&>svg]:size-4">{icon}</span>{text}</div>; }
function IdentityPassport() { return <div className="relative mx-auto w-full max-w-2xl"><div className="relative overflow-hidden rounded-2xl border border-workspace-border bg-workspace-card p-6 shadow-career sm:p-8"><div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between"><div className="flex items-center gap-4"><span className="grid size-14 place-items-center rounded-xl bg-primary font-num text-lg font-bold text-primary-foreground">RM</span><div><p className="flex items-center gap-2 text-xl font-bold text-workspace-foreground">Raka Mahendra <BadgeCheck className="size-4 text-primary" /></p><p className="mt-1 text-xs text-workspace-muted">FEB · Management · Year 3</p></div></div><div className="text-left sm:text-right"><p className="text-[10px] uppercase text-workspace-muted">Skill Score</p><p className="font-num text-4xl font-bold text-primary">780</p></div></div><div className="mt-8 grid grid-cols-3 gap-3"><PassportMetric value="4" label="Verified skills" /><PassportMetric value="15" label="Students helped" /><PassportMetric value="31" label="Exchanges" /></div><div className="mt-7"><div className="flex items-center justify-between"><p className="text-[10px] font-semibold uppercase text-workspace-muted">Professional evidence</p><span className="text-[10px] font-semibold text-primary">IDENTITY VERIFIED</span></div><div className="mt-4 space-y-3"><PassportSkill label="Excel Analytics" value="92" /><PassportSkill label="Business Case Framework" value="84" /><PassportSkill label="Public Speaking" value="76" /></div></div></div></div>; }
function PassportMetric({ value, label }: { value: string; label: string }) { return <div className="rounded-xl bg-workspace-soft p-4 text-center"><p className="font-num text-lg font-bold text-workspace-foreground">{value}</p><p className="mt-1 text-[9px] uppercase text-workspace-muted">{label}</p></div>; }
function PassportSkill({ label, value }: { label: string; value: string }) { return <div><div className="mb-2 flex justify-between text-xs text-workspace-foreground"><span>{label}</span><span className="font-num text-primary">{value}/100</span></div><div className="h-1.5 overflow-hidden rounded-full bg-workspace-soft"><div className="h-full rounded-full bg-primary animate-passport-fill" style={{ width: `${value}%` }} /></div></div>; }
