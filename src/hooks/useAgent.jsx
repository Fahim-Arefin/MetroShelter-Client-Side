import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

function useAgent() {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { data: isAgent, isPending: isAgentPending } = useQuery({
    queryKey: ["user", "agent"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/agent/${user.email}`);
      return res.data;
    },
    enabled: user ? true : false,
  });
  return [isAgent, isAgentPending];
}

export default useAgent;
