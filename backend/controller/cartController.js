
// Add products to user cart

import userModel from "../models/userModel.js";

const addToCart = async (req , res) => {
  try {
     const {  itemId , size } = req.body;
     const userId = req.user;

     const userData = await userModel.findById(userId)
     let cartItem = await userData.cartData;

     if(cartItem[itemId]){
        if (cartItem[itemId][size]) {
            cartItem[itemId][size] += 1;
        }
        else{
            cartItem[itemId][size] = 1
        }
     } else {
        cartItem[itemId] = {}
        cartItem[itemId][size] = 1;
     }

     await userModel.findByIdAndUpdate(userId , {cartItem})
     res.json({success : true , message : "Added to cart"})
  } catch (error) {
     console.log(error)
     res.json({success: false , message: error.message})
  }
}


// Update user cart

const updateCart = async (req , res) => {
    
    try {
        const {  itemId , size, quantity} = req.body;
        const userId = req.user;
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData; 

        cartData[itemId][size] = quantity;
        await userModel.findByIdAndUpdate(userId , {cartData})
        res.json({success : true , message : " cart UPdated"})

    } catch (error) {
        console.log(error)
     res.json({success: false , message: error.message})
    }
}


// get  user cart data

const getUserCart = async (req , res) => {
    try {
        const  userId  = req.user;
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        res.json({success:true , cartData})

    } catch (error) {
        console.log(error)
        res.json({success: false , message: error.message})
    }
}

export {addToCart , updateCart , getUserCart }