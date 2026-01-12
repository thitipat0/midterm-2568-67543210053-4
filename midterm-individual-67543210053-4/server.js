const express = require('express');
const bookRoutes = require('./src/presentation/routes/bookRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public')); // ถ้า frontend อยู่ใน public/

// ใช้ routes ของ books
app.use('/api/books', bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
