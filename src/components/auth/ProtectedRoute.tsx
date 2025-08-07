import { Navigate } from "react-router-dom";
import LoadingSuspense from "../miscellaneous/loading-suspense";
import useGetCheckList from "@/hooks/api/useGetCheckList";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data, isLoading, error } = useGetCheckList();
  const token = localStorage.getItem("token");
  console.log("ProtectedRoute", { data, isLoading, error, token });

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return <LoadingSuspense />;
  }

  if (error || !data) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
