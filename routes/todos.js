//contain all routes related to TODOs.
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret'; 
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todos');

const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('auth-token');
    //console.log("token: "+ token);
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, jwtSecret);
        //req.user = verified;
        req.user = {
            //userId: verified.userId, // Include the userId property in req.user
            username: verified.username,
            ...verified // Include other properties from the verified object
        };
        // console.log('toke verified');
        
        next();
        
    } catch (err) {
        console.log(err);
        res.status(400).send('Invalid Token');
    }
}

router.post('/', auth,todoController.createTodo);
router.get('/', auth,todoController.getTodos);
router.put('/:id',auth, todoController.updateTodo);
router.delete('/:id',auth, todoController.deleteTodo);


module.exports = router;