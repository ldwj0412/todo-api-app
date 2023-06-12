const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret'; 


exports.register= async (req, res, next) => {
   
    
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
    
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
    
        const user = new User({ username, password });
        await user.save();
    
        res.status(200).json({ message: 'User created successfully' });
    } catch (err) {

      next(new Error('Error registering user')); // Pass the error to your error handling middleware
    }
};


exports.Login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
 
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
 
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
 
        const token = jwt.sign({username: user.username }, jwtSecret,{ expiresIn: 300 });
        //console.log("token login: "+ token);
        res.json({ token });

    } catch (error) {
        // Pass the error to the next middleware function
        next(new Error('Error login user'));
    }
 };

