
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import foodRouter from "./routes/foodRoute.js";
import userRouter from './routes/userRoute.js'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//app config
const app=express();
const PORT=process.env.PORT || 4000;
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
];
app.use(express.json());//middleware\
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without origin (Postman, curl, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
// app.use("/auth",authRoutes);
// app.use("/contact",contactRoutes);
// app.use("/todos",todoRoutes);
app.use("/food",foodRouter)
app.use("/images",express.static('uploads'))//to show image from uploads folder
app.use("/user",userRouter)
app.use("/cart",cartRouter)
app.use("/order",orderRouter)
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Mongo db connected");
    app.listen(PORT,()=>{
        console.log(`Server is running:${PORT}`);
    });
}).catch((error)=>console.error("MOngo db connection error", error));