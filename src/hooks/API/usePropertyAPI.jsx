import useAxiosPublic from "../../hooks/useAxiosPublic";

function usePropertyAPI() {
  const axiosPublic = useAxiosPublic();

  async function fetchAllProperty(status) {
    const res = await axiosPublic.get(`/properties?status=${status}`);
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

  async function fetchSpecificAgentAddedProperties(email) {
    const res = await axiosPublic.get(`/properties/${email}`);
    return res.data;
  }

  async function fetchOneProperty(id) {
    const res = await axiosPublic.get(`/properties/show/${id}`);
    return res.data;
  }

  async function updateProperty(formData) {
    const { id, ...otherData } = formData;
    const res = await axiosPublic.patch(`/properties/${id}`, otherData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  }

  async function deleteOneProperty(id) {
    const res = await axiosPublic.delete(`/properties/${id}`);
    return res.data;
  }

  return {
    fetchAllProperty,
    createProperty,
    fetchSpecificAgentAddedProperties,
    deleteOneProperty,
    fetchOneProperty,
    updateProperty,
  };
}

export default usePropertyAPI;
