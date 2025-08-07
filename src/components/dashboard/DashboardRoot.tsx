import { Outlet } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";

export default function DashboardRoot() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
