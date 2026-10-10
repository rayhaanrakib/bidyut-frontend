"use client";

import { useState } from "react";
import { toast } from "sonner";
import { HardHat, Send } from "lucide-react";
import { useApplyAsTechnician } from "@/hooks";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/input";

const SPECIALIZATIONS = ["LINE", "TRANSFORMER", "METERING", "GENERATION"];

const ApplyTechnicianPage = () => {
  const apply = useApplyAsTechnician();
  const [specialization, setSpecialization] = useState("LINE");
  const [experienceYears, setExperienceYears] = useState("");
  const [certification, setCertification] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return toast.error("Attach your resume (PDF or image) first");
    const form = new FormData();
    form.append("resume", file);
    form.append("specialization", specialization);
    if (experienceYears) form.append("experienceYears", experienceYears);
    if (certification) form.append("certification", certification);
    try {
      await apply.mutateAsync(form);
      setDone(true);
      toast.success("Application submitted — an admin will review it");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Application failed");
    }
  };

  return (
    <div className="mx-auto container max-w-xl p-20">
      <h1 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight">
        <HardHat className="h-6 w-6 text-primary" /> Become a technician
      </h1>
      <p className="mt-2 text-sm text-muted">
        Join the field team. An admin reviews every application — if approved, your account switches to the
        technician dashboard (assigned jobs, status updates) on your next login.
      </p>

      {done ? (
        <div className="mt-8 rounded-3xl border border-line bg-card p-10 text-center">
          <p className="text-4xl">🟡</p>
          <h2 className="mt-3 text-lg font-bold">Application pending review</h2>
          <p className="mt-2 text-sm text-muted">You&apos;ll get an email either way. Rejected? You can re-apply any time.</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-3xl border border-line bg-card p-6">
          <label className="block text-sm font-medium">
            Resume (PDF or image, required)
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="mt-2 w-full cursor-pointer rounded-xl border border-line bg-surface p-2.5 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-primary-foreground"
            />
          </label>
          <label className="block text-sm font-medium">
            Specialization
            <Select value={specialization} onChange={(e) => setSpecialization(e.target.value)} className="mt-2 w-full">
              {SPECIALIZATIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </Select>
          </label>
          <label className="block text-sm font-medium">
            Years of experience
            <input type="number" min={0} max={50} value={experienceYears} onChange={(e) => setExperienceYears(e.target.value)}
              placeholder="e.g. 3" className="mt-2 w-full rounded-xl border border-line bg-surface px-3 py-2.5 text-sm" />
          </label>
          <label className="block text-sm font-medium">
            Certification (optional)
            <input value={certification} onChange={(e) => setCertification(e.target.value)}
              placeholder="e.g. OSD wall & pole wiring" className="mt-2 w-full rounded-xl border border-line bg-surface px-3 py-2.5 text-sm" />
          </label>
          <Button type="submit" loading={apply.isPending} className="w-full">
            <Send className="mr-2 h-4 w-4" /> Submit application
          </Button>
        </form>
      )}
    </div>
  );
};

export default ApplyTechnicianPage;