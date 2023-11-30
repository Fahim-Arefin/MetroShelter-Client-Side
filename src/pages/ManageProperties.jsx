import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import usePropertyAPI from "../hooks/API/usePropertyAPI";
import SpinnerWithBlur from "../components/SpinnerWithBlur";
import DataError from "../components/DataError";
import DataNotFound from "../components/DataNotFound";
import React from "react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

function ManageProperties() {
  const boxStyle = {
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
  };
  const { fetchAllProperty, updateProperty } = usePropertyAPI();

  const { isPending, data, error } = useQuery({
    queryKey: ["properties"],
    queryFn: fetchAllProperty,
  });

  const queryClient = useQueryClient();
  // update data
  const mutation = useMutation({
    mutationFn: updateProperty,
    onSuccess: (data, variable) => {
      Swal.fire({
        title: "Success",
        text: `Property ${variable.status} Successfully 👌`,
        icon: "success",
      });

      console.log("inside succssess", data);
      console.log("inside succssess", variable);

      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
    onError: () => {
      Swal.fire({
        title: "Error!",
        text: "Sorry, could not update status of the property ⛔",
        icon: "error",
      });
    },
  });

  const handleVerify = (id) => {
    let findProperty = data.find((prop) => prop._id === id);
    findProperty.status = "verified";
    mutation.mutate({ id: findProperty._id, ...findProperty });
  };

  const handleReject = (id) => {
    let findProperty = data.find((prop) => prop._id === id);
    findProperty.status = "rejected";
    mutation.mutate({ id: findProperty._id, ...findProperty });
  };

  return (
    <>
      <Helmet>
        <title>MetroShelter | Manage Property</title>
      </Helmet>

      <div className="h-screen py-12 px-4 xl:px-8 xl:py-24 overflow-y-scroll">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-[#f87060] via-[#f75e4d] to-[#e84a5f] text-transparent bg-clip-text">
            Manage Properties
          </h1>
          <h3 className="text-[16px] text-[#181c23] ">
            Total Added Property : {isPending ? "Loading..." : data?.length}
          </h3>
        </div>
        <div>{isPending && <SpinnerWithBlur />}</div>
        {error && <DataError errorMessage={error.message} />}
        {mutation.isPending && <SpinnerWithBlur />}
        {data?.length === 0 && <DataNotFound className="" />}
        {data && (
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
                    Property Location
                  </th>
                  <th className="py-8 px-4 border-b bg-gray-700 text-white">
                    Agent Name
                  </th>
                  <th className="py-8 px-4 border-b bg-gray-700 text-white">
                    Agent Email
                  </th>
                  <th className="py-8 px-4 border-b bg-gray-700 text-white">
                    Price Range
                  </th>
                  <th className="py-8 px-4 border-b bg-gray-700 text-white">
                    Status
                  </th>
                  <th className="py-8 px-4 border-b bg-gray-700 text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((property, index) => (
                  <React.Fragment key={property._id}>
                    <tr className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="py-6 px-4 border-b text-center">
                        {property.title}
                      </td>
                      <td className="py-6 px-4 border-b text-center">
                        {property.cityName}
                      </td>
                      <td className="py-6 px-4 border-b text-center">
                        {property.authorName}
                      </td>
                      <td className="py-6 px-4 border-b text-center">
                        {property.authorEmail}
                      </td>
                      <td className="py-6 px-4 border-b text-center">
                        ${property.startPrice}-${property.endPrice}
                      </td>
                      <td className="py-6 px-4 border-b text-center">
                        {property.status}
                      </td>
                      <td className="py-6 px-4 border-b text-center">
                        {property.status !== "verified" &&
                          property.status !== "rejected" && (
                            <div className="flex">
                              <button
                                onClick={() => handleVerify(property._id)}
                                className="border-none bg-green-400 font-semibold tracking-wide
                                  transition-all duration-150 hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-500 
                                  focus:ring-offset-2 active:bg-green-600 disabled:cursor-not-allowed disabled:bg-green-200 
                                  py-1.5 px-3 rounded mr-2"
                              >
                                Verify
                              </button>
                              <button
                                onClick={() => handleReject(property._id)}
                                className="border-none bg-rose-500 font-semibold tracking-wide
                                  transition-all duration-150 hover:bg-rose-600 focus:outline-none focus:ring focus:ring-rose-600 
                                  focus:ring-offset-2 active:bg-rose-500 disabled:cursor-not-allowed disabled:bg-rose-400 
                                  py-1.5 px-3 rounded"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default ManageProperties;
