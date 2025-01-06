router.post("/register",registeruser)
router.post("/login",loginUser)
router.get("/logout",logout)
//product api
router.post("/addproduct",upload.single("image"),Addproduct)
router.get("/All",getall)
router.put("/edit/:id",Editproduct)
router.delete("/delete/:id",Deleteproduct)
router.get("/single/:id",singleproduct)
//order api
router.post("/place",placeOrder)
router.post("/Allorder",Allorder)
router.get("/singleorder/:id",getDetails)

