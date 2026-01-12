// src/presentation/controllers/bookController.js
let books = []; // memory storage

class BookController {
    // GET /api/books
    getAllBooks(req, res, next) {
        try {
            const { status } = req.query;
            let filteredBooks = books;
            if (status) filteredBooks = books.filter(b => b.status === status);

            const statistics = {
                total: filteredBooks.length,
                available: filteredBooks.filter(b => b.status === 'available').length,
                borrowed: filteredBooks.filter(b => b.status === 'borrowed').length
            };

            res.json({ books: filteredBooks, statistics });
        } catch (err) {
            next(err);
        }
    }

    // POST /api/books
    createBook(req, res, next) {
        try {
            const { title, author } = req.body;
            if (!title || !author) return res.status(400).json({ error: 'Title and author required' });

            const newBook = {
                id: books.length + 1,
                title,
                author,
                status: 'available'
            };
            books.push(newBook);

            res.status(201).json({ message: 'Book added', book: newBook });
        } catch (err) {
            next(err);
        }
    }

    // PUT /api/books/:id
    updateBook(req, res, next) {
        res.status(501).json({ message: 'Not implemented' });
    }

    // DELETE /api/books/:id
    deleteBook(req, res, next) {
        res.status(501).json({ message: 'Not implemented' });
    }
}

module.exports = new BookController();
