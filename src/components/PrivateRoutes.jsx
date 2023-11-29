import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function PrivateRoutes({ children }) {
  const { user, loading } = useAuth();
  // const location = useLocation();

  console.log("location in protected route", location);

  if (loading) {
    return (
      <div className="absolute inset-0 bg-slate-300/30 text-center flex justify-center items-center">
        {/* <span className="loading loading-bars loading-md"></span> */}
        <span className="loading loading-dots loading-md"></span>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" />;
}

export default PrivateRoutes;
