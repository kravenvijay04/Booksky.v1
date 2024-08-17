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

//Route for post a book
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
//Route for get all book 
app.get('/books', async (req, res) => {
    try {
        const Book = await book.find({});
        return res.status(202).json({
            count: book.length,
            data: Book
        })
    }
    catch (error) {
        console.log(error.message)
        res.status(200).send({ message: error.message })
    }
})

//Route for get book by ID
app.get('/books/:id', async (req, res) => {
    try {

        const { id } = req.params;
        const Book = await book.findById(id);
        return res.status(202).json(Book)
    }
    catch (error) {
        console.log(error.message)
        res.status(200).send({ message: error.message })
    }
})

//Rout for update a book by id
app.put('/books/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishedYear) {
            res.status(202).send({
                message: "send all required fields"
            })
        }
        const { id } = req.params;
        const result = await book.findByIdAndUpdate(id, req.body);
        if (!result) {
            return res.status(202).json({ message: "book not found" })
        }
        return res.status(202).json({ message: "Book updated successfully" })
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

