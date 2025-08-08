const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routes/user');
app.use('/', userRoutes);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

let balance = 0;
let coins = 0;
let user = {
    name: '',
    email: '',
    phone: '',
    address: ''
};

app.get('/', (req, res) => {
    res.render('home', { balance, coins, user });
});

app.get('/login', (req, res) => {
    res.render('accounts/login');
});

app.get('/signup', (req, res) => {
    res.render('accounts/signup');
});

app.get('/account/infor-update', (req, res) => {
    res.render('accounts/infor-update', { user });
});

// Logout route
app.get('/logout', (req, res) => {
    user = { name: '', email: '', phone: '', address: '' }; // Clear user info
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});