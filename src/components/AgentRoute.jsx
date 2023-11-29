import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAgent from "../hooks/useAgent";

function AgentRoute({ children }) {
  const { user, loading } = useAuth();
  const [isAgent, isAgentPending] = useAgent();
  //   const location = useLocation();

  // console.log("location in protected route", location);

  if (loading || isAgentPending) {
    return (
      <div className="absolute inset-0 bg-slate-300/30 text-center flex justify-center items-center">
        {/* <span className="loading loading-bars loading-lg"></span> */}
        <span className="loading loading-dots loading-md"></span>
      </div>
    );
  }

  if (user && isAgent) {
    return children;
  }

  return <Navigate to="/login" />;
}

export default AgentRoute;
