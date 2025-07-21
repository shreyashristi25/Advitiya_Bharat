const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

const app = express();

// --- CORS FIX START ---
const allowedOrigin = 'https://advitiyabharat.netlify.app';
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', allowedOrigin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
// --- CORS FIX END ---

app.use(bodyParser.json());

const db = new sqlite3.Database('./users.db');

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password TEXT
)`);

// Register (accepts username, email, password)
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    const hashed = bcrypt.hashSync(password, 10);
    db.run(`INSERT INTO users(username, email, password) VALUES (?, ?, ?)`, [username, email, hashed], function(err) {
        if (err) {
            if (err.message && err.message.includes('UNIQUE')) {
                return res.status(400).json({ message: 'Username or email already exists.' });
            }
            return res.status(500).json({ message: 'Registration failed.' });
        }
        res.status(201).json({ message: 'Registration successful!' });
    });
});

// Login (accepts username or email)
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    db.get(`SELECT * FROM users WHERE username = ? OR email = ?`, [username, username], (err, user) => {
        if (err) {
            console.error('DB error:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });
        const match = bcrypt.compareSync(password, user.password);
        if (!match) return res.status(401).json({ message: 'Invalid credentials' });
        res.json({ message: 'Login successful!', username: user.username });
    });
});

// Add a root route for testing
app.get('/', (req, res) => {
  res.send('Backend is running on port 5000');
});

// In-memory product store (for demo)
let products = [];

// Product upload endpoint
app.post('/api/products', upload.single('productImage'), (req, res) => {
  const { productName, description, price, category, contact } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: 'Image upload failed.' });
  }
  const product = {
    productName,
    description,
    price,
    category,
    contact,
    imageUrl: `/uploads/${req.file.filename}`
  };
  products.unshift(product); // Add to start of array
  res.json({ message: 'Product uploaded!', product });
});

// GET /api/products to return all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// In-memory orders array (for demo)
let orders = [];

app.post('/api/buy', (req, res) => {
  const { productName, price, buyer } = req.body;
  if (!productName || !price) {
    return res.status(400).json({ message: 'Missing product info.' });
  }
  // Save order (in-memory for now)
  orders.push({ productName, price, buyer: buyer || 'Guest', date: new Date() });
  res.json({ message: 'Purchase successful!' });
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
