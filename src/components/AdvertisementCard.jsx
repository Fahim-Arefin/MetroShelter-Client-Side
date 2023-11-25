import Button from "./Button";
import { TbListDetails } from "react-icons/tb";

function AdvertisementCard({ property }) {
  const words = property.description.split(" ");
  //   console.log(words);

  return (
    <div className="col-span-1 bg-white p-4 rounded-md space-y-4 shadow-md">
      <div className="group relative w-full h-[200px] mx-auto rounded-md cursor-pointer overflow-hidden">
        <img
          className="z-10 w-full h-full rounded-tl-md rounded-tr-md hover:scale-105  transition-all duration-300"
          src="/banner2.jpg"
          alt=""
        />
        <div className="absolute inset-0 z-20 opacity-30 bg-gray-700 group-hover:opacity-0 group-hover:invisible visible transition-opacity duration-300"></div>
        {/* status */}
        <div className="absolute top-4 left-4 z-40 bg-gray-700 text-[#89c149] font-semibold text-xs rounded-full w-fit py-1 px-2 flex items-center space-x-1">
          <div className="w-4 h-4">
            <img
              className="w-full h-full"
              src="https://img.icons8.com/color/48/approval--v1.png"
              alt="approval--v1"
            />
          </div>
          <span>{property.status}</span>
        </div>
        {/* category */}
        <div className="absolute top-4 right-4 z-40 bg-gray-700 text-[#edf2f4] font-semibold text-xs rounded-full w-fit py-1.5 px-2.5 flex items-center space-x-1">
          {/* <div className="w-4 h-4">
            <img
              className="w-full h-full"
              src="https://img.icons8.com/color/48/approval--v1.png"
              alt="approval--v1"
            />
          </div> */}
          {/* <span>{property.category}</span> */}
          <span>Rental</span>
        </div>
        {/* location */}
        <div className="absolute bottom-2 left-4 tracking-wider font-semibold z-40 text-[#edf2f4] text-xs rounded-full w-fit py-1 px-2 flex items-center space-x-1">
          <div className="w-5 h-5">
            <img
              className="w-full h-full"
              src="https://img.icons8.com/ios/50/ffffff/marker--v1.png"
              alt="marker--v1"
            />
          </div>
          <div>
            <span></span>
            <span>{property.cityName}</span>
            <span>, </span>
            <span>{property.country}</span>
          </div>
        </div>
      </div>
      <div className="px-2">
        <div className=" text-xl text-[#181c23] font-semibold">
          {property.title}
        </div>
        <div className="text-sm mt-1 text-[#181c23] font-semibold">
          {property.priceRange}
        </div>
        <div className="text-sm mt-3 text-[#6f6f6f]">
          {`${
            words.length > 20
              ? words.slice(0, 10).join(" ")
              : property.description
          } ${words.length > 20 ? "..." : ""}`}
        </div>

        <Button
          primary
          className="mt-5 flex space-x-1 rounded-[4px] px-2 py-1 items-center"
        >
          <TbListDetails className="text-lg" />
          <span className="text-lg">Details</span>
        </Button>
      </div>
    </div>
  );
}

export default AdvertisementCard;
