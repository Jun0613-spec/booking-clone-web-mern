import { Link } from "react-router-dom";

const SearchItem = ({ item }) => {
  return (
    <div className="border flex flex-col w-full gap-1 mb-5 p-2 rounded-md border-solid border-gray-600">
      <img src={item.photos[0]} alt="" className="w-full h-full object-cover" />
      <div className="flex flex-col gap-2 flex-auto">
        <h1 className="text-xl text-[#0071c2]">{item.name}</h1>
        <span className="text-xs">{item.distance}m from center</span>
        <span className="text-xs bg-[#008009] text-white w-max p-1 rounded-md">
          Free airport taxi
        </span>
        <span className="text-xs font-bold">
          Studio Apartment with Air conditioning
        </span>
        <span className="text-xs">{item.desc}</span>
        <span className="text-xs text-[#008009] font-bold">
          Free cancellation{" "}
        </span>
        <span className=" text-xs text-[#008009]">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="flex-1 flex flex-col justify-between">
        {item.rating && (
          <div>
            <span className="flex justify-between">Excellent</span>
            <button className="bg-[#003580] text-white font-bold p-1 border-none">
              {item.rating}
            </button>
          </div>
        )}
        <div className="text-right flex flex-col gap-1">
          <span className="text-2xl">£{item.cheapestPrice}</span>
          <span className="text-xs text-gray-600">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="bg-[#0071c2] text-white font-bold cursor-pointer px-1 py-2.5 rounded-md border-none">
              See availability
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
