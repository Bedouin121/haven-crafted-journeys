import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useAuth } from "../lib/auth-context";

const searchSchema = z.object({ redirect: z.string().optional() });

export const Route = createFileRoute("/login")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Sign in — Diganta Overseas" },
      { name: "description", content: "Sign in to your Diganta Overseas account." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

const schema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(8, "At least 8 characters"),
});

function LoginPage() {
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();
  const { login } = useAuth();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [asAdmin, setAsAdmin] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const fe: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (fe[i.path[0] as string] = i.message));
      setErrors(fe);
      return;
    }
    setErrors({});
    setSubmitting(true);
    await login(values.email, values.password, { asAdmin });
    setSubmitting(false);
    navigate({ to: redirect || "/account" });
  };

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to continue planning your journey.">
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <Field
          label="Email"
          type="email"
          value={values.email}
          onChange={(v) => setValues((s) => ({ ...s, email: v }))}
          error={errors.email}
          autoComplete="email"
        />
        <Field
          label="Password"
          type="password"
          value={values.password}
          onChange={(v) => setValues((s) => ({ ...s, password: v }))}
          error={errors.password}
          autoComplete="current-password"
        />

        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={asAdmin}
            onChange={(e) => setAsAdmin(e.target.checked)}
            className="h-4 w-4 accent-[color:var(--navy)]"
          />
          Sign in as admin (mock)
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-navy py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-navy-soft disabled:opacity-60"
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>

        <div className="pt-6 mt-2 border-t border-border/60 text-center">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">New here</p>
          <p className="mt-2 font-display text-lg text-foreground">
            No account yet?{" "}
            <Link
              to="/signup"
              className="relative italic text-navy transition-colors hover:text-teal"
            >
              <span className="border-b border-[color:var(--gold)]/70 pb-0.5">Create one</span>
            </Link>
          </p>
        </div>
      </form>
    </AuthShell>
  );
}

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container-editorial flex min-h-screen items-center justify-center py-16">
        <div className="w-full max-w-md">
          <Link to="/" className="text-eyebrow text-muted-foreground">
            ← Back home
          </Link>
          <h1 className="mt-4 font-display text-4xl text-foreground">{title}</h1>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
          <div className="mt-10 rounded-3xl border border-border/60 bg-card p-8 shadow-soft">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Field({
  label,
  type = "text",
  value,
  onChange,
  error,
  autoComplete,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        className={`w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-[color:var(--teal)] ${
          error ? "border-destructive" : "border-border"
        }`}
      />
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}
