import { v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) =>{
    try {
        //if there is no local path then return null 
        if(!localFilePath) return null;

        //in else we upload that file on cloudinary 
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        
        //we print success message after file uploaded 
        console.log("File uploaded successfully !!!");

        return response;
    } catch (error) {
        //if file cant upload on cloudinary then we remove that file from the local storage also
        fs.unlinkSync(localFilePath)
        return null
    }
}