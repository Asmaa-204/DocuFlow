const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const AppError = require('../errors/AppError');
const ar = require('../translations/ar');

class AuthService {
    
    static async login(email, password) 
    {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new AppError(ar.auth.invalidEmailOrPassword, 401);
        }

        if(!(await user.comparePassword(password))){
            throw new AppError(ar.auth.invalidEmailOrPassword, 401);
        }

        const payload = user.toJSON();

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        
        return token;
    };

    static async register(userData) 
    {
        const { email } = userData;

        if (await User.findOne({ where: { email } })) 
        {
            throw new AppError(ar.auth.emailAlreadyExists, 400);
        }

        const user = await User.create(userData);
        user.password = undefined

        return user;
    };

};

module.exports = AuthService;
