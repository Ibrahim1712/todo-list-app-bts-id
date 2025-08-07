import { checklistService } from "@/services/checklistService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateChecklistItemRequest } from "@/types/checklist";

export default function useCreateChecklistItem(checklistId: number) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CreateChecklistItemRequest) =>
      checklistService.createChecklistItem(checklistId, data),
    onSuccess: () => {
      // Invalidate and refetch checklist items
      queryClient.invalidateQueries({
        queryKey: ["checklist-items", checklistId],
      });
    },
  });

  return {
    createItem: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
}
