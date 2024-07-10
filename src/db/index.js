import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
import express from "express";
import { DB_NAME } from "../constants.js";

const connectDB = async () =>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.DB_URI}/${DB_NAME}`,{
             useNewUrlParser: true, useUnifiedTopology: true 
        })
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Error in Connection",error);
        process.exit(1);
    }
}

export default connectDB;