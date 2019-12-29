var express = require('express')
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient

var app = new express()
//配置数据库
var dbUrl = 'mongodb://localhost:27017/test'

//配置静态托管
app.use('/static', express.static('statics'))
//配置ejs模板引擎
app.set('view engine', 'ejs')
//配置bodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/test', (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html;charset=UTF8" })
    MongoClient.connect(dbUrl, (err, client) => {
        if (err) {
            res.write('数据库连接失败')
            return
        }
        res.write('数据库连接成功')
        var db = client.db('test')
        db.collection('user').insertOne({ "name": "hao" }, (err, result) => {
            if (err) {
                res.write('数据库写入失败')
                return
            }
            res.write('数据库写入成功')

            res.end()
        })
    })
})
//应用级中间件
app.use((req, res, next) => {
    console.log(new Date())
    next()
})

//路由模块化

var index = require('./routes/index')
app.use('/', index)


app.listen(8800)