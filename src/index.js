import dotenv from "dotenv";
import connectDB from "./db/index.js";
import express from "express";
import app from "./app.js";

dotenv.config({
    path:'./.env'
})

connectDB()
.then((result) => {
    app.listen(process.env.PORT || 3000,()=>{
        console.log(`Server is running on ${process.env.PORT}`);
    })
}).catch((err) => {
    console.log("MongoDB connection Failed !!!",err);
});