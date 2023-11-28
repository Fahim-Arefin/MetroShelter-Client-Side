import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useReviewAPI from "../hooks/API/useReviewAPI";
import SpinnerWithBlur from "../components/SpinnerWithBlur";
import DataError from "../components/DataError";
import DataNotFound from "../components/DataNotFound";
import Swal from "sweetalert2";

function ManageReviews() {
  const { getAllReviews, deleteOneReview } = useReviewAPI();

  const { isPending, data, error } = useQuery({
    queryKey: ["reviews"],
    queryFn: getAllReviews,
  });

  const queryClient = useQueryClient();

  // Mutations
  const mutation = useMutation({
    mutationFn: deleteOneReview,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      Swal.fire({
        title: "Success",
        text: "Property Added Successfully 🚩",
        icon: "success",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Error!",
        text: "Sorry, could not add your property ⛔",
        icon: "error",
      });
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="h-screen py-24 px-4 xl:px-24 overflow-y-scroll">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-[#f87060] via-[#f75e4d] to-[#e84a5f] text-transparent bg-clip-text">
          Manage Reviews
        </h1>
        <h3 className="text-[16px] text-[#181c23] ">
          Total Added Property : {data ? data.length : "loading..."}
        </h3>
      </div>
      {error && <DataError errorMessage={error.message} />}
      {data?.length === 0 && <DataNotFound className="" />}
      {(isPending || mutation.isPending) && <SpinnerWithBlur />}
      {data && (
        <div className="grid frid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 mt-12">
          {data.map((review) => {
            // each reviews
            return (
              <div
                key={review._id}
                className="grid-cols-1 bg-white rounded-md overflow-hidden shadow-md"
              >
                <div className="p-4 flex flex-col  h-full">
                  <div className="flex items-center mb-4 grow-0">
                    <div>
                      <img
                        className="w-10 h-10 rounded-full mr-4"
                        src={review.image}
                        alt="Reviewer Avatar"
                      />
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{review.name}</p>
                      <p className="text-gray-500">{review.email}</p>
                    </div>
                  </div>

                  <p className="text-gray-800 mb-4 grow">
                    {review.reviewDescription}
                  </p>

                  <button
                    onClick={() => handleDelete(review._id)}
                    className="border-none bg-red-500 font-semibold  tracking-wide
                            transition-all duration-150 hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-600 
                            focus:ring-offset-2 active:bg-red-500 disabled:cursor-not-allowed disabled:bg-red-300
                              text-white py-1.5 px-2 rounded-md grow-0 w-24
                              flex space-x-1"
                  >
                    <div className="w-6 h-6">
                      <img
                        className="w-full h-full"
                        src="https://img.icons8.com/glyph-neue/64/ffffff/delete-forever.png"
                        alt="delete-forever"
                      />
                    </div>
                    <span className="mt-0.5">Delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ManageReviews;
