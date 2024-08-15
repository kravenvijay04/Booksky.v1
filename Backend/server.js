import express from "express"
import { PORT, MongodbURL } from "./config.js"
import mongoose from "mongoose"
import { book } from "./models/bookmodels.js"
const app = express()


app.use(express.json())
app.get('/', (req, res) => {
    console.log(req);
    return res.status(555).send("Welcome to booksky website");
})

app.post('/book', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishedYear) {
            res.status(201).send({
                message: "send all required fields"
            })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishedYear: req.body.publishedYear,
        }
        const Book = await book.create(newBook)

        return res.status(202).send(Book);
    }
    catch (error) {
        console.log(error.message)
        res.status(200).send({ message: error.message })
    }
})

mongoose.connect(MongodbURL)
    .then(() => {
        console.log("connected")
        app.listen(PORT, () => {
            console.log("server is connected")
        })
    })

