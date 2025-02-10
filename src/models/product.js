import mongoose from "mongoose";



const prouctSchema = new mongoose.Schema({
    title: {
        type:String,
        required : true
    },
    description: {
        type : String,
        required : true
    },
    price: {
        type : Number,
        required : true
    },
    salePrice: {
        type : Number,
    },
    image: {
        type : String,
        required : true
    },
  
    category: {
        type : String,
        required : true
    },
    totalStock: {
        type : Number,
        required : true
    },
    brand: {
        type : String,
        required : true
    },
  
}
,{timestamps:true}
)

export default mongoose.model("Product" , prouctSchema)