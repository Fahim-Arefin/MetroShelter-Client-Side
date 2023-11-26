function DataNotFound({ className }) {
  return (
    <div
      className={`w-full h-[500px] flex flex-col items-center justify-center ${className}`}
    >
      <div>
        <img
          width="120"
          height="120"
          src="https://img.icons8.com/ios-filled/100/database-error.png"
          alt="database-error"
        />
      </div>
      <h1 className="text-2xl text-gray-700 font-semibold mt-4">
        ⛔ Data Not Found
      </h1>
    </div>
  );
}

export default DataNotFound;
