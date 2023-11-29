import { useMutation, useQueryClient } from "@tanstack/react-query";
// import useAuth from "../hooks/useAuth";
import { FaTrash } from "react-icons/fa"; // Assuming these icons are available in the "react-icons/fa" package
import usePropertyAPI from "../hooks/API/usePropertyAPI";
import Swal from "sweetalert2";
import SpinnerWithBlur from "./SpinnerWithBlur";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

function PropertyBroughtCard({ offerData }) {
  //   const { user } = useAuth();
  const navigate = useNavigate();
  const { deleteOneProperty } = usePropertyAPI();
  //   const navigate = useNavigate();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteOneProperty,
    onSuccess: () => {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["properties", "email"] });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    },
  });

  console.log("offerData", offerData);

  const handlePayment = (id) => {
    navigate(`/dashboard/offer/payment/${id}`);
  };

  return (
    <>
      {mutation.isPending && <SpinnerWithBlur />}
      <div className="col-span-1 bg-white p-4 rounded-md space-y-4 shadow-md">
        <div className="group relative w-full h-[200px] mx-auto rounded-md cursor-pointer overflow-hidden">
          <img
            className="z-10 w-full h-full rounded-tl-md rounded-tr-md hover:scale-105 transition-all duration-300"
            src={offerData.property?.image} // Replace with the actual property image source
            alt={offerData.property?.title} // Replace with the actual alt text
          />
          {/* Other overlays and status indicators can remain the same */}
          <div className="absolute inset-0 z-20 opacity-30 bg-gray-700 group-hover:opacity-0 group-hover:invisible visible transition-opacity duration-300"></div>
          {/* Property Location */}
          <div className="absolute bottom-2 left-4 tracking-wider font-semibold z-40 text-[#edf2f4] text-xs rounded-full w-fit py-1 px-2 flex items-center space-x-1">
            <div className="w-5 h-5">
              <img
                className="w-full h-full"
                src="https://img.icons8.com/ios/50/ffffff/marker--v1.png"
                alt="marker--v1"
              />
            </div>
            <div>
              <span>
                {offerData.property?.cityName} , {offerData.property?.country}
              </span>
            </div>
          </div>

          {/* Agent Information */}
          <div className="absolute top-4 right-4 z-40 bg-gray-700 text-[#edf2f4] font-semibold text-xs rounded-full w-fit py-1.5 px-4 flex items-center space-x-2">
            <span>{offerData.property?.authorName}</span>
            <img
              className="w-5 h-5 ml-3 rounded-full"
              src={offerData.property?.authorImg} // Replace with the actual agent image source
              alt={offerData.property?.authorName} // Replace with the actual alt text
            />
          </div>

          {/* Verification Status */}
          {offerData.status === "pending" && (
            <div className="absolute top-4 left-4 z-40 bg-gray-700 text-blue-300 font-semibold text-xs rounded-full w-fit py-1.5 px-3 flex items-center space-x-1">
              <div className="w-4 h-4">
                <img
                  className="w-full h-full"
                  src="https://img.icons8.com/office/16/spinner-frame-5.png"
                  alt="spinner-frame-5"
                />
              </div>
              <span className="first-letter:uppercase">{offerData.status}</span>
            </div>
          )}
          {offerData.status === "accepted" && (
            <div className="absolute top-4 left-4 z-40 bg-gray-700 text-[#89c149] font-semibold text-xs rounded-full w-fit py-1.5 px-3 flex items-center space-x-1">
              <div className="w-4 h-4">
                <img
                  className="w-full h-full"
                  src="https://img.icons8.com/color/48/approval--v1.png"
                  alt="approval--v1"
                />
              </div>
              <span className="first-letter:uppercase">{offerData.status}</span>
            </div>
          )}
          {offerData.status === "rejected" && (
            <div className="absolute top-4 left-4 z-40 bg-gray-700 text-[#e84a5f] font-semibold text-xs rounded-full w-fit py-1.5 px-3 flex items-center space-x-1">
              <div className="w-4 h-4">
                <img
                  className="h-full w-full"
                  src="https://img.icons8.com/ios-glyphs/30/e84a5f/multiply.png"
                  alt="multiply"
                />
              </div>
              {/* <span className="first-letter:uppercase">{offerData.status}</span> */}
              <span className="first-letter:uppercase">Rejected</span>
            </div>
          )}
          {offerData.status === "bought" && (
            <div className="absolute top-4 left-4 z-40 bg-gray-700 text-[#2b82cb] font-semibold text-xs rounded-full w-fit py-1.5 px-3 flex items-center space-x-1">
              <div className="w-4 h-4 mb-0.5">
                <img
                  className="h-full w-full"
                  src="https://img.icons8.com/ios-filled/50/2b82cb/property.png"
                  alt="property"
                />
              </div>
              {/* <span className="first-letter:uppercase">{offerData.status}</span> */}
              <span className="first-letter:uppercase">Bought</span>
            </div>
          )}
        </div>

        {/* body */}
        <div className="px-2 ">
          <div className=" text-xl text-[#181c23] font-semibold">
            {offerData.property?.title}
          </div>
          <div className="text-sm mt-1 text-[#181c23] font-semibold">
            ${offerData.property?.startPrice} - ${offerData.property?.endPrice}
          </div>
          <div className="text-xs font-semibold mt-3 text-[#2b82cb] ">
            <span>Offered Price : ${offerData.offerAmount}</span>
          </div>

          <div className="flex gap-x-2">
            {offerData.status === "accepted" && (
              <button
                onClick={() => handlePayment(offerData._id)}
                className="border-none bg-[#2b82cb] font-semibold  tracking-wide
            transition-all duration-150 hover:bg-[#3d99e4] focus:outline-none focus:ring focus:ring-[#519ddb] 
            focus:ring-offset-2 active:bg-[#2b82cb] disabled:cursor-not-allowed disabled:bg-[#2b82cb] mt-5 text-white flex space-x-1 rounded-[4px] px-3 py-1.5 items-center"
              >
                <FaTrash className="text-sm mb-[3px]" />
                <span className="text-[16px]">Proceed to Pay</span>
              </button>
            )}
            {offerData.status === "bought" && (
              <div className="mt-6 text-xs font-semibold text-green-500">
                Transaction ID :{" "}
                <span>{offerData.transactionId.replace("m_", "i_")}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PropertyBroughtCard;
