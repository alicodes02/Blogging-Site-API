const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req,res) => {

    console.log(req.body);
    
    const {userName, email, password} = req.body;

    const existingUser = await User.findOne({email});

    if (existingUser) {
        res.send('User already exists.');
    }

    else {

        const newUser = new User(

            {
                userName,
                email,
                password
            }
        );

        await newUser.save();

        const token = jwt.sign({ userName, email }, 'sshhhh', { expiresIn: '1h' });
        res.json({ token });
    }
});

router.post('/admin', (req, res) => {

    const {userName, password} = req.body;

    if(userName === 'admin' && password === '098') {

        res.send('Admin Logged In Successfully!');
    }

    else {

        res.send('Invalid Credentials');
    }
});

router.post('/login', async (req, res) => {
    
    console.log(req.body);
    
    const {email, password} = req.body;

    const isUser = await User.findOne({email,password});

    if (isUser) {

        const token = jwt.sign({ email }, 'sshhhh', { expiresIn: '6h' });

        res.send({ "Message": "Sign in Successful", token});
    }

    else {

        res.send('Invalid Credentials!');
    }
});

module.exports = router;
