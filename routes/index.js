const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const name = req.cookies.username
    if (name) {
        res.render('index', { name });
    } else {
        res.redirect('/hello')
    }
});



router.post('/goodbye', (req, res) => {
    const name = req.cookies.username;
    res.clearCookie('username', name);
    res.redirect('/hello');
})


router.get('/hello', (req, res) => {
    const name = req.cookies.username
    if (!name) {
        res.render('hello');
    } else {
        res.redirect('/');
    }
});

router.post('/hello', (req, res) => {
    res.cookie('username', req.body.username)
    res.redirect('/')
});

module.exports = router;