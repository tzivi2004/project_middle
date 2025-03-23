//const { json } = require("express")
const User = require("../models/Users")

const creatNewUser = async (req, res) => {
    const { name, username, email, address, phone } = req.body
    
    if (!name || !username)
        return res.status(404).json({ massage: "name & username are required" })
     const usernameexsist = await User.findOne({username})
     if(usernameexsist){      
        console.log("duplicate");
         return res.status(409).json({massage:"this username is esisit"})
    }
    const user = await User.create({ name, username, email, address, phone })
    res.json(user)
}

const getAllUsers = async (req, res) => {
    const users = await User.find().lean()
    if(!users?.length)
        return res.status(400).json({massage:"No Users Found"})
    res.json(users)
}

const getUserById = async (req,res)=>{
    const {id} = req.params
    const myUser = await User.findById(id).lean()
    if(!myUser)
        return res.status(400).json({massage:"this User Not Found"})
    res.json(myUser)
}

const updateUser = async (req,res)=>{
    const {_id, name, username, email, address, phone } = req.body
    const updateUser = await User.findById(_id).exec()
    if(!updateUser)
        return res.status(400).json({massage:"this User Not Found"})
    updateUser.name = name
    updateUser.username = username
    updateUser.email = email
    updateUser.address = address
    updateUser.phone = phone
    const updateUserSave = await updateUser.save()
    res.json(updateUserSave)
}

const deletUser = async (req,res)=>{
    const {id} = req.params
    const myUser = await User.findById(id).exec()
    if(!myUser)
        return res.status(400).json({massage:"this User Not Found"})
    const deletuser = await myUser.deleteOne()
    res.send(`the user ${myUser.name} is deleted`)

}

module.exports = { creatNewUser, getAllUsers ,getUserById ,updateUser ,deletUser}