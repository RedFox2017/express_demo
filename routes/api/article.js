var express = require('express')
var router = express.Router()
var Db = require('../../modules/db')
router.get('/', (req, res) => {
    Db.find('article', { 'status': 'publish' }, (error, result) => {
        res.send(result)
    })
})
router.post('/publish', (req, res) => {
    req.body.status = 'publish'
    Db.insertOne('article', req.body, (err, result) => {
        if (err) {
            console.log('发布失败')
        } else {
            console.log('发布成功')
        }
    })
})
router.get('/search', (req, res) => {
    console.log(req.query)
    Db.search('article', { status: 'publish', queryString: req.query.title }, (error, result) => {
        console.log("/article/search")
        console.log(result)
        res.send(result)
    })
})
module.exports = router