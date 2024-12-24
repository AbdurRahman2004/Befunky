import mongoose from "mongoose"

const connectDB = async () => {
    
    // it will be triggered on after the connection
    mongoose.connection.on('connected',()=>{
        console.log("DB CONNECTED");
    })
  
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)
}

export default connectDB