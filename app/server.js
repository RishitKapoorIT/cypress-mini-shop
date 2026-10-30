const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Mock products database in memory
let products = [
  { id: 1, name: "Wireless Mechanical Keyboard", price: "$129.99", stock: "In Stock" },
  { id: 2, name: "Ergonomic Vertical Mouse", price: "$59.99", stock: "Low Stock" }
];

// API: Get products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// API: Add product
app.post('/api/products', (req, res) => {
  const { name, price, stock = "In Stock" } = req.body;
  const newProduct = {
    id: products.length + 1,
    name: name || "New Product",
    price: price || "$0.00",
    stock
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Serve Login Page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve Dashboard Page
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Root redirect
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Export or start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Cypress Mini Shop running at http://localhost:${PORT}`);
  });
}

module.exports = app;
