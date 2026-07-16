import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Update form fields
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Login or Register
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("LOGIN CLICKED");

    let newUrl = url + (currentState === "Login" ? "/user/login" : "/user/register");

    try {
      const response = await axios.post(newUrl, formData, { withCredentials: true });
      console.log("LOGIN RESPONSE:", response.data);

    if (response.data.success) {
  if(currentState === "Login") {
    setToken(response.data.token);
    localStorage.setItem("token", response.data.token);
    setShowLogin(false);
  } else {
     setCurrentState("Login"); // Switch to login
    setFormData({ name:"", email:"", password:"" }); // Clear form
  }
}

    } catch (error) {
      console.error("Login error:", error);
      alert("Network error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid bg-black/30">
      <form
        onSubmit={handleSubmit}
        className="place-self-center w-[330px] md:w-[23vw] bg-white text-gray-500 flex flex-col gap-6 p-6 rounded-md text-sm animate-fadeIn"
      >
        {/* Title Row */}
        <div className="flex justify-between items-center text-black">
          <h2 className="text-xl font-semibold">{currentState}</h2>
          <img
            src={assets.cross_icon}
            onClick={() => setShowLogin(false)}
            alt="Close"
            className="w-4 cursor-pointer"
          />
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-5">
          {currentState === "Sign Up" && (
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Your name"
              required
              className="outline-none border border-gray-300 p-3 rounded"
            />
          )}
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Your email"
            required
            className="outline-none border border-gray-300 p-3 rounded"
          />
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Your password"
            required
            className="outline-none border border-gray-300 p-3 rounded"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="bg-[tomato] text-white py-2 rounded text-base cursor-pointer"
        >
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* Checkbox */}
        <div className="flex items-start gap-2 -mt-3">
          <input type="checkbox" required className="mt-[6px]" />
          <p className="text-xs">
            By continuing, I agree to the terms of use & privacy policy.
          </p>
        </div>

        {/* Switch Login/Signup */}
        {currentState === "Login" ? (
          <p className="text-sm">
            Create a new account?{" "}
            <span
              onClick={() => setCurrentState("Sign Up")}
              className="text-[tomato] font-medium cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-sm">
            Already have an account?{" "}
            <span
              onClick={() => setCurrentState("Login")}
              className="text-[tomato] font-medium cursor-pointer"
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
