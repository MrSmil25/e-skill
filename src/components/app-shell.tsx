import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  BadgeCheck,
  BookOpen,
  CalendarDays,
  CircleUserRound,
  Sparkles,
  Compass,
  Gift,
  LayoutDashboard,
  LogOut,
  Menu,
  Presentation,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";
import studentsImage from "@/assets/exchange-students.jpg";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { currentStudent } from "@/data/exchange";
import { StudentBadge } from "@/components/exchange/skill-card";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Explore Skills", to: "/explore", icon: Compass },
  { label: "My Sessions", to: "/sessions", icon: CalendarDays },
  { label: "Teach", to: "/teach", icon: Presentation },
  { label: "Skill Passport", to: "/passport", icon: BadgeCheck },
  { label: "Contribution", to: "/wallet", icon: Sparkles },
  { label: "Referral", to: "/referral", icon: Gift },
  { label: "Profile", to: "/profile", icon: CircleUserRound },
] as const;

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    await navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-screen bg-workspace text-workspace-foreground">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-workspace-border bg-sidebar lg:flex">
        <SidebarContent pathname={pathname} onNavigate={() => undefined} onSignOut={signOut} />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-overlay" onClick={() => setMobileOpen(false)} aria-label="Close navigation" />
          <aside className="relative flex h-full w-[min(82vw,320px)] flex-col border-r border-workspace-border bg-sidebar shadow-xl">
            <SidebarContent pathname={pathname} onNavigate={() => setMobileOpen(false)} onSignOut={signOut} />
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-workspace-border bg-workspace/92 px-4 backdrop-blur-xl sm:px-7">
          <Button variant="workspaceGhost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu className="size-5" /></Button>
          <div className="relative hidden max-w-md flex-1 sm:block"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-workspace-muted" /><input aria-label="Search skills and students" placeholder="Search skills and students" className="h-9 w-full rounded-md border border-workspace-border bg-workspace-card pl-9 pr-3 text-sm outline-none placeholder:text-workspace-muted focus:border-primary" /></div>
          <HeaderIdentity />
        </header>
        <main><Outlet /></main>
      </div>
    </div>
  );
}

function SidebarContent({ pathname, onNavigate, onSignOut }: { pathname: string; onNavigate: () => void; onSignOut: () => void }) {
  return <><div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-5"><span className="grid size-8 place-items-center rounded-md bg-primary font-display font-bold text-primary-foreground">E</span><div><p className="font-display text-sm font-bold text-sidebar-foreground">EXCHANGE</p><p className="text-[10px] text-sidebar-muted">Student workspace</p></div><Button variant="workspaceGhost" size="icon" className="ml-auto lg:hidden" onClick={onNavigate} aria-label="Close navigation"><X className="size-4" /></Button></div><nav className="flex-1 overflow-y-auto px-3 py-5" aria-label="Student workspace"><p className="mb-2 px-3 text-[10px] font-semibold uppercase text-sidebar-muted">Workspace</p><div className="space-y-1">{navigation.map((item) => { const Icon = item.icon; const active = pathname === item.to; return <Link key={item.to} to={item.to} onClick={onNavigate} className={cn("flex h-10 items-center gap-3 rounded-md px-3 text-sm transition-colors", active ? "bg-sidebar-active text-sidebar-foreground" : "text-sidebar-muted hover:bg-sidebar-hover hover:text-sidebar-foreground")}><Icon className={cn("size-4", active && "text-primary")} />{item.label}{item.label === "My Sessions" && <span className="ml-auto rounded-full bg-accent px-2 py-0.5 font-num text-[10px] font-semibold text-accent-foreground">2</span>}</Link>; })}</div></nav><div className="border-t border-sidebar-border p-3"><div className="mb-3 rounded-md bg-sidebar-panel p-3"><div className="flex items-center justify-between"><span className="text-[11px] text-sidebar-muted">Skill identity</span><span className="font-num text-xs font-semibold text-sidebar-foreground">78%</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sidebar-border"><div className="h-full w-[78%] bg-primary" /></div><p className="mt-2 text-[10px] leading-4 text-sidebar-muted">Two verified sessions to Campus Mentor</p></div><Button variant="workspaceGhost" className="w-full justify-start text-sidebar-muted" onClick={onSignOut}><LogOut className="size-4" /> Sign out</Button></div></>;
}

function HeaderIdentity() {
  const me = currentStudent;
  return <div className="ml-auto flex items-center gap-3"><div className="hidden text-right sm:block"><p className="text-xs font-semibold">{me.name}</p><p className="text-[11px] text-workspace-muted">{me.faculty} · {me.level}</p></div><StudentBadge initials={currentStudent.photo} className="size-9" /></div>;
}

export function StudentAvatar({ className }: { className?: string }) {
  return <div className={cn("relative shrink-0 overflow-hidden rounded-md bg-secondary", className)}><img src={studentsImage} alt="Dita Prameswari" width={1024} height={1024} className="absolute bottom-0 left-0 size-[200%] max-w-none object-cover object-left-bottom" /></div>;
}