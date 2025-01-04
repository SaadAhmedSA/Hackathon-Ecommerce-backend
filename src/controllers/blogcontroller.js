  
  import mongoose from "mongoose";
  import Blog from "../models/blogcontent.js"
  import jwt from "jsonwebtoken"
  import { v2 as cloudinary} from "cloudinary"
  import fs from "fs"
  
  
 // Configuration
 cloudinary.config({ 
    cloud_name: 'dlvklue5t', 
    api_key: '437589555533986', 
    api_secret: 'pLmCAlttNk-YV2BHgb4aNENZH_M' // Click 'View API Keys' above to copy your API secret
  });
  // upload image
  const imageuploadtocloudinary = async (localpath) =>{
    try {
      const uploadResult = await cloudinary.uploader
      .upload(
          localpath, {
             resource_type : "auto"
          }
      ) 
      fs.unlinkSync(localpath);
      return uploadResult.url
    } catch (error) {
      fs.unlinkSync(localpath)
     return null
    }
  }
  
  
  //postblog

  const postBlog = async (req, res) => {

    const {title,description,category,authorName,tags}= req.body;

    if(!title || !description || !category || !authorName)
        return res.send({message:"All feild required"})

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(403).json({ message: "No refresh token found" });
    }

    const decoded =  jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET); 
    if(!decoded) return res.json({message :  "token unverify"})

    // const blogImageURL = await imageuploadtocloudinary(req.file.path);

    const newBlog = await Blog.create({
     title,
     description,
     category,
     authorName,
     tags,
    //  image : blogImageURL ,
     author : decoded.email
    });

    if(!newBlog) return res.json({message : "error occured"})

    res.status(201).json({
      message: "Blog post created successfully",
      blog: newBlog,
    });
  
};
//getAllblog
const getallblog = async (req,res) => {
    

   const page = req.query.page || 1
   const limit = req.query.limit || 10
   const skip = (page - 1) * limit
    const All = await Blog.find({}).limit(limit).skip(skip)
    res.json({
        All
    })
}

//deleteblog
const deleteblog = async (req,res) => {

      const { id } = req.params;
   if(!mongoose.Types.ObjectId.isValid(id))
    return res.json({message : "Not a vaild Id"})

    const deleteblog = await Blog.findOneAndDelete({id : _id})

    if(!deleteblog) return res.json({message:"blog not found"})

        res.json({
            message : "deleted successfully"
        })
   
}
//Editblog  
const Editblog = async (req,res) => {

   const { id } = req.params;
   if(!mongoose.Types.ObjectId.isValid(id))
    return res.json({message : "Not a vaild Id"})

    const edit = await Blog.findOneAndUpdate({id:_id},
        ...req.body
    )

    if(!edit) return res.json({message:"blog not found"})

        res.json({
            message : "edited successfully",
            edit
        })
   
}
// Get all blogs of a specific user (random user based on  email)
const getBlogsByUserId = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
  
        if (!refreshToken) {
          return res.status(403).json({ message: "No refresh token found" });
        }
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);
        if (!decoded) return res.json({ message: "Token not verified" });

      const { email } = req.query;
  
      if (!email) {
        return res.status(400).json({ message: " email is required" });
      }
  
      const query = { author: email };
  
      const userBlogs = await Blog.find(query);
  
      if (userBlogs.length === 0) {
        return res.status(404).json({ message: "No blogs found for this user" });
      }
  
      res.status(200).json({
        message: "Blogs fetched successfully",
        blogs: userBlogs,
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while fetching blogs" });
    }
  };

const getloginUserBlogs = async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
  
      if (!refreshToken) {
        return res.status(403).json({ message: "No refresh token found" });
      }
  
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);
      if (!decoded) return res.json({ message: "Token not verified" });
  
      console.log(decoded.email);
  
      // Find all blogs by the user's email
      const userBlogs = await Blog.find({ author: decoded.email });
  
      res.status(200).json({
        message: "login User blogs ",
        blogs: userBlogs,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while fetching blogs" });
    }
  };
  
  
export {postBlog,getallblog,deleteblog,Editblog ,getBlogsByUserId,getloginUserBlogs}