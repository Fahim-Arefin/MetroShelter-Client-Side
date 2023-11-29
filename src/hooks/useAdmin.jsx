import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

function useAdmin() {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { data: isAdmin, isPending: isAdminPending } = useQuery({
    queryKey: ["user", "admin"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/admin/${user.email}`);
      return res.data;
    },
    enabled: user ? true : false,
  });

  return [isAdmin, isAdminPending];
}

export default useAdmin;
