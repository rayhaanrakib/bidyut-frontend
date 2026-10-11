"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAreas, useReportOutage } from "@/hooks";
import { useUiStore } from "@/lib/store";
import { reportSchema } from "@/validation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Select, Textarea } from "@/components/ui/input";

const STEPS = ["Where", "What happened", "Review & send"] as const;

const STEP_FIELDS: Record<0 | 1, (keyof z.infer<typeof reportSchema>)[]> = {
  0: ["areaId"],
  1: ["title", "description"],
};

type ReportValues = z.infer<typeof reportSchema>;

const ReportPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const { wizardDraft, setWizardDraft, resetWizard } = useUiStore();
  const areas = useAreas();
  const report = useReportOutage();

  const { register, handleSubmit, trigger, getValues, formState: { errors } } = useForm<ReportValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: wizardDraft,
  });

  const next = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    const currentStep = step as 0 | 1;
    if (currentStep > 1) return;
    const ok = await trigger(STEP_FIELDS[currentStep]);
    if (!ok) return;
    setWizardDraft(getValues());
    setStep((s) => s + 1);
  };

  const back = (e: React.MouseEvent) => {
    e.preventDefault();
    if (step === 0) return;
    setStep((s) => s - 1);
  };

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Report an outage</h1>

      <ol className="mt-6 flex gap-2">
        {STEPS.map((label, i) => (
          <li key={label} className="flex-1">
            <div className={i <= step ? "h-1 rounded bg-primary" : "h-1 rounded bg-line"} />
            <p className={i <= step ? "mt-2 text-xs font-semibold text-primary" : "mt-2 text-xs text-muted"}>{label}</p>
          </li>
        ))}
      </ol>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (step !== 2) return;
          return handleSubmit((values) =>
            report.mutate(values, {
              onSuccess: () => {
                resetWizard();
                toast.success("Report submitted — the operator queue sees it instantly");
                router.push("/customer/reports");
              },
              onError: (err) => toast.error(err.message),
            }),
          )(e);
        }}
        noValidate
        className="mt-8 space-y-4 rounded-3xl border border-line bg-card p-6"
      >
        {step === 0 && (
          <div>
            <label className="block text-sm font-medium text-foreground">
              Which area is affected?
              <Select className="mt-2 w-full" aria-invalid={!!errors.areaId} {...register("areaId")}>
                <option value="">Select your area…</option>
                {areas.data?.data?.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
              </Select>
            </label>
            <FieldError message={errors.areaId?.message} />
          </div>
        )}

        {step === 1 && (
          <>
            <div>
              <label className="block text-sm font-medium text-foreground">
                Short summary
                <Input className="mt-2 w-full"  placeholder="e.g. Power cut since morning" aria-invalid={!!errors.title} {...register("title")} />
              </label>
              <FieldError message={errors.title?.message} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground">
                What exactly is happening?
                <Textarea className="mt-2 w-full" rows={4}  placeholder="Street, landmark, since when…" aria-invalid={!!errors.description} {...register("description")} />
              </label>
              <FieldError message={errors.description?.message} />
            </div>
          </>
        )}

        {step === 2 && (
          <div className="space-y-2 rounded-2xl border border-line bg-surface p-4 text-sm">
            <p className="text-foreground"><strong>Area:</strong> {areas.data?.data?.find((a) => a.id === getValues().areaId)?.name ?? "—"}</p>
            <p className="text-foreground"><strong>Summary:</strong> {getValues().title}</p>
            <p className="text-foreground"><strong>Details:</strong> {getValues().description}</p>
            <Badge tone="amber">Will be submitted as PENDING</Badge>
          </div>
        )}

        <div className="flex justify-between pt-2">
          <Button type="button" variant="ghost" disabled={step === 0} onClick={back}>← Back</Button>
          {step === 2
            ? <Button type="submit" loading={report.isPending}>Submit report</Button>
            : <Button type="button" onClick={next}>Next →</Button>}
        </div>
      </form>
    </div>
  );
};

export default ReportPage;