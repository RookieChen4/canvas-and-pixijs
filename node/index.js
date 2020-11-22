const axios = require('axios');  //请求处理
const express = require('express')  //服务器模块
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
app.get('/', (req, res) => {
})

app.post('/test',(req, res) => {
    let form = req.body
    let url = `http://passport.bilibili.com/web/login/v2`
    axios.post(url,test(form))
    .then(res=>{
        console.log(res.headers['set-cookie'][2].split(';')[0].split('=')[1])
    })
})

app.listen(3000,()=>{
})

function test(data) {
    let ret = ''
    for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
}