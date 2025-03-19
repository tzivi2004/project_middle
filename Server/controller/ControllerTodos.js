const Todos = require("../models/Todos")

const createTodos = async (req, res) => {
    const { title, tags, completed } = req.body
    if (!title)
        return res.status(400).json({ massage: "title is required" })
    const todos = await Todos.create({ title, tags, completed })
    res.json(todos)

}

const getAllTodos = async (req, res) => {
    const todos = await Todos.find().lean()
    if (!todos?.length)
        return res.status(400).json({ massage: "No Todos Found!" })
    res.json(todos)
}

const getTodosById = async (req, res) => {
    const { id } = req.params
    const myTodos = await Todos.findById(id).lean()
    if (!myTodos)
        return res.status(400).json({ massage: "this TTodos Not Found!" })
    res.json(myTodos)
}

const updateTodos = async (req, res) => {
    const { id, title, tags, completed } = req.body
    const updateTodos = await Todos.findById(id).exec()
    if (!updateTodos)
        return res.status(400).json({ massage: "this Todos Not Found!" })
    updateTodos.title = title
    updateTodos.tags = tags
    updateTodos.completed = completed
  
    const updateTodosSave = await updateTodos.save()
    res.json(updateTodosSave)
}

const deletTodos = async (req,res)=>{
    const {id} = req.params
    const myTodos = await Todos.findById(id).exec()
    if(!myTodos)
        return res.status(400).json({massage:"this Todos Not Found!"})
    const deletetodos = await myTodos.deleteOne()
    res.send(`the Todos ${myTodos.title} is deleted`)
}

module.exports = { createTodos, getAllTodos, getTodosById, updateTodos ,deletTodos }