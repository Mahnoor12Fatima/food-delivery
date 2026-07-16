import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const List = ({url}) => {
  const [list, setList] = useState([]);
const navigate = useNavigate();
  const fetchList = async () => {
   
      const response = await axios.get(`${url}/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching list");
      }
    
  };
  const removeFood=async(foodId)=>{
     const response=await axios.post(`${url}/food/remove`,{id:foodId});
     await fetchList();//to show updated list after removing item
      if (response.data.success) {
        toast.success(response.data.message)
      }
      else{
        toast.error("Error")
      }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4 w-full">
      <p className="text-xl font-semibold">All Food List</p>

      <div className="w-full border border-gray-300 rounded-lg overflow-hidden">

        {/* --- Header --- */}
        <div className="
          grid 
          grid-cols-5 
          gap-2 
          bg-gray-100 
          py-3 
          px-4 
          text-sm 
          font-semibold
          text-gray-700
        ">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Action</span>
        </div>

        {/* --- Data Rows --- */}
        {list.map((item, index) => (
          <div
            key={index}
            className="
              grid 
              grid-cols-5 
              gap-2 
              py-3 
              px-4 
              border-t 
              border-gray-200 
              items-center
              text-sm
            "
          >
            <img
              src={`${url}/images/${item.image}`}
              alt=""
              className="w-12 h-12 object-cover rounded"
            />

            <p className="truncate">{item.name}</p>
            <p className="truncate">{item.category}</p>
            <p>${item.price}</p>
            <div className="flex gap-3 items-center">
  
  {/* Edit Icon */}
<svg
  onClick={() => navigate(`/admin/edit/${item._id}`)}
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth={2}
  stroke="currentColor"
  className="w-5 h-5 cursor-pointer text-blue-500 hover:scale-110"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M16.862 4.487a2.25 2.25 0 113.182 3.182L7.5 20.213 3 21l.787-4.5 13.075-12.013z"
  />
</svg>

<svg
  onClick={() => removeFood(item._id)}
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth={2}
  stroke="currentColor"
  className="w-5 h-5 cursor-pointer text-red-500 hover:scale-110"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M6 7h12M9 7V4h6v3m-7 4v6m4-6v6m5-10H5l1 14h12l1-14z"
  />
</svg>

</div>
           
          </div>
        ))}

      </div>
    </div>
  );
};

export default List;
