import { useQuery } from "@tanstack/react-query";
import usePropertyAPI from "../hooks/API/usePropertyAPI";
import AdvertisementCard from "./AdvertisementCard";
import Spinner from "./Spinner";

function Advertisement() {
  const { fetchAllProperty } = usePropertyAPI();
  const {
    isPending,
    // isError,
    data: properties,
    // error,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: fetchAllProperty,
  });

  return (
    <div className="container mx-auto">
      <div className="space-y-2 px-4 md:px-12 lg:px-24">
        <h5 className="text-sm font-semibold text-[#b4b4b4] tracking-wide">
          RECENT PROPERTIES
        </h5>
        <div>
          <h1 className="text-3xl font-bold  bg-gradient-to-b from-[#e84a5f] to-[#f87060] text-transparent bg-clip-text">
            Explore the latest
          </h1>
          <h1 className="text-3xl font-bold  bg-gradient-to-t from-[#e84a5f] to-[#f87060] text-transparent bg-clip-text">
            properties available
          </h1>
        </div>
      </div>
      {isPending && <Spinner />}
      <div className="my-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-4 md:px-12 lg:px-24">
        {properties?.map((property) => (
          <AdvertisementCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
}

export default Advertisement;
