import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/mogodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import producRouter from "./routes/productRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

 //  App Config

 const app = express()
 const port = process.env.PORT || 4000
 connectDB()
 connectCloudinary()

 // Middlewares

app.use(express.json())  //used parsing the request using json
app.use(cors())


// API ENDPOINTS 

app.use("/api/user",userRouter) //api calls from front end like api/user/login  api/user redirects it to userRoute now go and check userRouter
app.use("/api/product",producRouter)
app.use('/api/cart/',cartRouter)
app.use('/api/order',orderRouter)



app.get('/',(req,res)=>{
   res.send("API WORKING")
})

app.listen(port,()=> console.log("Server started on port "+ port))