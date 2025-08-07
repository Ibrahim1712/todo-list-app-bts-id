import { checklistService } from "@/services/checklistService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateChecklistRequest } from "@/types/checklist";

export default function useCreateChecklist() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CreateChecklistRequest) =>
      checklistService.createChecklist(data),
    onSuccess: () => {
      // Invalidate and refetch checklists
      queryClient.invalidateQueries({ queryKey: ["checklists"] });
    },
  });

  return {
    createChecklist: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
}
