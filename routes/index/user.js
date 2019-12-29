var express = require('express')
var router = express.Router()

router.get('/login', (req, res) => {
    res.render('login')
})
router.get('/reg', (req, res) => {
    res.render('reg')
})
router.post('/doReg', (req, res) => {
    res.send('doReg')
})
router.post('/doLogin', (req, res) => {
    console.log(req.body)

    res.send('doLogin')
})

module.exports = router