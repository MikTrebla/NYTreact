const router = require('express').Router();
const Article = require('../models/articles.js');


// router.get('/api/articles', function(req,res) {

// })

router.post('/api/articles', function(req,res) {
    Article.create(req.body)
    .then((results) => {
        res.json(results);
        // console.log('added');
    }).catch((err) => {
        console.log(err);
    });
});

// router.delete










module.exports = router;