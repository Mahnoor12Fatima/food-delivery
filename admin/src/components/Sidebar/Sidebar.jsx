import React from "react";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="
        w-[10%] min-h-screen
        border border-gray-400 border-t-0
        text-[max(1vw,10px)] md:w-[18%]
       
      "
    >
      <div
        className="
          pt-12 pl-[20%]
          flex flex-col gap-5
        "
      >

        {/* ADD ITEMS */}
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `
              flex items-center gap-3
              border border-gray-400 border-r-0
              p-2 rounded-l-md cursor-pointer
              transition-all
              ${isActive ? "border-[#ff6347] bg-[#fff0ed]" : ""}
            `
          }
        >
          <img src={assets.add_icon} alt="" className="w-6 h-6" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        {/* LIST ITEMS */}
        <NavLink
          to="/list"
          className={({ isActive }) =>
            `
              flex items-center gap-3
              border border-gray-400 border-r-0
              p-2 rounded-l-md cursor-pointer
              transition-all
              ${isActive ? "border-[#ff6347] bg-[#fff0ed]" : ""}
            `
          }
        >
          <img src={assets.order_icon} alt="" className="w-6 h-6" />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        {/* ORDERS */}
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `
              flex items-center gap-3
              border border-gray-400 border-r-0
              p-2 rounded-l-md cursor-pointer
              transition-all
              ${isActive ? "border-[#ff6347] bg-[#fff0ed]" : ""}
            `
          }
        >
          <img src={assets.order_icon} alt="" className="w-6 h-6" />
          <p className="hidden md:block">Orders</p>
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;
