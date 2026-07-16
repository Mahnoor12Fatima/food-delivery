import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer id="footer" className="bg-gray-800 text-white flex flex-col items-center gap-6 px-6 md:px-16 pt-20 mt-24">
      {/* Footer content */}
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-20">
        {/* Left section */}
        <div className="flex flex-col gap-4 md:col-span-2">
          <img src={assets.logo} alt="Logo" className="w-36" />
          <p className="text-gray-300">
            Choose from the diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients and culinary expertise.
          </p>
          <div className="flex gap-4 mt-2">
            <img src={assets.facebook_icon} alt="Facebook" className="w-10 h-10 cursor-pointer" />
            <img src={assets.twitter_icon} alt="Twitter" className="w-10 h-10 cursor-pointer" />
            <img src={assets.linkedin_icon} alt="LinkedIn" className="w-10 h-10 cursor-pointer" />
          </div>
        </div>

        {/* Center section */}
        <div className="flex flex-col gap-3">
          <h2 className="text-white font-semibold text-lg">Company</h2>
          <ul className="flex flex-col gap-2">
            <li className="cursor-pointer hover:text-gray-300">Home</li>
            <li className="cursor-pointer hover:text-gray-300">About us</li>
            <li className="cursor-pointer hover:text-gray-300">Delivery</li>
            <li className="cursor-pointer hover:text-gray-300">Privacy policy</li>
          </ul>
        </div>

        {/* Right section */}
        <div className="flex flex-col gap-3">
          <h2 className="text-white font-semibold text-lg">Get In Touch</h2>
          <ul className="flex flex-col gap-2 text-gray-300">
            <li>+1-212-456-7890</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <hr className="w-full h-[2px] bg-gray-600 my-6 border-none" />

      {/* Copyright */}
      <p className="text-gray-400 text-sm">© 2024 Tomato. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
