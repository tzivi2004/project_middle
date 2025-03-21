const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    } ,
    username:{
        type:String,
        unique: true,
        required:true 
    },
    email:{
        type:String,
    },
    address:{
        type:String
    },
    phone:{
        type:String
    }
})

module.exports = mongoose.model("Users",userSchema)