// ===================== Backend =====================
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 🌟 เก็บหนังสือใน memory
let books = [];

// GET /api/books - ดึงรายการหนังสือทั้งหมด
app.get('/api/books', (req, res) => {
  res.json({
    books,
    statistics: {
      available: books.filter(b => b.status === 'available').length,
      borrowed: books.filter(b => b.status === 'borrowed').length,
      total: books.length
    }
  });
});

// POST /api/books - เพิ่มหนังสือใหม่
app.post('/api/books', (req, res) => {
  let { title = '', author = '', isbn = '' } = req.body; // default เป็น empty string

  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
    isbn,
    status: 'available'
  };

  books.push(newBook);

  res.status(201).json({ message: 'Book added', book: newBook });
});

// PUT /api/books/:id - อัปเดตหนังสือ
app.put('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ error: 'Book not found' });

  let { title = '', author = '', isbn = '' } = req.body;
  book.title = title;
  book.author = author;
  book.isbn = isbn;

  res.json({ message: 'Book updated', book });
});

// DELETE /api/books/:id - ลบหนังสือ
app.delete('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter(b => b.id !== id);
  res.json({ message: 'Book deleted' });
});

// PUT /api/books/:id/borrow - ยืมหนังสือ
app.put('/api/books/:id/borrow', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  if (book.status !== 'available') return res.status(400).json({ error: 'Book not available' });

  book.status = 'borrowed';
  res.json({ message: 'Book borrowed', book });
});

// PUT /api/books/:id/return - คืนหนังสือ
app.put('/api/books/:id/return', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  if (book.status !== 'borrowed') return res.status(400).json({ error: 'Book not borrowed' });

  book.status = 'available';
  res.json({ message: 'Book returned', book });
});

// ❗ เริ่ม server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// ===================== Frontend Helper Functions =====================

// Escape HTML ป้องกัน crash
function escapeHtml(text) {
    if (!text) text = ''; // ถ้า undefined/null
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// สร้าง card หนังสือ
function createBookCard(book) {
    const title = escapeHtml(book.title);
    const author = escapeHtml(book.author);
    const isbn = escapeHtml(book.isbn);
    const status = book.status || 'available';

    return `
        <div class="book-card">
            <h3>${title}</h3>
            <p class="author">👤 ${author}</p>
            <p class="isbn">🔖 ISBN: ${isbn}</p>
            <span class="status-badge status-${status}">
                ${status === 'available' ? '✅' : '📖'} ${status.toUpperCase()}
            </span>
            <div class="actions">
                ${status === 'available' 
                    ? `<button onclick="borrowBook(${book.id})">Borrow</button>`
                    : `<button onclick="returnBook(${book.id})">Return</button>`
                }
                <button onclick="editBook(${book.id})">Edit</button>
                <button onclick="deleteBook(${book.id})">Delete</button>
            </div>
        </div>
    `;
}
