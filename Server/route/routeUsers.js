const express = require("express")
const router = express.Router()
const controllerUser = require("../controller/ControllerUsere")

router.post("/",controllerUser.creatNewUser)
router.get("/",controllerUser.getAllUsers)
router.get("/:id",controllerUser.getUserById)
router.put("/",controllerUser.updateUser)
router.delete("/:id",controllerUser.deletUser)

module.exports = router