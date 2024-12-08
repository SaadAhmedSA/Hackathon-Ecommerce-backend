  
  import Blog from "../models/blogcontent.js"
  import jwt from "jsonwebtoken"
  
  
  //postblog


  const postBlog = async (req, res) => {

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(403).json({ message: "No refresh token found" });
    }

    const decoded =  jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET); 
    if(!decoded) return res.json({message :  "token unverify"})
        console.log(decoded.email);
        

    const newBlog = await Blog.create({
     ...req.body,
     author : decoded.email
    });

    if(!newBlog) return res.json({message : "error occured"})

    res.status(201).json({
      message: "Blog post created successfully",
      blog: newBlog,
    });
  
};
const getallblog = async (req,res) => {

    const All = await Blog.find({})
    res.json({
        All
    })
}
const deleteblog = async (req,res) => {

     const { id } = req.params;
    const deleteblog = await Blog.findOneAndDelete({id : _id})

    if(!deleteblog) return res.json({message:"blog not found"})

        res.json({
            message : "deleted successfully"
        })
   
}
const Editblog = async (req,res) => {

   const { id } = req.params;

    const edit = await Blog.findOneAndUpdate({id:_id},
        ...req.body
    )

    if(!edit) return res.json({message:"blog not found"})

        res.json({
            message : "edited successfully",
            edit
        })
   
}
export {postBlog,getallblog,deleteblog,Editblog}