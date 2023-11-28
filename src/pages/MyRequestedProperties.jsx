import { useQuery } from "@tanstack/react-query";
import useWishListAPI from "../hooks/API/useWishListAPI";
import useAuth from "../hooks/useAuth";
import SpinnerWithBlur from "../components/SpinnerWithBlur";
import DataError from "../components/DataError";
import DataNotFound from "../components/DataNotFound";
import { useEffect, useState } from "react";
import MyRequestPropertyCard from "../components/MyRequestPropertyCard";

function MyRequestedProperties() {
  const { fetchAllOffers } = useWishListAPI();
  const { user } = useAuth();

  const { isPending, data, error } = useQuery({
    queryKey: ["wishlist", "offer"],
    queryFn: fetchAllOffers,
    enabled: user?.email ? true : false,
  });

  const [myData, setMydata] = useState([]);

  console.log(data);
  console.log(myData);

  useEffect(() => {
    if (data) {
      const myPropOffers = data.filter(
        (offer) => offer.property.authorEmail === user?.email
      );
      setMydata(myPropOffers);
    }
  }, [data, user?.email]);

  return (
    <div className="h-screen py-12 px-4 md:p-24 overflow-scroll bg-[#f6fcff]">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-[#f87060] via-[#f75e4d] to-[#e84a5f] text-transparent bg-clip-text">
          My Properties Offer
        </h1>
        <h3 className="text-[16px] text-[#181c23] ">
          Total Added Property : {isPending ? "Loading..." : myData?.length}
        </h3>
      </div>
      <div>{isPending && <SpinnerWithBlur />}</div>
      {error && <DataError errorMessage={error.message} />}
      {data?.length === 0 && <DataNotFound className="" />}
      {data && myData && (
        <div className="grid grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3 gap-8 mt-12">
          {myData.map((property) => (
            // <PropertyBroughtCard key={property._id} offerData={property} />
            <MyRequestPropertyCard key={property._id} offerData={property} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRequestedProperties;
