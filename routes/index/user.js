var express = require('express')
var router = express.Router()
var Db = require('../../modules/db')
router.get('/login', (req, res) => {
    res.render('login')
})
router.get('/reg', (req, res) => {
    res.render('reg')
})
router.post('/doReg', (req, res) => {
    console.log(req.body)
    var uname = req.body.username
    var pwd = req.body.password
    var email = req.body.email
    Db.insertOne('user', { 'username': uname, 'password': pwd, 'email': email }, (err, result) => {

        if (result) {
            console.log(result)
            res.redirect('/user/login')
        } else {
            console.log(err)
            res.redirect('/user/reg')
        }
    })
})
router.post('/doLogin', (req, res) => {
    console.log(req.body)
    var uname = req.body.username
    var pwd = req.body.password

    Db.find('user', { 'username': uname, 'password': pwd }, (err, result) => {
        console.log("length" + result.length)
        if (result.length >= 1) {
            console.log(result)
            console.log('登录成功')
            req.session.username = uname
            res.redirect('/')
        } else {
            console.log('登录失败')
            res.redirect('/user/login')
        }
    })
})

module.exports = router