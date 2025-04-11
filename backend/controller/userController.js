// Logic for creating or login the website

import userModel from "../models/userModel.js";
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)

    // this will seal the id with the signature we provide and whenever client get the id he tries to open it with the same seal if it matches then accept or else the server will reject it
}


// Route for user login
const loginUser = async (req,res) => {
  try {
     const {email , password} = req.body;
     
     const user = await userModel.findOne({email});

     if(!user){
     return res.json({success: false , message: "User does not exists"});
     }
     const isMatch = await bcrypt.compare(password,user.password)

     if(isMatch){
       const token = createToken(user._id);
       res.json({success: true , token}); 
     }
     else{
      res.json({suceess:false , message: "Invalid Credential"})
     }
  } catch (error) {
    console.log(error)
    res.json({success:false , message: error.message})
    
  }
}


// Route for user registration
const registerUser = async (req,res) => {
  try{
    const {name , email , password} = req.body;
    
   // Checking user already exits or not

   const exists = await userModel.findOne({email})

   if(exists){
     return res.json({success: false , message: "User Already exists"});
   }

   //  Validating email format and strong password
   if(!validator.isEmail(email)){
    return res.json({success: false , message: "please enter a valid email"})
   }

   if(password.length < 8){
    return res.json({success: false , message: "please enter a strong password"})
   }
  
   // Hashing user password

   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password,salt)

   const newUser = new userModel({
    name,
    email,
    password: hashedPassword
   })

   const user = await newUser.save();

   const token = createToken(user._id)

   res.json({success:true , token})

  }
  catch(error){
 
   console.log(error)
   res.json({suceess:false, message : error.message})

  }
}

// Route for Admin LOgin

const adminLogin = async(req,res)=>{
  try {
    const {email , password} = req.body;
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      const token = jwt.sign(email+password,process.env.JWT_SECRET)
      res.json({success:true , token})
    }
    else{
      res.json({success: false , message: "Invalid credential"})
    }
  } catch (error) {
   res.json({success:false, message : error.message})
    
  }
}

export {loginUser , registerUser , adminLogin}