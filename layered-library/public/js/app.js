// Main Application Logic for Library Management
let currentFilter = 'all';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadBooks();
});

// Setup event listeners
function setupEventListeners() {
    document.getElementById('add-btn').addEventListener('click', showAddModal);
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            filterBooks(filter);
        });
    });
    
    document.querySelector('.close').addEventListener('click', closeModal);
    document.getElementById('cancel-btn').addEventListener('click', closeModal);
    document.getElementById('book-form').addEventListener('submit', handleSubmit);
}

// Load books
async function loadBooks(status = null) {
    try {
        showLoading();
        
        const res = await fetch('http://localhost:3000/api/books');
        const data = await res.json();

        // Filter by status if needed
        let books = data.books;
        if (status) books = books.filter(b => b.status === status);

        displayBooks(books);
        updateStatistics({
            available: books.filter(b => b.status === 'available').length,
            borrowed: books.filter(b => b.status === 'borrowed').length,
            total: books.length
        });
        
        hideLoading();
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to load books: ' + error.message);
        hideLoading();
    }
}

// Display books
function displayBooks(books) {
    const container = document.getElementById('book-list');
    
    if (books.length === 0) {
        container.innerHTML = '<div class="no-books">📚 No books found</div>';
        return;
    }
    
    container.innerHTML = books.map(book => createBookCard(book)).join('');
}

// Create book card HTML
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

// Update statistics
function updateStatistics(stats) {
    document.getElementById('stat-available').textContent = stats.available;
    document.getElementById('stat-borrowed').textContent = stats.borrowed;
    document.getElementById('stat-total').textContent = stats.total;
}

// Filter books
function filterBooks(status) {
    currentFilter = status;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === status) {
            btn.classList.add('active');
        }
    });
    
    loadBooks(status === 'all' ? null : status);
}

// Show/hide loading
function showLoading() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('book-list').style.display = 'none';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('book-list').style.display = 'grid';
}

// Modal functions
function showAddModal() {
    document.getElementById('modal-title').textContent = 'Add New Book';
    document.getElementById('book-form').reset();
    document.getElementById('book-id').value = '';
    document.getElementById('book-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('book-modal').style.display = 'none';
}

// Form submit
async function handleSubmit(event) {
    event.preventDefault();
    
    const id = document.getElementById('book-id').value;
    const bookData = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        isbn: document.getElementById('isbn').value
    };
    
    try {
        if (id) {
            await fetch(`http://localhost:3000/api/books/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookData)
            });
            alert('Book updated successfully!');
        } else {
            await fetch('http://localhost:3000/api/books', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookData)
            });
            alert('Book added successfully!');
        }
        
        closeModal();
        loadBooks(currentFilter === 'all' ? null : currentFilter);
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Edit book
async function editBook(id) {
    try {
        const res = await fetch(`http://localhost:3000/api/books`);
        const data = await res.json();
        const book = data.books.find(b => b.id === id);
        
        if (!book) throw new Error('Book not found');

        document.getElementById('modal-title').textContent = 'Edit Book';
        document.getElementById('book-id').value = book.id;
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('isbn').value = book.isbn;
        
        document.getElementById('book-modal').style.display = 'flex';
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Borrow book
async function borrowBook(id) {
    if (!confirm('Do you want to borrow this book?')) return;
    
    try {
        await fetch(`http://localhost:3000/api/books/${id}/borrow`, { method: 'PUT' });
        alert('Book borrowed successfully!');
        loadBooks(currentFilter === 'all' ? null : currentFilter);
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Return book
async function returnBook(id) {
    if (!confirm('Do you want to return this book?')) return;
    
    try {
        await fetch(`http://localhost:3000/api/books/${id}/return`, { method: 'PUT' });
        alert('Book returned successfully!');
        loadBooks(currentFilter === 'all' ? null : currentFilter);
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Delete book
async function deleteBook(id) {
    if (!confirm('Are you sure?')) return;
    
    try {
        await fetch(`http://localhost:3000/api/books/${id}`, { method: 'DELETE' });
        alert('Book deleted successfully!');
        loadBooks(currentFilter === 'all' ? null : currentFilter);
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Escape HTML (แก้แล้ว)
function escapeHtml(text) {
    if (!text) text = ''; // ป้องกัน undefined/null
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
