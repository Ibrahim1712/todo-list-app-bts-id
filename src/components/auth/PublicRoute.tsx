import { Navigate } from "react-router-dom";
import LoadingSuspense from "../miscellaneous/loading-suspense";
import useGetCheckList from "@/hooks/api/useGetCheckList";

interface PublicRouteProps {
  children: React.ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const { data, isLoading } = useGetCheckList();
  const token = localStorage.getItem("token");

  if (isLoading && token) {
    return <LoadingSuspense />;
  }

  if (data && token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
