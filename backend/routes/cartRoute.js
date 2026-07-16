import express from "express"
import { getCart, updateCart } from "../controllers/cartController.js"
import authMiddleware from "../middleware/auth.js";

const cartRouter=express.Router();
//on all routes add middleware
cartRouter.post("/update", authMiddleware, updateCart);
cartRouter.post("/get",authMiddleware,getCart);
export default cartRouter;