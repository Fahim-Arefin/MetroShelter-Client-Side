import { useQuery } from "@tanstack/react-query";
import useReviewAPI from "../hooks/API/useReviewAPI";
import Spinner from "./Spinner";

function LatestReview() {
  const { getAllReviews } = useReviewAPI();
  const { isPending, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: getAllReviews,
  });

  console.log("reviews", data);

  return (
    <>
      {isPending && <Spinner />}
      {data && (
        <div className="container mx-auto my-24">
          <div className="space-y-12 px-4 md:px-12 lg:px-24">
            <div className="space-y-2">
              <h5 className="text-sm font-semibold text-[#b4b4b4] tracking-wide">
                LATEST REVIEW
              </h5>
              <div>
                <h1 className="text-3xl font-bold  bg-gradient-to-b from-[#e84a5f] to-[#f87060] text-transparent bg-clip-text">
                  Explore the latest
                </h1>
                <h1 className="text-3xl font-bold  bg-gradient-to-t from-[#e84a5f] to-[#f87060] text-transparent bg-clip-text">
                  review available
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.slice(0, 3).map((review) => (
                <>
                  <div className="bg-white grid-cols-1 py-6 px-6 rounded-lg shadow-md">
                    <img
                      src={review.image}
                      alt="Reviewer 1"
                      className="w-12 h-12 rounded-full mb-2"
                    />
                    <h2 className="text-xl font-semibold mb-2">
                      {review.name}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {review.reviewDescription}
                    </p>
                    <p className="text-[#e84a5f] text-sm font-semibold">
                      {review.property.title}
                    </p>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LatestReview;
