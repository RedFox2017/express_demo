var express = require('express')
var router = express.Router()
var Db = require('../../modules/db')

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
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
router.post('/login', (req, res) => {
    console.log(req.body)

    Db.find('user', req.body, (err, result) => {
        console.log("length" + result.length)
        if (result.length >= 1) {
            console.log(result)
            console.log('登录成功')
            req.session.username = req.body.username
            res.send('success')
        } else {
            console.log('登录失败')
            res.send('faild')
        }
    })
})

module.exports = router