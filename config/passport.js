const passport = require('passport');
const jwt = require('passport-jwt');

const User = require('mongoose').model('User');

module.exports = function() {
    const options = {
        jwtFromRequest: jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET
    };

    passport.use(new jwt.Strategy(options, (jwt_payload, next) => {
        User.findOne({_id: jwt_payload})
            .then(user => {
                if (user) {
                    return next(null, user);
                }
                next(null, false);
            })
            .catch(err => next(err, false));
    }));
};
