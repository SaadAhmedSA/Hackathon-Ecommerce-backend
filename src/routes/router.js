import express from "express"
import { authchech, loginUser, logout,  registeruser } from "../controllers/usercontroller.js"
import { upload } from "../middleware/multer.js"
import {Addproduct, Deleteproduct, Editproduct, getall, getfilterproduct, singleproduct} from "../controllers/produtcontroller.js"
import { addtocart, deletecart, editcart, getcartitem } from "../controllers/addtocart.js"
import { Addaddress, Alladdress, Deleteaddrees, Editaddress } from "../controllers/addreescontrioller.js"
import { addfeature, deletefeature, getfeature } from "../controllers/featurecontroller.js"
import {createOrder,getAllOrdersByAdmin,getAllOrdersByUser,getOrderDetails, updateOrderStatus} from "../controllers/ordercontroller.js"
const router = express.Router()
//user api
router.post("/register",registeruser)
router.post("/login",loginUser)
router.get("/logout",logout),
router.get("/authcheck",authchech,(req,res)=>{
    const user = req.user
    res.status(200).json({
        success:true,
        message : "Authorized user",
        user
    })

}),

//product api
router.post("/addproduct",upload.single("image"),Addproduct)
router.get("/All",getall)
router.get("/Allproduct",getfilterproduct)
router.get("/single/:id",singleproduct)
router.put("/edit/:id",Editproduct)
router.delete("/delete/:id",Deleteproduct)

//cart api
router.post("/addtocart",addtocart)
router.get("/Allcartitem/:userId",getcartitem)
router.put("/editcart",editcart)
router.delete("/delcart/:userId/:productId",deletecart)

//address api

router.post("/Addadd" ,Addaddress)
router.get("/Alladd/:userId",Alladdress)
router.put("/editadd/:userId/:addressId",Editaddress)
router.delete("/deleteadd/:userId/:addressId",Deleteaddrees)
//feature api
router.post("/Addfeature" ,addfeature)
router.get("/Allfeature",getfeature)
router.delete("/deletefeature/:id",deletefeature)
//order api


router.post("/create", createOrder);
router.get("/list/:userId", getAllOrdersByUser);
router.get("/Allorder", getAllOrdersByAdmin);
router.get("/details/:id", getOrderDetails);
router.put("/updateorder/:id",updateOrderStatus)

export default router