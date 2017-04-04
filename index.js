'use strict';

require('dotenv').config();

var fs = require('fs');
var path = require('path');
var join = require('path').join;

var express = require('express');
var session = require('express-session');
var app = express();

var compress = require('compression');
var cors = require('cors');
var layouts = require('express-ejs-layouts');
var passport = require('passport');
const multer = require('multer');
const uuid = require('uuid');

const mongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const validation = require('./server/config/middlewares/validation');

var mongoose = require('mongoose');

const pkg = require('./package.json');
const AdminUserIdTypes = process.env.ADMIN.split(',').reduce(function(prev, next){ return prev.concat(Number(next)); }, []) || [];

const models = join(__dirname, 'server/api/models');

// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));

const admin = require('./server/api/controllers/admin');
const bakery = require('./server/api/controllers/bakery');
const ingredient = require('./server/api/controllers/ingredient');
const basis = require('./server/api/controllers/basis');
const filling = require('./server/api/controllers/filling');
const inquiry = require('./server/api/controllers/inquiry');

// Bootstrap routes
require('./server/config/passport')(passport);

app.set('layout');
app.set('view engine', 'ejs');
app.set('view options', {layout: 'layout'});
app.set('views', path.join(process.cwd(), '/server/views'));

app.use(compress());
app.use(cors());
app.use(layouts);
app.use('/client', express.static(path.join(process.cwd(), '/client')));

// expose package.json to views
app.use(function (req, res, next) {
    res.locals.pkg = pkg;
    res.locals.env = env;
    next();
});

// bodyParser should be above methodOverride
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(function (req) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

// CookieParser should be above session
app.use(cookieParser());
app.use(cookieSession({ secret: 'secret' }));

connect()
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: pkg.name,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));

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

// TODO move this to some authorization middleware module
var userTypes = {
    any: function(types) {
        return function(req, res, next) {
            if (req.isAuthenticated()) {
                let admin = types.indexOf(Number(req.user.typeId)) !== -1;
                res.json({
                    _id : req.user._id,
                    typeId : req.user.typeId,
                    provider : req.user.provider,
                    username : req.user.username,
                    name : req.user.name,
                    admin
                });
            } else {
                res.status(401).json({ error: Error('unauthorized') });
            }
        }
    }
};

app.get('/auth/user/me', userTypes.any(AdminUserIdTypes));

// BAKERY CRUD
app.get('/api/bakery', bakery.all);

app.get('/api/bakery/count', bakery.count);

app.post('/api/bakery', function(req, res, next) {
    res.json(req.user);
});

app.put('/api/bakery', validation.validateBakeryBulkUpdate, bakery.updateBulk);

app.get('/api/bakery/:id', function(req, res, next) {
    res.json(req.user);
});

app.put('/api/bakery/:id', function(req, res, next) {
    res.json(req.user);
});

app.delete('/api/bakery', function(req, res, next) {
    res.json(req.user);
});

app.delete('/api/bakery/:id', function(req, res, next) {
    res.json(req.user);
});

//INGREDIENTS CRUD
app.get('/api/ingredients', ingredient.all);

app.post('/api/ingredients', validation.validateIngredient, ingredient.post);

app.get('/api/ingredients/:id', function(req, res, next) {
    res.json(req.user);
});

app.put('/api/ingredients/:id', function(req, res, next) {
    res.json(req.user);
});

app.delete('/api/ingredients/:id', function(req, res, next) {
    res.json(req.user);
});

//BASIS CRUD
app.get('/api/basis', basis.all);

app.post('/api/basis', validation.validateBasis, basis.post);

app.get('/api/basis/:id', function(req, res, next) {
    res.json(req.user);
});

app.put('/api/basis/:id', function(req, res, next) {
    res.json(req.user);
});

app.delete('/api/basis/:id', function(req, res, next) {
    res.json(req.user);
});

//FILLING CRUD
app.get('/api/filling', filling.all);

app.post('/api/filling', validation.validateFilling, filling.post);

app.get('/api/filling/:id', function(req, res, next) {
    res.json(req.user);
});

app.put('/api/filling/:id', function(req, res, next) {
    res.json(req.user);
});

app.delete('/api/filling/:id', function(req, res, next) {
    res.json(req.user);
});

//INQUIRY CRUD
app.get('/api/inquiry', inquiry.all);

app.post('/api/inquiry', validation.validateInquiry, inquiry.post);

app.get('/api/inquiry/:id', function(req, res, next) {
    res.json(req.user);
});

app.put('/api/inquiry/:id/resolve', inquiry.resolve);

app.delete('/api/inquiry/:id', function(req, res, next) {
    res.json(req.user);
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './client/static/images')
    },
    filename: function (req, file, cb) {
        var extension;

        extension = file.originalname.substring(file.originalname.lastIndexOf('.'));

        cb(null,  'img_' + uuid.v4() + '_' + Date.now() + extension);
    }
});

var upload = multer({ storage: storage });

//UPLOAD ADMIN FILES
app.post('/api/admin/upload/images', upload.array('images'), admin.upload);

app.get(/^\/.*(?!(auth|api)).*$/, function(req, res) {
  res.render('index', {
    env: env,
    user: req.user
  });
});

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


var nodemailer = require('nodemailer');
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: ''
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
    cc: '', // list of receivers
    to: '',
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});

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
