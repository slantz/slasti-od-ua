'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const User = mongoose.model('User');

/**
 * Expose
 */

module.exports = new VKontakteStrategy({
    clientID: process.env.VK_CLIENTID,
    clientSecret: process.env.VK_SECRET,
    callbackURL: `http://slasti.od.ua${module.hot ? ':3001' : ''}/auth/vk/callback`,
    scope: ['email'],
    profileFields: ['email', 'city', 'bdate'],
    apiVersion: '5.60'
  },
  function (accessToken, refreshToken, profile, done) {
    const options = {
      criteria: { 'vkontakte.id': profile.id }
    };
    User.load(options, function (err, user) {
      if (err) return done(err);
      if (!user) {
        user = new User({
          name: profile.displayName,
          username: profile.username,
          provider: profile.provider,
          typeId: Number(profile.id),
          vk: profile._json
        });
        user.save(function (err) {
          if (err) console.log('vkontakte auth vk error', err);
          return done(err, user);
        });
      } else {
        return done(err, user);
      }
    });
  }
);
