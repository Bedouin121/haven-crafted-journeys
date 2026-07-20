import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useAuth } from "../lib/auth-context";
import { AuthShell, Field } from "./login";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create account — Diganta Overseas" },
      { name: "description", content: "Create your Diganta Overseas account." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SignupPage,
});

const schema = z
  .object({
    name: z.string().trim().min(2, "Please enter your name").max(80),
    email: z.string().trim().email("Enter a valid email"),
    password: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/[A-Z]/, "Add an uppercase letter")
      .regex(/[a-z]/, "Add a lowercase letter")
      .regex(/[0-9]/, "Add a number"),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [values, setValues] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const set = (k: keyof typeof values) => (v: string) => setValues((s) => ({ ...s, [k]: v }));

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
    await signup(values.name, values.email, values.password);
    setSubmitting(false);
    navigate({ to: "/account" });
  };

  return (
    <AuthShell title="Create your account" subtitle="Save trips, track bookings, and plan quietly.">
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <Field label="Full name" value={values.name} onChange={set("name")} error={errors.name} autoComplete="name" />
        <Field label="Email" type="email" value={values.email} onChange={set("email")} error={errors.email} autoComplete="email" />
        <Field label="Password" type="password" value={values.password} onChange={set("password")} error={errors.password} autoComplete="new-password" />
        <Field label="Confirm password" type="password" value={values.confirm} onChange={set("confirm")} error={errors.confirm} autoComplete="new-password" />
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-navy py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-navy-soft disabled:opacity-60"
        >
          {submitting ? "Creating…" : "Create account"}
        </button>
        <div className="pt-6 mt-2 border-t border-border/60 text-center">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Returning traveler</p>
          <p className="mt-2 font-display text-lg text-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="relative italic text-navy transition-colors hover:text-teal"
            >
              <span className="border-b border-[color:var(--gold)]/70 pb-0.5">Sign in</span>
            </Link>
          </p>
        </div>
      </form>
    </AuthShell>
  );
}
