import { api } from "@/lib/api";
import type { GridStatus } from "@/types";

export const gridStatus = (areaId: string) =>
  api<GridStatus>(`/public/grid-status/${areaId}`);