var express = require('express')
var router = express.Router()
var Db = require('../modules/db')
router.get('/', (req, res) => {
    Db.find('user', {}, (error, result) => {
        console.log(result)
        res.render('index', {
            username: '',
            list: result
        })
    })

})

var user = require('./index/user')
router.use('/user', user)

module.exports = router