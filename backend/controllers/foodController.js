import {FoodModel} from '../models/FoodModel.js';
import fs from "fs";
export const addFood=async(req,res)=>{
let image_filename=`${req.file.filename}`;
const food=new FoodModel({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    category:req.body.category,
    image:image_filename
})
try{
    await food.save();
    res.json({success:true,message:"Food added"})
}catch(error){
    console.log(error)
    res.json({success:false,message:"Error"})
}
}

//all food list
export const listFood=async(req,res)=>{
try{
    const foods=await FoodModel.find({});
  res.json({success:true,data:foods})
}catch(error){
    console.log(error)
    res.json({success:false,message:"error"})
}
}
export const getSingleFood = async (req, res) => {
  try {
    const food = await FoodModel.findById(req.params.id);

    if (!food) {
      return res.json({ success: false, message: "Food not found" });
    }

    res.json({ success: true, data: food });

  } catch (error) {
    console.log(error); // 🔥 check terminal
    res.json({ success: false, message: "Error fetching food" });
  }
};

// UPDATE
export const updateFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    let updateData = {
      name,
      description,
      price,
      category
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    await FoodModel.findByIdAndUpdate(req.params.id, updateData);

    res.json({ success: true, message: "Food updated" });

  } catch (error) {
    res.json({ success: false, message: "Error updating food" });
  }
};
//remove food item
export const removeFood=async(req,res)=>{
    try{
        const food=await FoodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{}) //del img from folder
        await FoodModel.findByIdAndDelete(req.body.id); //del img from db
         res.json({success:true,message:"Food Removed"})
    }catch(error){
        res.json({success:false,message:"error"})
    }
}
