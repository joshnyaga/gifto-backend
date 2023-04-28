const Gift = require("./gifts.service")
module.exports = {
    addGift: async (req, res) => {
        try {

            const newGift = new Gift({ ...req.body });

            let gift = await newGift.save();
            return res.json({
                success: false,
                data: gift
            })
        }

        catch (error) {
            return res.json({
                success: false,
                message: "An error occurred when adding user"
            })
        }

    },
    getGift: async (req, res) => {
        try {
            const gift = await Gift.findById(req.params.id);
            return res.status(200).json({
                success: true,
                data: gift
            })
        }
        catch (error) {
            return res.json({
                success: false,
                message: "An error occurred fetching gift"
            })
        }
    },
    getGifts: async (req, res) => {
        try {
            const gifts = await Gift.find()
            return res.status(200).json({
                success: true,
                data: gifts
            })
        }
        catch (error) {
            return res.json({
                success: false,
                message: "An error occurred when fetching gifts"
            })
        }
    },
    getGiftsPicked: async (req, res) => {
        try {
            const gifts = await Gift.find({status:"picked"})
            return res.status(200).json({
                success: true,
                data: gifts
            })
        }
        catch (error) {
            return res.json({
                success: false,
                message: "An error occurred when fetching picked gifts"
            })
        }
    },
    getGiftsUnpicked: async (req, res) => {
        try {
            const gifts = await Gift.find({status:"not picked"})
            return res.status(200).json({
                success: true,
                data: gifts
            })
        }
        catch (error) {
            return res.json({
                success: false,
                message: "An error occurred when fetching picked gifts"
            })
        }
    },
    updateGift: async (req, res) => {

        try {
            const updatedGift = await Gift.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                {
                    new: true,
                }
            );
            res.status(200).json(updatedGift);
        } catch (error) {
            return res.json({
                success: false,
                message: "An error occurred when updating gifts"
            })

        }

    },
    deleteGift:async(req,res)=>{
        try {
            await Gift.findByIdAndDelete(req.params.id);
            return res.status(200).json({
                success: true,
                message: "Gift deleted"
            })
        }
        catch (error) {
            return res.json({
                success: false,
                message: "An error occurred deleting gift"
            })
        }
    }
}