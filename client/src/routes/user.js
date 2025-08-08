const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, '../db/users.db')); // Adjust path if needed

// Create users table if not exists
db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullname TEXT,
        address TEXT,
        email TEXT UNIQUE,
        phone TEXT,
        password TEXT
    )
`).run();

// Email validation function
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Password strength: min 8 chars, 1 uppercase, 1 lowercase, 1 number
function isStrongPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}

router.post('/signup', async (req, res) => {
    const { fullname, address, email, phone, password, repassword } = req.body;

    if (!isValidEmail(email)) {
        return res.status(400).send('Invalid email address.');
    }
    if (!isStrongPassword(password)) {
        return res.status(400).send('Password must be at least 8 characters and include uppercase, lowercase, and a number.');
    }
    if (password !== repassword) {
        return res.status(400).send('Passwords do not match.');
    }

    // Check if user already exists
    const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (existingUser) {
        return res.status(400).send('Email already registered.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.prepare(`
        INSERT INTO users (fullname, address, email, phone, password)
        VALUES (?, ?, ?, ?, ?)
    `).run(fullname, address, email, phone, hashedPassword);

    // Redirect to homepage
    res.redirect('/');
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!isValidEmail(email)) {
        return res.status(400).send('Invalid email address.');
    }

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) {
        return res.status(400).send('No account found with this email.');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).send('Incorrect password.');
    }

    // You can set session/cookie here for logged-in user
    res.redirect('/');
});

module.exports = router;