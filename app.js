const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser());
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    const name = req.cookies.username
    if (name) {
        res.render('index', { name });
    } else {
        res.redirect('/hello')
    }
});



app.post('/goodbye', (req, res) => {
    const name = req.cookies.username;
    res.clearCookie('username', name);
    res.redirect('/hello');
})


app.get('/cards', (req, res) => {
    res.render('card', {prompt: 'Who is burried in Grant\'s tomb?'});
});

app.get('/hello', (req, res) => {
    const name = req.cookies.username
    if (!name) {
        res.render('hello');
    } else {
        res.redirect('/');
    }
});

app.post('/hello', (req, res) => {
    res.cookie('username', req.body.username)
    res.redirect('/')
});



let port = 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});