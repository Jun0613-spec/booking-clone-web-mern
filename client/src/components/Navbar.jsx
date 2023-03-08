import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const Navbar = () => {
  const { user } = useContext(AuthContext);

  const { dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className=" h-12 bg-[#003580] flex justify-center">
      <div className="w-full max-w-screen-lg text-white flex items-center justify-between">
        <Link to="/">
          <span className="font-bold text-xl">Booking</span>
        </Link>
        {user ? (
          <div className="flex flex-row gap-2">
            <p className="p-1">{user.username}</p>
            <button
              className="bg-white text-[#003580] p-1"
              onClick={handleClick}
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link to="/register">
              <button className="cursor-pointer bg-white  text-[#003580] ml-4 px-2 py-1 border-none">
                Register
              </button>
            </Link>
            <Link to="/login">
              <button className="cursor-pointer bg-white  text-[#003580] ml-4 px-2 py-1 border-none">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
