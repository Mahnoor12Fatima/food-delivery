import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
    } else {
      toast.error("Error");
    }
  };
const statusHandler=async (event,orderId)=>{
const response =await axios.post(url+"/order/status",{
  orderId,
  status:event.target.value
})
if(response.data.success)
{
  await fetchAllOrders();
}
}
  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-6">Order Page</h3>

      <div className="space-y-8">
        {orders.map((order, index) => (
          <div
            key={index}
            className="
              grid
              gap-6
              border border-[tomato]
              p-5
              text-sm text-[#505050]
              items-start

              grid-cols-1
              md:grid-cols-[0.5fr_2fr_1fr_1fr_1fr]
            "
          >
            {/* Icon */}
            <img
              src={assets.parcel_icon}
              alt=""
              className="w-12 h-12"
            />

            {/* Order Info */}
            <div>
              <p className="font-semibold">
                {order.items.map((item, index) =>
                  index === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>

              <p className="font-semibold mt-8 mb-1">
                {order.address.firstName} {order.address.lastName}
              </p>

              <div className="mb-3">
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country}, {order.address.zipcode}
                </p>
              </div>

              <p>{order.address.phone}</p>
            </div>

            {/* Items Count */}
            <p className="font-medium">
              Item: {order.items.length}
            </p>

            {/* Amount */}
            <p className="font-medium">
              ${order.amount}
            </p>

            {/* Status */}
            <select onChange={(event)=>statusHandler(event,order._id)}
            value={order.status}
              className="
                border
                px-3 py-2
                rounded-md
                text-sm
                outline-none
                border-[tomato]
                bg-[#ffe8e4]
              "
            >
              <option>Food Processing</option>
              <option>Out For Delivery</option>
              <option>Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
