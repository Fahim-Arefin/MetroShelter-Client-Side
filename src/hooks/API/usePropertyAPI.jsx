import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../useAxiosSecure";

function usePropertyAPI() {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  async function fetchAllProperty(status) {
    const res = await axiosPublic.get(`/properties?status=${status}`);
    return res.data;
  }

  async function fetchAllAdvertiseProperty() {
    const res = await axiosPublic.get(`/properties/show/advertise`);
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

  // token applied
  async function fetchSpecificAgentAddedProperties(email) {
    const res = await axiosSecure.get(`/properties/${email}`);
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
  async function updatePropertyAdvertise(formData) {
    const { id, isAdvertise } = formData;
    const res = await axiosPublic.patch(`/properties/advertise/${id}`, {
      isAdvertise,
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
    updatePropertyAdvertise,
    fetchAllAdvertiseProperty,
  };
}

export default usePropertyAPI;
