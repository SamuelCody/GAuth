const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require("../models/User");

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.REDIRECT_URI,
    },
    async (accessToken, refreshToken, profile, done) => {
        
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value
        }

        try {
            let user = await User.findOne({googleId: profile.id});

            if (user) {
                done(null, user);
            }
            else {
                user = await User.create(newUser);
                done(null, user);
            }
        } catch (err) {
            console.log(err);
        }
    }
));

    passport.serializeUser((user, done) => {
        
        done(null, user._id);
    });

    passport.deserializeUser(async (_id, done) => {
        await User.findById(_id, function(err, user) {
            
            done(err, user);
        });
    });
}