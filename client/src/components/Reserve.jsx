import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/hotels/room/${hotelId}`
  );
  const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(
            `${process.env.REACT_APP_BASE_URL}/rooms/availability/${roomId}`,
            {
              dates: alldates,
            }
          );
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };
  return (
    <div className="w-screen h-screen bg-[rgba(0,0,0,0.418)] fixed flex items-center justify-center left-0 top-0">
      <div className="bg-white relative p-5">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="absolute cursor-pointer right-0 top-0"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="flex items-center gap-12 p-5" key={item._id}>
            <div className="flex flex-col gap-1">
              <div className="font-medium">{item.title}</div>
              <div className="font-light">{item.desc}</div>
              <div className="text-xs">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="font-medium">{item.price}</div>
            </div>
            <div className="flex flex-wrap gap-1 text-base text-gray-600">
              {item.roomNumbers.map((roomNumber) => (
                <div className="flex flex-col">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={handleClick}
          className="bg-[#0071c2] text-white font-bold cursor-pointer w-full mt-5 px-5 py-2.5 rounded-xl border-none"
        >
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
