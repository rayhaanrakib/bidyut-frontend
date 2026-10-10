import { useQuery } from "@tanstack/react-query";
import { gridStatus } from "@/api";

export const usePublicGridStatus = (areaId: string | null | undefined) => {
  return useQuery({
    queryKey: ["public-grid", areaId],
    queryFn: () => gridStatus(areaId as string),
    enabled: Boolean(areaId),
    refetchInterval: 60_000,
  });
};