var express = require('express'),
	app = express(),
	path = require("path"),
	MongoClient = require('mongodb').MongoClient, 
	assert = require('assert'),
	bodyParser = require('body-parser'),
  url = 'mongodb://localhost:27017/trump_wall',
  db;


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true } )); 


var insertDocuments = function(db, profile) {

  var collection = db.collection('documents');
  
  collection.insert(profile, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted 1 document into the document collection");
  });

  collection.find({}).toArray(function(err, docs) {
    console.dir(docs);
  }); 
};


function addProfile(profile) {

  MongoClient.connect(url, profile, function(err, db) {
    assert.equal(null, err);

    insertDocuments(db, profile, function() {
      db.close();
    });
  });
};


app.get('/', function(request, response){
    response.sendFile('index.html', { root: __dirname });
});


MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);

  db.close(); 
});


app.post('/profile', function(req, res) {

  var profile = { name: req.body.name,
                  home: req.body.home,
                  thought: req.body.thought
                  };

  addProfile(profile);
});


app.listen(3000);
