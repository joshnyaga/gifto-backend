const express = require("express");    
const {addGift, deleteGift, getGift, getGifts, getGiftsUnpicked, getGiftsPicked, updateGift}=require("./gifts.controller")
const {verifyToken} = require("../../verifyToken");
const router = express.Router();

router.post("/", verifyToken,addGift );
router.get("/", getGifts);
router.get("/picked", verifyToken, getGiftsPicked);
router.get("/unpicked", getGiftsUnpicked);
router.get("/:id", verifyToken, getGift);
router.put("/:id", verifyToken, updateGift);
router.delete("/:id", verifyToken,deleteGift );


module.exports = router;