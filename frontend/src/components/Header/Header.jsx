import React from "react";
import { assets } from "../../assets/assets";

const Header = () => {
  return (
    <div
      className="relative w-full h-[34vw] my-8 bg-cover bg-center flex items-end"
      style={{
        backgroundImage: `url(${assets.header_img})`,
      }}
    >
      {/* Header contents */}
      <div className="absolute bottom-[10%] left-[6vw] flex flex-col items-start gap-[1.5vw] max-w-[50%] animate-fadeIn">
        <h2 className="text-white font-medium text-[max(4.5vw,22px)] leading-tight">
          Order your favourite food here
        </h2>
        <p className="text-white  lg:block hidden text-[1vw] max-w-xl">
          Choose from the diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise.
        </p>
        <button className="bg-white text-[#747474] font-medium px-[2.3vw] py-[1vw] rounded-full text-[max(1vw,13px)] hover:bg-gray-100 transition">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
