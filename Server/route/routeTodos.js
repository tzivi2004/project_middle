const express = require("express")
const router = express.Router()
const controllerTodos = require("../controller/ControllerTodos")

router.post("/",controllerTodos.createTodos)
router.get("/",controllerTodos.getAllTodos)
router.get("/:id",controllerTodos.getTodosById)
router.put("/",controllerTodos.updateTodos)
router.delete("/:id",controllerTodos.deletTodos)

module.exports = router