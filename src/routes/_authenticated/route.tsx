import { createFileRoute, Outlet } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

/**
 * Prototype phase: the workspace runs on the mock student ecosystem, so it stays
 * browsable without a real session. When a session exists we still pass the user
 * through, so wiring real auth later is a one-line change.
 */
export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    try {
      const { data } = await supabase.auth.getUser();
      return { user: data.user ?? null };
    } catch {
      return { user: null };
    }
  },
  component: () => <Outlet />,
});
