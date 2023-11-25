import useAxiosPublic from "../../hooks/useAxiosPublic";

function usePropertyAPI() {
  const axiosPublic = useAxiosPublic();

  async function fetchAllProperty() {
    const res = await axiosPublic.get("/properties");
    return res.data;
  }

  return { fetchAllProperty };
}

export default usePropertyAPI;
