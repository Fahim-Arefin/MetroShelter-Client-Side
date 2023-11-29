import useAxiosPublic from "../../hooks/useAxiosPublic";
// import useAxiosSecure from "../useAxiosSecure";

function useUserAPI() {
  const axiosPublic = useAxiosPublic();
  //   const axiosSecure = useAxiosSecure();

  async function getAllUser() {
    const res = await axiosPublic.get("/users");
    return res.data;
  }

  async function updateUserRole(data) {
    const { id, ...otherData } = data;
    console.log(otherData);
    console.log(id);
    const res = await axiosPublic.patch(`/users/role/${id}`, otherData);
    return res.data;
  }

  return { getAllUser, updateUserRole };
}

export default useUserAPI;
