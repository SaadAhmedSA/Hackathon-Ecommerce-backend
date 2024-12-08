import express from "express"
import { loginUser, logout,  registeruser } from "../controllers/usercontroller.js"
import { deleteblog, Editblog, getallblog, postBlog } from "../controllers/blogcontroller.js"

const router = express.Router()

router.post("/register",registeruser)
router.post("/login",loginUser)
router.post("/logout",logout)
router.post("/postblog",postBlog)
router.get("/allblog" , getallblog)
router.post("/deleteblog/:id" , deleteblog)
router.post("/editblog/:id" , Editblog)



export default router