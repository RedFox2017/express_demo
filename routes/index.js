var express = require('express')
var router = express.Router()
var Db = require('../modules/db')
router.get('/', (req, res) => {
    Db.find('user', {}, (error, result) => {
        res.render('index', {
            username: req.session.username,
            list: result
        })
    })

})

var user = require('./index/user')
router.use('/user', user)

module.exports = router