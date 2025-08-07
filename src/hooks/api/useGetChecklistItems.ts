import { checklistService } from "@/services/checklistService";
import { useQuery } from "@tanstack/react-query";

export default function useGetChecklistItems(checklistId: number) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["checklist-items", checklistId],
    queryFn: () => checklistService.getChecklistItems(checklistId),
    enabled: !!checklistId,
  });

  return {
    data: data?.data || [],
    isLoading,
    error,
    refetch,
  };
}
