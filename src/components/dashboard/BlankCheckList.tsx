import { CheckSquare, Plus } from "lucide-react";
import { Button } from "../ui/button";

const BlankCheckList = ({
  setIsCreating,
}: {
  setIsCreating: (isCreating: boolean) => void;
}) => {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        <CheckSquare className="w-16 h-16 mx-auto" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Belum ada checklist
      </h3>
      <p className="text-gray-600 mb-4">
        Buat checklist pertama Anda untuk mulai mengatur tugas Anda.
      </p>
      <Button onClick={() => setIsCreating(true)}>
        <Plus className="w-4 h-4 mr-2" />
        Buat Checklist
      </Button>
    </div>
  );
};

export default BlankCheckList;
