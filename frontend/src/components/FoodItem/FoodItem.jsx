import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart,url } = useContext(StoreContext);

  return (
    <div className="w-full mx-auto rounded-xl shadow-md transition duration-300 animate-fadeIn hover:scale-[1.02]">
      {/* 🖼 Image Container */}
      <div className="relative">
        <img
          src={`${url}/images/${image}`}
          alt={name}
          className="w-full rounded-t-xl object-cover"
        />

        {/* Add Button */}
        {!cartItems[id] ? (
          <img
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="Add"
            className="w-[35px] h-[35px] absolute bottom-4 right-4 cursor-pointer rounded-full"
          />
        ) : (
          /* Counter Container */
          <div className="absolute bottom-4 right-4 flex items-center gap-2 px-2 py-1 bg-white rounded-full shadow">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Remove"
              className="w-6 h-6 cursor-pointer"
            />
            <p className="text-sm font-medium">{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="Add"
              className="w-6 h-6 cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <p className="text-[20px] font-medium">{name}</p>
          <img src={assets.rating_starts} alt="Rating" className="w-[70px]" />
        </div>

        <p className="text-gray-600 text-xs">{description}</p>

        <p className="text-[tomato] text-[22px] font-semibold mt-3">
          ${price}
        </p>
      </div>
    </div>
  );
};

export default FoodItem;
