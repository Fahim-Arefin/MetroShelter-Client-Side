import { useQuery } from "@tanstack/react-query";
import usePropertyAPI from "../hooks/API/usePropertyAPI";
import Spinner from "../components/Spinner";
import DataNotFound from "../components/DataNotFound";
import DataError from "../components/DataError";
import AllPropertyCard from "../components/AllPropertyCard";

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

  console.log(data);

  return (
    <div className="min-h-screen py-12 px-4 md:p-24 bg-[#f6fcff]">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-[#f87060] via-[#f75e4d] to-[#e84a5f] text-transparent bg-clip-text">
          My Added Properties
        </h1>
        <h3 className="text-[16px] text-[#181c23] ">
          Total Added Property : {isPending ? "Loading..." : data?.length}
        </h3>
      </div>
      <div>{isPending && <Spinner />}</div>
      {error && <DataError errorMessage={error.message} />}
      {data?.length === 0 && <DataNotFound className="" />}
      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 mt-12">
          {data.map((property) => (
            <AllPropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AllProperties;
