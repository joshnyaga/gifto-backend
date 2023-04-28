const express = require("express");
const logger = require("morgan")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const cors = require("cors");
const bodyParser = require("body-parser");
const giftsRouter = require("./apis/gifts/gifts.route")
const usersRouter = require("./apis/users/users.route")
const app = express();
dotenv.config();


// middlewares
app.use(logger("dev"));
app.use(bodyParser.json());
app.disable('etag');    
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "https://gifto-frontend-two.vercel.app" }));
app.options("*", cors({ credentials: true, origin: "https://gifto-frontend-two.vercel.app" }));
app.use(express.json());

//routes
app.use("/api/gifts/v1/gifts",giftsRouter)
app.use("/api/gifts/v1/users",usersRouter)


//database function
const connect = () => {
    mongoose
      .connect(process.env.MONGO)
      .then(() => {
        console.log("connected to db");
      })
      .catch((err) => {
        throw err;
      });
  };
  

//server start function
app.listen(process.env.PORT, () => {
    connect();
    console.log("Server running");
  });