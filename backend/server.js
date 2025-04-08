const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Kushal@2004',
  database: 'e_commerce'
});

db.connect(err => {
  if (err) {
    console.error('DB connection failed:', err);
  } else {
    console.log('DB connected');
  }
});

// REGISTER
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;

  db.query('SELECT * FROM customers WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error("Error in SELECT:", err);
      return res.status(500).json({ message: 'Server error (select)' });
    }
    if (results.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    db.query('INSERT INTO customers (name, email, password) VALUES (?, ?, ?)', 
      [name, email, password],
      (err, result) => {
        if (err) {
          console.error("Error in INSERT:", err); // Add this line
          return res.status(500).json({ message: 'Server error (insert)' });
        }
        res.status(200).json({ message: 'Registered successfully' });
      }
    );
  });
});


// LOGIN
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.query(
    'SELECT * FROM customers WHERE email = ? AND password = ?',
    [email, password],
    (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length > 0) {
        res.json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    }
  );
});

app.listen(3304, () => console.log('Server running on http://localhost:3304'));
