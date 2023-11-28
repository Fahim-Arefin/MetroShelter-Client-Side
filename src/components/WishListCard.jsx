import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa"; // Assuming these icons are available in the "react-icons/fa" package
import Swal from "sweetalert2";
import SpinnerWithBlur from "./SpinnerWithBlur";
import { useNavigate } from "react-router-dom";
import useWishListAPI from "../hooks/API/useWishListAPI";

function WishListCard({ wishlist }) {
  const navigate = useNavigate();
  const { deletePropertyFromWishList } = useWishListAPI();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deletePropertyFromWishList,
    onSuccess: () => {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["wishlist", "email"] });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    },
  });

  const handleOffer = (propertyId) => {
    console.log(propertyId);
    navigate(`/dashboard/offer/${propertyId}`);
  };

  const handleDelete = (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(id);
      }
    });
  };

  return (
    <>
      {mutation.isPending && <SpinnerWithBlur />}
      <div className="col-span-1 bg-white p-4 rounded-md space-y-4 shadow-md">
        <div className="group relative w-full h-[200px] mx-auto rounded-md cursor-pointer overflow-hidden">
          <img
            className="z-10 w-full h-full rounded-tl-md rounded-tr-md hover:scale-105 transition-all duration-300"
            src={wishlist.property.image} // Replace with the actual property image source
            alt={wishlist.property.title} // Replace with the actual alt text
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
                {wishlist.property.cityName} , {wishlist.property.country}
              </span>
            </div>
          </div>

          {/* Agent Information */}
          <div className="absolute top-4 right-4 z-40 bg-gray-700 text-[#edf2f4] font-semibold text-xs rounded-full w-fit py-1.5 px-4 flex items-center space-x-2">
            <span>{wishlist.property.authorName}</span>
            <img
              className="w-5 h-5 ml-3 rounded-full"
              src={wishlist.property.authorImg} // Replace with the actual agent image source
              alt={wishlist.property.authorName} // Replace with the actual alt text
            />
          </div>

          {/* Verification Status */}
          {wishlist.property.status === "pending" && (
            <div className="absolute top-4 left-4 z-40 bg-gray-700 text-blue-300 font-semibold text-xs rounded-full w-fit py-1.5 px-3 flex items-center space-x-1">
              <div className="w-4 h-4">
                <img
                  className="w-full h-full"
                  src="https://img.icons8.com/office/16/spinner-frame-5.png"
                  alt="spinner-frame-5"
                />
              </div>
              <span className="first-letter:uppercase">
                {wishlist.property.status}
              </span>
            </div>
          )}
          {wishlist.property.status === "verified" && (
            <div className="absolute top-4 left-4 z-40 bg-gray-700 text-[#89c149] font-semibold text-xs rounded-full w-fit py-1.5 px-3 flex items-center space-x-1">
              <div className="w-4 h-4">
                <img
                  className="w-full h-full"
                  src="https://img.icons8.com/color/48/approval--v1.png"
                  alt="approval--v1"
                />
              </div>
              <span className="first-letter:uppercase">
                {wishlist.property.status}
              </span>
            </div>
          )}
          {wishlist.property.status === "rejected" && (
            <div className="absolute top-4 left-4 z-40 bg-gray-700 text-[#e84a5f] font-semibold text-xs rounded-full w-fit py-1.5 px-3 flex items-center space-x-1">
              <div className="w-4 h-4">
                <img
                  className="h-full w-full"
                  src="https://img.icons8.com/ios-glyphs/30/e84a5f/multiply.png"
                  alt="multiply"
                />
              </div>
              {/* <span className="first-letter:uppercase">{wishlist.property.status}</span> */}
              <span className="first-letter:uppercase">Rejected</span>
            </div>
          )}
        </div>

        {/* body */}
        <div className="px-2 ">
          <div className=" text-xl text-[#181c23] font-semibold">
            {wishlist.property.title}
          </div>
          <div className="text-sm mt-1 text-[#181c23] font-semibold">
            ${wishlist.property.startPrice} - ${wishlist.property.endPrice}
          </div>
          <div className="text-sm mt-3 text-[#6f6f6f] ">
            {wishlist.property.description.length > 80 ? (
              <span>
                {wishlist.property.description.substring(0, 80)}
                {" ..."}
                <span
                  onClick={() =>
                    navigate(`/properties/${wishlist.property._id}`)
                  }
                  className="cursor-pointer hover:underline hover:underline-blue-500
               text-xs text-blue-500 font-semibold px-1"
                >
                  see more
                </span>
              </span>
            ) : (
              <>{wishlist.property.description}</>
            )}
          </div>

          <div className="flex gap-x-2">
            <button
              onClick={() => handleOffer(wishlist.property._id)}
              className="border-none bg-[#2b82cb] font-semibold  tracking-wide
            transition-all duration-150 hover:bg-[#106cb7] focus:outline-none focus:ring focus:ring-[#106cb7] 
            focus:ring-offset-2 active:bg-[#2b82cb] disabled:cursor-not-allowed disabled:bg-[#63a3d7] mt-5 text-white flex space-x-1 rounded-[4px] px-3 py-1.5 items-center"
            >
              <div className="w-6 h-6">
                <img
                  className="w-full h-full"
                  src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/ffffff/external-offer-ecommerce-kiranshastry-solid-kiranshastry.png"
                  alt="external-offer-ecommerce-kiranshastry-solid-kiranshastry"
                />
              </div>
              <span className="text-[16px]">Make an offer</span>
            </button>
            <button
              onClick={() => handleDelete(wishlist._id)}
              className="border-none bg-[#e84a5f] font-semibold  tracking-wide
            transition-all duration-150 hover:bg-[#c2394b] focus:outline-none focus:ring focus:ring-[#e33d53] 
            focus:ring-offset-2 active:bg-[#c14253] disabled:cursor-not-allowed disabled:bg-[#fca08e] mt-5 text-white flex space-x-1 rounded-[4px] px-3 py-1.5 items-center"
            >
              <FaTrash className="text-sm mb-[3px]" />
              <span className="text-[16px]">Remove</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default WishListCard;
