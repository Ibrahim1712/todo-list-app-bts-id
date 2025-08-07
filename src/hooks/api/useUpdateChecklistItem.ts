import { checklistService } from "@/services/checklistService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseUpdateChecklistItemProps {
  checklistId: number;
  onSuccess?: () => void;
}

export default function useUpdateChecklistItem({
  checklistId,
  onSuccess,
}: UseUpdateChecklistItemProps) {
  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: (checklistItemId: number) =>
      checklistService.updateChecklistItemStatus(checklistId, checklistItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["checklist-items", checklistId],
      });
      onSuccess?.();
    },
  });

  const renameMutation = useMutation({
    mutationFn: ({
      checklistItemId,
      itemName,
    }: {
      checklistItemId: number;
      itemName: string;
    }) =>
      checklistService.renameChecklistItem(checklistId, checklistItemId, {
        itemName,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["checklist-items", checklistId],
      });
      onSuccess?.();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (checklistItemId: number) =>
      checklistService.deleteChecklistItem(checklistId, checklistItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["checklist-items", checklistId],
      });
      onSuccess?.();
    },
  });

  return {
    updateStatus: updateStatusMutation.mutate,
    renameItem: renameMutation.mutate,
    deleteItem: deleteMutation.mutate,
    isUpdatingStatus: updateStatusMutation.isPending,
    isRenaming: renameMutation.isPending,
    isDeleting: deleteMutation.isPending,
    updateError: updateStatusMutation.error,
    renameError: renameMutation.error,
    deleteError: deleteMutation.error,
  };
}
