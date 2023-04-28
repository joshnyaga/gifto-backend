const bcrypt = require("bcrypt");
const User = require("./users.service")
const jwt = require("jsonwebtoken");
module.exports = {
    signup: async (req, res, next) => {
        try {

            // check if a user exists
            const email = await User.findOne({
                email: { $regex: req.body.email, $options: "i" },
            });

            if (email) {
                return res.json({
                    success: false,
                    message: "Email already exists"
                })
            } else {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.password, salt);
                const newUser = new User({ ...req.body, password: hash });

                let user = await newUser.save();
                return res.json({
                    success: false,
                    data: user
                })
            }
        }
        catch (error) {
           next()
        }

    },
    signin: async (req, res, next) => {
        try {
            // hash password

            let user = await User.findOne({
                name: { $regex: req.body.name, $options: "i" },
            });

            if (!user) {
                return res.status(401)
                .json({
                    success: false,
                    message: "User not found"
                });
            }
            const isCorrect = await bcrypt.compare(req.body.password, user.password);
            if (!isCorrect) {
                return res.json({
                    success: false,
                    message: "No user matching credentials found"
                })
            }
            const tokenJwt = jwt.sign({ user: user }, process.env.JWT);
            const { password, ...others } = user;
            res
                .cookie("access_token", tokenJwt, {
                    httpOnly: true,
                    sameSite: 'none',
                     secure: true
                })
                .status(200)
                .json({
                    success: true,
                    data: user
                });
        }
        catch (error) {
            next()
        }
    },
    updateUser: async (req, res, next) => {

        if (req.body.password) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            req.body.password = hash;
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.user.user._id,
                {
                    $set: req.body,
                },
                {
                    new: true,
                }
            );
            const tokenJwt = jwt.sign({ user: updatedUser }, process.env.JWT);
            const { password, ...others } = updatedUser;
            res
                .cookie("access_token", tokenJwt, {
                    httpOnly: true,
                    sameSite: 'none',
                     secure: true
                })
                .status(200)
                .json({
                    success: true,
                    data: updatedUser
                });
        } catch (error) {
            next()
        }
    },
    checkLoggedin:(req,res,next)=>{
        console.log(req.user)
        if(req.user){
            return res.json({
                success: true,
                data: req.user
            })
        }else{
           next()
        }
    },
    logout:async(req,res)=>{
        res.clearCookie("access_token");
        return res.json({
            success: true,
            message: "You are not logged out"
        }) 
    }

}