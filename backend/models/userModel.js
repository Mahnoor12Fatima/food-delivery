import mongoose from "mongoose";

//add schema for user
const userSchema= new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}
},{minimize:false})//minimize is just added to create cartData empty

const userModel=mongoose.models.user || mongoose.model("user",userSchema);
export default userModel;