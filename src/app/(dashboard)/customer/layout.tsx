import { RoleGuard } from "@/components/guards/role-guard";

export default function CustomerRoleLayout({ children }: { children: React.ReactNode }) {
  return <RoleGuard allow={["CUSTOMER"]}>{children}</RoleGuard>;
}