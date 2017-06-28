var express = require('express')
var path = require('path')
var request = require('request')
var bodyParser = require('body-parser')

var app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res){
    res.send("Hello ")
})

app.get('/api/archive', function(req, res) {
    request('http://127.0.0.1:8000/api/archive/', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // Print the google web page.
        }
    })
})
app.post('/api/archive', function(req, res) {
    res.send("Will post the given archive")
})
app.put('/api/archive', function(req, res) {
    res.send("Will update the given archive")
})
app.delete('/api/archive', function(req, res) {
    res.send("Will delete the given archive")
})

 app.listen(5000, function(){
     console.log("Server running at port 5000")
 })