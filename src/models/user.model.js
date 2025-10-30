import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { use } from "react";

const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
        lowercase: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    fullname:{
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    avatar:{
        type: String,//cloudinary url
        required: true,
    },
    coverimage:{
        type: String,//cloudinary url
    },
    watchhistory:{
        type: Schema.Types.ObjectId,
        ref: "Video",
    },
    password:{
        type: String,
        required: [true, "Password is required"],
    },
    refreshToken:{
        type: String,
    },
},{timestamps: true});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password =await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.method.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
};

UserSchema.method.generateAccessToken = function(){
    jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
        fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_,
    })
}
UserSchema.method.generateRefreshToken = function(){
    jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_,
    })
}

export const User = mongoose.model("User", UserSchema)