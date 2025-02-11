import User from "../models/user.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { v2 as cloudinary} from "cloudinary"
import fs from "fs"



const generateAccessToken = (user) =>{ 
    return jwt.sign({ email: user.email , role :user.role }, process.env.ACCESS_JWT_SECRET , {expiresIn: '6h'});
}
const generateRefreshToken = (user) =>{ 
    return jwt.sign({ id:user._id, email: user.email , role :user.role ,username :user.username}, process.env.REFRESH_JWT_SECRET , {expiresIn: '3d'});
}



// Register user

const registeruser = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Validate required fields
    if (!email) return res.status(400).json({success : false , message: "Email is required" });
    if (!password) return res.status(400).json({success : false, message: "Password is required" });
    if (!username) return res.status(400).json({success : false, message: "Username is required" });
 

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({
      success : false, message: "User already exists" });


    // Create new user
    const newUser = await User.create({
      username,
      email,
      password
  
    });

    res.status(201).json({
      success : true,
      message: "Register successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({
      success:false, message: "Internal server error" });
  }
};

 // login user
const loginUser = async (req,res) =>{

    const {email,password} = req.body;

    if(!email)return res.json({mesaage:"email is required"})
     if(!password)return res.json({mesaage:"password is required"})

     const user = await User.findOne({email})   
     if(!user) return res.status(404).json({success:false, mesaage : "User not found ! Please Register first"})
      
      const validpassword = await bcrypt.compare(password,user.password)  
     if(!validpassword) return res.status(400).json({success:false,message :"inncorrect password"}) 
  //     //Token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
      // cookies
      res.cookie("token", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });
  res.json({
    success:true,
    message: "login successfully",
    accessToken,
    refreshToken,
    user
  
  });  
}
/// logout
const logout = async (req,res) => {
    res.clearCookie("refreshToken");
    res.send({
      success:true,
     mesaage:"logout Successfully"
    })
 
 }
// refresh tokrn
// const refreshtoken = async(req,res)=>{
//     const Token = req.cookies.refreshToken || req.body.refreshToken;
//     if(!Token) return res.send({message : "Token not found"})
  
//     const decoded = jwt.verify(Token, process.env.REFRESH_JWT_SECRET);
  
//      const user = await User.find({email : decoded.email}) 
     
//     if (!user) return res.status(404).json({ message: "invalid token" });
  
//     const generatedToken = generateAccessToken(user);
//     res.json({ message: "new access token generated", accesstoken: generatedToken,decoded });
  
//   }
const authchech =  async (req,res,next) => {
  const Token = req.cookies.token || req.body.token;
  if(!Token) return res.status(401).json({
    success : false,
    message : "Unauthorized user"})
    
  
    try {
      const decoded = jwt.verify(Token, process.env.REFRESH_JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Unauthorised user!",
      });
    }
    }
 export {registeruser,loginUser,logout,authchech}