function Spinner() {
  return (
    <div className="flex justify-center items-center z-50 w-full bg-gray-100 opacity-80 h-[500px]">
      <span className="loading loading-bars loading-lg"></span>;
    </div>
  );
}

export default Spinner;
