import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

function useUser() {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { data: isUser, isPending: isUserPending } = useQuery({
    queryKey: ["users", "user"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/user/${user.email}`);
      return res.data;
    },
    enabled: user ? true : false,
  });
  return [isUser, isUserPending];
}

export default useUser;
