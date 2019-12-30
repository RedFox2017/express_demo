var express = require('express')
var router = express.Router()
var Db = require('../../modules/db')
router.post('/publish', (req, res) => {
    console.log('打印文章如下')
    console.log(req.body)
    req.body.status = 'publish'
    Db.insertOne('article', req.body, (err, result) => {
        if (err) {
            console.log('发布失败')
        } else {
            console.log('发布成功')
        }
    })
    res.redirect('/person')
})
router.get('/del/:aid', (req, res) => {
    Db.deleteOne('article', { "_id": new Db.ObjectID(req.params.aid) }, (err, result) => {
        if (err) {
            console.log('删除失败')
        } else {
            console.log('删除成功')
        }
    })
    res.redirect('/person')
})
router.get('/pub/:aid', (req, res) => {
    Db.update('article', { "_id": new Db.ObjectID(req.params.aid) }, { 'status': 'publish' }, (err, result) => {
        if (err) {
            console.log('删除失败')
        } else {
            console.log('删除成功')
        }
    })
    res.redirect('/person')
})
router.get('/back/:aid', (req, res) => {
    Db.update('article', { "_id": new Db.ObjectID(req.params.aid) }, { 'status': 'draft' }, (err, result) => {
        if (err) {
            console.log('撤回失败')
        } else {
            console.log('撤回成功')
        }
    })
    res.redirect('/person')
})
router.get('/edit/:aid', (req, res) => {
    Db.findOne('article', { "_id": new Db.ObjectID(req.params.aid) }, (err, result) => {
        if (err) {
            console.log('编辑失败')
        } else {
            console.log('编辑成功')
            req.session.from = result
            console.log('edit:')
            console.log(req.session.from)
            res.redirect('/person')
        }
    })

})
module.exports = router