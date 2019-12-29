var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
    var arr = [345, 333, 445]

    res.render('index', {
        username: '',
        list: arr
    })
})

var user = require('./index/user')
router.use('/user', user)

module.exports = router