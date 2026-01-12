const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// GET /api/books
router.get('/', bookController.getAllBooks);

// POST /api/books
router.post('/', bookController.createBook);

// PUT /api/books/:id
router.put('/:id', bookController.updateBook);

// DELETE /api/books/:id
router.delete('/:id', bookController.deleteBook);

module.exports = router;
