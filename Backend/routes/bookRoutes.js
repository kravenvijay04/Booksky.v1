import express from "express"
import { book } from "../models/bookmodels.js"
const router = express.Router();

//Route for post a book
router.post('/', async (req, res) => {
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
router.get('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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
//Route for delete a book by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await book.findByIdAndDelete(id);
        if (!result) {
            return res.status(202).json({ message: "book not found" })
        }
        return res.status(202).json({ message: "Book deleted successfully" })
    }
    catch (error) {
        console.log(error.message)
        res.status(200).send({ message: error.message })
    }
})
//export the router
export default router;
