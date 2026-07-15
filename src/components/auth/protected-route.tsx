import { Navigate, useRouterState } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { useAuth, type MockRole } from "../../lib/auth-context";

/**
 * Wrap any element that must only render for signed-in users.
 * Pass `requiredRole="admin"` to gate to admins specifically.
 * Redirects unauthenticated users to /login with the current path
 * as a `redirect` search param so login can bounce back.
 */
export function ProtectedRoute({
  children,
  requiredRole,
}: {
  children: ReactNode;
  requiredRole?: MockRole;
}) {
  const { isLoggedIn, role } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (!isLoggedIn) {
    return <Navigate to="/login" search={{ redirect: pathname }} replace />;
  }
  if (requiredRole && role !== requiredRole) {
    return (
      <div className="container-editorial py-32 text-center">
        <p className="text-eyebrow">403</p>
        <h1 className="mt-3 font-display text-4xl text-foreground">Restricted area</h1>
        <p className="mt-4 text-muted-foreground">
          You need {requiredRole} privileges to view this page.
        </p>
      </div>
    );
  }
  return <>{children}</>;
}
