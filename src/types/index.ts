export type Role = "CUSTOMER" | "FIELD_TECHNICIAN" | "POWER_OPERATOR" | "ADMIN";
export type OutageStatus = "PENDING" | "ASSIGNED" | "IN_PROGRESS" | "RESOLVED" | "CANCELLED";
export type PaymentStatus = "PENDING" | "COMPLETED" | "REFUNDED" | "FAILED";
export type ScheduleStatus = "SCHEDULED" | "ONGOING" | "COMPLETED" | "CANCELLED";

export interface User {
  id: string; name: string; email: string; role: Role; status: "ACTIVE" | "BLOCKED";
  category: "RESIDENTIAL" | "COMMERCIAL" | "HEALTHCARE" | "EDUCATION";
  areaId: string | null; imageUrl: string; mustChangePassword: boolean;
  slaActive: boolean; slaExpiryDate: string | null;
  createdAt: string; updatedAt: string;
}

export interface OutageReport {
  id: string; title: string | null; description: string;
  customerId: string; areaId: string; technicianId: string | null;
  status: OutageStatus; isPriority: boolean; isBulkIncident: boolean; slaBreached: boolean;
  reportedAt: string; assignedAt: string | null; resolvedAt: string | null;
  area?: { id: string; name: string; feeder?: { id: string; name: string } };
  customer?: { id: string; name: string; email: string; category: string };
  technician?: { id: string; name: string; email: string } | null;
}

export interface Area { id: string; name: string; feederId: string; feeder?: { name: string } }

export interface Schedule {
  id: string; title: string; reason: string | null;
  type: "PLANNED" | "MAINTENANCE" | "EMERGENCY"; status: ScheduleStatus;
  feederId: string | null; areaId: string | null;
  startTime: string; endTime: string;
  feeder?: { name: string } | null; area?: { name: string } | null;
}

export interface Payment {
  id: string; transactionId: string; userId: string; outageReportId: string | null;
  type: "PRIORITY_RESTORATION" | "SLA_SUBSCRIPTION";
  amountPaisa: number; status: PaymentStatus;
  createdAt: string; updatedAt: string;
}

export interface ActivityLog {
  id: string; action: string; entity: string; entityId: string | null; actorId: string | null;
  actor?: { name: string; email: string; role: string } | null;
  metadata: Record<string, unknown> | null; createdAt: string;
}

export interface GridStatus {
  area: { id: string; name: string; feeder: string | null; substation: string | null; zone: string | null };
  loadSheddingNow: boolean;
  currentOutage: { title: string; type: string; endsAt: string } | null;
  nextScheduled: { title: string; type: string; startsAt: string; endsAt: string } | null;
  activeOutageReports: number;
}

export interface Meta { page: number; limit: number; total: number; totalPages: number }

export interface OperationalStats {
  outages: { totalReports: number; pending: number; assigned: number; inProgress: number; resolvedToday: number };
  users: { customers: number; technicians: number; activeSlaSubscriptions: number };
  upcomingSchedules: number;
}

export interface MyProfile {
  serviceAddress?: string; thana?: string; city?: string; preferredLanguage?: string;
  employeeId?: string | null; specialization?: string; experienceYears?: number | null;
  certification?: string | null; phone?: string | null; shift?: string; designation?: string | null;
  applicationStatus?: "PENDING" | "APPROVED" | "REJECTED";
  resumeUrl?: string | null; rejectionReason?: string | null;
  reviewedAt?: string | null;
}

export interface TechnicianApplication {
  userId: string;
  employeeId: string | null;
  applicationStatus: "PENDING" | "APPROVED" | "REJECTED";
  specialization: string;
  experienceYears: number | null;
  certification: string | null;
  resumeUrl: string | null;
  reviewedAt: string | null;
  user: { name: string; email: string };
}

export interface OutageFilters {
  status?: string;
  isPriority?: string;
  page?: number;
}

export interface HeatmapRow {
  areaId: string; areaName: string; feederName?: string;
  reportCount: number; avgResolutionMinutes: number | null;
}