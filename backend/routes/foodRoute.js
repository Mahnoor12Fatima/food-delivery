import express from "express";
import { addFood, getSingleFood, listFood, removeFood, updateFood } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter=express.Router();
const storage=multer.diskStorage({
    destination:"uploads",//folder name
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)//by adding date filename become unique
    }
})
const upload=multer({storage:storage})
foodRouter.post("/add",upload.single("image"),addFood);
foodRouter.get("/list",listFood);
foodRouter.post("/remove",removeFood);
foodRouter.put("/update/:id", upload.single("image"), updateFood);
foodRouter.get("/:id", getSingleFood);
export default foodRouter;