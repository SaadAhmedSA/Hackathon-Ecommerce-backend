import mongoose from "mongoose";



const address = new mongoose.Schema({
    userId : {
        type :String ,
        required :true
    },
    address : {
        type :String ,
        required :true
    },
    city : {
        type :String ,
        required :true
    },
    pincode : {
        type :String ,
        required :true
    },
    phone : {
        type :String ,
        required :true
    },
    notes : {
        type :String ,
        required :true
    },

},{timestamps:true})


export default mongoose.model("Address" ,address)