import express from "express"
import { loginUser, logout,  registeruser } from "../controllers/usercontroller.js"
import { deleteblog, Editblog, getallblog, getBlogsByUserId, getloginUserBlogs, postBlog } from "../controllers/blogcontroller.js"
import { upload } from "../middleware/multer.js"

const router = express.Router()
//user api
router.post("/register",upload.single("image"),registeruser)
router.post("/login",loginUser)
router.get("/logout",logout)
//blog api
router.post("/postblog",postBlog)
router.post("/deleteblog/:id" , deleteblog)
router.post("/editblog/:id" , Editblog)
router.get("/allblog" , getallblog)
router.get("/allblogofrandonuser",getBlogsByUserId)
router.get("/allblogsofloginuser",getloginUserBlogs)



export default router