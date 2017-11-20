var express = require('express');
var app = express();
var auth = require('http-auth');
var routes = require('./api/routes');

routes(app);

var basic = auth.basic({
    realm: "AC Catalog Demo"
  }, (username, password, callback) => { 
        callback(username === "demo" && password === "catalog2");
    });

app.use(auth.connect(basic));
app.use(express.static(__dirname + '/public/'));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(process.env.PORT || 8080);