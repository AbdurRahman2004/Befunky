import express from "express"
import admimAuth from '../middleware/adminAuth.js'
import authUser from "../middleware/auth.js"
import { userOrders,placeOrder,allOrders,placeOrderStripe,placeOrderRazorpay ,updateStatus, verifyStripe } from "../controller/orderController.js"

const orderRouter = express.Router()


// Admin Feautres
orderRouter.post("/list",admimAuth , allOrders)
orderRouter.post("/status",admimAuth , updateStatus)


//payment feautres
orderRouter.post("/place", authUser,placeOrder)
orderRouter.post("/stripe", authUser,placeOrderStripe)
orderRouter.post("/razorpay", authUser,placeOrderRazorpay)

// User Feautres

orderRouter.post('/userorders',authUser,userOrders);

// verify payment
orderRouter.post('/verifyStripe',authUser,verifyStripe)
export default orderRouter;