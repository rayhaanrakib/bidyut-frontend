"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { useCreateFeeder, useDeleteFeeder, useFeederList, useSubstationList, useUpdateFeeder } from "@/hooks";
import { useI18n } from "@/lib/i18n";
import { feederSchema } from "@/validation";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { FieldError, Input, Select } from "@/components/ui/input";
import { TableSkeleton } from "@/components/ui/skeletons";

type FeederValues = z.infer<typeof feederSchema>;

const FeedersView = () => {
  const { t } = useI18n();
  const [substationFilter, setSubstationFilter] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const parents = useSubstationList({ limit: 100 });
  const parentMap = Object.fromEntries((parents.data?.data ?? []).map((s) => [s.id, s.name]));
  const { data, isLoading } = useFeederList({ substationId: substationFilter || undefined, search: search || undefined, page, limit: 10 });
  const rows = data?.data ?? [];
  const meta = data?.meta;

  const form = useForm<FeederValues>({
    resolver: zodResolver(feederSchema),
    defaultValues: { name: "", substationId: "", capacityMW: "" },
  });

  const create = useCreateFeeder();
  const update = useUpdateFeeder();
  const remove = useDeleteFeeder();

  const cancelEdit = () => {
    setEditingId(null);
    form.reset({ name: "", substationId: "", capacityMW: "" });
  };

  const submit = form.handleSubmit(async (values) => {
    const capacity = values.capacityMW ? Number(values.capacityMW) : undefined;
    try {
      if (editingId) {
        await update.mutateAsync({ id: editingId, name: values.name, capacityMW: capacity });
        toast.success(t("grid.updated"));
      } else {
        await create.mutateAsync({ name: values.name, substationId: values.substationId, capacityMW: capacity });
        toast.success(t("grid.created"));
      }
      cancelEdit();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("toast.failed"));
    }
  });

  const removeRow = async (id: string) => {
    if (confirmId !== id) {
      setConfirmId(id);
      return;
    }
    try {
      await remove.mutateAsync(id);
      toast.success(t("grid.deleted"));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("toast.failed"));
    }
    setConfirmId(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">{t("dash.feeders")}</h1>
        <p className="mt-1 text-sm text-muted">{meta ? `${meta.total} ${t("grid.total")}` : ""}</p>
      </div>

      <form onSubmit={submit} noValidate className="rounded-3xl border border-line bg-card p-6">
        <p className="text-sm font-semibold text-foreground">{editingId ? t("grid.edit") : t("grid.add")}</p>
        <FieldGroup>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field data-invalid={!!form.formState.errors.name}>
              <FieldLabel htmlFor="feeder-name">{t("grid.name")}</FieldLabel>
              <Input id="feeder-name" placeholder="Feeder 07" aria-invalid={!!form.formState.errors.name} {...form.register("name")} />
              <FieldError message={form.formState.errors.name?.message} />
            </Field>
            <Field data-invalid={!!form.formState.errors.substationId}>
              <FieldLabel htmlFor="feeder-substation">{t("grid.substation")}</FieldLabel>
              <Select id="feeder-substation" aria-invalid={!!form.formState.errors.substationId} {...form.register("substationId")}>
                <option value="">{t("coverage.pickSubstation")}</option>
                {(parents.data?.data ?? []).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </Select>
              <FieldError message={form.formState.errors.substationId?.message} />
            </Field>
            <Field data-invalid={!!form.formState.errors.capacityMW}>
              <FieldLabel htmlFor="feeder-capacity">{t("grid.capacity")}</FieldLabel>
              <Input id="feeder-capacity" type="number" min="1" step="1" placeholder="20" aria-invalid={!!form.formState.errors.capacityMW} {...form.register("capacityMW")} />
              <FieldError message={form.formState.errors.capacityMW?.message} />
            </Field>
          </div>
          <div className="flex gap-2">
            <Button type="submit" loading={form.formState.isSubmitting || create.isPending || update.isPending}>
              <Plus className="mr-2 h-4 w-4" /> {editingId ? t("c.save") : t("grid.add")}
            </Button>
            {editingId && (
              <Button type="button" variant="outline" onClick={cancelEdit}>
                {t("c.cancel")}
              </Button>
            )}
          </div>
        </FieldGroup>
      </form>

      <div className="rounded-3xl border border-line bg-card">
        <div className="flex flex-wrap items-center gap-3 border-b border-line px-5 py-4">
          <Select
            value={substationFilter}
            onChange={(e) => {
              setSubstationFilter(e.target.value);
              setPage(1);
            }}
            className="max-w-56"
          >
            <option value="">{t("grid.allSubstations")}</option>
            {(parents.data?.data ?? []).map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Select>
          <div className="flex min-w-40 flex-1 items-center gap-2">
            <Search className="h-4 w-4 text-muted" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder={t("c.search")}
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </div>
        </div>
        {isLoading ? (
          <TableSkeleton />
        ) : rows.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-muted">{t("c.empty")}</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wider text-muted">
                <th className="px-5 py-3 font-medium">{t("th.name")}</th>
                <th className="px-5 py-3 font-medium">{t("grid.capacity")}</th>
                <th className="px-5 py-3 font-medium">{t("grid.substation")}</th>
                <th className="px-5 py-3 text-right font-medium">{t("th.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-line/60 last:border-0">
                  <td className="px-5 py-3.5 font-medium text-foreground">{row.name}</td>
                  <td className="px-5 py-3.5 text-muted">{row.capacityMW != null ? `${row.capacityMW} MW` : "—"}</td>
                  <td className="px-5 py-3.5 text-muted">{parentMap[row.substationId] ?? "—"}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingId(row.id);
                          form.reset({ name: row.name, substationId: row.substationId, capacityMW: row.capacityMW != null ? String(row.capacityMW) : "" });
                        }}
                      >
                        {t("grid.edit")}
                      </Button>
                      {confirmId === row.id ? (
                        <>
                          <Button size="sm" loading={remove.isPending} onClick={() => removeRow(row.id)}>
                            {t("c.confirm")}
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setConfirmId(null)}>
                            {t("c.cancel")}
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" variant="ghost" className="text-danger hover:text-danger" onClick={() => removeRow(row.id)}>
                          {t("c.delete")}
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {meta && meta.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-line px-5 py-3 text-sm">
            <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
              ←
            </Button>
            <span className="text-muted">
              {page} / {meta.totalPages}
            </span>
            <Button size="sm" variant="outline" disabled={page >= meta.totalPages} onClick={() => setPage((p) => p + 1)}>
              →
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedersView;