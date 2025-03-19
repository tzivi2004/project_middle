require('dotenv').config()
const express = require("express")
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const mongoose = require("mongoose")
const coonsctDB = require("./config/dbConn")
const app = express()
const PORT = process.env.PORT || 1234

coonsctDB()

app.use(cors(corsOptions))
app.use(express.json())

app.use("/api/User",require("./route/routeUsers"))
app.use("/api/Todo",require("./route/routeTodos"))
app.use("/api/Post",require("./route/routePosts"))

mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB');
    app.listen(PORT,()=>{
        console.log(`server running on port ${PORT}`);
    })
})
mongoose.connection.on('error',err=>{
    console.log(err);
})



