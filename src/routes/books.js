const express = require('express');
const fs = require('fs');
const path = require('path');
const {data} = require("express-session/session/cookie");
const router = express.Router();

// Function to read books from JSON file
const getBooksData = () => {
    try {
        const filePath = path.join(__dirname, '../data/books.json');

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            // Create the directory if it doesn't exist
            const dataDir = path.join(__dirname, '../data');
            if (!fs.existsSync(dataDir)) {
                fs.mkdirSync(dataDir, { recursive: true });
            }

            // Create empty JSON file with the correct structure
            fs.writeFileSync(filePath, JSON.stringify({ books: [] }, null, 2));
            return { books: [] };
        }

        const booksData = fs.readFileSync(filePath, 'utf8');
        const parsedData = JSON.parse(booksData);

        // Handle the nested structure where books are in a "books" property
        if (parsedData && typeof parsedData === 'object') {
            if (Array.isArray(parsedData.books)) {
                return parsedData; // Return the whole object with books array
            } else if (Array.isArray(parsedData)) {
                // If somehow the data is just an array, wrap it in the correct structure
                return { books: parsedData };
            }
        }

        // Default to empty structure if data is malformed
        return { books: [] };
    } catch (error) {
        console.error('Error reading books data:', error);
        return { books: [] };
    }
};

// Function to save books to JSON file with the nested structure
const saveBooksData = (booksData) => {
    try {
        const filePath = path.join(__dirname, '../data/books.json');
        const dataDir = path.join(__dirname, '../data');

        // Ensure directory exists
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        // Make sure we have the correct structure
        const dataToSave = Array.isArray(booksData)
            ? { books: booksData }
            : booksData;

        // Write formatted JSON with proper indentation
        fs.writeFileSync(filePath, JSON.stringify(dataToSave, null, 2));
        console.log(`Successfully saved ${dataToSave.books.length} books to data file`);
        return true;
    } catch (error) {
        console.error('Error saving books data:', error);
        throw error;
    }
};

module.exports = (app) => {
    app.use('/api/books', router);

    // Get all books
    router.get('/', (_req, res) => {
        try {
            const data = getBooksData();
            console.log(`Returning ${data.books.length} books`);
            return res.status(200).json(data.books); // Return just the books array
        } catch (err) {
            console.error('Error fetching books:', err);
            return res.status(500).json({message: 'Error fetching books', error: err.message});
        }
    });

    // Get book by ID
    router.get('/:id', (req, res) => {
        try {
            const data = getBooksData();
            const book = data.books.find(b => b.id === req.params.id);

            if (!book) {
                return res.status(404).json({message: 'Book not found'});
            }

            return res.status(200).json(book);
        } catch (err) {
            console.error('Error fetching book:', err);
            return res.status(500).json({message: 'Error fetching book', error: err.message});
        }
    });

    // Add a new book
    router.post('/', (req, res) => {
        try {
            console.log('Received POST request with body:', req.body);

            // Validate required fields
            if (!req.body.title || !req.body.author) {
                console.log('Validation failed: Missing required fields');
                return res.status(400).json({
                    message: 'Book title and author are required fields'
                });
            }

            // Read current books with nested structure
            const data = getBooksData();
            console.log(`Successfully read ${data.books.length} books from data file`);

            // Create new book object with proper structure
            const newBook = {
                id: req.body.id || Date.now().toString(),
                title: req.body.title,
                author: req.body.author,
                year: req.body.year ? parseInt(req.body.year) : null,
                genre: req.body.genre || 'Uncategorized',
                summary: req.body.summary || '',
                cover: req.body.cover || '/resources/images/placeholder.png'
            };

            // Add to books array
            data.books.push(newBook);
            console.log('Added new book:', newBook);
            console.log(`Books array now has ${data.books.length} items`);

            // Write updated books array to file, maintaining the nested structure
            saveBooksData(data);

            // Send success response with new book data
            return res.status(201).json(newBook);
        } catch (err) {
            console.error('Error in POST /books handler:', err);
            return res.status(500).json({
                message: 'Error adding book',
                error: err.message,
                stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
            });
        }
    });

    // Update a book
    router.put('/:id', (req, res) => {
        try {
            const data = getBooksData();
            const bookIndex = data.books.findIndex(b => b.id === req.params.id); 
            /**
            * Ensuring to stringify for id before checking?
            * like this:
            * const book = data.books.find(b => b.id.toString() === req.params.id);
            */

            if (bookIndex === -1) {
                return res.status(404).json({message: 'Book not found'});
            }

            // Create updated book object
            const updatedBook = {
                id: req.params.id, // Ensure ID stays the same
                title: req.body.title || data.books[bookIndex].title,
                author: req.body.author || data.books[bookIndex].author,
                year: req.body.year ? parseInt(req.body.year) : data.books[bookIndex].year,
                genre: req.body.genre || data.books[bookIndex].genre,
                summary: req.body.summary || data.books[bookIndex].summary,
                cover: req.body.cover || data.books[bookIndex].cover
            };

            // Update book in array
            data.books[bookIndex] = updatedBook;

            // Save updated books data
            saveBooksData(data);

            return res.status(200).json(updatedBook);
        } catch (err) {
            console.error('Error updating book:', err);
            return res.status(500).json({message: 'Error updating book', error: err.message});
        }
    });

    // Delete a book
    router.delete('/:id', (req, res) => {
        try {
            const data = getBooksData();
            const bookIndex = data.books.findIndex(b => b.id === req.params.id);

            if (bookIndex === -1) {
                return res.status(404).json({message: 'Book not found'});
            }

            // Remove book from array
            data.books.splice(bookIndex, 1);

            // Save updated books data
            saveBooksData(data);

            return res.status(200).json({message: 'Book deleted successfully'});
        } catch (err) {
            console.error('Error deleting book:', err);
            return res.status(500).json({message: 'Error deleting book', error: err.message});
        }
    });

    return router;
};
