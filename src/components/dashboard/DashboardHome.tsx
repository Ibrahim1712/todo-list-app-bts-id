import { LogOut } from "lucide-react";
import { PAGE_TITLES } from "@/constants/pageTitles";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Button } from "@/components/ui/button";
import DashboardLayout from "./DashboardLayout";
import ChecklistList from "./ChecklistList";

export default function DashboardHome() {
  usePageTitle({ title: PAGE_TITLES.DASHBOARD });

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                To-Do List Dashboard
              </h1>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Keluar
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <ChecklistList />
        </main>
      </div>
    </DashboardLayout>
  );
}
