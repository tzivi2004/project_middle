const { json } = require("express")
const Post = require("../models/Posts")

const createPost = async (req, res) => {
    const { title, body } = req.body
    if (!title)
        return res.status(400).json({ massage: "title is required" })
    const post = await Post.create({ title, body })
    res.json(post)
}

const getAllPost = async (req, res) => {
    const posts = await Post.find().lean()
    if (!posts?.length)
        return res.status(400).json({ massage: "No Posts Found!" })
    res.json(posts)
}

const getPostById = async (req, res) => {
    const { id } = req.params
    const myPost = await Post.findById(id).lean()
    if (!myPost)
        return res.status(400).json({ massage: "This Post Not Found!" })
    res.json(myPost)
}

const updatePost = async (req, res) => {
    const { _id, title, body } = req.body
    const updatePostById = await Post.findById(_id).exec()
    if (!updatePostById)
        return res.status(400).json({ massage: "This Post Not Found!" })
    updatePostById.title = title
    updatePostById.body = body
    const updatePostByIdSave = await updatePostById.save()
    res.json(updatePostByIdSave)
}

const deletPost = async (req, res) => {
    const {_id} = req.params
    console.log(req.params);
    const myPost = await Post.findById(_id).exec()
    if (!myPost)
        return res.status(409).json({ massage: "This Post Not Found!" })
    const deletPostById = await myPost.deleteOne()
    res.send(`The Post ${myPost.title} Is Deleted`)
}

module.exports = { createPost, getAllPost, getPostById, updatePost, deletPost }