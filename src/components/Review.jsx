function Review({ review }) {
  return (
    <div className="mx-auto mb-2 bg-gray-100  rounded-md overflow-hidden shadow-md border">
      <div className="p-4">
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
              <img
                src={review.image}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{review.name}</h3>
            </div>
          </div>
          <p className="text-gray-800">{review.reviewDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default Review;
