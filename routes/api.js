var express = require('express')
var router = express.Router()

var user = require('./api/user')
var article = require('./api/article')
router.use('/article', article)
router.use('/user', user)

module.exports = router