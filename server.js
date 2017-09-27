var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public/'));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(process.env.PORT || 8080);