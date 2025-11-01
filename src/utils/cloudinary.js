import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadCloudinary = async (localfilePath) => {
    try{
        if(!localfilePath)return  null;
        // Upload file to cloudinary
        const response = await cloudinary.uploader.upload(localfilePath,{
            resource_type: 'auto',
        });
        //file has been uploaded
        console.log('File uploaded to Cloudinary successfully:', response.secure_url);
        return response;
    }catch(error){
        fs.unlinkSync(localfilePath);// remove temporary file from local storage
        return null;
    }


};
export default uploadCloudinary;