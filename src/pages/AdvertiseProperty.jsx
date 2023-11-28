import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import usePropertyAPI from "../hooks/API/usePropertyAPI";
import SpinnerWithBlur from "../components/SpinnerWithBlur";
import DataError from "../components/DataError";
import DataNotFound from "../components/DataNotFound";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { ToastContainer } from "react-toastify";

function ManageProperties() {
  const boxStyle = {
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
  };
  const { fetchAllProperty, updatePropertyAdvertise } = usePropertyAPI();
  const { errorToast } = useAuth();

  const { isPending, data, error } = useQuery({
    queryKey: ["properties"],
    queryFn: () => fetchAllProperty("verified"),
  });

  const [count, setCount] = useState(0);

  const queryClient = useQueryClient();
  // update data
  const mutation = useMutation({
    mutationFn: updatePropertyAdvertise,
    onSuccess: (data, variable) => {
      if (variable.isAdvertise) {
        Swal.fire({
          title: "Success",
          text: `Property Advertise Successfully 👌`,
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Success",
          text: `Property Remove from Advertisement section`,
          icon: "success",
        });
      }
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
    onError: () => {
      Swal.fire({
        title: "Error!",
        text: "Sorry, could not update the property ⛔",
        icon: "error",
      });
    },
  });

  useEffect(() => {
    if (data) {
      const res = data.filter((prop) => {
        if (prop.isAdvertise) {
          return prop;
        }
      });
      setCount(res.length);
    }
  }, [data]);

  const handleAdvertise = (id) => {
    console.log(id);
    if (count > 5) {
      errorToast("Can not Advertise more that 6 properties", 2000);
      return;
    }
    mutation.mutate({ id, isAdvertise: true });
  };

  const handleRemoveAdvertise = (id) => {
    mutation.mutate({ id, isAdvertise: false });
  };

  return (
    <>
      <div className="h-screen py-12 px-4 xl:px-16 xl:py-24 overflow-y-scroll">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-[#f87060] via-[#f75e4d] to-[#e84a5f] text-transparent bg-clip-text">
            Advertise Properties
          </h1>
          <h3 className="text-[16px] text-[#181c23] ">
            Total Added Property : {isPending ? "Loading..." : data?.length}
          </h3>
          <h3 className="text-[16px] text-[#181c23] ">
            Total Advertise : {count}
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
                    Property Image
                  </th>
                  <th className="py-8 px-4 border-b bg-gray-700 text-white">
                    Property Title
                  </th>

                  <th className="py-8 px-4 border-b bg-gray-700 text-white">
                    Agent Name
                  </th>

                  <th className="py-8 px-4 border-b bg-gray-700 text-white">
                    Price Range
                  </th>

                  <th className="py-8 px-4 border-b bg-gray-700 text-white">
                    Action
                  </th>
                  <th className="py-8 px-4 border-b bg-gray-700 text-white">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((property, index) => (
                  <React.Fragment key={property._id}>
                    <tr className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="py-6 px-4 border-b text-center">
                        <img
                          className="w-44 h-12 md:h-24 mx-auto"
                          src={property.image}
                          alt=""
                        />
                      </td>
                      <td className="py-6 px-4 border-b text-center">
                        {property.title}
                      </td>
                      <td className="py-6 px-4 border-b text-center">
                        {property.authorName}
                      </td>
                      <td className="py-6 px-4 border-b text-center">
                        ${property.startPrice}-${property.endPrice}
                      </td>
                      <td className="py-6 px-4 border-b text-center">
                        <div className="flex">
                          <button
                            onClick={() => handleAdvertise(property._id)}
                            disabled={property.isAdvertise}
                            className="border-none bg-green-400 font-semibold tracking-wide
                                  transition-all duration-150 hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-500 
                                  focus:ring-offset-2 active:bg-green-600 disabled:cursor-not-allowed disabled:bg-green-200 
                                  py-1.5 px-3 rounded mr-2 mx-auto"
                          >
                            Advertise
                          </button>
                        </div>
                      </td>
                      <td className="py-6 px-4 border-b text-center">
                        <div className="flex">
                          <button
                            onClick={() => handleRemoveAdvertise(property._id)}
                            disabled={!property.isAdvertise}
                            className="border-none bg-rose-500 font-semibold tracking-wide
                                  transition-all duration-150 hover:bg-rose-600 focus:outline-none focus:ring focus:ring-rose-600 
                                  focus:ring-offset-2 active:bg-rose-500 disabled:cursor-not-allowed disabled:bg-rose-400 
                                  py-1.5 px-3 rounded mx-auto"
                          >
                            Remove Advertise
                          </button>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{
          display: "inline-block",
          width: "auto",
        }}
      />
    </>
  );
}

export default ManageProperties;
