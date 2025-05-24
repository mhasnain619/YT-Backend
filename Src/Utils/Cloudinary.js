import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'
import dotenv from 'dotenv';

dotenv.config();


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,  // Click 'View API Keys' above to copy your API secret
});


const cloudinaryUpload = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        // upload file on cloudinary

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })

        // file has been uploaded successfully

        // console.log('file upload successfully on cloudinary', response.url);
        fs.unlinkSync(localFilePath)

        return response;

    } catch (error) {
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        console.error("Cloudinary upload failed:", error);
        return null;
    }
}

export { cloudinaryUpload }