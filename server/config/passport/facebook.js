'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = mongoose.model('User');

/**
 * Expose
 */

module.exports = new FacebookStrategy({
        clientID: process.env.FB_CLIENTID,
        clientSecret: process.env.FB_SECRET,
        callbackURL: `http://${process.env.NODE_ENV !== "production" ? 'local.slasti.od.ua:3001' : 'slasti.od.ua'}/auth/fb/callback`,
        profileFields: ['id', 'displayName', 'email']
    },
    function (accessToken, refreshToken, profile, done) {
        const options = {
            criteria: { 'facebook.id': profile.id }
        };
        User.load(options, function (err, user) {
            if (err) return done(err);
            if (!user) {
                user = new User({
                    name: profile.displayName,
                    username: profile.username,
                    provider: profile.provider,
                    typeId: Number(profile.id),
                    fb: profile._json
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
