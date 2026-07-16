import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

export const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        url + "/order/userorders",
        {},
        { headers: { token } }
      );
      setData(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="my-12 px-4">
      <h2 className="text-xl font-semibold mb-6">My Orders</h2>

      <div className="flex flex-col gap-5">
        {data.map((order) => (
          <div
            key={order._id}
            className="
              grid grid-cols-1
              md:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr]
              gap-4 md:gap-8
              items-center
              border border-tomato
              p-4
              text-sm text-gray-700
              rounded-lg
            "
          >
            {/* Image */}
            <img
              src={assets.parcel_icon}
              alt=""
              className="w-12 mx-auto md:mx-0"
            />

            {/* Items */}
            <p className="text-center md:text-left">
              {order.items.map((item, index) => (
                <span key={index}>
                  {item.name} x {item.quantity}
                  {index !== order.items.length - 1 && ", "}
                </span>
              ))}
            </p>

            {/* Amount */}
            <p className="text-center">${order.amount}.00</p>

            {/* Item Count */}
            <p className="text-center">Items: {order.items.length}</p>

            {/* Status */}
            <p className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-tomato text-lg">&#x25cf;</span>
              <b className="font-medium">{order.status}</b>
            </p>

            {/* Button */}
            <button
            onClick={fetchOrders}
              className="
                bg-[#ffe1e1]
                text-gray-700
                py-2 px-4
                rounded
                hover:bg-tomato hover:text-white
                transition
              "
            >
              Track Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
