function SpinnerWithBlur() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-300 opacity-70 backdrop-blur-sm z-50">
      <span className="loading loading-bars loading-lg"></span>;
    </div>
  );
}

export default SpinnerWithBlur;
