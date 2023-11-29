import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminPending] = useAdmin();
  // const location = useLocation();

  // console.log("location in protected route", location);

  if (loading || isAdminPending) {
    return (
      <div className="absolute inset-0 bg-slate-300/30 text-center flex justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/login" />;
}

export default AdminRoute;
