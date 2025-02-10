import mongoose from "mongoose"

const feature = new mongoose.Schema({
    image : {
        type : String,
        required :true
    }
})

export default mongoose.model("Feature" , feature)