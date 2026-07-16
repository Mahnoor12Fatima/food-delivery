import React, { useContext } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../context/StoreContext'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import { useEffect } from 'react';
const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext);
  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })
  const onChangeHandler=(event)=>{
const name=event.target.name;
const value=event.target.value;
setData(data=>({...data,[name]:value}))
  }
  const navigate = useNavigate();

const placeOrder = async (event) => {
  event.preventDefault();

  let orderItems = [];

  food_list.forEach((item) => {
    if (cartItems[item._id] > 0) {
      orderItems.push({
        ...item,
        quantity: cartItems[item._id]
      });
    }
  });

  let orderData = {
    address: data,
    items: orderItems,
    amount: getTotalCartAmount() + 2
  };

  try {
    let response = await axios.post(
      `${url}/order/place`,
      orderData,
      { headers: { token } }
    );

    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert(response.data.message || "Something went wrong!");
    }
  } catch (error) {
    console.error(error);
    alert("Server error! Check console.");
  }
};
useEffect(()=>{
if(!token)
{
navigate('/cart')
}
else if(getTotalCartAmount()===0){
navigate('/cart')
}
},[token])

  return (
   <form onSubmit={placeOrder} className="place-order flex flex-col lg:flex-row gap-10 p-6">
    <div className="place-order-left flex-1 bg-white p-6  ">
      <h2 className="title text-xl font-semibold mb-6">Delivery Information</h2>
      <div className="multi-fields flex gap-4 mb-4">
        <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' className="w-full border p-2 rounded"/>
        <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name'  className="w-full border p-2 rounded"/>
      </div>
        <input required name='email'onChange={onChangeHandler} value={data.email} className='w-full border p-2 rounded mb-4' type="text" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} className='w-full border p-2 rounded mb-4' type="text" placeholder='Street' />
        <div className="multi-fields  flex gap-4 mb-4">
        <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' className="w-full border p-2 rounded" />
        <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' className="w-full border p-2 rounded" />
      </div>
      <div className="multi-fields flex gap-4 mb-4">
        <input required name='zipcode'onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' className="w-full border p-2 rounded" />
        <input required type="text" name="country" onChange={onChangeHandler} value={data.country} placeholder='Country'  className="w-full border p-2 rounded"/>
      </div>
       <input required name="phone" onChange={onChangeHandler} value={data.phone} className='w-full border p-2 rounded mb-4' type="text" placeholder='Phone' />
    </div>
    <div className="placeorder-right w-full lg:w-1/3 bg-white p-6  ">
              <div className="flex-1 flex flex-col gap-5">
          <h2 className="text-xl font-semibold">Cart Totals</h2>
          <div>
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr className="my-2 border-gray-300" />
            <div className="flex justify-between">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr className="my-2 border-gray-300" />
            <div className="flex justify-between font-bold">
              <p>Total</p>
              <p>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
            </div>
          </div>
          <button type='submit' onClick={()=>navigate('/order')} className="mt-4 bg-[#ff6347]   w-3/4 text-white py-2 px-2 rounded-md hover:bg-gray-800 transition">
            PROCEED TO PAYMENT
          </button>
        </div>
    </div>
   </form>
  )
}

export default PlaceOrder