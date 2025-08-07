import { useState } from "react";
import { Plus, Trash2, CheckSquare, Square } from "lucide-react";
import useGetCheckList from "@/hooks/api/useGetCheckList";
import useCreateChecklist from "@/hooks/api/useCreateChecklist";
import useDeleteChecklist from "@/hooks/api/useDeleteChecklist";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardLayout from "./DashboardLayout";
import type { Checklist } from "@/types/checklist";
import BlankCheckList from "./BlankCheckList";

export default function ChecklistList() {
  const [newChecklistName, setNewChecklistName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const { data: checklists, isLoading, error } = useGetCheckList();
  const { createChecklist, isLoading: isCreatingChecklist } =
    useCreateChecklist();
  const { deleteChecklist, isLoading: isDeletingChecklist } =
    useDeleteChecklist();

  const handleCreateChecklist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChecklistName.trim()) return;

    createChecklist(
      { name: newChecklistName },
      {
        onSuccess: () => {
          setNewChecklistName("");
          setIsCreating(false);
        },
      }
    );
  };

  const handleDeleteChecklist = (checklistId: number) => {
    if (window.confirm("Are you sure you want to delete this checklist?")) {
      deleteChecklist(checklistId);
    }
  };

  const getChecklistProgress = (checklist: Checklist) => {
    if (!checklist.items || checklist.items.length === 0) return 0;
    const completedItems = checklist.items.filter(
      (item) => item.itemCompletionStatus
    ).length;
    return Math.round((completedItems / checklist.items.length) * 100);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg">Memuat daftar to do list...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-red-600">
            Gagal memuat daftar to do lists. Silakan coba lagi.
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center mb-8">
          <Button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2"
            disabled={isCreating}
          >
            <Plus className="w-4 h-4" />
            Buat Checklist Baru
          </Button>
        </div>

        {isCreating && (
          <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
            <form onSubmit={handleCreateChecklist} className="flex gap-2">
              <Input
                type="text"
                value={newChecklistName}
                onChange={(e) => setNewChecklistName(e.target.value)}
                placeholder="Masukkan nama checklist..."
                className="flex-1"
                autoFocus
              />
              <Button
                type="submit"
                disabled={isCreatingChecklist || !newChecklistName.trim()}
              >
                {isCreatingChecklist ? "Memuat..." : "Buat"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsCreating(false);
                  setNewChecklistName("");
                }}
              >
                Batal
              </Button>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {checklists.map((checklist) => (
            <div
              key={checklist.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900 truncate flex-1">
                  {checklist.name}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteChecklist(checklist.id)}
                  disabled={isDeletingChecklist}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Proses</span>
                  <span>{getChecklistProgress(checklist)}%</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getChecklistProgress(checklist)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <CheckSquare className="w-4 h-4" />
                    <span>
                      {checklist.items?.filter(
                        (item) => item.itemCompletionStatus
                      ).length || 0}{" "}
                      Selesai
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Square className="w-4 h-4" />
                    <span>{checklist.items?.length || 0} total</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => {
                    window.location.href = `/dashboard/checklist/${checklist.id}`;
                  }}
                >
                  Lihat Detail
                </Button>
              </div>
            </div>
          ))}
        </div>

        {checklists.length === 0 && (
          <BlankCheckList setIsCreating={setIsCreating} />
        )}
      </div>
    </DashboardLayout>
  );
}
