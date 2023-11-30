import { Link, useNavigate, useRouteError } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  //if any error occur this hook will called and give error obj
  const error = useRouteError();
  //   console.log(error);
  //   error.data --> will get the no route matched error message
  //   error.message --> will get the fetching related error message
  return (
    <>
      <div className="flex min-h-screen items-start justify-center ">
        <div className="mt-24 h-auto w-[95%] space-y-4 rounded-xl p-12 text-center md:w-[70%] lg:w-[60%] xl:w-[40%]">
          <div className="w-1/2 h-1/2 mx-auto">
            <img className="w-full h-full" src="/404.svg" alt="" />
          </div>
          <p className="text-xl md:text-2xl text-[#f87060] font-semibold">
            {error?.data || error?.message}
          </p>
          <div
            className="bg-[#f87060] w-fit mx-auto px-4 py-2 rounded-md hover:bg-[#d65a4b] active:bg-[#f87060] cursor-pointer
           transition-all duration-150 text-white"
          >
            <Link onClick={() => navigate("/")}>&larr; go home</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default PageNotFound;
