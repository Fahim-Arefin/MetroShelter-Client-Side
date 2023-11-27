import { useNavigate } from "react-router-dom";
import Button from "./Button";

function DataError({ errorMessage, className }) {
  const navigate = useNavigate();

  return (
    <div
      className={`flex min-h-screen justify-center bg-[#f6fcff] ${className}`}
    >
      <div className="font-semibold h-auto w-[95%] space-y-4 rounded-xl p-12 text-center text-rose-600 md:w-[70%] lg:w-[60%] xl:w-[40%] ">
        <p className="text-xl md:text-2xl text-rose-600">{errorMessage}</p>

        <Button
          className="text-black px-4 py-2 rounded-md"
          primary
          onClick={() => navigate(-1)}
        >
          &larr; go back
        </Button>
      </div>
    </div>
  );
}

export default DataError;
