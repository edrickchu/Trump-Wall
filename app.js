var express = require('express');
var app = express();
var path = require("path");

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request, response){
    response.sendFile('index.html', { root: __dirname });
});

app.listen(3000);