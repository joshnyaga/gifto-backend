const express = require("express");    
const {signin, signup, updateUser, checkLoggedin, logout}=require("./users.controller")
const router = express.Router();
const {verifyToken} = require("../../verifyToken");

router.put("/:id", verifyToken, updateUser);
router.get("/user",verifyToken, checkLoggedin)
router.get("/logout",verifyToken, logout)
router.post("/login",signin);
router.post("/",signup ); 

module.exports = router;