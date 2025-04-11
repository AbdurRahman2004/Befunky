import express from "express"
import { addProduct , removeProduct , singleProduct , listProducts } from "../controller/productController.js"
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const producRouter = express.Router();

producRouter.post("/add",adminAuth, upload.fields([{name: 'image1' , maxCount: 1},{name: 'image2' , maxCount: 1},{name: 'image3' , maxCount: 1},{name: 'image4' , maxCount: 1}]), addProduct);
producRouter.post("/remove",adminAuth,removeProduct)
producRouter.post("/single",adminAuth,singleProduct)
producRouter.get("/list",listProducts);

export default producRouter
