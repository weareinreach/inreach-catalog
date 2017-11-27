var express = require('express');
var cookieParser = require('cookie-parser')
var app = express();
var auth = require('http-auth');
var routes = require('./api/routes');

app.use(cookieParser());

routes(app);

var basic = auth.basic({
    realm: "AC Catalog Demo"
  }, (username, password, callback) => { 
        callback(username === "demo" && password === "catalog2");
    });

if(typeof process.env.AUTHORIZE !== 'undefined') {
  app.use(auth.connect(basic));
}

app.use(function(req,res,next) {
  if(!req.secure && process.env.OD_API_ENV == 'production') {
    res.redirect(`https://${req.header('host')}${req.url}`);
  } else {
    next();
  }

})

app.use(function(req, res, next) {
  if(typeof process.env.REDIRECT === 'undefined' 
      || (req.query.sneakpeek && req.query.sneakpeek === 'yup')
      || (req.cookies.sneakpeek && req.cookies.sneakpeek === 'yup')) {
    res.cookie('sneakpeek', 'yup');
    return (express.static(__dirname + '/public/'))(req, res, next);
  } else {
    next()
  }

});

app.get('*', (req, res) => {
  if(typeof process.env.REDIRECT === 'undefined' 
    || (req.query.sneakpeek && req.query.sneakpeek === 'yup')
    || (req.cookies.sneakpeek && req.cookies.sneakpeek === 'yup')
    ) {
      res.sendFile(__dirname + '/public/index.html');
  } else {
    res.redirect(302, process.env.REDIRECT);
  }
});

app.listen(process.env.PORT || 8080);