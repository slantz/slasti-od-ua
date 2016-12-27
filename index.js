'use strict';

require('dotenv').config();

var fs = require('fs');
var path = require('path');
var join = require('path').join;

var express = require('express');
var app = express();

var compress = require('compression');
var layouts = require('express-ejs-layouts');
var passport = require('passport');

var mongoose = require('mongoose');

const models = join(__dirname, 'server/api/models');

// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));

// Bootstrap routes
require('./server/config/passport')(passport);

app.set('layout');
app.set('view engine', 'ejs');
app.set('view options', {layout: 'layout'});
app.set('views', path.join(process.cwd(), '/server/views'));

app.use(compress());
app.use(layouts);
app.use('/client', express.static(path.join(process.cwd(), '/client')));

app.use(passport.initialize());
app.use(passport.session());

app.disable('x-powered-by');

var env = {
  production: process.env.NODE_ENV === 'production'
};

if (env.production) {
  Object.assign(env, {
    assets: JSON.parse(fs.readFileSync(path.join(process.cwd(), 'assets.json')))
  });
}


// order of routes matters!
app.get('/auth/vk', passport.authenticate('vkontakte'));

app.get('/auth/vk/callback',
    passport.authenticate('vkontakte', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
);

app.get(/^\/.*(?!(auth|api)).*$/, function(req, res) {
  res.render('index', {
    env: env,
    user: req.user
  });
});

connect()
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);

var port = Number(process.env.PORT || 3001);

function listen () {
    if (app.get('env') === 'test') return;
    app.listen(port ,function() {
        console.log('server running at localhost:' + port + ', go refresh and see magic');
    });
}

function connect () {
    var options = { server: { socketOptions: { keepAlive: 1 } } };
    return mongoose.connect(process.env.DB, options).connection;
}

if (env.production === false) {
  var webpack = require('webpack');
  var WebpackDevServer = require('webpack-dev-server');

  var webpackDevConfig = require('./webpack.config.development');

  new WebpackDevServer(webpack(webpackDevConfig), {
    publicPath: '/client/',
    contentBase: './client/',
    inline: true,
    hot: true,
    stats: false,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3001',
      'Access-Control-Allow-Headers': 'X-Requested-With'
    }
  }).listen(3000, 'localhost', function (err) {
    if (err) {
      console.log(err);
    }

    console.log('webpack dev server listening on localhost:3000');
  });
}
