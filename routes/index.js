var express = require('express')
var router = express.Router()
var Db = require('../modules/db')
router.get('/', (req, res) => {
    Db.find('article', { 'status': 'publish' }, (error, result) => {
        res.render('index', {
            username: req.session.username,
            list: result
        })
    })
})
router.get('/person', (req, res) => {
    if (true) {
        Db.find('article', {}, (error, result) => {
            res.render('person', {
                username: req.session.username,
                list: result,
                from: req.session.from,
                test: { user: 'wei', pwdd: 'xx' }
            })
        })
    } else {
        res.redirect('/user/login')
    }

})

var user = require('./index/user')
var article = require('./index/article')
router.use('/article', article)
router.use('/user', user)

module.exports = router