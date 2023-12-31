import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../useAxiosSecure";

function useWishListAPI() {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  async function createWishList(data) {
    const res = await axiosPublic.post("/wishlists", data);
    return res.data;
  }

  async function createOffer(data) {
    const res = await axiosPublic.post("/wishlists/offers", data);
    return res.data;
  }

  async function fetchAllOffers() {
    const res = await axiosPublic.get(`/wishlists/offers`);
    return res.data;
  }

  async function fetchYourWishList(email) {
    const res = await axiosSecure.get(`/wishlists/${email}`);
    return res.data;
  }
  async function fetchYourOffer(email) {
    const res = await axiosSecure.get(`/wishlists/offers/${email}`);
    return res.data;
  }

  async function updateStatus(formData) {
    console.log("formData", formData);
    const { id, status } = formData;
    const res = await axiosPublic.patch(`/wishlists/offers/${id}`, { status });
    return res.data;
  }

  async function updatePayment(formData) {
    console.log("formData", formData);
    const { id, transactionId } = formData;
    const res = await axiosPublic.patch(`/wishlists/offers/${id}/pay`, {
      transactionId,
    });
    return res.data;
  }

  async function deletePropertyFromWishList(id) {
    const res = await axiosPublic.delete(`/wishlists/${id}`);
    return res.data;
  }

  return {
    createWishList,
    fetchYourWishList,
    deletePropertyFromWishList,
    createOffer,
    fetchYourOffer,
    fetchAllOffers,
    updateStatus,
    updatePayment,
  };
}

export default useWishListAPI;
