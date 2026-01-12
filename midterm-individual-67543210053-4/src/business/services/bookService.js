// src/business/services/bookService.js
const bookRepository = require('../../data/repositories/bookRepository');
const bookValidator = require('../validators/bookValidator');

class BookService {
    // ดึงหนังสือทั้งหมด
    async getAllBooks(status = null) {
        let books = await bookRepository.findAll(status);

        const statistics = {
            total: books.length,
            available: books.filter(b => b.status === 'available').length,
            borrowed: books.filter(b => b.status === 'borrowed').length
        };

        return { books, statistics };
    }

    // ดึงหนังสือโดย ID
    async getBookById(id) {
        const book = await bookRepository.findById(id);
        if (!book) throw new Error('Book not found');
        return book;
    }

    // สร้างหนังสือใหม่
    async createBook(bookData) {
        // validate
        bookValidator.validateBookData(bookData);

        // กำหนด status เริ่มต้น
        const newBook = {
            ...bookData,
            status: 'available'
        };

        // save ผ่าน repository
        const createdBook = await bookRepository.create(newBook);
        return createdBook;
    }

    // ตัวอย่างอื่น ๆ (update/borrow/return/delete) ยังไม่ implement
}

module.exports = new BookService();
