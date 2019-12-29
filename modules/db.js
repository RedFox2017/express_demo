var MongoClient = require('mongodb').MongoClient
//配置数据库地址
var dbUrl = 'mongodb://localhost:27017/test'

function __connectDb(callback) {

    MongoClient.connect(dbUrl, (err, client) => {
        if (err) {
            console.log('数据库连接失败')
            return  //返回到调用__connectDb函数的地方,下面的代码不执行,回调函数不执行
        }
        console.log('数据库连接成功')
        callback(client)
    })
}

//查找函数
exports.insertOne = (collectionName, json, callback) => {
    __connectDb((client) => {
        var db = client.db('test')
        db.collection(collectionName).insertOne(json, (error, result) => {
            callback(error, result)

        })
        client.close()
    })
}

exports.find = (collectionName, json, callback) => {
    __connectDb((client) => {
        var db = client.db('test')
        var result = db.collection(collectionName).find(json)
        result.toArray((error, result) => {
            callback(error, result)//回调函数会执行,返回转换数组的错误或者正确结果
        })
        client.close()
    })
}
