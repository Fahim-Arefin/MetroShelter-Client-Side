import useAxiosPublic from "../../hooks/useAxiosPublic";

function usePropertyAPI() {
  const axiosPublic = useAxiosPublic();

  async function fetchAllProperty() {
    const res = await axiosPublic.get("/properties");
    return res.data;
  }

  async function createProperty(formData) {
    const res = await axiosPublic.post("/properties", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  }

  return { fetchAllProperty, createProperty };
}

export default usePropertyAPI;
