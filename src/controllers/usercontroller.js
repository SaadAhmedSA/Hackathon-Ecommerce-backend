import User from "../models/bloguser.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import Blog from "../models/blogcontent.js";


const generateAccessToken = (user) =>{ 
    return jwt.sign({ email: user.email }, process.env.ACCESS_JWT_SECRET , {expiresIn: '6h'});
}
const generateRefreshToken = (user) =>{ 
    return jwt.sign({ email: user.email }, process.env.REFRESH_JWT_SECRET , {expiresIn: '7d'});
}

// Register user

const registeruser = async (req,res) => {

    const {email,password,username} = req.body;

   if(!email || !password || username)return res.json({mesaage:"All feaild is required"})

   const user = await User.findOne({email : email})

   if(user) return res.status(401).json({message : "User already exists"})
     const createuser = await User.create({
    username,
       email,
       password

})  
 res.json({
    message : "User Register Successfully",
    createuser
 })
 }

 // login user
const loginUser = async (req,res) =>{

    const {email,password} = req.body;

    if(!email)return res.json({mesaage:"email is required"})
     if(!password)return res.json({mesaage:"password is required"})

     const user = await User.findOne({email})   
     if(!user) return res.status(404).json({mesaage : "User not found"})
      
      const validpassword = await bcrypt.compare(password,user.password)  
     if(!validpassword) return res.status(400).json({message :"inncorrect password"}) 
      //Token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
      // cookies
  res.cookie("refreshToken", refreshToken, { http: true, secure: false });

  res.json({
    message: "user loggedIn successfully",
    accessToken,
    refreshToken,
    data: user,
  });  
}
/// logout
const logout = async (req,res) => {
    res.clearCookie("refreshToken");
    res.send({
     mesaage:"logout Successfully"
    })
 
 }
// refresh tokrn
const refreshtoken = async(req,res)=>{
    const Token = req.cookies.refreshToken || req.body.refreshToken;
    if(!Token) return res.send({message : "Token not found"})
  
    const decoded = jwt.verify(Token, process.env.REFRESH_JWT_SECRET);
  
     const user = await User.find({email : decoded.email}) 
     
    if (!user) return res.status(404).json({ message: "invalid token" });
  
    const generatedToken = generateAccessToken(user);
    res.json({ message: "new access token generated", accesstoken: generatedToken,decoded });
  
  }


 export {registeruser,loginUser,logout}