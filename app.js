const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const path = require('path');

mongoose
    .connect('mongodb://127.0.0.1:27107/javascript-oop-canvas')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });


//ejs, pug(o), render
app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'views'));

//http://localhost:3000
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// app.get('/', (req, res) => {
//     res.render('index', {title: 'Hey', message: 'Hello there!'});
// });

app.listen(3000, () => {
    console.log('Server on!');
});
