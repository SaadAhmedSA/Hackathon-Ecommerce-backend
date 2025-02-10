  
  import mongoose from "mongoose";
  import Product from "../models/product.js"
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
  
  
  //Addproduct

  const Addproduct = async (req, res) => {
try{
    const {title,description,price,salePrice,brand,category,totalStock,image}= req.body;

if(!title || !description || !price  || !brand|| !category || !totalStock ||!image){
    return res.json({
    success:false,
    message:"All feild required"
     })
}
  

    const newproduct = await Product.create({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });
    res.status(201).json({
      success :true,
      message: "product added successfully",
     data:newproduct
    })
  }catch(error){
    res.json({
   success:false,
   message:"Error!!! occured"
    })

    }
  
};
const getall = async (req,res) => {
try {
  
  const data = await Product.find({})
  res.json({
    success:true,
      data
  })
} catch (error) {
  res.json({
    success:false,
      message:"error occurd"
  })
  
}
}

//deleteblog
const Deleteproduct = async (req,res) => {

   try {
    const { id } = req.params;
   
     const deleteproduct = await Product.findOneAndDelete(id)
 
     if(!deleteproduct) return res.json({ success:false,message:"Product not found"})
 
         res.json({
          success:true,
             message : "deleted successfully"
         })
    
    
   } catch (error) {
    
   }
}
//Editblog  
const Editproduct = async (req,res) => {
  try {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
     return res.json({message : "Not a vaild Id"})
  
  const edit = await Product.findByIdAndUpdate(
     id,
     req.body,
     { new: true, runValidators: true } 
   );
  
     if(!edit) return res.json({message:"product not found"})
  
         res.json({
          success:true,
             message : "edited successfully",
             edit
         })
  } catch (error) {
    res.json({
      success:false,
         message : "not successfully",
         edit
     })
  }
 
  

}
const getfilterproduct = async (req,res) => {
  try {
    
    const data = await Product.find({})
    res.json({
      success:true,
        data
    })
  } catch (error) {
    res.json({
      success:false,
        message:"error occurd"
    })
    
  }
  }
const singleproduct = async(req,res)=>{
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
     return res.json({message : "Not a vaild Id"})
    
    // Find the product by ID
    const data = await Product.findById(id)
    if(!data) res.json({message : "Product Not Found"})
 
   res.json({
    success :true,
    data
   })
}
  
  
export {Addproduct,getall,Editproduct,Deleteproduct,singleproduct,getfilterproduct}