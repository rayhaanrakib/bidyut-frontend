"use client";

import type { ReactNode } from "react";
import { useAuth } from "@/lib/auth";
import type { Role } from "@/types";
import { AccessDenied } from "./access-denied";

export const RoleGuard = ({ allow, children }: { allow: Role[]; children: ReactNode }) => {
  const { user } = useAuth();
  if (!user) return null; 
  if (!allow.includes(user.role)) return <AccessDenied role={user.role} needed={allow} />;
  return <>{children}</>;
};