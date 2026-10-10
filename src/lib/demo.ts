export const DEMO_PASSWORD = "demo@1234";

export const DEMO_ROLES = ["CUSTOMER", "FIELD_TECHNICIAN", "POWER_OPERATOR", "ADMIN"] as const;

export type DemoRole = (typeof DEMO_ROLES)[number];

export const DEMO_EMAILS: Record<DemoRole, string> = {
  CUSTOMER: "customer@bidyut.demo",
  FIELD_TECHNICIAN: "technician@bidyut.demo",
  POWER_OPERATOR: "operator@bidyut.demo",
  ADMIN: "admin@bidyut.demo",
};

export const DEMO_PASSWORDS: Partial<Record<DemoRole, string>> = {
  CUSTOMER: "Customer@12345",
  FIELD_TECHNICIAN: "Technician@12345",
  POWER_OPERATOR: "Operator@12345",
  ADMIN: "Admin@12345",
};

export const demoCredentials = (role: DemoRole) => ({
  email: DEMO_EMAILS[role],
  password: DEMO_PASSWORDS[role] ?? DEMO_PASSWORD,
});