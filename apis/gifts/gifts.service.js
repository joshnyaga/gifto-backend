const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    budget: {
      type: String,
    },
    img: {
      type: String,
    },
    link: {
      type:String,
    },
    status:{
        type:String,
        default:"not picked"
    },
    picked_by:{
        type:String,
        default:""
    }
   
    

  
    
   
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("gifts", userSchema);