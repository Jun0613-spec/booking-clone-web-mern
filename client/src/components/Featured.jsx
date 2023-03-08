import useFetch from "../hooks/useFetch";

const Featured = () => {
  const { data, loading } = useFetch(
    "/hotels/countByCity?cities=london,manchester,edinburgh"
  );

  return (
    <div className="w-full max-w-screen-lg flex justify-between gap-5 z-[1]">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="relative text-white overflow-hidden h-64 flex-1 rounded-xl">
            <img
              src="https://q-xx.bstatic.com/xdata/images/city/300x240/613095.jpg?k=8caf960d96a59e284ac1518ac8777e89d17fda6572acd84dbec151f627c7bf07&o="
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute left-5 bottom-5">
              <h1 className="font-bold text-xl">London</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="relative text-white overflow-hidden h-64 flex-1 rounded-xl">
            <img
              src="https://r-xx.bstatic.com/xdata/images/city/300x240/687163.jpg?k=0c6630c2ae631108dda22f3c9ba147046178b9b2e3dbceb5fff4645b67bd0035&o="
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute left-5 bottom-5">
              <h1 className="font-bold text-xl">Manchester</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="relative text-white overflow-hidden h-64 flex-1 rounded-xl">
            <img
              src="https://r-xx.bstatic.com/xdata/images/city/300x240/686185.jpg?k=dc6e30f60fa23f042b872ecd6d769650f89c54414ad64ea1e5e62fafef31a609&o="
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute left-5 bottom-5">
              <h1 className="font-bold text-xl">Edinburgh</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
