import { useMutation, useQueryClient } from "@tanstack/react-query";
// import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import SpinnerWithBlur from "./SpinnerWithBlur";
import useWishListAPI from "../hooks/API/useWishListAPI";

// import { useNavigate } from "react-router-dom";

function MyRequestPropertyCard({ offerData }) {
  //   const { user } = useAuth();
  //   const navigate = useNavigate();
  const { updateStatus } = useWishListAPI();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateStatus,
    onSuccess: (data, variables) => {
      Swal.fire({
        title: "Success !",
        text: `You ${variables.status} this deal.`,
        icon: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["wishlist", "offer"] });

      // if (variables.status === "accepted" || variables.status === "rejected") {
      //   setHideBtn(true);
      // }
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

  const handleAccept = (id) => {
    console.log(id);
    mutation.mutate({ id, status: "accepted" });
  };
  const handleReject = (id) => {
    console.log(id);
    mutation.mutate({ id, status: "rejected" });
  };

  return (
    <>
      {mutation.isPending && <SpinnerWithBlur />}
      <div className="col-span-1 bg-white p-4 rounded-md space-y-4 shadow-md">
        <div className="group relative w-full h-[200px] mx-auto rounded-md cursor-pointer overflow-hidden">
          <img
            className="z-10 w-full h-full rounded-tl-md rounded-tr-md hover:scale-105 transition-all duration-300"
            src={offerData.property.image} // Replace with the actual property image source
            alt={offerData.property.title} // Replace with the actual alt text
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
                {offerData.property.cityName} , {offerData.property.country}
              </span>
            </div>
          </div>

          {/* Agent Information */}
          <div className="absolute top-4 right-4 z-40 bg-gray-700 text-[#edf2f4] font-semibold text-xs rounded-full w-fit py-1.5 px-4 flex items-center space-x-2">
            <span>{offerData.property.authorName}</span>
            <img
              className="w-5 h-5 ml-3 rounded-full"
              src={offerData.property.authorImg} // Replace with the actual agent image source
              alt={offerData.property.authorName} // Replace with the actual alt text
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
              <span className="first-letter:uppercase">Sold</span>
            </div>
          )}
        </div>

        {/* body */}
        <div className="px-2 ">
          <div className=" text-xl text-[#181c23] font-semibold">
            {offerData.property.title}
          </div>
          <div className="text-sm mt-1 text-[#181c23] font-semibold">
            ${offerData.property.startPrice} - ${offerData.property.endPrice}
          </div>
          <div className="text-xs font-semibold mt-3 text-[#2b82cb] ">
            <span>Buyer Name : {offerData.buyerName}</span>
          </div>
          <div className="text-xs font-semibold mt-3 text-[#2b82cb] ">
            <span>Buyer Email : {offerData.buyerEmail}</span>
          </div>
          <div className="text-xs font-semibold mt-3 text-[#2b82cb] ">
            <span>
              Offered Price :{" "}
              <span className="text-rose-500">${offerData.offerAmount}</span>
            </span>
          </div>

          <div className="flex mt-4">
            {offerData.status === "pending" && (
              <>
                <button
                  onClick={() => handleAccept(offerData._id)}
                  className="border-none bg-green-400 font-semibold tracking-wide
                                  transition-all duration-150 hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-500 
                                  focus:ring-offset-2 active:bg-green-600 disabled:cursor-not-allowed disabled:bg-green-200 
                                  py-1 px-3 rounded mr-2 flex space-x-1 items-center"
                >
                  <div className="w-4 h-4">
                    <img
                      className="w-full h-full"
                      src="https://img.icons8.com/external-flat-icons-inmotus-design/67/external-accept-video-player-flat-icons-inmotus-design.png"
                      alt="external-accept-video-player-flat-icons-inmotus-design"
                    />
                  </div>
                  <span className="mt-0.5">Accept</span>
                </button>
                <button
                  onClick={() => handleReject(offerData._id)}
                  className="border-none bg-rose-500 font-semibold tracking-wide
                                  transition-all duration-150 hover:bg-rose-600 focus:outline-none focus:ring focus:ring-rose-600 
                                  focus:ring-offset-2 active:bg-rose-500 disabled:cursor-not-allowed disabled:bg-rose-400 
                                  py-1 px-3 rounded flex space-x-1 items-center"
                >
                  <div className="w-4 h-4">
                    <img
                      className="w-full h-full"
                      src="https://img.icons8.com/ios-filled/50/hand.png"
                      alt="hand"
                    />
                  </div>
                  <span className="mt-0.5">Reject</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyRequestPropertyCard;
