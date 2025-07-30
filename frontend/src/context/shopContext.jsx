import { createContext, useEffect, useState } from "react";
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import {jwtDecode} from "jwt-decode";

export const ShopContext = createContext()

const ShopContextProvider = (props) => {

  const currency = '$';
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [search,setSearch] = useState('');
  const [showSearch , setShowSearch] = useState(false);
  const [cartItems ,setCartItems] = useState({})
  const [products , setProducts] = useState([])
  const [token , setToken] = useState('')
  const navigate = useNavigate()


     useEffect(()=>{
      getProductData()
     },[])

     useEffect(() => {
  if (token) {
    getUserCart(token);
  }
}, [token]); 


     useEffect(()=> {
        const storedToken = localStorage.getItem("token");
        if(storedToken){
            try{
                  const decoded = jwtDecode(storedToken);
                  const currentTime = Date.now() / 1000;
                  if(decoded.exp < currentTime){
                        logout();
                  } else {
                      setToken(storedToken);
                      getUserCart(storedToken);  
                  }


                  const timeLeft = (decoded.exp * 1000) - Date.now();
                  if(timeLeft > 0){
                  const logoutTimer =  setTimeout(logout,timeLeft);
                  return () => clearTimeout(logoutTimer)
                  }

            } catch(err){
                  console.log("Token decode failed",err)
                  logout();
            }
        }
     },[])

     const logout = () => {
     localStorage.removeItem("token");
     setToken('');
     setCartItems({});
     toast.info("Session expired. Please login again.");
     navigate("/login");
   };

    // ... previous imports and state code stay the same

const addToCart = async (itemId ,size) => {
  if(!size){
    toast.error('select Product Size');
    return;
  }

  let cartData = structuredClone(cartItems);

  if(cartData[itemId]){
    if(cartData[itemId][size]){
      cartData[itemId][size] +=1;
    }
    else{
      cartData[itemId][size] = 1;
    }
  }
  else{
    cartData[itemId] = {};
    cartData[itemId][size] = 1;
  }

  setCartItems(cartData);

  if(token){
    try {
      await axios.post(backendUrl+ '/api/cart/add',{itemId ,size} , {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
await getUserCart(token);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        logout();
      } else {
        toast.error(error.message);
      }
    }
  }
}; // ✅ Properly closed addToCart

const updateQuantity = async (itemId,size,quantity) => {
  let cartData = structuredClone(cartItems);
  cartData[itemId][size] = quantity;
  setCartItems(cartData);

  if(token){
    try {
      await axios.post(backendUrl + '/api/cart/update' , {itemId , size,quantity} , {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
await getUserCart(token);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        logout();
      } else {
        toast.error(error.message);
      }
    }
  }
}; // ✅ Properly closed updateQuantity


     const getCartCount = () =>{
      let totalCount = 0;
      for(const items in cartItems){
            for(const item in cartItems[items]){
                 try{
            if(cartItems[items][item]>0){
                  totalCount += cartItems[items][item]
            }
                 }
                 catch(errror){
                 }
            }
      }
      return totalCount;
     }
     
     

     const getCartAmount =  () =>{
      let totalAmount = 0;
      for(const items in cartItems){
      //      console.log(items);
            let itemInfo = products.find((product)=>product._id === items)
            for(const item in cartItems[items]){
                  try{
                        if(cartItems[items][item] > 0){
                              totalAmount += itemInfo.price * cartItems[items][item];
                        }
                  }
                  catch(error){

                  }
            }
      }
      return totalAmount;
     }

     const getProductData = async () => {
        try {
      const response = await axios.get(backendUrl + "/api/product/list")
             
      
             if(response.data.success){
                  setProducts(response.data.products)
             } else{
                  toast.error(response.data.message)
             }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }
     }

     const getUserCart = async (token) => {
       try {
            const response = await axios.post(backendUrl+ '/api/cart/get',{},{
  headers: {
    Authorization: `Bearer ${token}`
  }
})
            if(response.data.success){
                  setCartItems(response.data.cartData)
            }
       } catch (error) {
             if (error.response?.status === 401) {
            toast.error("Session expired. Please login again.");
            logout();
            } else {
             toast.error(error.message);
            }
     }

}

     const value = {
           products ,token, setToken, getCartAmount,setCartItems,updateQuantity,navigate, currency , delivery_fee , search , setSearch ,getCartCount , backendUrl , showSearch , setShowSearch,cartItems,addToCart,logout
     }
     return (
        <ShopContext.Provider value={value}>
              {props.children}
        </ShopContext.Provider>
     )
}


export default ShopContextProvider;