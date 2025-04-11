import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {type: String , required: true},
    email : {type: String , required: true , unique: true},
    password: {type: String , required:true},
    cartData: {type: Object , default:{}},
},{minimize: false})

// THe minimize false is used because it will not create field on mongoo db it it has default value.. to let the mongo db to include the field too we use minimise data

const userModel = mongoose.models.user || mongoose.model("user",userSchema)

export default userModel