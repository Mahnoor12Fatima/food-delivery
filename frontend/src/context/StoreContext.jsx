import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext=createContext(null); 
const StoreContextProvider=(props)=>{
    const [cartItems,setCartItems]=useState({});
    const url = "https://food-delivery-production-44be.up.railway.app";
    const [token,setToken]=useState("");
    const [food_list,setFoodList]=useState([]);
    const fetchFoodList=async()=>{
        const response=await axios.get(url+"/food/list");
        setFoodList(response.data.data)
    }
      useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      await loadCartData(localStorage.getItem("token"))
    }
        }
        loadData();
 
  }, []);
 const addToCart = async (itemId) => {
  const newCart = {
    ...cartItems,
    [itemId]: (cartItems[itemId] || 0) + 1,
  };

  setCartItems(newCart);

  if (token) {
    await axios.post(url + "/cart/update", {
      userId: localStorage.getItem("userId"),
      cartData: newCart,
    }, { headers: { token } });
  }
};
const getTotalCartItems = () => {
  let total = 0;

  for (const item in cartItems) {
    if (cartItems[item] > 0) {
      total += cartItems[item];
    }
  }

  return total;
};

const removeFromCart = async (itemId) => {
  const newCart = {
    ...cartItems,
    [itemId]: cartItems[itemId] - 1,
  };

  if (newCart[itemId] < 0) newCart[itemId] = 0;

  setCartItems(newCart);

  if (token) {
    await axios.post(url + "/cart/update", {
      userId: localStorage.getItem("userId"),
      cartData: newCart,
    }, { headers: { token } });
  }
};
const loadCartData=async(token)=>{
    const response=await axios.post(url+"/cart/get",{},{headers:{token}});
    setCartItems(response.data.cartData);
}
   const getTotalCartAmount=()=>{
    let totalAmount=0;
    for(const item in cartItems){//item2:5
        if(cartItems[item]>0)
        {
        let itemInfo=food_list.find((product)=>product._id===item);
        totalAmount+=itemInfo.price*cartItems[item];//price *quantity
        }
       
    }
     return totalAmount;
   }
    const contextValue={
food_list,
cartItems,
setCartItems,
addToCart,
removeFromCart,
getTotalCartAmount,
  getTotalCartItems, 
url,
token,
setToken
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
