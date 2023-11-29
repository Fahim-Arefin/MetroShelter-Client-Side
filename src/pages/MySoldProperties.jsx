import { useQuery } from "@tanstack/react-query";
import useWishListAPI from "../hooks/API/useWishListAPI";
import useAuth from "../hooks/useAuth";
import SpinnerWithBlur from "../components/SpinnerWithBlur";
import DataError from "../components/DataError";
import DataNotFound from "../components/DataNotFound";
import React, { useEffect, useState } from "react";
// import MyRequestPropertyCard from "../components/MyRequestPropertyCard";

function MyRequestedProperties() {
  const boxStyle = {
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
  };
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
        (offer) => offer.property?.authorEmail === user?.email
      );
      const mySoldProp = myPropOffers.filter(
        (offer) => offer.status === "bought"
      );
      setMydata(mySoldProp);
    }
  }, [data, user?.email]);

  const toTotalPrice = myData.reduce((total, value) => {
    return total + value.offerAmount;
  }, 0);

  return (
    <div className="h-screen py-12 px-4 md:p-24 overflow-scroll bg-[#f6fcff]">
      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-[#f87060] via-[#f75e4d] to-[#e84a5f] text-transparent bg-clip-text">
          My Sold Properties
        </h1>
        <h3 className="text-[16px] text-[#181c23] ">
          Total property sold amount :
          {isPending ? (
            "Loading..."
          ) : (
            <span className="text-red-500 ml-2 font-semibold">
              {toTotalPrice}
            </span>
          )}
        </h3>
      </div>
      <div>{isPending && <SpinnerWithBlur />}</div>
      {error && <DataError errorMessage={error.message} />}
      {data?.length === 0 && <DataNotFound className="" />}
      {data && myData && (
        <div
          style={boxStyle}
          className="grid grid-cols-1 overflow-x-auto mt-12"
        >
          <table className="w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-8 px-4 border-b bg-gray-700 text-white">
                  Property Title
                </th>

                <th className="py-8 px-4 border-b bg-gray-700 text-white">
                  Location
                </th>
                <th className="py-8 px-4 border-b bg-gray-700 text-white">
                  Buyer Email
                </th>

                <th className="py-8 px-4 border-b bg-gray-700 text-white">
                  Buyer Name
                </th>

                <th className="py-8 px-4 border-b bg-gray-700 text-white">
                  Sold Price
                </th>
              </tr>
            </thead>
            <tbody>
              {myData.map((offerData, index) => (
                <React.Fragment key={offerData._id}>
                  <tr className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="py-6 px-4 border-b text-center">
                      {offerData.property.title}
                    </td>
                    <td className="py-6 px-4 border-b text-center">
                      {offerData.property.cityName}
                    </td>
                    <td className="py-6 px-4 border-b text-center">
                      {offerData.buyerEmail}
                    </td>
                    <td className="py-6 px-4 border-b text-center">
                      {offerData.buyerName}
                    </td>
                    <td className="py-6 px-4 border-b text-center">
                      {offerData.offerAmount}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyRequestedProperties;
