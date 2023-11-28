import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import usePropertyAPI from "../hooks/API/usePropertyAPI";
import SpinnerWithBlur from "../components/SpinnerWithBlur";
import DataError from "../components/DataError";
import DataNotFound from "../components/DataNotFound";
import MapShow from "../components/MapShow";
import { convertToCustomDateFormat } from "../util/util";
import Review from "../components/Review";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { useRef } from "react";
function PropertyDetails() {
  const { id } = useParams();
  const { fetchOneProperty } = usePropertyAPI();
  const { isPending, data, error } = useQuery({
    queryKey: ["properties", "show", id],
    queryFn: () => fetchOneProperty(id),
  });

  const modalRef = useRef(null);
  const handleApplyButton = () => {
    document.getElementById("my_modal_3").showModal();
  };

  console.log(data);
  return (
    <>
      {isPending && <SpinnerWithBlur />}
      {error && <DataError errorMessage={error.message} />}
      {data?.length === 0 && <DataNotFound className="" />}
      {data && (
        <>
          <div className="">
            <div className="w-full h-[300px] md:h-[500px] ">
              <MapShow data={data} />
            </div>
            <div className="w-full lg:w-[80%] xl:w-[60%] mt-6 mx-auto ">
              {/* bio */}
              <div className="bg-white p-6 shadow-sm rounded-xl flex flex-col space-y-2 md:space-y-0 md:flex-row justify-between md:items-center">
                {/* tag */}
                <div>
                  <div className="flex space-x-2">
                    <div className=" bg-[#2b82cb] text-[#f6fcff] text-[10px] rounded-full w-fit py-1 px-2 flex items-center space-x-1">
                      <div className="w-4 h-4">
                        <img
                          className="w-full h-full"
                          src="https://img.icons8.com/ios-filled/50/f6fcff/clock--v1.png"
                          alt="clock--v1"
                        />
                      </div>
                      <span className="first-letter:uppercase mt-[1px]">
                        {convertToCustomDateFormat(data.createdAt)}{" "}
                      </span>
                    </div>
                    <div className=" bg-gray-700 text-[#89c149] text-[10px] rounded-full w-fit py-1 px-2 flex items-center space-x-1">
                      <div className="w-4 h-4">
                        <img
                          className="w-full h-full"
                          src="https://img.icons8.com/color/48/approval--v1.png"
                          alt="approval--v1"
                        />
                      </div>
                      <span className="first-letter:uppercase">
                        {data.status}
                      </span>
                    </div>
                    <div className=" bg-[#e84a5f] text-white text-[10px] rounded-full w-fit py-1 px-2 flex items-center space-x-1">
                      <div className="w-4 h-4">
                        <img
                          className="w-full h-full"
                          src="https://img.icons8.com/ios/50/ffffff/us-dollar-circled--v2.png"
                          alt="us-dollar-circled--v2"
                        />
                      </div>
                      <span className="">
                        ${data.startPrice} - ${data.endPrice}
                      </span>
                    </div>
                  </div>
                  {/*title */}
                  <div className="text-2xl md:text-3xl font-bold mt-2">
                    {data.title}
                  </div>
                  {/* location */}
                  <div>
                    <div className="flex space-x-2 items-center space-y-1">
                      <div className="w-4 h-4">
                        <img
                          className="w-full h-full"
                          src="https://img.icons8.com/ios-filled/50/address--v1.png"
                          alt="address--v1"
                        />
                      </div>
                      <span className="text-xs mt-0.5 text-gray-700">
                        {data.fullAddress}
                      </span>
                    </div>
                  </div>
                </div>
                {/* wishList btn */}
                <div className="">
                  <button
                    className="border-none bg-[#2b82cb] font-semibold  tracking-wide
                      transition-all duration-150 hover:bg-[#519ddb] focus:outline-none focus:ring focus:ring-[#519ddb] 
                      focus:ring-offset-2 active:bg-[#2b82cb] disabled:cursor-not-allowed disabled:bg-[#2b82cb]
                       px-4 py-2 rounded-md text-white flex space-x-2 items-center"
                  >
                    <div>
                      <img
                        width="16"
                        height="16"
                        src="https://img.icons8.com/external-tal-revivo-bold-tal-revivo/24/ffffff/external-bullet-list-template-option-in-word-document-application-text-bold-tal-revivo.png"
                        alt="external-bullet-list-template-option-in-word-document-application-text-bold-tal-revivo"
                      />
                    </div>
                    <span>Add to wishlist</span>
                  </button>
                </div>
              </div>
              {/* image */}
              <div className="mt-6 w-full bg-white p-6 shadow-sm rounded-xl">
                <div className="w-full h-[300px] md:h-[500px]">
                  <img className="w-full h-full" src={data.image} alt="" />
                </div>
              </div>
              {/* description */}
              <div className="my-6 w-full bg-white p-6 shadow-sm rounded-xl">
                {data.description}
              </div>
              {/* Agent */}
              <div className="my-6 w-fit mx-auto bg-white p-6 shadow-sm rounded-xl">
                <div className="flex space-x-6 items-center">
                  <div>
                    <img src={data.authorImg} alt="" />
                  </div>
                  <div>
                    <div className="text-xl font-semibold text-gray-700 flex space-x-1 items-center mt-2">
                      <span>Property Uploader</span>
                    </div>
                    <div className="text-sm flex space-x-1 items-center mt-2">
                      <div className="w-4 h-4">
                        <img
                          className="w-full h-full"
                          src="https://img.icons8.com/ios-filled/50/user.png"
                          alt="user"
                        />
                      </div>
                      <span>{data.authorName}</span>
                    </div>
                    <div className="text-sm flex space-x-1 items-center">
                      <div className="w-4 h-4">
                        <img
                          className="w-full h-full"
                          src="https://img.icons8.com/metro/26/new-post.png"
                          alt="new-post"
                        />
                      </div>
                      <span>{data.authorEmail}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-auto w-fit">
                <Button
                  onClick={handleApplyButton}
                  primary
                  className="px-4 py-2 rounded-md w-fit flex items-center space-x-1"
                >
                  <div className="w-5 h-5">
                    <img
                      className="w-full h-full"
                      src="https://img.icons8.com/ios-filled/50/add-to-favorites--v1.png"
                      alt="add-to-favorites--v1"
                    />
                  </div>
                  <span className="mt-1">Give Review</span>
                </Button>
              </div>
              {/* Review */}
              <div
                className="my-6 w-full mx-auto bg-white p-6 shadow-sm rounded-xl
              max-h-[600px] overflow-scroll"
              >
                <div className="mb-4 text-lg  font-semibold ">All Reviews</div>
                <div className="">
                  {data.propertyReviews.map((review) => (
                    <Review key={review._id} review={review} />
                  ))}
                </div>
                <Modal modalRef={modalRef} data={data} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default PropertyDetails;
