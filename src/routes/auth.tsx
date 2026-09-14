import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowLeft, CheckCircle2, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [
    { title: "Join EXCHANGE — Student Skill Network" },
    { name: "description", content: "Join EXCHANGE to learn, teach, earn credits, and build your verified Skill Passport." },
    { property: "og:title", content: "Join EXCHANGE — Student Skill Network" },
    { property: "og:description", content: "Turn what you know into what you can learn." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ]}),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError(""); setMessage("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    const name = String(form.get("name") ?? "");
    const faculty = String(form.get("faculty") ?? "");
    if (mode === "signin") {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) setError(signInError.message); else await navigate({ to: "/dashboard" });
    } else {
      const { data, error: signUpError } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin + "/auth", data: { display_name: name, faculty } } });
      if (signUpError) setError(signUpError.message);
      else if (!data.session) setMessage("Check your email to confirm your account, then return to sign in.");
      else await navigate({ to: "/dashboard" });
    }
    setLoading(false);
  }

  async function signInWithGoogle() {
    setLoading(true); setError("");
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/auth" });
    if (result.error) { setError(result.error.message); setLoading(false); return; }
    if (!result.redirected) await navigate({ to: "/dashboard" });
  }

  return <main className="grid min-h-screen bg-workspace lg:grid-cols-[1.05fr_.95fr]"><section className="relative hidden overflow-hidden bg-sidebar p-12 text-sidebar-foreground lg:flex lg:flex-col lg:justify-between"><Link to="/" className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-md bg-primary font-display font-bold">E</span><span className="font-display font-bold">EXCHANGE</span></Link><div className="max-w-xl"><p className="text-xs font-semibold uppercase text-primary">Skills become proof</p><h1 className="mt-5 font-display text-5xl font-bold leading-tight">Build the student identity opportunities can trust.</h1><p className="mt-6 max-w-md leading-7 text-sidebar-muted">Learn across faculties, teach what you know, and turn every exchange into verified reputation.</p></div><div className="grid grid-cols-3 gap-4 border-t border-sidebar-border pt-6 text-sm"><span>Learn without upfront cost</span><span>Earn credits by teaching</span><span>Prove every skill</span></div></section><section className="flex items-center justify-center p-5 sm:p-10"><div className="w-full max-w-md"><Link to="/" className="mb-10 inline-flex items-center gap-2 text-sm text-workspace-muted hover:text-workspace-foreground"><ArrowLeft className="size-4" /> Back to EXCHANGE</Link><p className="text-xs font-semibold uppercase text-primary">{mode === "signin" ? "Welcome back" : "Join the pilot"}</p><h2 className="mt-2 font-display text-3xl font-bold">{mode === "signin" ? "Continue your exchange" : "Create your skill identity"}</h2><p className="mt-3 text-sm text-workspace-muted">{mode === "signin" ? "Your Skill Passport is waiting." : "Start with 100 credits and what you already know."}</p><Button variant="outline" className="mt-8 w-full border-workspace-border bg-workspace-card" onClick={signInWithGoogle} disabled={loading}>Continue with Google</Button><div className="my-6 flex items-center gap-3 text-[11px] uppercase text-workspace-muted"><span className="h-px flex-1 bg-workspace-border" />or use university email<span className="h-px flex-1 bg-workspace-border" /></div>{message ? <div className="rounded-md border border-primary/30 bg-primary/5 p-4 text-sm leading-6"><CheckCircle2 className="mb-2 size-5 text-primary" />{message}</div> : <form onSubmit={handleSubmit} className="space-y-4">{mode === "signup" && <><Field label="Full name" name="name" placeholder="Dita Prameswari" /><Field label="Faculty" name="faculty" placeholder="Faculty of Economics and Business" /></>}<Field label="University email" name="email" type="email" placeholder="name@ui.ac.id" /><label className="block text-sm font-medium">Password<div className="relative mt-2"><input required minLength={8} name="password" type={showPassword ? "text" : "password"} placeholder="Minimum 8 characters" className="h-11 w-full rounded-md border border-workspace-border bg-workspace-card px-3 pr-11 text-sm outline-none focus:border-primary" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-workspace-muted" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button></div></label>{error && <p role="alert" className="text-sm text-destructive">{error}</p>}<Button className="w-full" disabled={loading}>{loading && <Loader2 className="size-4 animate-spin" />}{mode === "signin" ? "Sign in" : "Create account"}</Button></form>}<button className="mt-6 text-sm text-workspace-muted" onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setMessage(""); setError(""); }}>{mode === "signin" ? "New to EXCHANGE? Create an account" : "Already have an account? Sign in"}</button></div></section></main>;
}

function Field({ label, ...props }: { label: string; name: string; placeholder: string; type?: string }) { return <label className="block text-sm font-medium">{label}<input required {...props} className="mt-2 h-11 w-full rounded-md border border-workspace-border bg-workspace-card px-3 text-sm outline-none focus:border-primary" /></label>; }