import React, { useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useEffect } from 'react';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate=useNavigate();
  console.log(success, orderId);

  const { url } = useContext(StoreContext);
  const verifyPayment=async()=>{
    const response=await axios.post(url+"/order/verify",{success,orderId})
    if(response.data.success)
    {
navigate("/myorders");
    }
    else{
        navigate("/")
    }
  }
  useEffect(()=>{
verifyPayment();
  },[])
  return (
    <div className="min-h-[60vh] grid">
      <div
        className="
          w-24 h-24 
          border-4 border-gray-400 
          border-t-[4px] border-t-[tomato] 
          rounded-full 
          animate-spin 
          place-self-center
        "
      ></div>
    </div>
  );
};

export default Verify;
