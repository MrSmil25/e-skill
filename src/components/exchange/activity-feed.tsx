import { BadgeCheck, GraduationCap, Presentation, Sparkles, UserPlus } from "lucide-react";
import { activityFeed, studentById } from "@/data/exchange";
import { StudentBadge } from "@/components/exchange/skill-card";

const icons = {
  learned: GraduationCap,
  taught: Presentation,
  verified: BadgeCheck,
  joined: UserPlus,
} as const;

export function ActivityFeed({ limit = 8 }: { limit?: number }) {
  return (
    <ol className="divide-y divide-workspace-border">
      {activityFeed.slice(0, limit).map((item, index) => {
        const actor = studentById[item.actorId];
        const peer = item.peerId ? studentById[item.peerId] : undefined;
        const Icon = icons[item.kind];
        if (!actor) return null;
        return (
          <li
            key={item.id}
            className="animate-exchange-rise flex gap-4 py-4"
            style={{ animationDelay: `${index * 45}ms` }}
          >
            <StudentBadge initials={actor.photo} />
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-6">
                <span className="font-semibold">{actor.name}</span>{" "}
                <span className="text-workspace-muted">({actor.faculty})</span> {item.detail}
                {peer && (
                  <>
                    {" with "}
                    <span className="font-semibold">{peer.name}</span>{" "}
                    <span className="text-workspace-muted">({peer.faculty})</span>
                  </>
                )}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-primary-strong">
                <Icon className="size-3.5" /> {item.outcome}
              </p>
            </div>
            <span className="shrink-0 text-xs text-workspace-muted">{item.when}</span>
          </li>
        );
      })}
      {activityFeed.length === 0 && (
        <li className="flex items-center gap-3 py-6 text-sm text-workspace-muted">
          <Sparkles className="size-4 text-primary" /> The campus feed lights up as soon as the first
          exchange happens today.
        </li>
      )}
    </ol>
  );
}
