import { RoleGuard } from "@/components/guards/role-guard";

export default function TechnicianRoleLayout({ children }: { children: React.ReactNode }) {
  return <RoleGuard allow={["FIELD_TECHNICIAN"]}>{children}</RoleGuard>;
}