import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";


// placeing order over Cod
const placeOrder = async (req,res) => {
    try {
        const { userId , items ,amount ,address} = req.body;
        const orderData = {
            userId ,
            items,
            address,
            amount,
            paymentMethod : "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, {cardData: {}})

        res.json({success:true , message: "Order Placed"})

    } catch (error) {
        console.log(error);
        res.json({success:false , message:error.message})
        
        
    }

}

// placeing order using Stripe
const placeOrderStripe = async (req,res) => {

}

// placeing order using Razorpay
const placeOrderRazorpay = async (req,res) => {

}

// All orders for admin Panel
const allOrders = async (req,res) => {
    try {
        

        const orders = await orderModel.find({});
        res.json({success:true , orders})
    } catch (error) {
        console.log(error);
        res.json({success:false , message:error.message})
        
    }

}

// placeing order for frontend
const userOrders = async (req,res) => {
    try {
        const { userId} = req.body;

        const orders = await orderModel.find({userId});
        res.json({success:true , orders})
    } catch (error) {
        console.log(error);
        res.json({success:false , message:error.message})
        
    }

}

// update order status for Admin
const updateStatus = async (req,res) => {
 try {
    const {orderId , status} = req.body;
    await orderModel.findByIdAndUpdate(orderId,{status})
    res.json({success:true , message : "Status updated"})
 } catch (error) {
    console.log(error);
        res.json({success:false , message:error.message})
        
 }
}

export {placeOrder ,placeOrderRazorpay,placeOrderStripe , userOrders,updateStatus , allOrders}