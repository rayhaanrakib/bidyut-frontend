import { AuthGuard } from "@/components/guards/auth-guard";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <AuthGuard>
    <DashboardShell>{children}</DashboardShell>
  </AuthGuard>
);

export default DashboardLayout;