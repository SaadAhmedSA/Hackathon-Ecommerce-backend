import Address from "../models/address.js";



const Addaddress = async(req,res)=>{
    try {
        const {userId , address,city,pincode,phone,notes} = req.body
        if (!userId || !address || !city || !pincode || !phone || !notes) {
            return res.status(400).json({
              success: false,
              message: "Invalid data provided!",
            });
          }

          const newlyCreatedAddress = await Address.create({
            userId,
            address,
            city,
            pincode,
            notes,
            phone,
          });
      
    res.status(201).json({
        success: true,
        data: newlyCreatedAddress,
      });
      
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error Occured",

        })
        
        
    }
}
const Alladdress = async(req,res) =>{
    try {
            const { userId } = req.params;
            if (!userId) {
              return res.status(400).json({
                success: false,
                message: "User id is required!",
              });
            }
        
            const addressList = await Address.find({ userId });
        
            res.status(200).json({
              success: true,
              data: addressList,
            });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error Occured",

        })
        
}}
const Editaddress = async(req,res)=>{
    try {
        const { userId, addressId } = req.params;
        const formData = req.body;
    
        if (!userId || !addressId) {
          return res.status(400).json({
            success: false,
            message: "User and address id is required!",
          });
        }
    
        const address = await Address.findOneAndUpdate(
          {
            _id: addressId,
            userId,
          },
          formData,
          { new: true }
        );
    
        if (!address) {
          return res.status(404).json({
            success: false,
            message: "Address not found",
          });
        }
    
        res.status(200).json({
          success: true,
          data: address,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error Occured",

        })
        
}}
const Deleteaddrees = async(req,res)=>{
    try {
        const { userId, addressId } = req.params;
        if (!userId || !addressId) {
          return res.status(400).json({
            success: false,
            message: "User and address id is required!",
          });
        }
    
        const address = await Address.findOneAndDelete({ _id: addressId, userId });
    
        if (!address) {
          return res.status(404).json({
            success: false,
            message: "Address not found",
          });
        }
    
        res.status(200).json({
          success: true,
          message: "Address deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error Occured",

        })
        
}}

export {Addaddress ,Alladdress , Editaddress ,Deleteaddrees}