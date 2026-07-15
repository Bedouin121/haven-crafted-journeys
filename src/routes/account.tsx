import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { User, Bookmark, Settings, LogOut } from "lucide-react";
import { ProtectedRoute } from "../components/auth/protected-route";
import { useAuth } from "../lib/auth-context";
import { packages } from "../lib/data";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Your account — Diganta Overseas" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <ProtectedRoute>
      <AccountPage />
    </ProtectedRoute>
  ),
});

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "saved", label: "Saved trips", icon: Bookmark },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

type TabId = (typeof TABS)[number]["id"];

function AccountPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabId>("profile");

  const onLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <div className="container-editorial py-24 pt-32">
      <p className="text-eyebrow">Account</p>
      <h1 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">
        Hello, {user?.name.split(" ")[0]}
      </h1>
      <p className="mt-2 text-muted-foreground">{user?.email}</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside>
          <nav className="flex flex-row gap-2 overflow-x-auto lg:flex-col">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-navy text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {t.label}
                </button>
              );
            })}
            <button
              onClick={onLogout}
              className="mt-4 flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </nav>
        </aside>

        <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-soft">
          {tab === "profile" && <ProfileTab />}
          {tab === "saved" && <SavedTab />}
          {tab === "settings" && <SettingsTab />}
        </div>
      </div>
    </div>
  );
}

function ProfileTab() {
  const { user } = useAuth();
  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl text-foreground">Profile</h2>
      <dl className="grid gap-4 sm:grid-cols-2">
        <Info label="Full name" value={user?.name || ""} />
        <Info label="Email" value={user?.email || ""} />
        <Info label="Role" value={user?.role || "user"} />
        <Info label="Member since" value="March 2024" />
        <Info label="Phone" value="+1 (555) 214-8890" />
        <Info label="Preferred pace" value="Unhurried" />
      </dl>
    </div>
  );
}

function SavedTab() {
  const saved = packages.slice(0, 3);
  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl text-foreground">Saved trips</h2>
      <ul className="divide-y divide-border/60">
        {saved.map((p) => (
          <li key={p.slug} className="flex items-center gap-4 py-4">
            <img src={p.image} alt="" className="h-16 w-24 rounded-xl object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-foreground">{p.title}</p>
              <p className="text-sm text-muted-foreground">
                {p.destination} · {p.nights} nights · from ${p.price.toLocaleString()}
              </p>
            </div>
            <Link
              to="/packages/$slug"
              params={{ slug: p.slug }}
              className="rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary"
            >
              View
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl text-foreground">Settings</h2>
      <div className="space-y-4">
        <Toggle label="Email me itinerary updates" defaultChecked />
        <Toggle label="Occasional newsletter" defaultChecked />
        <Toggle label="Marketing partners" />
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-widest text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-foreground">{value}</dd>
    </div>
  );
}

function Toggle({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  const [on, setOn] = useState(!!defaultChecked);
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-border/60 px-5 py-4 hover:bg-secondary/50">
      <span className="text-foreground">{label}</span>
      <input type="checkbox" checked={on} onChange={(e) => setOn(e.target.checked)} className="sr-only" />
      <span
        aria-hidden
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          on ? "bg-navy" : "bg-border"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
            on ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </span>
    </label>
  );
}
