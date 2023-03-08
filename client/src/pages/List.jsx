import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../components/SearchItem";
import useFetch from "../hooks/useFetch";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, reFetch } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/api/hotels?city=${destination}&min=${
      min || 0
    }&max=${max || 999}`
  );

  const handleClick = () => {
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="flex mt-5">
        <div className="w-full max-w-screen-lg flex flex-col sm:flex-row gap-12">
          <div className="-flex-[1] bg-[#febb02] sticky h-max p-2 rounded-md top-2.5 inline-block">
            <h1 className="text-xl text-[#555] mb-2">Search</h1>
            <div className="flex flex-col gap-1 mb-2">
              <label className="text-xs">Destination</label>
              <input
                className="h-8 p-2 border-none"
                placeholder={destination}
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label className="text-xs">Check-in Date</label>
              <span
                className="h-8 bg-white flex items-center cursor-pointer p-1"
                onClick={() => setOpenDate(!openDate)}
              >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                dates[0].endDate,
                "MM/dd/yyyy"
              )}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label className="text-xs">Options</label>
              <div className="p-2.5">
                <div className="flex justify-between text-gray-600 text-xs mb-2.5">
                  <span>
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="w-12"
                  />
                </div>
                <div className="flex justify-between text-gray-600 text-xs mb-2">
                  <span>
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="w-12"
                  />
                </div>
                <div className="flex justify-between text-gray-600 text-xs mb-2">
                  <span>Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="w-12"
                    placeholder={options.adult}
                  />
                </div>
                <div className="flex justify-between text-gray-600 text-xs mb-2">
                  <span>Children</span>
                  <input
                    type="number"
                    min={0}
                    className="w-12"
                    placeholder={options.children}
                  />
                </div>
                <div className="flex justify-between text-gray-600 text-xs mb-2">
                  <span>Room</span>
                  <input
                    type="number"
                    min={1}
                    className="w-12"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button
              className=" bg-[#0071c2] text-white w-full font-medium cursor-pointer p-2 border-none rounded-md"
              onClick={handleClick}
            >
              Search
            </button>
          </div>
          <div className="flex-1">
            {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
