import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import LoginPopup from "../../components/LoginPopup/LoginPopup";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);

  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);

  const token = localStorage.getItem("token");

  return (
    <div className="mt-24 px-4 md:px-10">

      {/* 🔐 LOGIN POPUP */}
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      {/* Cart Header */}
      <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-gray-500 text-[clamp(12px,1vw,14px)]">
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>

      <hr className="my-4 border-gray-300" />

      {/* Cart Items */}
      {food_list.map((item, index) => {
        if (cartItems[item._id] > 0) {
          return (
            <div key={index}>
              <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-black my-3">
                <img src={`${url}/images/${item.image}`} alt="" className="w-[50px]" />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>${item.price * cartItems[item._id]}</p>

                <p
                  className="cursor-pointer text-red-600 font-bold"
                  onClick={() => removeFromCart(item._id)}
                >
                  ×
                </p>
              </div>
              <hr className="border-gray-300" />
            </div>
          );
        }
        return null;
      })}

      {/* Bottom Section */}
      <div className="mt-20 flex flex-col md:flex-row justify-between gap-[max(12vw,20px)]">

        {/* Cart Total */}
        <div className="flex-1 flex flex-col gap-5">
          <h2 className="text-xl font-semibold">Cart Totals</h2>

          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>

            <hr className="border-gray-300" />

            <div className="flex justify-between">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>

            <hr className="border-gray-300" />

            <div className="flex justify-between font-bold">
              <p>Total</p>
              <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
            </div>
          </div>

          {/* 🔥 CHECKOUT BUTTON WITH LOGIN CHECK */}
          <button
            onClick={() => {
              if (!token) {
                setShowLogin(true);
              } else {
                navigate("/order");
              }
            }}
            className="mt-4 bg-[tomato] text-white py-2 px-6 rounded-md hover:bg-gray-800 transition"
          >
            PROCEED TO CHECKOUT
          </button>

          {/* 🔥 LOGIN MESSAGE */}
          {!token && (
            <p className="text-sm mt-2 text-gray-600">
              Please{" "}
              <span
                onClick={() => setShowLogin(true)}
                className="text-[tomato] cursor-pointer font-medium"
              >
                login first
              </span>{" "}
              to continue checkout
            </p>
          )}
        </div>

        {/* Promo Code Section */}
        <div className="flex-1">
          <p className="mb-2 text-gray-700">
            If you have a promocode, enter it here
          </p>

          <div className="flex">
            <input
              type="text"
              placeholder="Promo code"
              className="flex-1 bg-gray-200 px-3 py-2 rounded-l-md focus:outline-none"
            />
            <button className="bg-[tomato] text-white px-4 py-2 rounded-r-md hover:bg-black transition">
              Submit
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;