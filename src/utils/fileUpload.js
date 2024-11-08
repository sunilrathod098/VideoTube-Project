import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

//configure on cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

//upload image to cloudinary function
const uploadOnCloud = async (localfilePath) => {
    try {
        if (!localfilePath) return null
        //upload the   file on cloudinary
        const fileResponse = await cloudinary.uploader.upload(localfilePath, {
            resource_type: "auto",
        })
        //file has been uploaded successfully
        // console.log("File is uploaded on cloudinary ", Response.url);
        fs.unlinkSync(localfilePath)
        return fileResponse;

    } catch (error) {
        // Remove the local temporary file if the upload fails
        if (fs.existsSync(localfilePath)) {
            fs.unlinkSync(localfilePath);
        }
        // console.error("Error uploading to Cloudinary: ", error);
        return null;
    }
}

export { uploadOnCloud };
