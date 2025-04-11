//import { currency } from "../../admin/src/App.jsx";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";



//GLOBAL VARIABLE 
const currency = 'inr'
const deliveryCharge = 10
// Gateway INitalized
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
        await userModel.findByIdAndUpdate(userId, {cartData:{}})

        res.json({success:true , message: "Order Placed"})

    } catch (error) {
        console.log(error);
        res.json({success:false , message:error.message})
    }

}

 const verifyStripe = async (req,res) => {
     const {userId,success,orderId} = req.body;
    try {
        if(success === 'true' ) {
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            await userModel.findByIdAndUpdate(userId, {cardData: {}});
            res.json({success:true})
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false , message:error.message})
        
    }
 }

// placeing order using Stripe
const placeOrderStripe = async (req,res) => {
   try {
    const {userId , items , amount,address} = req.body;
    const {origin} = req.headers;
    const orderData = {
        userId ,
        items,
        address,
        amount,
        paymentMethod : "Stripe",
        payment: true,
        date: Date.now()
    }
     
    const newOrder = new orderModel(orderData)
    await newOrder.save();

    const line_items = items.map((item)=>({
        price_data :  {
            currency:currency,
            product_data: {
                name: item.name
            },
            unit_amount : item.price*100
        },
        quantity: item.quantity
   }))

   line_items.push({
    price_data :  {
        currency:currency,
        product_data: {
            name: 'Delivery Charges'
        },
        unit_amount : deliveryCharge*100
    },
         quantity : 1

   })

   const session = await stripe.checkout.sessions.create({
    success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
    cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
    line_items,
    mode : 'payment',
})
   res.json({success:true, session_url:session.url})

   } catch (error) {
     console.log(error);
     res.json({success:false , message: error.message})
   }
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

export {verifyStripe ,placeOrder ,placeOrderRazorpay,placeOrderStripe , userOrders,updateStatus , allOrders}