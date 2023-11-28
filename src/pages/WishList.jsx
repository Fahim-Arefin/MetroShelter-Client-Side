import { useQuery } from "@tanstack/react-query";
import SpinnerWithBlur from "../components/SpinnerWithBlur";
import DataError from "../components/DataError";
import DataNotFound from "../components/DataNotFound";
import useAuth from "../hooks/useAuth";
import useWishListAPI from "../hooks/API/useWishListAPI";
import WishListCard from "../components/WishListCard";

function WishList() {
  const { user } = useAuth();
  const { fetchYourWishList } = useWishListAPI();
  const { isPending, error, data } = useQuery({
    queryKey: ["wishlist", "email"],
    queryFn: () => fetchYourWishList(user.email),
    enabled: user?.email ? true : false,
  });

  console.log(data);

  return (
    <div className="h-screen py-12 px-4 md:p-24 overflow-scroll bg-[#f6fcff]">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-[#f87060] via-[#f75e4d] to-[#e84a5f] text-transparent bg-clip-text">
          My WishList
        </h1>
        <h3 className="text-[16px] text-[#181c23] ">
          Total Added Property : {isPending ? "Loading..." : data?.length}
        </h3>
      </div>
      <div>{isPending && <SpinnerWithBlur />}</div>
      {error && <DataError errorMessage={error.message} />}
      {data?.length === 0 && <DataNotFound className="" />}
      {data && (
        <div className="grid grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3 gap-8 mt-12">
          {data.map((wishlist) => (
            <WishListCard key={wishlist._id} wishlist={wishlist} />
          ))}
        </div>
      )}
    </div>
  );
}

export default WishList;
