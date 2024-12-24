import express from "express"
import { loginUser , registerUser,adminLogin } from "../controller/userController.js"

const userRouter = express.Router()

// login that is  redirected from server.js will now go to the controller for corresponding method login means userLogin function will be called in controller

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser)
userRouter.post("/admin",adminLogin);

export default userRouter;