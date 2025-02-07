
// upgrate mongodb: 
// npm install mongodb@3.6


// server.js
const bodyParser = require('body-parser')
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
    app.set('view engine', 'ejs')
    app.use(express.urlencoded({ extended: true })) // Make sure you place this before your CRUD handle!
    app.use(express.static('public'))
    app.use(bodyParser.json()) // is this deprecated? could check if it effects the code


    app.get('/', function (req, res) {
        quotesCollection.find().toArray() //quotes in an array in the terminal. We see the quotes that we added
            .then(results => {
                console.log(results)
                res.render('index.ejs', { quotes: results })
                // res.render('index.ejs', {}) // it's already expecting it to be inside of the views folder so we don't need to specify that location it already that's where it's expecting it
            })
            .catch(error => console.error(error))
        // res.sendFile(__dirname + '/index.html')
        // replaced with res.render('index.ejs', {}), and moved it to app.get
    })
    app.post('/quotes', (req, res) => {
        quotesCollection
            .insertOne(req.body)
            .then(result => {
                console.log(result)
                res.redirect('/')
            })
            .catch(error => console.error(error))
    })
    app.put('/quotes', (req, res) => {
        quotesCollection.findOneAndUpdate(
                { name: 'Yoda'.toLowerCase() },
                {
                    $set: {
                        name: req.body.name,
                        quote: req.body.quote,
                    },
                },
                {
                    upsert: true,
                }
            )
            .then(result => {
                console.log(result)
                res.json('Success')
            })
            .catch(error => console.error(error))
    })
    app.delete('/quotes', (req, res) => {
        quotesCollection.deleteOne(
            { name: req.body.name }
        )
          .then(result => {
            if (result.deletedCount === 0) {
                return res.json('No quote to delete')
              }
            res.json(`Deleted Darth Vader's quote`)
          })
          .catch(error => console.error(error))
      })
    app.listen(9000, function () {
        console.log('listening on 9000')
    })
})
    .catch(error => console.error(error))









