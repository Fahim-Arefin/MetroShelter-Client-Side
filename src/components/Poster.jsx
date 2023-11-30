function Poster() {
  return (
    <div className="container mx-auto  mt-12 mb-24">
      <div className="space-y-2 px-4 md:px-12 lg:px-24 mb-12">
        <h5 className="text-sm font-semibold text-[#b4b4b4] tracking-wide">
          SPECIAL FEATURED ALERT
        </h5>
        <div>
          <h1 className="text-3xl font-bold  bg-gradient-to-b from-[#e84a5f] to-[#f87060] text-transparent bg-clip-text">
            Explore the latest
          </h1>
          <h1 className="text-3xl font-bold  bg-gradient-to-t from-[#e84a5f] to-[#f87060] text-transparent bg-clip-text">
            update available
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-[500px]">
        <div className="grid-cols-1 flex justify-center items-center">
          <img className="w-full md:w-[600px]" src="/map2.png" alt="map" />
        </div>
        <div className="grid-cols-1 space-y-2 px-4 md:px-12 xl:px-24 flex items-center justify-center">
          <div className="mt-12 lg:mt-0">
            <h5 className="text-sm font-semibold text-[#b4b4b4] tracking-wide">
              NEW UPDATE
            </h5>
            <h1 className="text-3xl font-bold  bg-gradient-to-b from-[#3d95cb] to-[#3d95cb] text-transparent bg-clip-text">
              Explore the latest
            </h1>
            <h1 className="text-3xl font-bold  bg-gradient-to-t from-[#3d95cb] to-[#3d95cb] text-transparent bg-clip-text">
              Map System
            </h1>
            <div className="flex flex-col mt-10 ">
              <h1 className="text-xl font-bold bg-gradient-to-t from-[#2a363a] to-[#2a363a] text-transparent bg-clip-text">
                FROM NOW ON YOU CAN
              </h1>
              <div className="space-y-3 mt-3 ">
                <div className="space-x-3">
                  <span className="text-green-500 font-bold text-sm md:text-lg">
                    ✔
                  </span>
                  <span className="text-[#2a363a] text-sm md:text-lg">
                    You can add property location through map
                  </span>
                </div>
                <div className="space-x-3">
                  <span className="text-green-500 font-bold text-sm md:text-lg">
                    ✔
                  </span>
                  <span className="text-[#2a363a] text-sm md:text-lg">
                    You can search properties on map
                  </span>
                </div>
                <div className="space-x-3">
                  <span className="text-green-500 font-bold text-sm md:text-lg">
                    ✔
                  </span>
                  <span className="text-[#2a363a] text-sm md:text-lg">
                    You can navigate through map
                  </span>
                </div>
                <div className="space-x-3">
                  <span className="text-green-500 font-bold text-sm md:text-lg">
                    ✔
                  </span>
                  <span className="text-[#2a363a] text-sm md:text-lg">
                    You can see all the properties available
                  </span>
                </div>
                <div className="space-x-3">
                  <span className="text-green-500 font-bold text-sm md:text-lg">
                    ✔
                  </span>
                  <span className="text-[#2a363a] text-sm md:text-lg">
                    You can find exact location of the property
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Poster;
