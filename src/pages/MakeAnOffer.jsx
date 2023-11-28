import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
// import Button from "../components/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import usePropertyAPI from "../hooks/API/usePropertyAPI";
import useWishListAPI from "../hooks/API/useWishListAPI";

import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useParams } from "react-router-dom";
import DataError from "../components/DataError";
import DataNotFound from "../components/DataNotFound";
import SpinnerWithBlur from "../components/SpinnerWithBlur";
import Button from "../components/Button";

function MakeAnOffer() {
  const boxStyle = {
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
  };

  const { propertyId } = useParams();
  const { fetchOneProperty } = usePropertyAPI();
  const { user, errorToast } = useAuth();
  const { createOffer } = useWishListAPI();

  const { isPending, data, error } = useQuery({
    queryKey: ["properties", "show", propertyId],
    queryFn: () => fetchOneProperty(propertyId),
    enabled: user ? true : false,
  });

  // const queryClient = useQueryClient();

  // Mutations
  const mutation = useMutation({
    mutationFn: createOffer,
    onSuccess: () => {
      Swal.fire({
        title: "Success",
        text: "Offer given Successfully 🚩",
        icon: "success",
      });
      // queryClient.invalidateQueries({
      //   queryKey: ["properties", "show", propertyId],
      // });
    },
    onError: () => {
      Swal.fire({
        title: "Error!",
        text: "Sorry, could not give your offer ⛔",
        icon: "error",
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (inputData) => {
    console.log(inputData);
    if (new Date(inputData.buyingDate) < new Date()) {
      errorToast("Select future date", 2000);
    } else {
      const offerDate = {
        buyerEmail: user.email,
        buyerName: user.displayName,
        offerAmount: parseFloat(inputData.amount),
        offerDate: new Date(inputData.buyingDate),
        status: "pending",
        property: data,
      };
      console.log(offerDate);
      mutation.mutate(offerDate);
    }
  };

  return (
    <>
      {isPending && <SpinnerWithBlur />}
      {error && <DataError errorMessage={error.message} />}
      {data?.length === 0 && <DataNotFound className="" />}
      {data && (
        <>
          <div className="max-h-screen py-12 md:py-24 lg:py-12 xl:py-24 px-4 xl:p-24 space-y-12 overflow-scroll">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-b from-[#f87060] via-[#f75e4d] to-[#e84a5f] text-transparent bg-clip-text">
                Make An Offer
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
                {/*Agent name and Agent email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-0 md:gap-x-8  ">
                  <div className="space-y-2 col-span-1">
                    <label className=" text-gray-700 font-semibold mb-2 text-[16px]">
                      Agent Name
                    </label>
                    <input
                      type="text"
                      className=" input-field bg-gray-200 cursor-not-allowed"
                      disabled
                      value={data.authorName}
                    />
                  </div>
                  <div className="space-y-2 col-span-1">
                    <label className=" text-gray-700 font-semibold mb-2 text-[16px]">
                      Agent Email
                    </label>
                    <input
                      type="text"
                      className=" input-field bg-gray-200 cursor-not-allowed"
                      disabled
                      value={data.authorEmail}
                    />
                  </div>
                </div>
                {/*user name and user email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-0 md:gap-x-8  ">
                  <div className="space-y-2 col-span-1">
                    <label className=" text-gray-700 font-semibold mb-2 text-[16px]">
                      user Name
                    </label>
                    <input
                      type="text"
                      className=" input-field bg-gray-200 cursor-not-allowed"
                      disabled
                      value={user.displayName}
                    />
                  </div>
                  <div className="space-y-2 col-span-1">
                    <label className=" text-gray-700 font-semibold mb-2 text-[16px]">
                      user Email
                    </label>
                    <input
                      type="text"
                      className=" input-field bg-gray-200 cursor-not-allowed"
                      disabled
                      value={user.email}
                    />
                  </div>
                </div>

                {/* Property Title and date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-0 md:gap-x-8 ">
                  <div className="space-y-2 col-span-1">
                    <label className=" text-gray-700 font-semibold mb-2 text-[16px]">
                      Property Title
                    </label>
                    <input
                      type="text"
                      className="input-field w-full bg-gray-200 cursor-not-allowed"
                      disabled
                      value={data.title}
                    />
                  </div>
                  <div className="space-y-2 col-span-1">
                    <label className=" text-gray-700 font-semibold mb-2 text-[16px]">
                      Date
                    </label>
                    <input
                      type="date"
                      placeholder="Type title"
                      className="input-field"
                      {...register("buyingDate", {
                        required: true,
                      })}
                    />
                    {errors?.buyingDate?.type === "required" && (
                      <div className="flex space-x-2 items-center mt-2">
                        <div className="w-5 h-5">
                          <img
                            className="h-full w-full"
                            src="https://img.icons8.com/pastel-glyph/64/FA5252/error--v2.png"
                            alt="error--v2"
                          />
                        </div>
                        <p className="text-[#FA5252] mt-1 text-sm ">
                          Date is required
                        </p>
                      </div>
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
                      className="input-field w-full bg-gray-200 cursor-not-allowed"
                      disabled
                      value={data.startPrice}
                    />
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
                      className="input-field w-full bg-gray-200 cursor-not-allowed"
                      disabled
                      value={data.endPrice}
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
                    value={data.fullAddress}
                  />
                </div>
                {/* Amount */}
                <div className="space-y-2 col-span-1">
                  <label className=" text-gray-700 font-semibold mb-2 text-[16px]">
                    Offer Amount
                  </label>
                  <input
                    type="number"
                    placeholder="amount"
                    className="input-field w-full"
                    {...register("amount", {
                      required: true,
                      min: data.startPrice,
                      max: data.endPrice,
                    })}
                  />
                  {errors?.amount?.type === "required" && (
                    <div className="flex space-x-2 items-center mt-2">
                      <div className="w-5 h-5">
                        <img
                          className="h-full w-full"
                          src="https://img.icons8.com/pastel-glyph/64/FA5252/error--v2.png"
                          alt="error--v2"
                        />
                      </div>
                      <p className="text-[#FA5252] mt-1 text-sm ">
                        Amount is required
                      </p>
                    </div>
                  )}
                  {errors?.amount?.type === "min" && (
                    <div className="flex space-x-2 items-center mt-2">
                      <div className="w-5 h-5">
                        <img
                          className="h-full w-full"
                          src="https://img.icons8.com/pastel-glyph/64/FA5252/error--v2.png"
                          alt="error--v2"
                        />
                      </div>
                      <p className="text-[#FA5252] mt-1 text-sm ">
                        Cant offer below start price
                      </p>
                    </div>
                  )}
                  {errors?.amount?.type === "max" && (
                    <div className="flex space-x-2 items-center mt-2">
                      <div className="w-5 h-5">
                        <img
                          className="h-full w-full"
                          src="https://img.icons8.com/pastel-glyph/64/FA5252/error--v2.png"
                          alt="error--v2"
                        />
                      </div>
                      <p className="text-[#FA5252] mt-1 text-sm ">
                        Cant offer above end price
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
                    <div className="w-5 h-5">
                      <img
                        className="w-full h-full"
                        src="https://img.icons8.com/ios-filled/50/price-tag-usd--v1.png"
                        alt="price-tag-usd--v1"
                      />
                    </div>
                  )}

                  <span>{mutation.isPending ? "Offering..." : "Offer"}</span>
                </Button>
              </form>
            </div>
          </div>
        </>
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

export default MakeAnOffer;
