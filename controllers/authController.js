const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation/authValidation');

// Registration
module.exports.register = async (req, res) => {
    // Validate the data before making a user
    const errors = registerValidation(req.body);
    if(errors) return res.status(400).json({
        errors: errors
    });

    // Check if the user is already in the database
    const findUser = await User.findOne({ email: req.body.email });
    if(findUser) {
        return res.status(400).json({
            errors: {
                email: ['Email already exists']
            }
        });
    }

    // Hash password
    const hashPassword = bcrypt.hashSync(req.body.password, 10);

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    // Save the user to the database
    user.save()
        .then(user => {
            return res.status(200).json({ user: user._id });
        })
        .catch(err => {
            return res.status(400).json({
                errors: {
                    email: ['Cannot save the user to the database']
                }
            });
        });
}

// Login
module.exports.login = async (req, res) => {
    // Validate the data from user using Joi
    const errors = loginValidation(req.body);
    if(errors) return res.status(400).json({
        errors: errors
    });

    // Check if the email exists in the database
    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).json({
        errors: {
            email: ["Email doesn't exist"]
        }
    });

    // Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).json({
        errors: {
            password: ["Password is not correct"]
        }
    });

    // Create and assing a token
    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.SECRET, {});
    res.cookie('token', token, {}).status(200).json(token);
}

module.exports.token = (req, res) => {
    if(req.cookies.token === undefined) {
        res.status(200).json({
            token: null
        })
    } else {
        res.status(200).json({
            token: req.cookies.token
        });
    }
}

module.exports.logout = (req, res) => {
    res.clearCookie('token').sendStatus(200);
}