"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Check, X } from "lucide-react";
import { useDecideApplication, useTechnicianApplications } from "@/hooks";
import type { TechnicianApplication } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Skeleton } from "@/components/ui/misc";

const STATUSES = ["PENDING", "APPROVED", "REJECTED"];
const tone = (s: string): "emerald" | "red" | "amber" => (s === "APPROVED" ? "emerald" : s === "REJECTED" ? "red" : "amber");

const ApplicationsPage = () => {
  const [status, setStatus] = useState("PENDING");
  const [page, setPage] = useState(1);
  const { data, isLoading } = useTechnicianApplications(status, page);
  const decide = useDecideApplication();

  const [approving, setApproving] = useState<TechnicianApplication | null>(null);
  const [rejecting, setRejecting] = useState<TechnicianApplication | null>(null);
  const [reason, setReason] = useState("");
  const [processingId, setProcessingId] = useState<string | null>(null);

  const act = async (userId: string, applicationStatus: "APPROVED" | "REJECTED", rejectionReason?: string) => {
    setProcessingId(userId);
    try {
      await decide.mutateAsync({ userId, applicationStatus, rejectionReason });
      toast.success(
        applicationStatus === "APPROVED"
          ? "Approved — the account is now FIELD_TECHNICIAN"
          : "Application rejected — the applicant can re-apply",
      );
      setApproving(null);
      setRejecting(null);
      setReason("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Decision failed");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Technician applications</h1>
        <div className="flex gap-2">
          {STATUSES.map((s) => (
            <Button key={s} size="sm" variant={status === s ? "default" : "outline"} onClick={() => { setStatus(s); setPage(1); }}>
              {s}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-line">
        {isLoading ? (
          <div className="space-y-2 p-4"><Skeleton className="h-8 w-full" /><Skeleton className="h-8 w-full" /><Skeleton className="h-8 w-2/3" /></div>
        ) : data?.data?.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted">No {status.toLowerCase()} applications.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-surface text-left text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="p-3">Applicant</th><th className="p-3">Specialization</th><th className="p-3">Exp</th>
                <th className="p-3">Certification</th><th className="p-3">Resume</th><th className="p-3">Status</th><th className="p-3">Decision</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((a) => (
                <tr key={a.userId} className="border-t border-line">
                  <td className="p-3"><span className="font-medium text-foreground">{a.user.name}</span><br /><span className="text-xs text-muted">{a.user.email}</span></td>
                  <td className="p-3">{a.specialization}</td>
                  <td className="p-3">{a.experienceYears ?? "—"}</td>
                  <td className="p-3 max-w-40 truncate">{a.certification ?? "—"}</td>
                  <td className="p-3">{a.resumeUrl && <a href={a.resumeUrl} target="_blank" rel="noreferrer" className="text-primary underline">open</a>}</td>
                  <td className="p-3"><Badge tone={tone(a.applicationStatus)}>{a.applicationStatus}</Badge></td>
                  <td className="p-3">
                    {a.applicationStatus === "PENDING" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          disabled={decide.isPending && processingId !== null}
                          onClick={() => setApproving(a)}
                        >
                          <Check className="mr-1 h-3.5 w-3.5" /> Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-danger"
                          disabled={decide.isPending && processingId !== null}
                          onClick={() => { setRejecting(a); setReason(""); }}
                        >
                          <X className="mr-1 h-3.5 w-3.5" /> Reject
                        </Button>
                      </div>
                    )}
                    {a.applicationStatus !== "PENDING" && <span className="text-xs text-muted">{a.reviewedAt?.slice(0, 10)}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {data?.meta && data.meta.totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3 text-sm">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>←</Button>
          <span className="text-muted">{page} / {data.meta.totalPages}</span>
          <Button variant="outline" size="sm" disabled={page >= data.meta.totalPages} onClick={() => setPage(page + 1)}>→</Button>
        </div>
      )}

      <Modal open={Boolean(approving)} onClose={() => setApproving(null)} title="Approve technician application?">
        <p className="text-sm text-muted">
          Approve <span className="font-semibold text-foreground">{approving?.user.name}</span> ({approving?.specialization})? Their account role will immediately switch to FIELD_TECHNICIAN.
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => setApproving(null)}>Cancel</Button>
          <Button
            size="sm"
            loading={decide.isPending && processingId === approving?.userId}
            onClick={() => approving && act(approving.userId, "APPROVED")}
          >
            Confirm Approval
          </Button>
        </div>
      </Modal>

      <Modal open={Boolean(rejecting)} onClose={() => setRejecting(null)} title="Reject this application?">
        <p className="text-sm text-muted">
          Reject application for <span className="font-semibold text-foreground">{rejecting?.user.name}</span>? The applicant sees this reason in their email — and can re-apply afterwards.
        </p>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={3}
          placeholder="e.g. certification could not be verified"
          className="mt-3 w-full rounded-xl border border-line bg-surface px-3 py-2.5 text-sm"
        />
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => setRejecting(null)}>Cancel</Button>
          <Button
            size="sm"
            variant="outline"
            className="text-danger"
            disabled={reason.trim().length < 4 || (decide.isPending && processingId === rejecting?.userId)}
            loading={decide.isPending && processingId === rejecting?.userId}
            onClick={() => rejecting && act(rejecting.userId, "REJECTED", reason.trim())}
          >
            Reject with reason
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ApplicationsPage;