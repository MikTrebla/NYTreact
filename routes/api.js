const router = require('express').Router();
const Article = require('../models/articles.js');


router.get('/api/articles', function(req,res) {
    Article.find()
    .then( results => {
        res.json(results);
    }).catch( err => {
        console.log(err);
    })
})

router.post('/api/articles', function(req,res) {
    Article.create(req.body)
    .then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
    });
});

router.delete('/api/articles/:id', (req, res) => {
    Article.deleteOne({
        _id: req.params.id
    }).then(result => {
        res.location('/saved')
    })
})










module.exports = router;