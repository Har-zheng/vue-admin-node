const JwtStrategy = require('passport-jwt').Strategy, ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('./keys')
const mongoose = require('mongoose')
const User = mongoose.model('users')
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrkey;
module.exports = passport => {
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    // console.log(jwt_payload)
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return done(null, user)
        }
        return done(null, user)
      })
      .catch(err => console.log(err))
  }));
} 