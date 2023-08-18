require('dotenv').config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override')
const session = require('express-session');
const { flash } = require('express-flash-message');


const connectDB = require('./server/config/db');


const app = express(); 
const port = 5000 || process.env.PORT;

connectDB();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));

// static files
app.use(express.static('public'));

// Express Session
app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        }
    })
);
// Flash message
app.use(flash({ sessionKeyName: 'flashMessage'}));


// Flash Messages 



// Template  Engine
app.use(expressLayout);
app.set('layout', './layouts/main')
app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log(`app listening on ${port}`)
})

// Routes
app.use('/', require('./server/routes/customer'))
 // handle 404

 app.get('*', (req, res) => {
    res.status(404).render('404');
 })

