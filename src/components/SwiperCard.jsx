// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";

export default function SwiperCard({ imgData, className }) {
  const breakpoints = {
    // For mobile screens (less than 640px wide)
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    // For tablet screens (640px to 1024px wide)
    1024: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    // For desktop screens (1024px and wider)
    1540: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  };

  return (
    <div className={`${className}`}>
      <Swiper
        breakpoints={breakpoints}
        // slidesPerView={3}
        // spaceBetween={20}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="w-[95%] xl:w-[60%] mx-auto mt-12"
      >
        <div>
          {imgData.map((data) => (
            <SwiperSlide key={data.id} className="w-[20%] mb-24">
              <div className="w-[170px] h-[170px] rounded-full mx-auto">
                <div className="bg-purple-300 rounded-full relative z-10 group ">
                  <img
                    className="w-full h-full rounded-full"
                    src={data.image}
                    alt=""
                  />
                  <div
                    className="hidden group-hover:flex absolute z-30 rounded-full hover:cursor-pointer inset-0
                   bg-[#ff8173] opacity-0 hover:opacity-90 transition-all duration-200 
                    justify-center items-center"
                  >
                    <div className="flex space-x-2">
                      <img className="w-4 h-4" src="/facebook.png" alt="" />
                      <img className="w-4 h-4" src="/twitter.png" alt="" />
                      <img className="w-4 h-4" src="/insta.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2 p-4  text-center">
                <h1>{data.name}</h1>
                <h1 className="text-[#f87060]">{data.title}</h1>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}
