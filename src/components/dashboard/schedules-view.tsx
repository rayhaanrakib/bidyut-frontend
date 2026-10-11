"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import {
  useAreas,
  useCreateSchedule,
  useDeleteSchedule,
  useSchedules,
  useUpdateScheduleStatus,
} from "@/hooks";
import { scheduleSchema } from "@/validation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge, statusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Input,
  Select,
  Label,
  FieldError,
} from "@/components/ui/input";
import {
  Skeleton,
  EmptyState,
} from "@/components/ui/misc";

type ScheduleValues = z.infer<typeof scheduleSchema>;

const DEFAULT_VALUES: ScheduleValues = {
  title: "",
  reason: "",
  type: "PLANNED",
  areaId: "",
  startTime: "",
  endTime: "",
};

const SchedulesView = () => {
  const { t } = useI18n();

  const { data: areas } = useAreas();
  const { data, isLoading } = useSchedules(1);

  const create = useCreateSchedule();
  const setStatus = useUpdateScheduleStatus();
  const remove = useDeleteSchedule();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ScheduleValues>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: { ...DEFAULT_VALUES },
  });

  const onSubmit = async (values: ScheduleValues) => {
    try {
      const title = values.title.trim();
      const reason = values.reason?.trim();
      const startDate = new Date(values.startTime);
      const endDate = new Date(values.endTime);

      if (
        !Number.isFinite(startDate.getTime()) ||
        !Number.isFinite(endDate.getTime())
      ) {
        toast.error("Please enter valid start and end dates.");
        return;
      }

      if (endDate <= startDate) {
        toast.error("End time must be after start time.");
        return;
      }

      await create.mutateAsync({
        title,
        reason: reason || undefined,
        type: values.type,
        areaId: values.areaId,
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString(),
      });

      toast.success(
        "Schedule published — customers will be notified 24h ahead"
      );

      reset({ ...DEFAULT_VALUES });
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to publish"
      );
    }
  };

  const transition = async (id: string, status: string) => {
    try {
      await setStatus.mutateAsync({ id, status });
      toast.success(`Schedule ${status.toLowerCase()}`);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed"
      );
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await remove.mutateAsync(id);
      toast.success("Schedule deleted");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete"
      );
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-8 xl:grid-cols-[420px_1fr]">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>{t("sched.create")}</CardTitle>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Feeder maintenance"
                  {...register("title")}
                />
                <FieldError message={errors.title?.message} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="type">Type</Label>
                  <Select id="type" {...register("type")}>
                    <option value="PLANNED">PLANNED</option>
                    <option value="MAINTENANCE">MAINTENANCE</option>
                    <option value="EMERGENCY">EMERGENCY</option>
                  </Select>
                  <FieldError message={errors.type?.message} />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="areaId">{t("report.area")}</Label>
                  <Select id="areaId" {...register("areaId")}>
                    <option value="">Select area</option>
                    {areas?.data?.map((area) => (
                      <option key={area.id} value={area.id}>
                        {area.name}
                      </option>
                    ))}
                  </Select>
                  <FieldError message={errors.areaId?.message} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="startTime">
                    {t("sched.start")}
                  </Label>
                  <Input
                    id="startTime"
                    type="datetime-local"
                    {...register("startTime")}
                  />
                  <FieldError message={errors.startTime?.message} />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="endTime">
                    {t("sched.end")}
                  </Label>
                  <Input
                    id="endTime"
                    type="datetime-local"
                    {...register("endTime")}
                  />
                  <FieldError message={errors.endTime?.message} />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="reason">Reason</Label>
                <Input
                  id="reason"
                  placeholder="Substation upgrade"
                  {...register("reason")}
                />
                <FieldError message={errors.reason?.message} />
              </div>

              <Button
                type="submit"
                className="w-full"
                loading={isSubmitting || create.isPending}
                disabled={isSubmitting || create.isPending}
              >
                {t("sched.create")}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {isLoading && <Skeleton className="h-40 w-full" />}

          {!isLoading && !data?.data?.length && (
            <EmptyState title={t("c.empty")} />
          )}

          {data?.data?.map((s) => (
            <div
              key={s.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-card p-5"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-foreground">
                    {s.title}
                  </p>

                  <Badge
                    tone={s.type === "EMERGENCY" ? "red" : "blue"}
                  >
                    {s.type}
                  </Badge>

                  <Badge tone={statusTone(s.status)}>
                    {s.status}
                  </Badge>
                </div>

                <p className="mt-1.5 text-xs text-muted">
                  {s.area?.name ?? "—"} ·{" "}
                  {format(
                    new Date(s.startTime),
                    "d MMM, HH:mm"
                  )}{" "}
                  →{" "}
                  {format(new Date(s.endTime), "HH:mm")}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {s.status === "SCHEDULED" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      transition(s.id, "ONGOING")
                    }
                  >
                    Start
                  </Button>
                )}

                {s.status === "ONGOING" && (
                  <Button
                    size="sm"
                    onClick={() =>
                      transition(s.id, "COMPLETED")
                    }
                  >
                    Complete
                  </Button>
                )}

                {(s.status === "SCHEDULED" ||
                  s.status === "ONGOING") && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-danger"
                    onClick={() =>
                      transition(s.id, "CANCELLED")
                    }
                  >
                    Cancel
                  </Button>
                )}

                {s.status !== "ONGOING" && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-danger"
                    onClick={() => handleDelete(s.id)}
                    disabled={remove.isPending}
                  >
                    {t("c.delete")}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchedulesView;