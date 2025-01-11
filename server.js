// server.js
console.log('May Node be with you')
const express = require('express')
// const bodyParser = require('body-parser') 
//bodyParser is deprecated, we can take it out later
const app = express()
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb://user2000:test123@ac-knf3crk-shard-00-00.m4qnvex.mongodb.net:27017,ac-knf3crk-shard-00-01.m4qnvex.mongodb.net:27017,ac-knf3crk-shard-00-02.m4qnvex.mongodb.net:27017/?ssl=true&replicaSet=atlas-it8cwt-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'

//  'mongodb+srv://user2000:test123@cluster0.m4qnvex.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

// 'mongodb://test:testtesttest@ac-knf3crk-shard-00-00.m4qnvex.mongodb.net:27017,ac-knf3crk-shard-00-01.m4qnvex.mongodb.net:27017,ac-knf3crk-shard-00-02.m4qnvex.mongodb.net:27017/?ssl=true&replicaSet=atlas-it8cwt-shard-0&authSource=admin&retryWrites=true&w=majority'


//bodyParser is deprecated, we can take it out later
// app.use(bodyParser.urlencoded({extended: true}))

MongoClient.connect(connectionString, {
    useUnifiedTopology: true
}, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
})

// Make sure you place this before your CRUD handlers!
app.use(express.urlencoded({ extended: true }))


app.listen(9000, function () {
    console.log('listening on 9000')
  })
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})
app.post('/quotes', (req, res) => {
    console.log(req.body)
})


