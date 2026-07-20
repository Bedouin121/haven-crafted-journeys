import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Users, CalendarCheck, FileText, LayoutDashboard, LogOut, ArrowLeft } from "lucide-react";
import { ProtectedRoute } from "../components/auth/protected-route";
import { useAuth } from "../lib/auth-context";
import { packages, destinations } from "../lib/data";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Diganta Overseas" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <ProtectedRoute requiredRole="admin">
      <AdminPanel />
    </ProtectedRoute>
  ),
});

type Section = "overview" | "users" | "bookings" | "content";

const NAV: { id: Section; label: string; icon: typeof Users }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "bookings", label: "Bookings", icon: CalendarCheck },
  { id: "content", label: "Content", icon: FileText },
];

function AdminPanel() {
  const { user, logout } = useAuth();
  const [section, setSection] = useState<Section>("overview");
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border/60 bg-card p-6 md:flex">
        <div className="mb-8">
          <p className="text-eyebrow">Diganta</p>
          <p className="mt-1 font-display text-xl text-foreground">Admin</p>
        </div>
        <nav className="flex-1 space-y-1">
          {NAV.map((n) => {
            const Icon = n.icon;
            const active = section === n.id;
            return (
              <button
                key={n.id}
                onClick={() => setSection(n.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  active ? "bg-navy text-primary-foreground" : "text-foreground hover:bg-secondary"
                }`}
              >
                <Icon className="h-4 w-4" />
                {n.label}
              </button>
            );
          })}
        </nav>
        <div className="space-y-2 border-t border-border/60 pt-4 text-sm">
          <p className="text-muted-foreground">Signed in as</p>
          <p className="truncate font-medium text-foreground">{user?.email}</p>
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to site
          </Link>
          <button
            onClick={() => {
              logout();
              navigate({ to: "/" });
            }}
            className="flex items-center gap-2 text-muted-foreground hover:text-destructive"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 sm:p-10">
        <div className="mb-8 flex flex-wrap items-center gap-2 md:hidden">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => setSection(n.id)}
              className={`rounded-full px-3 py-1.5 text-xs ${
                section === n.id ? "bg-navy text-primary-foreground" : "border border-border/60 bg-card"
              }`}
            >
              {n.label}
            </button>
          ))}
        </div>

        {section === "overview" && <Overview />}
        {section === "users" && <UsersTable />}
        {section === "bookings" && <BookingsTable />}
        {section === "content" && <ContentTable />}
      </main>
    </div>
  );
}

function Overview() {
  const stats = [
    { label: "Active users", value: "1,284" },
    { label: "Open bookings", value: "47" },
    { label: "Journeys published", value: String(packages.length) },
    { label: "Destinations", value: String(destinations.length) },
  ];
  return (
    <>
      <h1 className="font-display text-3xl text-foreground">Overview</h1>
      <p className="mt-2 text-muted-foreground">A quick pulse of the studio.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border/60 bg-card p-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-3xl text-foreground">{s.value}</p>
          </div>
        ))}
      </div>
    </>
  );
}

const MOCK_USERS = [
  { id: "u_001", name: "Amelia Hart", email: "amelia@example.com", role: "admin", joined: "2024-02-14" },
  { id: "u_002", name: "Rohan Kapoor", email: "rohan@example.com", role: "user", joined: "2024-06-02" },
  { id: "u_003", name: "Lena Fischer", email: "lena@example.com", role: "user", joined: "2025-01-20" },
  { id: "u_004", name: "James Okoro", email: "james@example.com", role: "user", joined: "2025-03-11" },
  { id: "u_005", name: "Yuki Tanaka", email: "yuki@example.com", role: "user", joined: "2025-05-08" },
];

function UsersTable() {
  return (
    <Section title="Users" description="All accounts registered with the studio.">
      <Table
        head={["Name", "Email", "Role", "Joined", ""]}
        rows={MOCK_USERS.map((u) => [
          u.name,
          u.email,
          <Badge key="r" tone={u.role === "admin" ? "gold" : "muted"}>
            {u.role}
          </Badge>,
          u.joined,
          <button key="a" className="text-sm text-navy underline underline-offset-4">
            Edit
          </button>,
        ])}
      />
    </Section>
  );
}

const MOCK_BOOKINGS = [
  { id: "B-1042", user: "Amelia Hart", trip: "Bangkok to the Andaman", start: "2026-08-12", status: "Confirmed", total: "$8,220" },
  { id: "B-1043", user: "Rohan Kapoor", trip: "Peninsular Malaysia Crossings", start: "2026-09-04", status: "Pending", total: "$5,940" },
  { id: "B-1044", user: "Lena Fischer", trip: "Singapore Signature", start: "2026-10-19", status: "Confirmed", total: "$4,110" },
  { id: "B-1045", user: "James Okoro", trip: "Canadian Rockies in Slow Motion", start: "2026-07-22", status: "Cancelled", total: "$7,880" },
];

function BookingsTable() {
  return (
    <Section title="Bookings" description="Live and upcoming departures.">
      <Table
        head={["Ref", "Traveler", "Journey", "Start", "Status", "Total"]}
        rows={MOCK_BOOKINGS.map((b) => [
          <span key="i" className="font-mono text-xs">{b.id}</span>,
          b.user,
          b.trip,
          b.start,
          <Badge
            key="s"
            tone={b.status === "Confirmed" ? "teal" : b.status === "Pending" ? "gold" : "muted"}
          >
            {b.status}
          </Badge>,
          b.total,
        ])}
      />
    </Section>
  );
}

function ContentTable() {
  return (
    <Section title="Content" description="Journeys, destinations, and visa services.">
      <Table
        head={["Type", "Title", "Slug", "Status", ""]}
        rows={packages.slice(0, 6).map((p) => [
          "Journey",
          p.title,
          <span key="s" className="font-mono text-xs">{p.slug}</span>,
          <Badge key="b" tone="teal">Published</Badge>,
          <button key="a" className="text-sm text-navy underline underline-offset-4">Edit</button>,
        ])}
      />
    </Section>
  );
}

function Section({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <>
      <h1 className="font-display text-3xl text-foreground">{title}</h1>
      <p className="mt-2 text-muted-foreground">{description}</p>
      <div className="mt-8 overflow-hidden rounded-2xl border border-border/60 bg-card">{children}</div>
    </>
  );
}

function Table({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-secondary/60 text-xs uppercase tracking-widest text-muted-foreground">
          <tr>
            {head.map((h, i) => (
              <th key={i} className="px-6 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {rows.map((r, i) => (
            <tr key={i} className="hover:bg-secondary/30">
              {r.map((c, j) => (
                <td key={j} className="px-6 py-4 align-middle text-foreground">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Badge({ children, tone }: { children: React.ReactNode; tone: "teal" | "gold" | "muted" }) {
  const map = {
    teal: "bg-[color:var(--teal)]/15 text-[color:var(--teal)]",
    gold: "bg-[color:var(--gold)]/20 text-[color:var(--gold)]",
    muted: "bg-secondary text-muted-foreground",
  } as const;
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${map[tone]}`}>{children}</span>;
}
