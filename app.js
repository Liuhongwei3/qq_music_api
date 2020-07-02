const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')

const request = require('./util/request')

const port = 3003
const host = ''

// 创建一个 express (like http.createServer())
const app = express()

app.use('/use', (req, res) => res.send('Hello World~ From Use~'))   //  不限请求方法，路径：/use/*
app.all('/all', (req, res) => res.send('Hello World~ From All~'))   //  不限请求方法，路径(===)

app.get('/query', (req, res) => console.log(req.query))	//	通过 query 获取参数
//  http://localhost:3000/query?name=tadm	{ name: 'tadm' }
app.get('/params/:title/:name', (req, res) => res.send(req.params)) //  通过 params 获取参数
//  http://localhost:3000/params/test/tadm  {"title":"test","name":"tadm"}

// 公开指定目录,我们就可以通过 static/* 来访问 public 文件夹下的资源
// app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())

const special = {}

//  遍历 module 下的所有文件 (file)
fs.readdirSync(path.join(__dirname, 'modules')).reverse().forEach(file => {
  if (!file.endsWith('.js')) return
  // song_url.js ---> /song/url 当然上面有几个特殊的单独拿出来进行处理
  let route = (file in special) ? special[file] : '/' + file.replace(/\.js$/i, '').replace(/_/g, '/')
  // 拿到所有的方法赋值给 question
  let question = require(path.join(__dirname, 'modules', file))

  app.use('/api' + route, (req, res) => {
    let query = Object.assign({}, {cookie: req.cookies}, req.query, req.body)

    question(query, request)
        .then(function (response) {
          res.json(response)
        })
        .catch(function (error) {
          console.log(error)
          res.json(error)
        })
  })
})

app.listen(port, () => console.log(`Example app server running @ http://${host ? host : 'localhost'}:${port}/api!`))