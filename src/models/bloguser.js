import mongoose, { model } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    username : {
        type : String ,
        required : true ,
        trim : true
    },
    email :{ 
        type : String,
        unique : true,
        required : [true , "Email is Required"],
        trim : true
    },
    password: {
        type: String,
        required: [true ,"Password is required"],
        minlength: 6
    },
    user_image:{
        type : String,
        required :true
    }  
}
,{timestamps : true}
)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });

  export default mongoose.model("User" , userSchema)
  