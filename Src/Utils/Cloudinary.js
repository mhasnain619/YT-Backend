import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'



// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_SECRET,  // Click 'View API Keys' above to copy your API secret
});


const cloudinaryUpload = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        // upload file on cloudinary

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })

        // file has been uploaded successfully

        console.log('file upload successfully on cloudinary', response.url);

        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporery file as the upload operation failed
        return null
    }
}

export { cloudinaryUpload }