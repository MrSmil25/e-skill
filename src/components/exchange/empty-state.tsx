import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionTo,
  className,
}: {
  icon?: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionTo?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-lg border border-dashed border-workspace-border bg-workspace-card px-8 py-12 text-center",
        className
      )}
    >
      {icon && (
        <div className="mb-4 grid size-11 place-items-center rounded-lg bg-primary-soft text-primary-strong">{icon}</div>
      )}
      <p className="font-display text-lg font-bold">{title}</p>
      <p className="mt-2 max-w-md text-sm leading-6 text-workspace-muted">{description}</p>
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="mt-6 flex h-10 items-center gap-1.5 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-strong"
        >
          {actionLabel} <ArrowRight className="size-4" />
        </Link>
      )}
    </div>
  );
}
