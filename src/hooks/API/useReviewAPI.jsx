import useAxiosPublic from "../../hooks/useAxiosPublic";

function useReviewAPI() {
  const axiosPublic = useAxiosPublic();

  async function createAReview(data) {
    const res = await axiosPublic.post("/reviews", data);
    return res.data;
  }

  async function getAllReviews() {
    const res = await axiosPublic.get("/reviews");
    return res.data;
  }

  async function getMyReviews(email) {
    const res = await axiosPublic.get(`/reviews/${email}`);
    return res.data;
  }

  async function deleteOneReview(id) {
    const res = await axiosPublic.delete(`/reviews/${id}`);
    return res.data;
  }

  return { createAReview, getAllReviews, getMyReviews, deleteOneReview };
}

export default useReviewAPI;
