const mongoose = require('mongoose');
const jwt = require('jwt-simple');
const User = mongoose.model('User');

exports.createUser = (req, res) => {
    new User(req.body).save()
        .then(user => {
            const token = jwt.encode(user._id, process.env.SECRET);
            return res.json({
                success: true,
                message: 'Successfully created a new user',
                token
            });
        })
        .catch(err => {
            res.status(500).send(err);
        });
};

exports.authenticateUser = async (req, res) => {
    const user = await User.findOne({
        username: req.body.username
    });
    if (!user) {
        return res.status(401).send({message: 'Authentication failed. User not found'});
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        if (!isMatch) {
            return res.status(401).send({message: 'Authentication failed. Wrong password'});
        }
        // no error and password matches, issue that token :)
        const token = jwt.encode(user._id, process.env.SECRET);
        res.json({
            success: true,
            message: 'Authentication successful. Enjoy your token',
            token: token
        });
    });
};