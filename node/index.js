const axios = require('axios');  //请求处理
const express = require('express')  //服务器模块
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8")
    next()
});

app.get('/', (req, res) => {
})

app.post('/nav',async (req, res) => {
    try {
        // let form = req.body
        // let url = `http://passport.bilibili.com/web/login/v2`
        // let respnse = await axios.post(url,transformData(form))
        // const cookie = respnse.headers['set-cookie'][2].split(';')[0]
        const data = await axios.get('http://api.bilibili.com/nav', 
            {headers: {'cookie': 'SESSDATA=36a1ea9a%2C1619659635%2C1b936*a1'}
        })
        res.send(data.data)
    } catch(err) {
        res.send('Whoops !')
        console.log(err)
    }

})

app.post('/followings',async (req, res) => {
    try {
        // let form = req.body
        // let url = `http://passport.bilibili.com/web/login/v2`
        // let respnse = await axios.post(url,transformData(form))
        // const cookie = respnse.headers['set-cookie'][2].split(';')[0]
        const data = await axios.get('http://api.bilibili.com/x/relation/followings?vmid=293793435', 
            {headers: {'cookie': 'SESSDATA=36a1ea9a%2C1619659635%2C1b936*a1'}
        })
        res.send(data.data)
    } catch(err) {
        res.send('Whoops !')
        console.log(err)
    }

})

app.listen(3000,()=>{
})

function transformData(data) {
    let ret = ''
    for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
}