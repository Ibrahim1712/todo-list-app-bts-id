import { checklistService } from "@/services/checklistService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteChecklist() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (checklistId: number) =>
      checklistService.deleteChecklist(checklistId),
    onSuccess: () => {
      // Invalidate and refetch checklists
      queryClient.invalidateQueries({ queryKey: ["checklists"] });
    },
  });

  return {
    deleteChecklist: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
}
