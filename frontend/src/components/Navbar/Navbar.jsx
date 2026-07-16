import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { Profiler } from "react";
import { toast } from "react-toastify";
const Navbar = ({setShowLogin}) => {
  const [menu, setMenu] = useState("home");
  const [isOpen, setIsOpen] = useState(false); // for mobile menu toggle
  const {getTotalCartAmount,token,setToken, getTotalCartItems}=useContext(StoreContext);

  const navigate=useNavigate();
  const role = localStorage.getItem("role");
const isAdmin = role === "admin";
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("currentUser");

  setToken("");

  toast.success("Logged out successfully!");

  navigate("/");
};
  return (
    <div className="relative">
      {/* Navbar Container */}
      <div className="flex justify-between items-center py-5 px-6 md:px-12 bg-white shadow-sm">
        {/* Logo */}
        <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-36" />
</Link>
        {/* Desktop Menu */}
       {/* Desktop Menu */}
{!isAdmin && (
  <ul className="hidden md:flex list-none gap-8 text-[#49557e] text-lg">
    <li
      onClick={() => setMenu("home")}
      className={`cursor-pointer pb-1 ${
        menu === "home" ? "border-b-2 border-[#49557e]" : ""
      }`}
    >
      <Link to="/">Home</Link>
    </li>

    <li
      onClick={() => setMenu("menu")}
      className={`cursor-pointer pb-1 ${
        menu === "menu" ? "border-b-2 border-[#49557e]" : ""
      }`}
    >
      <a href="#explore-menu">Menu</a>
    </li>

    <li
      onClick={() => setMenu("mobile-app")}
      className={`cursor-pointer pb-1 ${
        menu === "mobile-app" ? "border-b-2 border-[#49557e]" : ""
      }`}
    >
      <a href="#app-download">Mobile-app</a>
    </li>

    <li
      onClick={() => setMenu("contact-us")}
      className={`cursor-pointer pb-1 ${
        menu === "contact-us" ? "border-b-2 border-[#49557e]" : ""
      }`}
    >
      <a href="#footer">Contact-us</a>
    </li>
  </ul>
)}

        {/* Right Section (Desktop only) */}
      <div className="hidden lg:flex items-center gap-6">
 {!isAdmin && (
  <>
    <img
      src={assets.search_icon}
      alt="Search"
      className="w-6 h-6 cursor-pointer"
    />

    <div className="relative cursor-pointer">
      <Link to="/cart">
        <img
          src={assets.basket_icon}
          alt="Basket"
          className="w-6 h-6"
        />
      </Link>

      {getTotalCartItems() > 0 && (
        <div className="absolute top-[-8px] right-[-8px] bg-[tomato] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
          {getTotalCartItems()}
        </div>
      )}
    </div>
  </>
)}

  {!token ? (
    <button
      onClick={() => setShowLogin(true)}
      className="border border-[tomato] text-[#49557e] px-6 py-2 rounded-full hover:bg-[#fff4f2] transition"
    >
      Sign In
    </button>
  ) : (
  <div className="navbar-Profile relative group z-50">
  <img src={assets.profile_icon} alt="" className="w-8 h-8 cursor-pointer" />

  <ul className="navbar-profile-dropdown absolute right-0 w-36 bg-white shadow-md rounded-md 
                 hidden group-hover:block z-50">
{!isAdmin && (
  <>
    <li
      onClick={() => navigate("/myorders")}
      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
    >
      <img src={assets.bag_icon} alt="" className="w-4 h-4" />
      <p>Orders</p>
    </li>
    <hr />
  </>
)}
    <hr />
    <li
      onClick={logout}
      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
    >
      <img src={assets.logout_icon} alt="" className="w-4 h-4" />
      <p>Logout</p>
    </li>
  </ul>
</div>

  )}
</div>


        {/* Mobile Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-3xl text-gray-700 focus:outline-none"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
     {isOpen && !isAdmin && (
        <div className="md:hidden absolute top-[70px] left-0 w-full bg-white shadow-md z-50">
          <ul className="flex flex-col items-center gap-6 py-6 text-[#49557e] text-lg">
            <li onClick={() => { setMenu("home"); setIsOpen(false); }}>
              <Link to="/">Home</Link>
            </li>
            <li onClick={() => { setMenu("menu"); setIsOpen(false); }}>
              <a href="#explore-menu">Menu</a>
            </li>
            <li onClick={() => { setMenu("mobile-app"); setIsOpen(false); }}>
              <a href="#app-download">Mobile-app</a>
            </li>
            <li onClick={() => { setMenu("contact-us"); setIsOpen(false); }}>
              <a href="#footer">Contact-us</a>
            </li>
            <li>
             
  {!token ? (
    <button
      onClick={() => setShowLogin(true)}
      className="border border-[tomato] text-[#49557e] px-6 py-2 rounded-full hover:bg-[#fff4f2] transition"
    >
      Sign In
    </button>
  ) : (
  <div className="navbar-Profile relative group z-50">
  <img src={assets.profile_icon} alt="" className="w-8 h-8 cursor-pointer" />

  <ul className="navbar-profile-dropdown absolute right-0 w-36 bg-white shadow-md rounded-md 
                 hidden group-hover:block z-50">
    <li className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer">
      <img src={assets.bag_icon} alt="" className="w-4 h-4" />
      <p>Orders</p>
    </li>
    <hr />
    <li
      onClick={() => {
        setToken("");
        localStorage.removeItem("token");
      }}
      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
    >
      <img src={assets.logout_icon} alt="" className="w-4 h-4" />
      <p>Logout</p>
    </li>
  </ul>
</div>

  )}
            
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
