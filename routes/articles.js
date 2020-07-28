const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Article = require('../models/article');

//
router.get('/myArticles', (req, res) =>{
    res.render('pages/myArticles', {user : req.session.user});
});

module.exports = router;