"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Plus,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { z } from "zod";
import {
  useCreateZone,
  useDeleteZone,
  useUpdateZone,
  useZoneList,
} from "@/hooks";
import { useI18n } from "@/lib/i18n";
import { DISTRICTS } from "@/lib/districts";
import { zoneSchema } from "@/validation";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { FieldError, Input, Select } from "@/components/ui/input";
import { TableSkeleton } from "@/components/ui/skeletons";

type ZoneValues = z.infer<typeof zoneSchema>;

const PAGE_SIZE = 10;
const PAGE_BUTTON_COUNT = 5;

const ZonesView = () => {
  const { t } = useI18n();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const { data, isLoading } = useZoneList({
    search: search.trim() || undefined,
    page,
    limit: PAGE_SIZE,
  });

  const rows = data?.data ?? [];
  const meta = data?.meta;
  const totalPages = Math.max(meta?.totalPages ?? 1, 1);
  const totalItems = meta?.total ?? rows.length;
  const startItem = totalItems === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(page * PAGE_SIZE, totalItems);

  const form = useForm<ZoneValues>({
    resolver: zodResolver(zoneSchema),
    defaultValues: { name: "", code: "" },
  });

  const create = useCreateZone();
  const update = useUpdateZone();
  const remove = useDeleteZone();

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const cancelEdit = () => {
    setEditingId(null);
    form.reset({ name: "", code: "" });
  };

  const submit = form.handleSubmit(async (values) => {
    const payload = {
      name: values.name,
      code: values.code || undefined,
    };

    try {
      if (editingId) {
        await update.mutateAsync({ id: editingId, ...payload });
        toast.success(t("grid.updated"));
      } else {
        await create.mutateAsync(payload);
        setPage(1);
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

      if (rows.length === 1 && page > 1) {
        setPage((currentPage) => currentPage - 1);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("toast.failed"));
    }

    setConfirmId(null);
  };

  const getPageNumbers = () => {
    const visiblePages = Math.min(PAGE_BUTTON_COUNT, totalPages);
    let startPage = Math.max(
      1,
      page - Math.floor(PAGE_BUTTON_COUNT / 2),
    );

    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    startPage = Math.max(1, endPage - visiblePages + 1);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index,
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
          {t("dash.zones")}
        </h1>
        <p className="mt-1 text-sm text-muted">
          {meta ? `${meta.total} ${t("grid.total")}` : ""}
        </p>
      </div>

      <form
        onSubmit={submit}
        noValidate
        className="rounded-3xl border border-line bg-card p-6"
      >
        <p className="text-sm font-semibold text-foreground">
          {editingId ? t("grid.edit") : t("grid.add")}
        </p>

        <FieldGroup>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field data-invalid={!!form.formState.errors.name}>
              <FieldLabel htmlFor="zone-name">
                {t("grid.district")}
              </FieldLabel>

              <Select
                id="zone-name"
                aria-invalid={!!form.formState.errors.name}
                {...form.register("name")}
              >
                <option value="">{t("grid.pickDistrict")}</option>
                {DISTRICTS.map((district) => (
                  <option key={district.en} value={district.en}>
                    {district.en} · {district.bn}
                  </option>
                ))}
              </Select>

              <FieldError message={form.formState.errors.name?.message} />
            </Field>

            <Field data-invalid={!!form.formState.errors.code}>
              <FieldLabel htmlFor="zone-code">
                {t("grid.code")}
              </FieldLabel>

              <Input
                id="zone-code"
                placeholder="DHK"
                aria-invalid={!!form.formState.errors.code}
                {...form.register("code")}
              />

              <FieldError message={form.formState.errors.code?.message} />
            </Field>
          </div>

          <div className="flex gap-2">
            <Button
              type="submit"
              loading={
                form.formState.isSubmitting ||
                create.isPending ||
                update.isPending
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              {editingId ? t("c.save") : t("grid.add")}
            </Button>

            {editingId && (
              <Button
                type="button"
                variant="outline"
                onClick={cancelEdit}
              >
                {t("c.cancel")}
              </Button>
            )}
          </div>
        </FieldGroup>
      </form>

      <div className="overflow-hidden rounded-3xl border border-line bg-card">
        <div className="flex items-center gap-2 border-b border-line px-5 py-4">
          <Search className="h-4 w-4 shrink-0 text-muted" />

          <input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            placeholder={t("c.search")}
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
          />
        </div>

        {isLoading ? (
          <TableSkeleton />
        ) : rows.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-muted">
            {t("c.empty")}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line text-left text-xs uppercase tracking-wider text-muted">
                  <th className="px-5 py-3 font-medium">
                    {t("th.name")}
                  </th>
                  <th className="px-5 py-3 font-medium">
                    {t("grid.code")}
                  </th>
                  <th className="px-5 py-3 text-right font-medium">
                    {t("th.actions")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-line/60 last:border-0"
                  >
                    <td className="px-5 py-3.5 font-medium text-foreground">
                      {row.name}
                    </td>

                    <td className="px-5 py-3.5 font-mono text-muted">
                      {row.code || "—"}
                    </td>

                    <td className="px-5 py-3.5">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingId(row.id);
                            form.reset({
                              name: row.name,
                              code: row.code ?? "",
                            });
                          }}
                        >
                          {t("grid.edit")}
                        </Button>

                        {confirmId === row.id ? (
                          <>
                            <Button
                              size="sm"
                              loading={remove.isPending}
                              onClick={() => removeRow(row.id)}
                            >
                              {t("c.confirm")}
                            </Button>

                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setConfirmId(null)}
                            >
                              {t("c.cancel")}
                            </Button>
                          </>
                        ) : (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-danger hover:text-danger"
                            onClick={() => removeRow(row.id)}
                          >
                            {t("c.delete")}
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {meta && meta.totalPages > 1 && (
          <div className="flex flex-col gap-4 border-t border-line px-4 py-4 sm:px-5">
            <div className="flex flex-col gap-1 text-center text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:text-left">
              <span>
                Showing{" "}
                <span className="font-medium text-foreground">
                  {startItem}–{endItem}
                </span>{" "}
                of{" "}
                <span className="font-medium text-foreground">
                  {totalItems}
                </span>{" "}
                zones
              </span>

              <span className="sm:hidden">
                Page {page} of {totalPages}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1 sm:justify-end">
              <Button
                size="sm"
                variant="outline"
                disabled={page <= 1}
                onClick={() => setPage(1)}
                aria-label="Go to first page"
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>

              <Button
                size="sm"
                variant="outline"
                disabled={page <= 1}
                onClick={() => setPage((currentPage) => currentPage - 1)}
                aria-label="Go to previous page"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous</span>
              </Button>

              {getPageNumbers().map((pageNumber) => (
                <Button
                  key={pageNumber}
                  size="sm"
                  variant={pageNumber === page ? "default" : "outline"}
                  onClick={() => setPage(pageNumber)}
                  aria-label={`Go to page ${pageNumber}`}
                  aria-current={pageNumber === page ? "page" : undefined}
                >
                  {pageNumber}
                </Button>
              ))}

              <Button
                size="sm"
                variant="outline"
                disabled={page >= totalPages}
                onClick={() => setPage((currentPage) => currentPage + 1)}
                aria-label="Go to next page"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>

              <Button
                size="sm"
                variant="outline"
                disabled={page >= totalPages}
                onClick={() => setPage(totalPages)}
                aria-label="Go to last page"
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZonesView;