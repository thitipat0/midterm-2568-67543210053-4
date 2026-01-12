const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// test route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
