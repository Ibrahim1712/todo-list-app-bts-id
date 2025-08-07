import { checklistService } from "@/services/checklistService";
import { useQuery } from "@tanstack/react-query";

export default function useGetCheckList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["checklists"],
    queryFn: () => checklistService.getAllChecklists(),
  });

  return {
    data: data?.data || [],
    isLoading,
    error,
    refetch: () => {}, // Will be updated with proper refetch function
  };
}
