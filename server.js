// server.js
console.log('May Node be with you')
const express = require('express')
// const bodyParser = require('body-parser') 
//bodyParser is deprecated, we can take it out later
const app = express()


//bodyParser is deprecated, we can take it out later
// app.use(bodyParser.urlencoded({extended: true}))


// Make sure you place this before your CRUD handlers!
app.use(express.urlencoded({ extended: true }))


app.listen(3000, function () {
    console.log('listening on 3000')
  })
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})
app.post('/quotes', (req, res) => {
    console.log(req.body)
})


