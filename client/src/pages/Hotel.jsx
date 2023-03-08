import Navbar from "../components/Navbar";
import Header from "../components/Header";
import MailList from "../components/MailList";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";
import Reserve from "../components/Reserve";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/api/hotels/find/${id}`
  );
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="flex flex-col items-center mt-5">
          {open && (
            <div className="sticky w-screen h-screen bg-[rgba(0,0,0,0.613)] z-[999] flex items-center left-0 top-0">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="absolute text-3xl text-gray-300 cursor-pointer right-5 top-5"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="text-base text-gray-300 cursor-pointer m-5"
                onClick={() => handleMove("l")}
              />
              <div className="w-full h-full flex justify-center items-center">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="w-4/5 h-[80vh]"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="w-full max-w-screen-lg flex flex-col gap-2.5 relative">
            <button
              className="absolute bg-[#0071c2] text-white font-bold cursor-pointer px-5 py-2 rounded-md border-none right-0 top-2 -mt-10"
              onClick={handleClick}
            >
              Reserve or Book Now!
            </button>
            <h1 className="text-2xl">{data.name}</h1>
            <div className="text-xs flex items-center gap-2.5">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="text-[#0071c2] font-medium">
              Excellent location – {data.distance}m from center
            </span>
            <span className="text-[#008009] font-medium">
              Book a stay over £{data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className="flex flex-wrap justify-between">
              {data.photos?.map((photo, i) => (
                <div className="w-1/3" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="w-full object-cover cursor-pointer"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between gap-5 mt-5">
              <div className="flex-[3]">
                <h1 className="text-2xl">{data.title}</h1>
                <p className="text-sm mt-5">{data.desc}</p>
              </div>
              <div className="flex-1 bg-[#ebf3ff] flex flex-col gap-5 p-5">
                <h1 className="text-lg text-[#555]">
                  Perfect for a {days}-night stay!
                </h1>
                <span className="text-sm">
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2 className=" font-light">
                  <b>£{days * data.cheapestPrice * options.room}</b> ({days}{" "}
                  nights)
                </h2>
                <button
                  className="bg-[#0071c2] text-white font-bold cursor-pointer px-5 py-2.5 rounded-md border-none"
                  onClick={handleClick}
                >
                  Reserve or Book Now!
                </button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
