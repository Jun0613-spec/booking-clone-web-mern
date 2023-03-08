import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col gap-2.5 text-center">
        <h1 className="text-bold text-2xl text-[#0071c2]">Booking</h1>
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          className="h-8 p-2.5"
        />
        <input
          type="Password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="h-8 p-2.5"
        />
        <button
          disabled={loading}
          onClick={handleClick}
          className="bg-[#0071c2] text-white font-bold cursor-pointer px-5 py-2.5 rounded-md border-none disabled:bg-[#0071c28c] disabled:cursor-not-allowed"
        >
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
