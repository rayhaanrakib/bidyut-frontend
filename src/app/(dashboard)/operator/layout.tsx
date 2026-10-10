import { RoleGuard } from "@/components/guards/role-guard";

export default function OperatorRoleLayout({ children }: { children: React.ReactNode }) {
  return <RoleGuard allow={["POWER_OPERATOR"]}>{children}</RoleGuard>;
}