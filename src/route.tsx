import { createBrowserRouter, Navigate } from "react-router-dom";
import RegistrationForm from "./components/auth/RegistrationForm";
import LoginForm from "./components/auth/LoginForm";
import DashboardRoot from "./components/dashboard/DashboardRoot";
import DashboardHome from "./components/dashboard/DashboardHome";
import ChecklistList from "./components/dashboard/ChecklistList";
import ChecklistDetail from "./components/dashboard/ChecklistDetail";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <RegistrationForm />
      </PublicRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginForm />
      </PublicRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardRoot />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "checklists",
        element: <ChecklistList />,
      },
      {
        path: "checklist/:checklistId",
        element: <ChecklistDetail />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
