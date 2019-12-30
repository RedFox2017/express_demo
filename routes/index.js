var express = require('express')
var router = express.Router()
var Db = require('../modules/db')
router.get('/', (req, res) => {
    Db.find('article', {}, (error, result) => {
        res.render('index', {
            username: req.session.username,
            list: result
        })
    })
})
router.get('/person', (req, res) => {
    res.render('person')
})
var user = require('./index/user')
router.use('/user', user)

module.exports = router