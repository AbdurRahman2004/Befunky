import {v2 as cloduinary } from "cloudinary";


// To store images on the cloduinary
const connectCloudinary = async () => {
  cloduinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})
}

export default connectCloudinary