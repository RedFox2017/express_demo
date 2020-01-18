var express = require('express')
var bodyParser = require('body-parser')
var session = require('express-session')
var cors = require('cors')
var app = new express()
//跨域配置
app.use(cors())

//配置session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))
//配置静态托管
app.use('/static', express.static('statics'))
//配置ejs模板引擎
app.set('view engine', 'ejs')
//配置bodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//应用级中间件
app.use((req, res, next) => {
    console.log(new Date())
    next()
})

//路由模块化

var index = require('./routes/index')
var api = require('./routes/api')

app.use('/api', api)
app.use('/', index)

app.listen(9000)