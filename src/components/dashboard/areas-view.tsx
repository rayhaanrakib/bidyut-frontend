
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
  useAreaList,
  useCreateArea,
  useDeleteArea,
  useFeederList,
  useUpdateArea,
} from "@/hooks";
import { useI18n } from "@/lib/i18n";
import { areaSchema } from "@/validation";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { FieldError, Input, Select } from "@/components/ui/input";
import { TableSkeleton } from "@/components/ui/skeletons";

type AreaValues = z.infer<typeof areaSchema>;

const PAGE_BUTTON_COUNT = 5;

const AreasView = () => {
  const { t } = useI18n();
  const [feederFilter, setFeederFilter] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const parents = useFeederList({ limit: 100 });

  const parentMap = Object.fromEntries(
    (parents.data?.data ?? []).map((feeder) => [feeder.id, feeder.name]),
  );

  const { data, isLoading } = useAreaList({
    feederId: feederFilter || undefined,
    search: search.trim() || undefined,
    page,
    limit: 10,
  });

  const rows = data?.data ?? [];
  const meta = data?.meta;
  const totalPages = Math.max(meta?.totalPages ?? 1, 1);
  const totalItems = meta?.total ?? rows.length;
  const startItem = totalItems === 0 ? 0 : (page - 1) * 10 + 1;
  const endItem = Math.min(page * 10, totalItems);

  const form = useForm<AreaValues>({
    resolver: zodResolver(areaSchema),
    defaultValues: { name: "", feederId: "" },
  });

  const create = useCreateArea();
  const update = useUpdateArea();
  const remove = useDeleteArea();

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const cancelEdit = () => {
    setEditingId(null);
    form.reset({ name: "", feederId: "" });
  };

  const submit = form.handleSubmit(async (values) => {
    try {
      if (editingId) {
        await update.mutateAsync({
          id: editingId,
          name: values.name,
        });
        toast.success(t("grid.updated"));
      } else {
        await create.mutateAsync(values);
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

  const changeSearch = (value: string) => {
    setSearch(value);
    setPage(1);
    setConfirmId(null);
  };

  const changeFeeder = (value: string) => {
    setFeederFilter(value);
    setPage(1);
    setConfirmId(null);
  };

  const getPageNumbers = () => {
    const visiblePages = Math.min(PAGE_BUTTON_COUNT, totalPages);
    let startPage = Math.max(1, page - Math.floor(visiblePages / 2));
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
          {t("dash.areas")}
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
              <FieldLabel htmlFor="area-name">{t("grid.name")}</FieldLabel>
              <Input
                id="area-name"
                placeholder="Halishahar"
                aria-invalid={!!form.formState.errors.name}
                {...form.register("name")}
              />
              <FieldError message={form.formState.errors.name?.message} />
            </Field>

            <Field data-invalid={!!form.formState.errors.feederId}>
              <FieldLabel htmlFor="area-feeder">
                {t("grid.feeder")}
              </FieldLabel>
              <Select
                id="area-feeder"
                aria-invalid={!!form.formState.errors.feederId}
                {...form.register("feederId")}
              >
                <option value="">{t("coverage.pickFeeder")}</option>
                {(parents.data?.data ?? []).map((feeder) => (
                  <option key={feeder.id} value={feeder.id}>
                    {feeder.name}
                  </option>
                ))}
              </Select>
              <FieldError message={form.formState.errors.feederId?.message} />
            </Field>
          </div>

          <div className="flex flex-wrap gap-2">
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
        <div className="flex flex-col gap-3 border-b border-line px-5 py-4 sm:flex-row sm:items-center">
          <Select
            value={feederFilter}
            onChange={(event) => changeFeeder(event.target.value)}
            className="w-full sm:max-w-56"
          >
            <option value="">{t("grid.allFeeders")}</option>
            {(parents.data?.data ?? []).map((feeder) => (
              <option key={feeder.id} value={feeder.id}>
                {feeder.name}
              </option>
            ))}
          </Select>

          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-line px-3">
            <Search className="h-4 w-4 shrink-0 text-muted" />
            <input
              value={search}
              onChange={(event) => changeSearch(event.target.value)}
              placeholder={t("c.search")}
              aria-label={t("c.search")}
              className="h-10 w-full min-w-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="p-5">
            <TableSkeleton />
          </div>
        ) : rows.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <p className="text-sm font-medium text-foreground">
              {t("c.empty")}
            </p>
            <p className="mt-1 text-xs text-muted">
              Try changing your search or feeder filter.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line text-left text-xs uppercase tracking-wider text-muted">
                    <th className="px-5 py-3 font-medium">
                      {t("th.name")}
                    </th>
                    <th className="px-5 py-3 font-medium">
                      {t("grid.feeder")}
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
                      className="border-b border-line/60 last:border-0 transition-colors hover:bg-surface/60"
                    >
                      <td className="px-5 py-3.5 font-medium text-foreground">
                        {row.name}
                      </td>
                      <td className="px-5 py-3.5 text-muted">
                        {parentMap[row.feederId] ?? row.feeder?.name ?? "—"}
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
                                feederId: row.feederId,
                              });
                              setConfirmId(null);
                            }}
                          >
                            {t("grid.edit")}
                          </Button>

                          {confirmId === row.id ? (
                            <>
                              <Button
                                size="sm"
                                loading={remove.isPending}
                                onClick={() => void removeRow(row.id)}
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
                              onClick={() => void removeRow(row.id)}
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

            {meta && meta.totalPages > 1 && (
              <div className="flex flex-col gap-4 border-t border-line px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <p className="text-center text-sm text-muted sm:text-left">
                  Showing{" "}
                  <span className="font-medium text-foreground">
                    {startItem}–{endItem}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-foreground">
                    {totalItems}
                  </span>{" "}
                  areas
                </p>

                <nav
                  aria-label="Areas pagination"
                  className="flex flex-wrap items-center justify-center gap-1.5"
                >
                  <Button
                    size="sm"
                    variant="outline"
                    aria-label="First page"
                    title="First page"
                    disabled={page <= 1 || isLoading}
                    onClick={() => setPage(1)}
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    aria-label="Previous page"
                    title="Previous page"
                    disabled={page <= 1 || isLoading}
                    onClick={() => setPage((currentPage) => currentPage - 1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  {getPageNumbers().map((pageNumber) => (
                    <Button
                      key={pageNumber}
                      size="sm"
                      variant={pageNumber === page ? "default" : "outline"}
                      aria-label={`Page ${pageNumber}`}
                      aria-current={pageNumber === page ? "page" : undefined}
                      disabled={isLoading}
                      onClick={() => setPage(pageNumber)}
                      className="min-w-9"
                    >
                      {pageNumber}
                    </Button>
                  ))}

                  <Button
                    size="sm"
                    variant="outline"
                    aria-label="Next page"
                    title="Next page"
                    disabled={page >= totalPages || isLoading}
                    onClick={() => setPage((currentPage) => currentPage + 1)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    aria-label="Last page"
                    title="Last page"
                    disabled={page >= totalPages || isLoading}
                    onClick={() => setPage(totalPages)}
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </nav>

                <p className="text-center text-xs text-muted sm:hidden">
                  Page {page} of {totalPages}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AreasView;
