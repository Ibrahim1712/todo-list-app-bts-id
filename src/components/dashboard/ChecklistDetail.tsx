import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Check,
  X,
  Edit2,
  Trash2,
  CheckSquare,
  Square,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardLayout from "./DashboardLayout";
import useCheckListDetails from "@/hooks/useCheckListDetails";

export default function ChecklistDetail() {
  const {
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
  } = useCheckListDetails();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg">Memuat item checklist...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-red-600">
            Gagal memuat item checklist. Silakan coba lagi.
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-start gap-4 mb-8">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Checklist
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">
              Detail Checklist
            </h1>
            <p className="text-gray-600">ID Checklist: {checklistId}</p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Progress</h2>
            <span className="text-2xl font-bold text-blue-600">
              {progressPercentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>
              {completedItems} dari {totalItems} item selesai
            </span>
            <span>{totalItems - completedItems} tersisa</span>
          </div>
        </div>

        {/* Add New Item Section */}
        <div className="mb-6">
          {!isCreating ? (
            <Button
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Tambah Item Baru
            </Button>
          ) : (
            <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
              <form onSubmit={handleCreateItem} className="flex gap-2">
                <Input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="Enter item name..."
                  className="flex-1"
                  autoFocus
                />
                <Button
                  type="submit"
                  disabled={isCreatingItem || !newItemName.trim()}
                >
                  {isCreatingItem ? "Adding..." : "Add"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsCreating(false);
                    setNewItemName("");
                  }}
                >
                  Cancel
                </Button>
              </form>
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className={`bg-white border border-gray-200 rounded-lg p-4 transition-all ${
                item.itemCompletionStatus ? "bg-green-50 border-green-200" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleToggleStatus(item.id)}
                  disabled={isUpdatingStatus}
                  className={`p-1 ${
                    item.itemCompletionStatus
                      ? "text-green-600 hover:text-green-700"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {item.itemCompletionStatus ? (
                    <CheckSquare className="w-5 h-5" />
                  ) : (
                    <Square className="w-5 h-5" />
                  )}
                </Button>

                <div className="flex-1">
                  {editingItem === item.id ? (
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="flex-1"
                        autoFocus
                      />
                      <Button
                        size="sm"
                        onClick={() => handleSaveEdit(item.id)}
                        disabled={isRenaming || !editName.trim()}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancelEdit}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <span
                      className={`text-lg ${
                        item.itemCompletionStatus
                          ? "line-through text-gray-500"
                          : "text-gray-900"
                      }`}
                    >
                      {item.name}
                    </span>
                  )}
                </div>

                {editingItem !== item.id && (
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleStartEdit(item)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteItem(item.id)}
                      disabled={isDeleting}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="ml-8 mt-2 text-xs text-gray-500">
                <div>
                  Created: {new Date(item.createdAt).toLocaleDateString()}
                </div>
                <div>
                  Updated: {new Date(item.updatedAt).toLocaleDateString()}
                </div>
                <div>
                  Status: {item.itemCompletionStatus ? "Completed" : "Pending"}
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <CheckSquare className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Belum ada item checklist
            </h3>
            <p className="text-gray-600 mb-4">
              Tambahkan item pertama Anda untuk mulai mengatur tugas.
            </p>
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Item Pertama
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
