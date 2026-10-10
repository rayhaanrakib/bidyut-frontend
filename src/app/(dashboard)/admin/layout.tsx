import { RoleGuard } from "@/components/guards/role-guard";

export default function AdminRoleLayout({ children }: { children: React.ReactNode }) {
  return <RoleGuard allow={["ADMIN"]}>{children}</RoleGuard>;
}