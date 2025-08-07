import { useState } from "react";
import { useParams } from "react-router";
import useGetChecklistItems from "./api/useGetChecklistItems";
import useCreateChecklistItem from "./api/useCreateChecklistItem";
import useUpdateChecklistItem from "./api/useUpdateChecklistItem";
import type { ChecklistItem } from "@/types/checklist";

const useCheckListDetails = () => {
  const { checklistId } = useParams<{ checklistId: string }>();
  const numericChecklistId = parseInt(checklistId || "0", 10);

  const [newItemName, setNewItemName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [editingItem, setEditingItem] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  const {
    data: items,
    isLoading,
    error,
  } = useGetChecklistItems(numericChecklistId);
  const { createItem, isLoading: isCreatingItem } =
    useCreateChecklistItem(numericChecklistId);
  const {
    updateStatus,
    renameItem,
    deleteItem,
    isUpdatingStatus,
    isRenaming,
    isDeleting,
  } = useUpdateChecklistItem({
    checklistId: numericChecklistId,
  });

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    createItem(
      { itemName: newItemName },
      {
        onSuccess: () => {
          setNewItemName("");
          setIsCreating(false);
        },
      }
    );
  };

  const handleToggleStatus = (itemId: number) => {
    updateStatus(itemId);
  };

  const handleStartEdit = (item: ChecklistItem) => {
    setEditingItem(item.id);
    setEditName(item.name);
  };

  const handleSaveEdit = (itemId: number) => {
    if (!editName.trim()) return;

    renameItem(
      { checklistItemId: itemId, itemName: editName },
      {
        onSuccess: () => {
          setEditingItem(null);
          setEditName("");
        },
      }
    );
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditName("");
  };

  const handleDeleteItem = (itemId: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus item ini?")) {
      deleteItem(itemId);
    }
  };

  const completedItems = items.filter(
    (item) => item.itemCompletionStatus
  ).length;
  const totalItems = items.length;
  const progressPercentage =
    totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return {
    items,
    isLoading,
    error,
    newItemName,
    setNewItemName,
    isCreating,
    setIsCreating,
    handleCreateItem,
    handleToggleStatus,
    handleStartEdit,
    handleSaveEdit,
    handleCancelEdit,
    handleDeleteItem,
    editingItem,
    setEditingItem,
    editName,
    setEditName,
    isCreatingItem,
    isUpdatingStatus,
    isRenaming,
    isDeleting,
    progressPercentage,
    completedItems,
    totalItems,
    checklistId,
  };
};

export default useCheckListDetails;
