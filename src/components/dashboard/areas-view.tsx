"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { useAreaList, useCreateArea, useDeleteArea, useFeederList, useUpdateArea } from "@/hooks";
import { useI18n } from "@/lib/i18n";
import { areaSchema } from "@/validation";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { FieldError, Input, Select } from "@/components/ui/input";
import { TableSkeleton } from "@/components/ui/skeletons";

type AreaValues = z.infer<typeof areaSchema>;

const AreasView = () => {
  const { t } = useI18n();
  const [feederFilter, setFeederFilter] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const parents = useFeederList({ limit: 100 });
  const parentMap = Object.fromEntries((parents.data?.data ?? []).map((f) => [f.id, f.name]));
  const { data, isLoading } = useAreaList({ feederId: feederFilter || undefined, search: search || undefined, page, limit: 10 });
  const rows = data?.data ?? [];
  const meta = data?.meta;

  const form = useForm<AreaValues>({
    resolver: zodResolver(areaSchema),
    defaultValues: { name: "", feederId: "" },
  });

  const create = useCreateArea();
  const update = useUpdateArea();
  const remove = useDeleteArea();

  const cancelEdit = () => {
    setEditingId(null);
    form.reset({ name: "", feederId: "" });
  };

  const submit = form.handleSubmit(async (values) => {
    try {
      if (editingId) {
        await update.mutateAsync({ id: editingId, name: values.name });
        toast.success(t("grid.updated"));
      } else {
        await create.mutateAsync(values);
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
        <h1 className="text-2xl font-extrabold tracking-tight">{t("dash.areas")}</h1>
        <p className="mt-1 text-sm text-muted">{meta ? `${meta.total} ${t("grid.total")}` : ""}</p>
      </div>

      <form onSubmit={submit} noValidate className="rounded-3xl border border-line bg-card p-6">
        <p className="text-sm font-semibold">{editingId ? t("grid.edit") : t("grid.add")}</p>
        <FieldGroup>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field data-invalid={!!form.formState.errors.name}>
              <FieldLabel htmlFor="area-name">{t("grid.name")}</FieldLabel>
              <Input id="area-name" placeholder="Halishahar" aria-invalid={!!form.formState.errors.name} {...form.register("name")} />
              <FieldError message={form.formState.errors.name?.message} />
            </Field>
            <Field data-invalid={!!form.formState.errors.feederId}>
              <FieldLabel htmlFor="area-feeder">{t("grid.feeder")}</FieldLabel>
              <Select id="area-feeder" aria-invalid={!!form.formState.errors.feederId} {...form.register("feederId")}>
                <option value="">{t("coverage.pickFeeder")}</option>
                {(parents.data?.data ?? []).map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </Select>
              <FieldError message={form.formState.errors.feederId?.message} />
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
            value={feederFilter}
            onChange={(e) => {
              setFeederFilter(e.target.value);
              setPage(1);
            }}
            className="max-w-56"
          >
            <option value="">{t("grid.allFeeders")}</option>
            {(parents.data?.data ?? []).map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
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
                <th className="px-5 py-3 font-medium">{t("grid.feeder")}</th>
                <th className="px-5 py-3 text-right font-medium">{t("th.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-line/60 last:border-0">
                  <td className="px-5 py-3.5 font-medium">{row.name}</td>
                  <td className="px-5 py-3.5 text-muted">{parentMap[row.feederId] ?? row.feeder?.name ?? "—"}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingId(row.id);
                          form.reset({ name: row.name, feederId: row.feederId });
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

export default AreasView;