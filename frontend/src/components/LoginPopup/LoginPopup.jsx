
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const [currentState, setCurrentState] = useState("Login");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUrl =
      url +
      (currentState === "Login"
        ? "/user/login"
        : "/user/register");

    try {
      const response = await axios.post(newUrl, formData);

      if (response.data.success) {
        if (currentState === "Login") {
          setToken(response.data.token);

          localStorage.setItem(
            "token",
            response.data.token
          );

          localStorage.setItem(
            "role",
            response.data.role
          );
toast.success("Login successful!");
          setShowLogin(false);

          if (response.data.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        } else {
          toast.success("Registration successful! Please login.");
          setCurrentState("Login");

          setFormData({
            name: "",
            email: "",
            password: "",
          });
        }
      } else {toast.error(response.data.message);
      }
    } catch (error) {
  console.log(error);

  toast.error(
    error.response?.data?.message ||
    "Something went wrong"
  );
}
  };

  return (
    <div className="fixed inset-0 z-50 grid bg-black/30">
      <form
        onSubmit={handleSubmit}
        className="place-self-center w-[330px] md:w-[23vw] bg-white text-gray-500 flex flex-col gap-6 p-6 rounded-md text-sm"
      >
        <div className="flex justify-between items-center text-black">
          <h2 className="text-xl font-semibold">
            {currentState}
          </h2>

          <img
            src={assets.cross_icon}
            alt=""
            className="w-4 cursor-pointer"
            onClick={() => setShowLogin(false)}
          />
        </div>

        <div className="flex flex-col gap-5">
          {currentState === "Sign Up" && (
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="outline-none border p-3 rounded"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="outline-none border p-3 rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={formData.password}
            onChange={handleChange}
            required
            className="outline-none border p-3 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-[tomato] text-white py-2 rounded"
        >
          {currentState === "Sign Up"
            ? "Create Account"
            : "Login"}
        </button>

        <div className="flex items-start gap-2">
          <input type="checkbox" required />
          <p className="text-xs">
            By continuing, I agree to the terms of
            use and privacy policy.
          </p>
        </div>

        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span
              className="text-[tomato] cursor-pointer"
              onClick={() =>
                setCurrentState("Sign Up")
              }
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              className="text-[tomato] cursor-pointer"
              onClick={() =>
                setCurrentState("Login")
              }
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
