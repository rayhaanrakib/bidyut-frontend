"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { useCreateStaff, useDebounce, useDeleteUser, useSetUserRole, useSetUserStatus, useUsers } from "@/hooks";
import { staffSchema } from "@/validation";
import { Badge, statusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label, Select } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Skeleton } from "@/components/ui/misc";
import type { User } from "@/types";

const CREATABLE: Record<string, string[]> = {
  ADMIN: ["POWER_OPERATOR", "FIELD_TECHNICIAN", "ADMIN"],
  POWER_OPERATOR: ["FIELD_TECHNICIAN"],
};

const EMPTY_STAFF = { name: "", email: "", password: "", role: "" };

type StaffValues = z.infer<typeof staffSchema>;

const UsersView = () => {
  const { user } = useAuth();
  const { t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const isAdmin = user?.role === "ADMIN";
  const isOperator = user?.role === "POWER_OPERATOR";
  const creatable = CREATABLE[user?.role ?? ""] ?? [];

  const page = Number(params.get("page") ?? "1");
  const urlSearch = params.get("search") ?? "";
  const [searchInput, setSearchInput] = useState(urlSearch);
  const search = useDebounce(searchInput);

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value); else next.delete(key);
    if (key !== "page") next.delete("page");
    router.replace(`${pathname}?${next.toString()}`);
  };

  useEffect(() => {
    if (search !== urlSearch) setParam("search", search);
  }, [search]);

  const [deleting, setDeleting] = useState<User | null>(null);
  const [staffOpen, setStaffOpen] = useState(false);

  const {
    register: staffField,
    handleSubmit: staffSubmit,
    reset: resetStaff,
    formState: { errors: staffErrors },
  } = useForm<StaffValues>({
    resolver: zodResolver(staffSchema),
    defaultValues: { ...EMPTY_STAFF, role: creatable[0] ?? "" },
  });

  const { data, isLoading } = useUsers({ search: urlSearch || undefined, page });
  const setRole = useSetUserRole();
  const setStatus = useSetUserStatus();
  const remove = useDeleteUser();
  const createStaff = useCreateStaff();

  const guard = (fn: () => void) => {
    try { fn(); } catch (err) { toast.error(err instanceof Error ? err.message : "Failed"); }
  };

  const submitStaff = staffSubmit(async (values) => {
    try {
      const res = await createStaff.mutateAsync(values);
      toast.success(`${res.data.role} account created`, {
        description: "Share the password securely — they set their own via Forgot password.",
      });
      setStaffOpen(false);
      resetStaff({ ...EMPTY_STAFF, role: creatable[0] ?? "" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not create the account");
    }
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">{t("dash.users")}</h1>
        <div className="flex flex-wrap items-center gap-2">
          <Input
            value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
            placeholder={t("c.search")} className="w-64" aria-label={t("c.search")}
          />
          {creatable.length > 0 && (
            <Button size="sm" onClick={() => setStaffOpen(true)}>
              <UserPlus className="h-4 w-4" /> Staff account
            </Button>
          )}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wider text-muted">
              <th className="px-5 py-3.5">{t("th.name")}</th>
              <th className="px-5 py-3.5">{t("th.role")}</th>
              <th className="px-5 py-3.5">{t("th.status")}</th>
              <th className="px-5 py-3.5">{t("th.date")}</th>
              <th className="px-5 py-3.5">{t("th.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr><td colSpan={5} className="px-5 py-8"><Skeleton className="h-20 w-full" /></td></tr>
            )}
            {data?.data?.map((u) => (
              <tr key={u.id} className="border-b border-line/60 last:border-0 hover:bg-surface/50">
                <td className="px-5 py-3.5">
                  <p className="font-semibold text-foreground">{u.name}</p>
                  <p className="text-xs text-muted">{u.email}</p>
                </td>
                <td className="px-5 py-3.5">
                  {isAdmin ? (
                    <Select
                      value={u.role} className="w-44 py-1.5 text-xs"
                      onChange={(e) => guard(() => setRole.mutate({ id: u.id, role: e.target.value }))}
                      aria-label={t("th.role")}
                    >
                      {["CUSTOMER", "FIELD_TECHNICIAN", "POWER_OPERATOR", "ADMIN"].map((r) => <option key={r} value={r}>{r}</option>)}
                    </Select>
                  ) : (
                    <Badge tone="neutral">{u.role}</Badge>
                  )}
                </td>
                <td className="px-5 py-3.5"><Badge tone={statusTone(u.status)}>{u.status}</Badge></td>
                <td className="px-5 py-3.5 text-muted">{format(new Date(u.createdAt), "d MMM yyyy")}</td>
                <td className="px-5 py-3.5">
                  {isAdmin && (
                    <div className="flex gap-2">
                      <Button
                        size="sm" variant="outline"
                        onClick={() => guard(() => setStatus.mutate({ id: u.id, status: u.status === "ACTIVE" ? "BLOCKED" : "ACTIVE" }))}
                      >
                        {u.status === "ACTIVE" ? "Block" : "Unblock"}
                      </Button>
                      <Button size="sm" variant="ghost" className="text-danger" onClick={() => setDeleting(u)}>{t("c.delete")}</Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data?.meta && data.meta.totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3 text-sm">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setParam("page", String(page - 1))}>←</Button>
          <span className="text-muted">{page} / {data.meta.totalPages}</span>
          <Button variant="outline" size="sm" disabled={page >= data.meta.totalPages} onClick={() => setParam("page", String(page + 1))}>→</Button>
        </div>
      )}

      <Modal open={staffOpen} onClose={() => setStaffOpen(false)} title="Create a staff account">
        <form onSubmit={submitStaff} noValidate className="space-y-3">
          <p className="text-xs text-muted">
            Staff accounts skip the OTP flow — they are created pre-verified. Share the password
            securely; the welcome email tells them to set their own via Forgot password.
          </p>
          <div className="space-y-1.5">
            <Label htmlFor="staffName">Full name</Label>
            <Input id="staffName" placeholder="Karim Uddin" aria-invalid={!!staffErrors.name} {...staffField("name")} />
            <FieldError message={staffErrors.name?.message} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="staffEmail">Email</Label>
            <Input id="staffEmail" type="email" placeholder="karim@bidyut.demo" aria-invalid={!!staffErrors.email} {...staffField("email")} />
            <FieldError message={staffErrors.email?.message} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="staffPassword">Temporary password</Label>
            <Input id="staffPassword" placeholder="At least 8 characters" aria-invalid={!!staffErrors.password} {...staffField("password")} />
            <FieldError message={staffErrors.password?.message} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="staffRole">Role</Label>
            <Select id="staffRole" {...staffField("role")}>
              {creatable.map((r) => <option key={r} value={r}>{r}</option>)}
            </Select>
            <FieldError message={staffErrors.role?.message} />
            {isOperator && <p className="text-[11px] text-muted">Operators create technicians — the admin chain manages its own accounts.</p>}
          </div>
          <Button type="submit" className="w-full" loading={createStaff.isPending}>
            Create account
          </Button>
        </form>
      </Modal>

      <Modal open={Boolean(deleting)} onClose={() => setDeleting(null)} title={t("c.confirm")}>
        <p className="text-sm text-muted">
          Soft-delete <span className="font-semibold text-foreground">{deleting?.name}</span>? They will be logged out immediately; their history stays in the database.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" size="sm" onClick={() => setDeleting(null)}>{t("c.cancel")}</Button>
          <Button
            variant="danger" size="sm"
            onClick={async () => {
              if (!deleting) return;
              try { await remove.mutateAsync(deleting.id); toast.success("User deleted (soft)"); }
              catch (err) { toast.error(err instanceof Error ? err.message : "Failed"); }
              finally { setDeleting(null); }
            }}
          >
            {t("c.delete")}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default UsersView;