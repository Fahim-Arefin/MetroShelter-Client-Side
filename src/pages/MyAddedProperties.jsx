import { useQuery } from "@tanstack/react-query";
import usePropertyAPI from "../hooks/API/usePropertyAPI";
import Spinner from "../components/Spinner";
import AddedPropertiesCard from "../components/AddedPropertiesCard";
import useAuth from "../hooks/useAuth";
import DataNotFound from "../components/DataNotFound";
import DataError from "../components/DataError";
import { Helmet } from "react-helmet-async";

function MyAddedProperties() {
  const { fetchSpecificAgentAddedProperties } = usePropertyAPI();
  const { user } = useAuth();

  const isEnabled = user?.email ? true : false;

  const {
    isPending,
    // isError,
    data,
    error,
  } = useQuery({
    queryKey: ["properties", "email"],
    queryFn: () => fetchSpecificAgentAddedProperties(user.email),
    enabled: isEnabled,
  });

  return (
    <>
      <Helmet>
        <title>MetroShelter | Added Property</title>
      </Helmet>
      <div className="h-screen py-12 px-4 md:p-24 overflow-scroll bg-[#f6fcff]">
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
          <div className="grid grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3 gap-8 mt-12">
            {data.map((property) => (
              <AddedPropertiesCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default MyAddedProperties;
