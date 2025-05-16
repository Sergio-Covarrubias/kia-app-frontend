import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";
import LoadingIcon from "./LoadingIcon";

function ProtectedRoute() {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex gap-x-4 items-center">
          <span className="font-medium text-lg">Loading</span>
          <LoadingIcon color="text-black" />
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ProtectedRoute;
