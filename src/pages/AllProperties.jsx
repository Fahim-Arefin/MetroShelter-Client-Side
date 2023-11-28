import { useQuery } from "@tanstack/react-query";
import usePropertyAPI from "../hooks/API/usePropertyAPI";
import Spinner from "../components/Spinner";
import DataNotFound from "../components/DataNotFound";
import DataError from "../components/DataError";
import AllPropertyCard from "../components/AllPropertyCard";
import MultipleMapShow from "../components/MultipleMapShow";
import { useState } from "react";

function AllProperties() {
  const { fetchAllProperty } = usePropertyAPI();

  const {
    isPending,
    // isError,
    data,
    error,
  } = useQuery({
    queryKey: ["properties", "verified"],
    queryFn: () => fetchAllProperty("verified"),
  });

  const [searchTitle, setSearchTitle] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // const filteredData = data
  //   ? data.filter((property) =>
  //       property.title.toLowerCase().includes(searchTitle.toLowerCase())
  //     )
  //   : [];

  const filteredData = data
    ? data.filter(
        (property) =>
          property.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
          (!minPrice || property.startPrice >= parseFloat(minPrice)) &&
          (!maxPrice || property.endPrice <= parseFloat(maxPrice))
      )
    : [];

  return (
    <>
      {data && <MultipleMapShow data={data} />}
      <div className="min-h-screen py-12 px-4 md:p-24 bg-[#f6fcff]">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-[#f87060] via-[#f75e4d] to-[#e84a5f] text-transparent bg-clip-text">
            All Properties
          </h1>
          <h3 className="text-[16px] text-[#181c23] ">
            Total Added Property : {isPending ? "Loading..." : data?.length}
          </h3>
        </div>
        <div>{isPending && <Spinner />}</div>
        {error && <DataError errorMessage={error.message} />}
        {data?.length === 0 && <DataNotFound className="" />}
        {data && (
          <>
            <div className="flex space-x-4">
              <div className="mt-6">
                <input
                  type="text"
                  placeholder="search based on title"
                  className=" input input-bordered input-error w-full max-w-xs"
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                />
              </div>
              <div className="mt-6">
                <input
                  type="number"
                  placeholder="min price"
                  className=" input input-bordered input-error w-full max-w-xs"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <div className="mt-6">
                <input
                  type="number"
                  placeholder="max price"
                  className=" input input-bordered input-error w-full max-w-xs"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 mt-12">
              {filteredData.map((property) => (
                <AllPropertyCard key={property._id} property={property} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default AllProperties;
