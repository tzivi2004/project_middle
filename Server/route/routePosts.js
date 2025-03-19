const express = require("express")
const router = express.Router()
const controllerPost = require("../controller/ControllerPosts")

router.post("/",controllerPost.createPost)
router.get("/",controllerPost.getAllPost)
router.get("/:id",controllerPost.getPostById)
router.put("/",controllerPost.updatePost)
router.delete("/:id",controllerPost.deletPost)


module.exports = router