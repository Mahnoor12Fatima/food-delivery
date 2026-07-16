import userModel from '../models/userModel.js'

const updateCart = async (req, res) => {
  try {
    const { userId, cartData } = req.body;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error updating cart" });
  }
};


const getCart=async(req,res)=>{
   try{
    let userData=await userModel.findById(req.body.userId);
    let cartData=await userData.cartData;
    res.json({success:true,cartData})
   } catch(error)
   {
    console.log(error);
    
    res.json({success:false,message:"Error"})
    
   }
}
export {updateCart,getCart}