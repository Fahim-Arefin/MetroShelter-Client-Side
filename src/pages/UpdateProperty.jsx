import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import Map from "../components/Map";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import usePropertyAPI from "../hooks/API/usePropertyAPI";

import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useParams } from "react-router-dom";
import SpinnerWithBlur from "../components/SpinnerWithBlur";
import DataError from "../components/DataError";
import { Helmet } from "react-helmet-async";

function UpdateProperty() {
  const boxStyle = {
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
  };

  const Base_Url = "https://nominatim.openstreetmap.org/reverse";

  // hooks
  const { user, errorToast } = useAuth();
  const { updateProperty, fetchOneProperty } = usePropertyAPI();
  const { id } = useParams();

  // fetch data
  const { isPending, data, error, isError, isFetching } = useQuery({
    queryKey: ["properties", "show", id],
    queryFn: () => fetchOneProperty(id),
  });

  //   console.log("Details", data);

  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  // update data
  const mutation = useMutation({
    mutationFn: updateProperty,
    onSuccess: () => {
      Swal.fire({
        title: "Success",
        text: "Property Updated Successfully 🚩",
        icon: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["properties", "email"] });
      queryClient.invalidateQueries({ queryKey: ["properties", "show", id] });
    },
    onError: () => {
      Swal.fire({
        title: "Error!",
        text: "Sorry, could not update your property ⛔",
        icon: "error",
      });
    },
  });

  // states
  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);
  const [country, setCountry] = useState("");
  const [cityName, setCityName] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [doImageEdit, setDoImageEdit] = useState(false);

  useEffect(() => {
    console.log("inside useEffect", data);
    if (!mapPosition[0] && !mapPosition[1]) {
      return;
    }
    if (!data) {
      return;
    }
    const format = "json";
    async function fetchLocationDetails() {
      try {
        const res = await fetch(
          `${Base_Url}?lat=${mapPosition[0]}&lon=${mapPosition[1]}&format=${format}`
        );
        const data = await res.json();
        // Extract specific location details from 'data' and update state
        console.log(data);
        setCountry(data.address.country);
        setCityName(
          data.address.city ||
            data.address.municipality ||
            data.address.state_district ||
            data.address.state
        );
        setFullAddress(data.display_name);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLocationDetails();
  }, [mapPosition, data]);

  //first time fetch position
  useEffect(() => {
    if (data) {
      setMapPosition([data?.lat, data?.lng]);
      setCityName(data.cityName);
      setCountry(data.country);
    }
  }, [isPending, data, isFetching]);

  const onSubmit = (inputData) => {
    // console.log(inputData);
    // console.log(data.image[0].name);

    let image;
    if (!doImageEdit) {
      image = data.image;
    } else {
      image = inputData.image[0];
    }

    const updateData = {
      authorImg: user.photoURL,
      authorName: user.displayName,
      authorEmail: user.email,
      title: inputData.title,
      startPrice: inputData.startPrice,
      endPrice: inputData.endPrice,
      image,
      description: inputData.description,
      lat: mapPosition[0],
      lng: mapPosition[1],
      country,
      cityName,
      fullAddress,
      status: "pending",
      isAdvertise: false,
    };
    console.log("final Data ", updateData);
    if (parseFloat(updateData.startPrice) > parseFloat(updateData.endPrice)) {
      errorToast("End Price cant not be greater than Start Price", 2000);
      return;
    }
    mutation.mutate({ id, ...updateData });
  };

  return (
    <>
      <Helmet>
        <title>MetroShelter | Update Property</title>
      </Helmet>
      {isPending ? (
        <SpinnerWithBlur />
      ) : (
        <>
          {!isError && (
            <div className="max-h-screen py-12 md:py-24 lg:py-12 xl:py-24 px-4 xl:p-24 space-y-12 overflow-scroll">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold bg-gradient-to-b from-[#f87060] via-[#f75e4d] to-[#e84a5f] text-transparent bg-clip-text">
                  Update your Property
                </h1>
                <h3 className="text-[16px] text-[#181c23] ">
                  We are glad to see you again!
                </h3>
              </div>
              <div
                style={boxStyle}
                className="w-full p-4 md:p-12 rounded-xl bg-white"
              >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
                  {/* name and email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-0 md:gap-x-8  ">
                    <div className="space-y-2 col-span-1">
                      <label className=" text-gray-700 font-semibold mb-2 text-[16px]">
                        User Name
                      </label>
                      <input
                        type="text"
                        className=" input-field bg-gray-200 cursor-not-allowed"
                        disabled
                        defaultValue={user?.displayName}
                      />
                    </div>
                    <div className="space-y-2 col-span-1">
                      <label className=" text-gray-700 font-semibold mb-2 text-[16px]">
                        User Email
                      </label>
                      <input
                        type="text"
                        className=" input-field bg-gray-200 cursor-not-allowed"
                        disabled
                        defaultValue={user?.email}
                      />
                    </div>
                  </div>

                  {/* Property Title and image*/}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-0 md:gap-x-8 ">
                    <div className="space-y-2 col-span-1">
                      <label className=" text-gray-700 font-semibold mb-2 text-[16px]">
                        Property Title
                      </label>
                      <input
                        type="text"
                        placeholder="Type title"
                        className="input-field w-full "
                        defaultValue={data.title}
                        {...register("title", { required: true })}
                      />
                      {errors?.title?.type === "required" && (
                        <div className="flex space-x-2 items-center mt-2">
                          <div className="w-5 h-5">
                            <img
                              className="h-full w-full"
                              src="https://img.icons8.com/pastel-glyph/64/FA5252/error--v2.png"
                              alt="error--v2"
                            />
                          </div>
                          <p className="text-[#FA5252] mt-1 text-sm ">
                            Title is required
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2 col-span-1">
                      <div className="flex space-x-2 items-center">
                        <label className=" text-gray-700 font-semibold text-[16px]">
                          Choose image
                        </label>
                        {doImageEdit && (
                          <Button
                            onClick={() => setDoImageEdit(false)}
                            secondary
                            className="px-2 py-1 rounded-md space-y-2 text-xs"
                          >
                            Dont Edit
                          </Button>
                        )}
                      </div>
                      {doImageEdit ? (
                        <>
                          <input
                            accept="image/*"
                            type="file"
                            className="border border-gray-700 file-input file-input-bordered w-full"
                            {...register("image", { required: true })}
                          />

                          {errors?.image?.type === "required" && (
                            <div className="flex space-x-2 items-center mt-2">
                              <div className="w-5 h-5">
                                <img
                                  className="h-full w-full"
                                  src="https://img.icons8.com/pastel-glyph/64/FA5252/error--v2.png"
                                  alt="error--v2"
                                />
                              </div>
                              <p className="text-[#FA5252] mt-1 text-sm ">
                                image is required
                              </p>
                            </div>
                          )}
                        </>
                      ) : (
                        <Button
                          onClick={() => setDoImageEdit(true)}
                          secondary
                          className="px-4 py-2 rounded-md space-y-2"
                        >
                          Edit Image
                        </Button>
                      )}
                    </div>
                  </div>
                  {/* Property start price , end price*/}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-0 md:gap-x-8 ">
                    <div className="space-y-2 col-span-1">
                      <label className=" text-gray-700 font-semibold mb-2 text-[16px]">
                        Start Price
                      </label>
                      <input
                        type="number"
                        placeholder="Type here"
                        className="input-field w-full"
                        defaultValue={data.startPrice}
                        {...register("startPrice", { required: true, min: 0 })}
                      />
                      {errors?.startPrice?.type === "required" && (
                        <div className="flex space-x-2 items-center mt-2">
                          <div className="w-5 h-5">
                            <img
                              className="h-full w-full"
                              src="https://img.icons8.com/pastel-glyph/64/FA5252/error--v2.png"
                              alt="error--v2"
                            />
                          </div>
                          <p className="text-[#FA5252] mt-1 text-sm ">
                            Start price is required
                          </p>
                        </div>
                      )}
                      {errors?.startPrice?.type === "min" && (
                        <div className="flex space-x-2 items-center mt-2">
                          <div className="w-5 h-5">
                            <img
                              className="h-full w-full"
                              src="https://img.icons8.com/pastel-glyph/64/FA5252/error--v2.png"
                              alt="error--v2"
                            />
                          </div>
                          <p className="text-[#FA5252] mt-1 text-sm ">
                            Minimum start price should be zero
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2 col-span-1">
                      <label
                        htmlFor="title"
                        className=" text-gray-700 font-semibold mb-2 text-[16px]"
                      >
                        End Price
                      </label>
                      <input
                        type="number"
                        placeholder="Type here"
                        className="input-field w-full"
                        defaultValue={data.endPrice}
                        {...register("endPrice", { required: true, min: 0 })}
                      />
                      {errors?.endPrice?.type === "required" && (
                        <div className="flex space-x-2 items-center mt-2">
                          <div className="w-5 h-5">
                            <img
                              className="h-full w-full"
                              src="https://img.icons8.com/pastel-glyph/64/FA5252/error--v2.png"
                              alt="error--v2"
                            />
                          </div>
                          <p className="text-[#FA5252] mt-1 text-sm ">
                            Start price is required
                          </p>
                        </div>
                      )}
                      {errors?.endPrice?.type === "min" && (
                        <div className="flex space-x-2 items-center mt-2">
                          <div className="w-5 h-5">
                            <img
                              className="h-full w-full"
                              src="https://img.icons8.com/pastel-glyph/64/FA5252/error--v2.png"
                              alt="error--v2"
                            />
                          </div>
                          <p className="text-[#FA5252] mt-1 text-sm ">
                            Minimum end price should be zero
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Property lat & lng*/}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-0 md:gap-x-8 ">
                    <div className="space-y-2 col-span-1">
                      <label className=" text-gray-700 font-semibold mb-2 text-[16px]">
                        Latitude
                      </label>
                      <input
                        disabled
                        type="text"
                        placeholder="latitude"
                        className="input-field w-full bg-gray-200 cursor-not-allowed"
                        value={mapPosition[0]}
                        onChange={(e) => setMapPosition(e.target.value[0])}
                      />
                    </div>
                    <div className="space-y-2 col-span-1">
                      <label
                        htmlFor="title"
                        className=" text-gray-700 font-semibold mb-2 text-[16px]"
                      >
                        Longitude
                      </label>
                      <input
                        disabled
                        type="text"
                        placeholder="longitude"
                        className="input-field w-full bg-gray-200 cursor-not-allowed"
                        value={mapPosition[1]}
                        onChange={(e) => setMapPosition(e.target.value[1])}
                      />
                    </div>
                  </div>
                  {/* Property cityName & country*/}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-0 md:gap-x-8 ">
                    <div className="space-y-2 col-span-1">
                      <label className=" text-gray-700 font-semibold mb-2 text-[16px]">
                        City Name
                      </label>
                      <input
                        disabled
                        type="text"
                        placeholder="city name"
                        className="input-field w-full bg-gray-200 cursor-not-allowed"
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 col-span-1">
                      <label
                        htmlFor="title"
                        className=" text-gray-700 font-semibold mb-2 text-[16px]"
                      >
                        Country
                      </label>
                      <input
                        disabled
                        type="text"
                        placeholder="country"
                        className="input-field w-full bg-gray-200 cursor-not-allowed"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* Address */}
                  <div className="space-y-2 col-span-1">
                    <label className=" text-gray-700 font-semibold mb-2 text-[16px]">
                      Full Address
                    </label>
                    <input
                      disabled
                      type="text"
                      placeholder="address"
                      className="input-field w-full bg-gray-200 cursor-not-allowed"
                      value={fullAddress}
                      onChange={(e) => setFullAddress(e.target.value)}
                    />
                  </div>
                  {/* Description */}
                  <div className="space-y-2 col-span-1">
                    <label className=" text-gray-700 font-semibold mb-2 text-[16px]">
                      Add Description
                    </label>
                    <textarea
                      defaultValue={data.description}
                      {...register("description", { required: true })}
                      className="textarea input-field block w-full h-32"
                      placeholder="describe your property"
                    ></textarea>
                    {errors?.description?.type === "required" && (
                      <div className="flex space-x-2 items-center mt-2">
                        <div className="w-5 h-5">
                          <img
                            className="h-full w-full"
                            src="https://img.icons8.com/pastel-glyph/64/FA5252/error--v2.png"
                            alt="error--v2"
                          />
                        </div>
                        <p className="text-[#FA5252] mt-1 text-sm ">
                          Description is required
                        </p>
                      </div>
                    )}
                  </div>

                  <Button
                    disabled={mutation.isPending}
                    primary
                    className="px-4 py-2 flex items-center space-x-2 rounded-md"
                  >
                    {mutation.isPending ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <div className="w-6 h-6">
                        <img
                          className="w-full h-full"
                          src="https://img.icons8.com/pastel-glyph/64/upload--v1.png"
                          alt="upload--v1"
                        />
                      </div>
                    )}

                    <span>
                      {mutation.isPending ? "Submitting..." : "Submit"}
                    </span>
                  </Button>
                </form>
              </div>

              {/* map */}
              <div className="">
                <>
                  <div>
                    <h1 className="text-xl font-semibold text-gray-700 my-2">
                      USE THE MAP FOR PROPERTY LOCATION
                    </h1>
                  </div>
                  <Map
                    mapPosition={mapPosition}
                    setMapPosition={setMapPosition}
                  />
                </>
              </div>
            </div>
          )}
        </>
      )}
      {error && (
        <DataError errorMessage={error.message} className="items-center" />
      )}
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

export default UpdateProperty;
