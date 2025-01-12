

// server.js
const express = require('express')
// const bodyParser = require('body-parser') 
//bodyParser is deprecated, we can take it out later
const app = express()
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb://user2000:test123@ac-knf3crk-shard-00-00.m4qnvex.mongodb.net:27017,ac-knf3crk-shard-00-01.m4qnvex.mongodb.net:27017,ac-knf3crk-shard-00-02.m4qnvex.mongodb.net:27017/?ssl=true&replicaSet=atlas-it8cwt-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'


// 'mongodb+srv://user2000:test123@cluster0.m4qnvex.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

// 'mongodb://user2000:test123@ac-knf3crk-shard-00-00.m4qnvex.mongodb.net:27017,ac-knf3crk-shard-00-01.m4qnvex.mongodb.net:27017,ac-knf3crk-shard-00-02.m4qnvex.mongodb.net:27017/?ssl=true&replicaSet=atlas-it8cwt-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'


MongoClient.connect(connectionString).then(client => {
        console.log('May Node be with you')
        console.log('Connected to Database')
        const db = client.db('star-wars-quotes')
        const quotesCollection = db.collection('quotes')

        app.use(express.urlencoded({ extended: true })) // Make sure you place this before your CRUD handle!
        app.get('/', function (req, res) {
            res.sendFile(__dirname + '/index.html')
        })
        app.post('/quotes', (req, res) => {
            quotesCollection
              .insertOne(req.body)
              .then(result => {
                console.log(result)
              })
              .catch(error => console.error(error))
          })
        app.listen(9000, function () {
            console.log('listening on 9000')
        })
    })
    .catch(error => console.error(error))









