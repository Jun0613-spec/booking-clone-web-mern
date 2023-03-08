import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };

  return (
    <div className="bg-[#003580] text-white flex justify-center relative">
      <div
        className={
          type === "list"
            ? "mt-5 mb-0 mx-0"
            : "w-full max-w-screen-lg mt-5 mb-24 mx-0"
        }
      >
        <div className="flex items-center gap-8 mb-12">
          <div className="flex items-center gap-2 border p-2 rounded-lg border-solid border-white text-xs sm:text-base">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="flex gap-2 text-xs sm:text-base">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-base">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-base">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-base">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="text-3xl font-bold">Find your next stay</h1>
            <p className="mx-0 my-5">
              Search low prices on hotels, homes and much more...
            </p>
            {!user && (
              <button className="bg-[#0071c2] text-white font-medium cursor-pointer p-2.5 border-none">
                <Link to="/login">Sign in </Link>/{" "}
                <Link to="/register">Register</Link>
              </button>
            )}
            <div className="h-12 bg-white flex items-center justify-around absolute bottom-[-25px] w-full max-w-screen-lg px-0 py-2.5 rounded-md border-2 border-solid border-[#febb02]">
              <div className="flex items-center gap-2.5">
                <FontAwesomeIcon icon={faBed} />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="border-none text-black outline-none text-sm sm:text-base"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2.5">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="text-slate-400"
                />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="text-slate-400 cursor-pointer text-xs sm:text-base"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="absolute z-[2] top-12"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="flex items-center gap-2.5">
                <FontAwesomeIcon icon={faPerson} className="text-slate-400" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="text-slate-400 cursor-pointer text-xs sm:text-base"
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                {openOptions && (
                  <div className="z-[2] absolute bg-white text-gray-500 shadow-[0px_0px_10px_-5px_rgba(0,0,0,0.4)] rounded-md top-12">
                    <div className=" w-48 flex justify-between m-2.5">
                      <span>Adult</span>
                      <div className="flex items-center gap-2.5 text-xs text-black">
                        <button
                          disabled={options.adult <= 1}
                          className="w-8 h-8 border text-[#0071c2] cursor-pointer bg-white border-solid border-[#0071c2] disabled:cursor-not-allowed"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span>{options.adult}</span>
                        <button
                          className="w-8 h-8 border text-[#0071c2] cursor-pointer bg-white border-solid border-[#0071c2] disabled:cursor-not-allowed"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="w-48 flex justify-between m-2.5">
                      <span>Children</span>
                      <div className="flex items-center gap-2.5 text-xs text-black">
                        <button
                          disabled={options.children <= 0}
                          className="w-8 h-8 border text-[#0071c2] cursor-pointer bg-white border-solid border-[#0071c2] disabled:cursor-not-allowed"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span>{options.children}</span>
                        <button
                          className="w-8 h-8 border text-[#0071c2] cursor-pointer bg-white border-solid border-[#0071c2] disabled:cursor-not-allowed"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="w-48 flex justify-between m-2.5">
                      <span>Room</span>
                      <div className="flex items-center gap-2.5 text-xs text-black">
                        <button
                          disabled={options.room <= 1}
                          className="w-8 h-8 border text-[#0071c2] cursor-pointer bg-white border-solid border-[#0071c2] disabled:cursor-not-allowed"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span>{options.room}</span>
                        <button
                          className="w-8 h-8 border text-[#0071c2] cursor-pointer bg-white border-solid border-[#0071c2] disabled:cursor-not-allowed"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  className="bg-[#0071c2] text-white font-medium cursor-pointer p-2.5 border-none rounded-md"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
