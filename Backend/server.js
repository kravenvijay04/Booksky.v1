import express from "express"
import { PORT, MongodbURL } from "./config.js"
import mongoose from "mongoose"
const app = express()



app.get('/', (req, res) => {
    console.log(req);
    return res.status(555).send("Welcome to booksky website");
})

mongoose.connect(MongodbURL)
    .then(() => {
        console.log("connected")
        app.listen(PORT, () => {
            console.log("server is connected")
        })
    })

