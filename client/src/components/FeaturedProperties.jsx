import useFetch from "../hooks/useFetch";

const FeaturedProperties = () => {
  const { data, loading } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/api/hotels?featured=true`
  );

  return (
    <div className="w-full max-w-screen-lg flex justify-between gap-5">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="flex-1 gap-2.5 flex flex-col" key={item._id}>
              <img
                src={item.photos[0]}
                alt=""
                className="w-full h-60 object-cover rounded-md"
              />

              <span className="text-gray-600 font-bold">{item.name}</span>
              <span className="capitalize">{item.city}</span>
              <span className="font-medium">
                Starting from £{item.cheapestPrice}
              </span>
              {item.rating && (
                <div>
                  <button className="bg-[#003580] text-white font-bold mr-2.5 p-1 border-none">
                    {item.rating}
                  </button>

                  <span className="text-sm">Fabulous</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
