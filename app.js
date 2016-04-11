var express = require('express');
var app = express();
var path = require("path");

var MongoClient = require('mongodb').MongoClient, 
	assert = require('assert');

var url = 'mongodb://localhost:27017/trump_wall';

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  db.close();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request, response){
    response.sendFile('index.html', { root: __dirname });
});

app.listen(3000);