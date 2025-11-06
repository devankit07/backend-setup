import {asynchandler} from "../utils/asynchandler";
import{apierror}from "../utils/apierrors.js"
import{user} from "../models/user.model.js";
import{uploadCloudinary} from"../utils/cloudinary.js";
import{apiresponse} from "../utils/apiresponse.js";

const registeruser = asynchandler(async(request, response)=>{
   //get user details from forntend
   //validation - not empty
   //check if already exists: username , email
   //check for images & for avatar
   // upload them to cloudinary, avatar
   // create user object - crrate entry in db
   // remove password and refresh token field from response
   // check for user creation
   // response return

   const{fullname, email, username,password} = request.body
   console.log("email:",email);

   if (
    [fullname,email,password,username].some((field)=>
        field?.trim()==="")
   ){
    throw new apierror(400, "all fields are required");
   }

   const existing = user.findOne({
    $or:[{username},{email}]
   })

   if(existing){
    throw new apierror(409, "user with email or sername already exists")
   }

   const avatarlocalpath = request.files?.avatar[0]?.path;
   const coverimagelocalpath = request.files?.coverimage[0]?.path;

   if(!avatarlocalpath){
    throw new  apierror(400, "avatar file is required")
   }


   const avatar =await uploadCloudinary(avatarlocalpath)
   const coverimage = await uploadCloudinary(coverimagelocalpath)

   if(!avatar){
    throw new apierror("400", "avatar file is required")
   }

   const user  =await user.create({
    fullname,
    avatar:avatar.url,
    coverimage: coverimage?.url || "",
    email,
    password,
    username: username.tolowercase()
   })

   const createuser =user.findbyid(user._id).select(
    "-password -refreshToken"
   );

   if(!createuser){
    throw new apierror("500", "sometehting wrong ")
   }

   return response.status(201).json(
    new apiresponse(200, createuser, "user refistered succesfully")
   )

});

export{registeruser}


