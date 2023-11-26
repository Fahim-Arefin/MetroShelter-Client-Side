import useAuth from "../hooks/useAuth";
import Button from "./Button";
import { FaTrash, FaPencilAlt } from "react-icons/fa"; // Assuming these icons are available in the "react-icons/fa" package

function AddedPropertiesCard({ property }) {
  const { user } = useAuth();

  return (
    <div className="col-span-1 bg-white p-4 rounded-md space-y-4 shadow-md">
      <div className="group relative w-full h-[200px] mx-auto rounded-md cursor-pointer overflow-hidden">
        <img
          className="z-10 w-full h-full rounded-tl-md rounded-tr-md hover:scale-105 transition-all duration-300"
          src={property.image} // Replace with the actual property image source
          alt={property.title} // Replace with the actual alt text
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
              {property.cityName} , {property.country}
            </span>
          </div>
        </div>

        {/* Agent Information */}
        <div className="absolute top-4 right-4 z-40 bg-gray-700 text-[#edf2f4] font-semibold text-xs rounded-full w-fit py-1.5 px-4 flex items-center space-x-2">
          <span>{user.displayName}</span>
          <img
            className="w-5 h-5 ml-3 rounded-full"
            src={user.photoURL} // Replace with the actual agent image source
            alt={user.displayName} // Replace with the actual alt text
          />
        </div>

        {/* Verification Status */}
        <div className="absolute top-4 left-4 z-40 bg-gray-700 text-[#89c149] font-semibold text-xs rounded-full w-fit py-1.5 px-3 flex items-center space-x-1">
          <div className="w-4 h-4">
            <img
              className="w-full h-full"
              src="https://img.icons8.com/color/48/approval--v1.png"
              alt="approval--v1"
            />
          </div>
          <span>{property.status}</span>
        </div>
      </div>

      <div className="px-2 ">
        <div className=" text-xl text-[#181c23] font-semibold">
          {property.title}
        </div>
        <div className="text-sm mt-1 text-[#181c23] font-semibold">
          ${property.startPrice} - ${property.endPrice}
        </div>
        <div className="text-sm mt-3 text-[#6f6f6f] ">
          {property.description.length > 80 ? (
            <span>
              {property.description.substring(0, 80)}
              {" ..."}
              <span
                className="cursor-pointer hover:underline hover:underline-blue-500
               text-xs text-blue-500 font-semibold px-1"
              >
                see more
              </span>
            </span>
          ) : (
            <>{property.description}</>
          )}
        </div>

        <div className="flex justify-center gap-x-2">
          <Button
            secondary
            className="mt-5 flex space-x-1 rounded-[4px] px-3 py-1.5 items-center"
          >
            <FaPencilAlt className="text-xs" />
            <span className="text-[16px]">Update</span>
          </Button>
          <button
            className="border-none bg-[#e84a5f] font-semibold  tracking-wide
            transition-all duration-150 hover:bg-[#c2394b] focus:outline-none focus:ring focus:ring-[#e33d53] 
            focus:ring-offset-2 active:bg-[#c14253] disabled:cursor-not-allowed disabled:bg-[#fca08e] mt-5 text-white flex space-x-1 rounded-[4px] px-3 py-1.5 items-center"
          >
            <FaTrash className="text-sm mb-[3px]" />
            <span className="text-[16px]">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddedPropertiesCard;
