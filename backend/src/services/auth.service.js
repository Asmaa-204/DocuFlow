const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const AppError = require('../errors/AppError');

class AuthService {
    
    static async login(email, password) 
    {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new AppError('Invalid email or password', 401);
        }

        if(user.comparePassword(password)){
            throw new AppError('Invalid email or password', 401);
        }

        const payload = {
            userId: user.id,
            email: user.email
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        return token;
    };

    static async register(userData) 
    {
        const { email } = userData;

        if (await User.findOne({ where: { email } })) {
            throw new AppError('Email already exists', 400);
        }

        const user = await User.create(userData);
        user.password = undefined

        return user;
    };

};

module.exports = AuthService;
