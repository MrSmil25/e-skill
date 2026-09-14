import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WorkspacePage({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return <div className="mx-auto max-w-6xl px-4 py-8 sm:px-7 sm:py-10"><p className="text-[11px] font-semibold uppercase text-primary">{eyebrow}</p><div className="mt-2 flex flex-col gap-5 border-b border-workspace-border pb-7 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="font-display text-3xl font-bold sm:text-4xl">{title}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-workspace-muted">{description}</p></div><Button>Take next step <ArrowRight className="size-4" /></Button></div>{children ?? <div className="mt-8 grid gap-4 md:grid-cols-3"><Placeholder title="Your next action" text="Complete one focused task to strengthen your skill identity." /><Placeholder title="Recent activity" text="Verified exchanges and feedback will appear here." /><Placeholder title="Network signal" text="Build trust through consistent learning and teaching." /></div>}</div>;
}

function Placeholder({ title, text }: { title: string; text: string }) { return <div className="rounded-md border border-workspace-border bg-workspace-card p-5"><div className="mb-10 h-1 w-12 rounded-full bg-primary" /><h2 className="font-display text-base font-bold">{title}</h2><p className="mt-2 text-sm leading-6 text-workspace-muted">{text}</p></div>; }