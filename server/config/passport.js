'use strict';

/*!
 * Module dependencies.
 */

const mongoose = require('mongoose');
const User = mongoose.model('User');

const local = require('./passport/local');
const vkontakte = require('./passport/vkontakte');
const facebook = require('./passport/facebook');

/**
 * Expose
 */

module.exports = function (passport) {

  // serialize sessions
  passport.serializeUser((user, cb) => cb(null, user.id));
  passport.deserializeUser((id, done) => User.load({
      criteria: {
          _id:
          id
      },
      select: 'name username provider typeId'
  }, done));

  // use these strategies
  passport.use(local);
  passport.use(vkontakte);
  passport.use(facebook);
};
