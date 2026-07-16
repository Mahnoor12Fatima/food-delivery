import React from "react";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="flex flex-col gap-5 px-6 md:px-12" id="explore-menu">
      {/* Title */}
      <h1 className="text-3xl  font-semibold text-[#262626]">Explore Our Menu</h1>

      {/* Description */}
      <p className="text-gray-600  max-w-full lg:max-w-[60%] text-sm md:text-base">
        Choose from the diverse menu featuring a delectable array of dishes
        crafted with the finest ingredients and culinary expertise.
      </p>

      {/* Scrollable Menu List */}
      <div className="flex items-center justify-start gap-6 md:gap-8 text-center my-5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
            className="flex flex-col items-center cursor-pointer"
          >
            <img
              src={item.menu_image}
              alt={item.menu_name}
              className={`w-[7.5vw] min-w-[80px] rounded-full transition-all duration-200 ${
                category === item.menu_name
                  ? "border-4 border-[tomato] p-1"
                  : "hover:opacity-80"
              }`}
            />
            <p className="mt-2 text-gray-600 text-[clamp(16px,1.4vw,20px)]">
              {item.menu_name}
            </p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <hr className="border-none h-[2px] bg-gray-200 mt-3" />
    </div>
  );
};

export default ExploreMenu;
