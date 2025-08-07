import type { Checklist } from "@/types/checklist";
import { Button } from "../ui/button";
import { CheckSquare, Square, Trash2 } from "lucide-react";

const CheckListCard = ({
  checklist,
  handleDeleteChecklist,
  isDeletingChecklist,
  getChecklistProgress,
}: {
  checklist: Checklist;
  handleDeleteChecklist: (id: number) => void;
  isDeletingChecklist: boolean;
  getChecklistProgress: (checklist: Checklist) => number;
}) => {
  return (
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
              {checklist.items?.filter((item) => item.itemCompletionStatus)
                .length || 0}{" "}
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
  );
};

export default CheckListCard;
